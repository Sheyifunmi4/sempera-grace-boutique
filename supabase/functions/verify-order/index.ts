// Supabase Edge Function: verify-order
// Deploy:  supabase functions deploy verify-order
// Secret:  supabase secrets set PAYSTACK_SECRET_KEY=sk_test_xxx
//
// What it does (the trust boundary):
//   1. Authenticates the customer from their Supabase JWT.
//   2. Re-computes the order total from PRICES IN THE DATABASE (never trusts
//      amounts sent by the browser).
//   3. Verifies the Paystack transaction with the SECRET key and checks the
//      paid amount equals the computed total.
//   4. Only then writes the order (service role), and clears the cart.
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.
// deno-lint-ignore-file no-explicit-any
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ⚠️ Must match src/lib/delivery.ts
const DELIVERY_FEES: Record<string, number> = {
  lagos: 5000,
  outside: 7500,
  international: 50000,
};

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(obj: unknown, status: number) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const paystackSecret = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!paystackSecret) return json({ error: 'Payment not configured' }, 500);

    const admin = createClient(supabaseUrl, serviceKey);

    // 1. Authenticate the customer.
    const token = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user) return json({ error: 'Not authenticated' }, 401);
    const user = userData.user;

    const body = await req.json();
    const { reference, items, zone, customer } = body ?? {};
    if (!reference || !Array.isArray(items) || items.length === 0 || !zone || !customer) {
      return json({ error: 'Invalid request' }, 400);
    }
    if (!(zone in DELIVERY_FEES)) return json({ error: 'Invalid delivery zone' }, 400);

    // 2. Idempotency — if this reference already created an order, return it.
    const { data: existing } = await admin
      .from('shop_orders')
      .select('id,status')
      .eq('reference', reference)
      .maybeSingle();
    if (existing) return json({ ok: true, orderId: existing.id, status: existing.status, duplicate: true }, 200);

    // 3. Load authoritative prices from the DB.
    const ids = [...new Set(items.map((i: any) => String(i.productId)))];
    const { data: products, error: prodErr } = await admin
      .from('products')
      .select('id,code,name,price,price_ngn,image_urls')
      .in('id', ids);
    if (prodErr) return json({ error: 'Could not load products' }, 500);
    const byId = new Map((products || []).map((p: any) => [String(p.id), p]));

    let subtotal = 0;
    const orderItems: any[] = [];
    for (const it of items) {
      const p = byId.get(String(it.productId));
      if (!p) return json({ error: 'Product not found: ' + it.productId }, 400);
      const qty = Math.max(1, parseInt(it.quantity) || 1);
      const unit =
        typeof p.price_ngn === 'number' && p.price_ngn > 0
          ? p.price_ngn
          : parseInt(String(p.price || '').replace(/[^0-9]/g, '')) || 0;
      if (unit <= 0) return json({ error: 'Product has no price: ' + p.name }, 400);
      const line = unit * qty;
      subtotal += line;
      orderItems.push({
        product_id: String(p.id),
        product_code: p.code || null,
        product_name: p.name,
        image_url: (Array.isArray(p.image_urls) && p.image_urls[0]) || null,
        size: String(it.size || ''),
        quantity: qty,
        unit_price_ngn: unit,
        line_total_ngn: line,
      });
    }

    const delivery = DELIVERY_FEES[zone];
    const total = subtotal + delivery;
    const expectedKobo = total * 100;

    // 4. Verify the payment with Paystack (secret key).
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${paystackSecret}` } }
    );
    const verify = await verifyRes.json();
    if (!verify?.status || !verify?.data) return json({ error: 'Could not verify payment' }, 400);
    const tx = verify.data;
    if (tx.status !== 'success') return json({ error: 'Payment was not successful' }, 400);
    if (tx.currency !== 'NGN') return json({ error: 'Unexpected currency' }, 400);
    if (Number(tx.amount) !== expectedKobo) {
      return json({ error: `Amount mismatch (paid ${tx.amount}, expected ${expectedKobo})` }, 400);
    }

    // 5. Persist the order (service role bypasses RLS).
    const { data: order, error: ordErr } = await admin
      .from('shop_orders')
      .insert({
        user_id: user.id,
        reference,
        status: 'paid',
        subtotal_ngn: subtotal,
        delivery_ngn: delivery,
        total_ngn: total,
        delivery_zone: zone,
        customer_name: customer.name,
        customer_email: customer.email || user.email,
        customer_phone: customer.phone,
        delivery_address: customer.address,
        delivery_city: customer.city || null,
        notes: customer.notes || null,
      })
      .select('id,status')
      .single();
    if (ordErr) return json({ error: 'Could not save order: ' + ordErr.message }, 500);

    const { error: itErr } = await admin
      .from('shop_order_items')
      .insert(orderItems.map((oi) => ({ ...oi, order_id: order.id })));
    if (itErr) return json({ error: 'Could not save order items: ' + itErr.message }, 500);

    // 6. Clear the cart (best-effort).
    await admin.from('cart_items').delete().eq('user_id', user.id);

    return json({ ok: true, orderId: order.id, status: order.status, total }, 200);
  } catch (e) {
    return json({ error: (e as Error)?.message || 'Server error' }, 500);
  }
});

// Supabase Edge Function: paystack-webhook
// Deploy:  supabase functions deploy paystack-webhook --no-verify-jwt
//   (--no-verify-jwt is REQUIRED: Paystack calls this, not a logged-in user.
//    Security here comes from verifying Paystack's signature, not a JWT.)
// Register the URL in Paystack Dashboard → Settings → API Keys & Webhooks:
//   https://<your-project>.supabase.co/functions/v1/paystack-webhook
//
// Purpose: the reliability backstop. If a customer pays but their browser
// never returns to call `verify-order`, Paystack still calls THIS directly,
// so the order is recorded. Idempotent with verify-order — no double orders.
// deno-lint-ignore-file no-explicit-any
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'node:crypto';

// ⚠️ Must match src/lib/delivery.ts and verify-order
const DELIVERY_FEES: Record<string, number> = { lagos: 5000, outside: 7500, international: 50000 };

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const secret = Deno.env.get('PAYSTACK_SECRET_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  if (!secret) return new Response('not configured', { status: 500 });

  // 1. Verify Paystack's signature over the RAW body.
  const raw = await req.text();
  const signature = req.headers.get('x-paystack-signature') || '';
  const expected = createHmac('sha512', secret).update(raw).digest('hex');
  if (signature !== expected) return new Response('invalid signature', { status: 401 });

  let event: any;
  try { event = JSON.parse(raw); } catch { return new Response('bad json', { status: 400 }); }

  // We only act on successful charges. Acknowledge everything else with 200.
  if (event?.event !== 'charge.success') return new Response('ignored', { status: 200 });

  const admin = createClient(supabaseUrl, serviceKey);
  const data = event.data;
  const reference = data?.reference;
  if (!reference) return new Response('no reference', { status: 200 });

  // 2. Idempotency — verify-order (browser) may have already created it.
  const { data: existing } = await admin
    .from('shop_orders').select('id').eq('reference', reference).maybeSingle();
  if (existing) return new Response('already recorded', { status: 200 });

  // 3. Order context comes from the metadata we attached at checkout.
  const order = data?.metadata?.sempera_order;
  if (!order || !Array.isArray(order.items) || !order.zone || !order.customer) {
    console.warn('paystack-webhook: missing sempera_order metadata for', reference);
    return new Response('no order metadata', { status: 200 });
  }
  if (!(order.zone in DELIVERY_FEES)) return new Response('bad zone', { status: 200 });
  const userId = order.user_id;
  if (!userId) { console.warn('paystack-webhook: no user_id for', reference); return new Response('no user', { status: 200 }); }

  // 4. Recompute the total from DB prices (never trust the charged amount blindly).
  const ids = [...new Set(order.items.map((i: any) => String(i.productId)))];
  const { data: products, error: prodErr } = await admin
    .from('products').select('id,code,name,price,price_ngn,image_urls').in('id', ids);
  if (prodErr) return new Response('product load failed', { status: 500 });
  const byId = new Map((products || []).map((p: any) => [String(p.id), p]));

  let subtotal = 0;
  const orderItems: any[] = [];
  for (const it of order.items) {
    const p = byId.get(String(it.productId));
    if (!p) { console.warn('paystack-webhook: product missing', it.productId); return new Response('product missing', { status: 200 }); }
    const qty = Math.max(1, parseInt(it.quantity) || 1);
    const unit = typeof p.price_ngn === 'number' && p.price_ngn > 0
      ? p.price_ngn
      : parseInt(String(p.price || '').replace(/[^0-9]/g, '')) || 0;
    const line = unit * qty;
    subtotal += line;
    orderItems.push({
      product_id: String(p.id), product_code: p.code || null, product_name: p.name,
      image_url: (Array.isArray(p.image_urls) && p.image_urls[0]) || null,
      size: String(it.size || ''), quantity: qty, unit_price_ngn: unit, line_total_ngn: line,
    });
  }
  const delivery = DELIVERY_FEES[order.zone];
  const total = subtotal + delivery;

  // 5. The charged amount must match what we computed.
  if (Number(data.amount) !== total * 100 || data.currency !== 'NGN') {
    console.error('paystack-webhook amount mismatch', reference, data.amount, total * 100);
    return new Response('amount mismatch', { status: 200 });
  }

  // 6. Insert the order (service role). Unique reference handles the race with verify-order.
  const { data: ins, error: insErr } = await admin.from('shop_orders').insert({
    user_id: userId, reference, status: 'paid',
    subtotal_ngn: subtotal, delivery_ngn: delivery, total_ngn: total, delivery_zone: order.zone,
    customer_name: order.customer.name, customer_email: order.customer.email || data.customer?.email,
    customer_phone: order.customer.phone, delivery_address: order.customer.address,
    delivery_city: order.customer.city || null, notes: order.customer.notes || null,
  }).select('id').single();

  if (insErr) {
    if ((insErr as any).code === '23505') return new Response('already recorded', { status: 200 });
    console.error('paystack-webhook insert failed', insErr.message);
    return new Response('insert failed', { status: 500 });
  }

  await admin.from('shop_order_items').insert(orderItems.map((oi) => ({ ...oi, order_id: ins.id })));
  await admin.from('cart_items').delete().eq('user_id', userId);

  return new Response('ok', { status: 200 });
});

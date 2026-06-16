# Phase 3 Setup — Payments (Paystack)

There are **4 things to set up**. Use **test keys** first (`pk_test_` / `sk_test_`) — Paystack gives you test cards so no real money moves.

---

## Step 1 — Run the orders SQL
Supabase Dashboard → **SQL Editor** → paste [`supabase/sql/phase3_orders.sql`](./sql/phase3_orders.sql) → **Run**.
Creates `shop_orders` + `shop_order_items`. Customers can only *read* their own orders — orders are written only by the verified Edge Function.

---

## Step 2 — Your Paystack PUBLIC key (frontend)
1. Paystack Dashboard → **Settings → API Keys & Webhooks**.
2. Copy your **Public key** (`pk_test_...`).
3. Put it in the project's **`.env`** file:
   ```
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_real_key
   ```
4. On your live host (Lovable/Vercel/etc.), add the **same env var** in its dashboard so production has it too.
   _(Restart the dev server after editing `.env`.)_

---

## Step 3 — Deploy the verify Edge Function + SECRET key (backend)
The secret key never touches the browser. It lives only in Supabase.

You need the **Supabase CLI** once:
```bash
# install (mac)
brew install supabase/tap/supabase

# from the project folder, log in & link
supabase login
supabase link --project-ref sieqvcjiqdjhjnxaslrd

# set your Paystack SECRET key as a function secret
supabase secrets set PAYSTACK_SECRET_KEY=sk_test_your_real_secret

# deploy the function
supabase functions deploy verify-order
```
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided to the function automatically — you don't set those.

> No CLI? You can also create the function in the Dashboard → **Edge Functions → Create**, paste [`supabase/functions/verify-order/index.ts`](./functions/verify-order/index.ts), and add the `PAYSTACK_SECRET_KEY` secret there.

---

## Step 4 — Delivery fees (optional, edit anytime)
Default flat fees are placeholders. To change them, edit **both** (they must match):
- `src/lib/delivery.ts`
- `supabase/functions/verify-order/index.ts` (the `DELIVERY_FEES` map) → then redeploy the function.

Current defaults: Lagos ₦5,000 · Outside Lagos ₦7,500 · International ₦50,000.

---

## Then test (with Paystack TEST cards)
1. Log in → add items → **Proceed to Checkout**
2. Fill delivery details, pick a zone → **Pay**
3. In the Paystack popup use a test card, e.g. **4084 0840 8408 4081**, any future expiry, CVV `408`, OTP `123456`
4. On success you'll see the **Thank You** screen, and the order appears in Supabase → `shop_orders`
5. Your cart is now empty (cleared after the verified payment)

### The security guarantee
The browser tells Paystack an amount, but the **Edge Function recomputes the real total from your database prices** and refuses to save the order unless the Paystack-confirmed amount matches exactly. A tampered price or amount = rejected. 🔒

When this works, we build **Phase 4: "My Orders" + tracking** (the customer-facing view of `shop_orders`).

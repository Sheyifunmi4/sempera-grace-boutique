# Phase 4 + 5 Setup — Order tracking & Admin

## 🔴 FIRST — the fix that clears your 500 error
You skipped Phase 2's SQL, which is why payment returned 500 ("Could not load products" — the `price_ngn` column didn't exist).

1. Supabase → **SQL Editor** → run [`supabase/sql/phase2_cart.sql`](./sql/phase2_cart.sql)
   → adds `price_ngn`, backfills it from your text prices, and creates `cart_items`.
2. Then re-test the Paystack payment — it should now succeed and create a row in `shop_orders`.

---

## Phase 5 — make your account an admin
So you can see paid orders and move their status.

1. Open [`supabase/sql/phase5_admin_orders.sql`](./sql/phase5_admin_orders.sql)
2. **Edit the email** on the last line to the address you log into the admin panel with:
   ```sql
   where id = (select id from auth.users where email = 'your-admin@email.com');
   ```
3. Run it in the SQL Editor.

> Your admin account must be a real signed-up user (the admin panel already logs in via Supabase auth). If you've never signed up with that email, do so once on the site first.

---

## How it all works now

**Customer** (`/account` → "My Orders"):
- Sees every order they've placed, the items, totals, delivery address
- A **status tracker**: Payment Received → Order Confirmed → In Packaging → In Delivery → Delivered
- When you mark an order **Delivered**, they see a **"Thank you for your patronage"** message ✦

**Admin** (`admin.html` → new **🛍️ Online Orders** tab):
- Lists all paid orders with items + customer + delivery details
- A **Status dropdown** on each order — change it and the customer's tracker updates instantly

---

## Test the whole loop
1. Place a test order (Paystack test card `4084 0840 8408 4081`, CVV `408`).
2. Open **admin.html → Online Orders** → find the order → set status to **In Packaging**.
3. On the site, go to **My Account** → the tracker has advanced.
4. Set it to **Delivered** in admin → customer sees the **thank-you**. 💛

> Optional next: a branded **order-confirmation / "delivered" email** via EmailJS. Say the word and I'll wire it.

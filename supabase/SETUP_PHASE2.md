# Phase 2 Setup — Persistent Cart

Two steps in Supabase, then we test the cart.

---

## Step 1 — Run the cart SQL

1. Supabase Dashboard → **SQL Editor** → **New query**
2. Paste the contents of [`supabase/sql/phase2_cart.sql`](./sql/phase2_cart.sql) → **Run**

This:
- Adds a numeric **`price_ngn`** column to `products` (and tries to backfill it from your existing `₦` text prices)
- Creates the **`cart_items`** table with Row Level Security (each customer sees only their own cart)

---

## Step 2 — Set numeric prices in the admin

The cart and (next phase) Paystack charge from the **number**, not the `₦34,999` text.

- The admin product form now has a **"Price (₦) — number only"** field.
- The SQL backfill above fills it for existing products automatically, **but please double-check each product** and fix any that look wrong (digits only, e.g. `34999`).

> If `price_ngn` is empty for a product, the site falls back to reading the digits out of the text price — so nothing breaks, but setting the number explicitly is the reliable path.

---

## Then test the cart (I'll start the dev server)

1. **As a guest** (logged out): open a product → pick a size → **Add to Cart** → the drawer slides out
2. Change quantity, change size, remove an item — subtotal updates
3. Refresh the page → cart **persists** (guest cart saved locally)
4. **Log in** → your guest cart **merges** into your account
5. Open the site in a different browser, log in → **same cart appears** (it now follows your account)
6. Click **Proceed to Checkout** → since you're logged in, you reach the checkout summary (guests get sent to sign-up first)

When that all works, we build **Phase 3: delivery zones + Paystack payment.**

-- ============================================================
-- PHASE 2 — Numeric price + persistent cart
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to run once.
-- ============================================================

-- 1. NUMERIC PRICE ON PRODUCTS -------------------------------------
-- Whole Naira amount used for cart math and Paystack charges.
-- (The existing text "price" column stays for display, e.g. "₦45,000".)
alter table public.products
  add column if not exists price_ngn integer;

-- OPTIONAL backfill: take only the FIRST number in the price text
-- (e.g. "₦21,999 (was ₦26,999)" → 21999). Strips commas. Review afterwards.
update public.products
  set price_ngn = nullif(
        replace((regexp_match(coalesce(price, ''), '[0-9][0-9,]*'))[1], ',', ''),
        ''
      )::integer
  where price_ngn is null
    and coalesce(price, '') ~ '[0-9]';

-- 2. CART ITEMS TABLE ----------------------------------------------
-- One row per (customer, product, size). Lets a cart follow the user
-- across devices/sessions once they're logged in.
create table if not exists public.cart_items (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  product_id text not null,
  size       text not null default '',
  quantity   integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_id, size)
);

create index if not exists cart_items_user_idx on public.cart_items (user_id);

-- 3. ROW LEVEL SECURITY --------------------------------------------
-- A customer can only see/modify THEIR OWN cart rows.
alter table public.cart_items enable row level security;

drop policy if exists "Cart is viewable by its owner" on public.cart_items;
create policy "Cart is viewable by its owner"
  on public.cart_items for select using (auth.uid() = user_id);

drop policy if exists "Users can add to their own cart" on public.cart_items;
create policy "Users can add to their own cart"
  on public.cart_items for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update their own cart" on public.cart_items;
create policy "Users can update their own cart"
  on public.cart_items for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can remove from their own cart" on public.cart_items;
create policy "Users can remove from their own cart"
  on public.cart_items for delete using (auth.uid() = user_id);

-- ============================================================
-- Done. Next: set price_ngn for each product in the admin panel
-- (a numeric "Price (₦)" field is added there in this phase).
-- ============================================================

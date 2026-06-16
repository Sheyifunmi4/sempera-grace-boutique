-- ============================================================
-- PHASE 3 — Paid orders (checkout + Paystack)
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to run once.
--
-- SECURITY MODEL (important):
--   Customers can ONLY READ their own orders. They CANNOT insert/update them.
--   Orders are created exclusively by the `verify-order` Edge Function using the
--   service-role key AFTER it confirms the Paystack payment. This makes it
--   impossible to forge a "paid" order from the browser.
-- ============================================================

-- 1. ORDERS --------------------------------------------------------
create table if not exists public.shop_orders (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  reference       text not null unique,          -- Paystack transaction reference
  status          text not null default 'paid',  -- paid → processing → shipped → delivered → cancelled
  subtotal_ngn    integer not null,
  delivery_ngn    integer not null,
  total_ngn       integer not null,
  delivery_zone   text not null,
  customer_name   text not null,
  customer_email  text not null,
  customer_phone  text not null,
  delivery_address text not null,
  delivery_city   text,
  notes           text,
  created_at      timestamptz not null default now()
);

create index if not exists shop_orders_user_idx on public.shop_orders (user_id);

-- 2. ORDER ITEMS ---------------------------------------------------
create table if not exists public.shop_order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references public.shop_orders (id) on delete cascade,
  product_id    text not null,
  product_code  text,
  product_name  text not null,
  image_url     text,
  size          text not null default '',
  quantity      integer not null check (quantity > 0),
  unit_price_ngn integer not null,
  line_total_ngn integer not null
);

create index if not exists shop_order_items_order_idx on public.shop_order_items (order_id);

-- 3. ROW LEVEL SECURITY --------------------------------------------
-- READ-ONLY for the owner. No insert/update/delete policies are created,
-- so customers cannot write here at all — only the service role (Edge
-- Function) can, because it bypasses RLS.
alter table public.shop_orders enable row level security;
alter table public.shop_order_items enable row level security;

drop policy if exists "Owner can read their orders" on public.shop_orders;
create policy "Owner can read their orders"
  on public.shop_orders for select using (auth.uid() = user_id);

drop policy if exists "Owner can read their order items" on public.shop_order_items;
create policy "Owner can read their order items"
  on public.shop_order_items for select
  using (exists (
    select 1 from public.shop_orders o
    where o.id = shop_order_items.order_id and o.user_id = auth.uid()
  ));

-- ============================================================
-- Done. Next: deploy the `verify-order` Edge Function and set the
-- PAYSTACK_SECRET_KEY secret (see SETUP_PHASE3.md).
-- ============================================================

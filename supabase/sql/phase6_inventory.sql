-- ============================================================
-- PHASE 6 — Inventory management
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to run multiple times (all statements are idempotent).
-- ============================================================

-- 1. Add stock_quantity to products --------------------------------
-- Default 0 means "start as out of stock until admin sets a value."
alter table public.products
  add column if not exists stock_quantity integer not null default 5;

-- 2. Admin can update products (stock management) ------------------
-- Relies on is_admin() function created in phase5_admin_orders.sql.
drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
  on public.products for update
  using (public.is_admin())
  with check (public.is_admin());

-- 3. Auto-decrement stock when order items are inserted -----------
-- Fires for every row inserted into shop_order_items.
-- Since all orders are now card-paid upfront, every insert maps to a real sale.
-- GREATEST(0, ...) ensures stock never goes negative.
create or replace function public.decrement_stock_on_order()
returns trigger language plpgsql security definer as $$
begin
  update public.products
    set stock_quantity = greatest(0, stock_quantity - new.quantity)
    where id::text = new.product_id;
  return new;
end;
$$;

drop trigger if exists trg_decrement_stock on public.shop_order_items;
create trigger trg_decrement_stock
  after insert on public.shop_order_items
  for each row execute function public.decrement_stock_on_order();

-- ============================================================
-- After running this:
-- 1. Go to the Admin page (/admin) and set initial stock quantities.
-- 2. Every successful card payment will auto-decrement stock.
-- ============================================================

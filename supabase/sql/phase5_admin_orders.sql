-- ============================================================
-- PHASE 5 — Admin order management
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
--
-- Lets your ADMIN account (the one you log into admin.html with) read every
-- order and move its status along. Customers still only see their own orders.
-- ============================================================

-- 1. Mark who is an admin -------------------------------------------
alter table public.profiles
  add column if not exists is_admin boolean not null default false;

-- Helper: is the currently logged-in user an admin?
-- SECURITY DEFINER so it can read the flag regardless of row-level security.
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- 2. Admin policies on orders ---------------------------------------
drop policy if exists "Admins can read all orders" on public.shop_orders;
create policy "Admins can read all orders"
  on public.shop_orders for select using (public.is_admin());

drop policy if exists "Admins can update orders" on public.shop_orders;
create policy "Admins can update orders"
  on public.shop_orders for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can read all order items" on public.shop_order_items;
create policy "Admins can read all order items"
  on public.shop_order_items for select using (public.is_admin());

-- 3. Make YOUR existing admin account an admin ----------------------
-- Use the SAME email you log into admin.html with.
-- This creates a profiles row if one doesn't exist yet (older accounts
-- created before the profiles trigger won't have one), otherwise updates it.
insert into public.profiles (id, is_admin)
  select id, true from auth.users where email = 'REPLACE_WITH_ADMIN_EMAIL'
  on conflict (id) do update set is_admin = true;

-- Check it worked (should list your admin email):
--   select p.is_admin, u.email from public.profiles p
--   join auth.users u on u.id = p.id where p.is_admin;
-- ============================================================

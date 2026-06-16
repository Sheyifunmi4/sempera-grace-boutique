-- ============================================================
-- PHASE 5b — Tag order source (Normal vs Manual)
-- Run in: Supabase Dashboard → SQL Editor → Run. Safe & additive.
--
-- Adds a "source" label to the existing orders table so the admin can tell
-- website orders from manually-created ones. Existing rows become 'normal'.
-- Nothing is deleted or changed; only a new column is added.
-- ============================================================

alter table public.orders
  add column if not exists source text not null default 'normal';

-- (Going forward, manual orders created in the admin are tagged 'manual'.
--  Cart payments live in shop_orders and show as 'E-Payment' in the UI.)
-- ============================================================

-- ============================================================
-- PHASE 1 — Customer accounts (profiles) + Row Level Security
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to run once. Uses IF NOT EXISTS / OR REPLACE where possible.
-- ============================================================

-- 1. PROFILES TABLE -------------------------------------------------
-- One row per signed-up customer, linked to Supabase's auth.users.
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  full_name    text,
  phone        text,
  default_zone text,                       -- delivery zone preference (used later at checkout)
  created_at   timestamptz not null default now()
);

-- 2. ROW LEVEL SECURITY --------------------------------------------
-- Lock the table down: a customer can only touch THEIR OWN row.
alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by their owner" on public.profiles;
create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 3. AUTO-CREATE A PROFILE ON SIGN-UP ------------------------------
-- When a new auth user is created (email/password OR Google), copy
-- their name into a profiles row automatically.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',  -- email/password signup
      new.raw_user_meta_data ->> 'name',        -- Google signup
      ''
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Done. Phase 2 (cart) and Phase 3 (orders) add more tables later.
-- ============================================================

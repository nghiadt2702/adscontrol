-- Run once in Supabase SQL Editor after supabase/schema.sql.
-- Google OAuth refresh/access tokens are encrypted by Vercel before storage.

create table if not exists public.google_authorizations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(user_id) on delete cascade,
  external_user_id text not null,
  external_user_name text,
  external_user_email text,
  encrypted_refresh_token text not null,
  encrypted_access_token text not null,
  token_expires_at timestamptz,
  status text not null default 'active',
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.google_ad_accounts (
  id uuid primary key default gen_random_uuid(),
  authorization_id uuid not null references public.google_authorizations(id) on delete cascade,
  account_id text not null,
  account_name text not null,
  manager_account_id text,
  manager_account_name text,
  currency text,
  timezone_name text,
  account_status text,
  selected boolean not null default false,
  assigned_ua_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (authorization_id, account_id)
);

alter table public.google_authorizations enable row level security;
alter table public.google_ad_accounts enable row level security;

drop policy if exists "owners read own Google authorization" on public.google_authorizations;
create policy "owners read own Google authorization"
  on public.google_authorizations for select
  using (user_id = auth.uid() and public.is_workspace_manager());

drop policy if exists "managers read Google ad accounts" on public.google_ad_accounts;
create policy "managers read Google ad accounts"
  on public.google_ad_accounts for select using (public.is_workspace_manager());

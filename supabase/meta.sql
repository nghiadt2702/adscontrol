-- Run after supabase/schema.sql to enable the Meta OAuth connector.
create table if not exists public.meta_authorizations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(user_id) on delete cascade,
  external_user_id text not null,
  external_user_name text,
  encrypted_access_token text not null,
  token_expires_at timestamptz,
  status text not null default 'active',
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.meta_ad_accounts (
  id uuid primary key default gen_random_uuid(),
  authorization_id uuid not null references public.meta_authorizations(id) on delete cascade,
  account_id text not null,
  account_name text not null,
  business_id text,
  business_name text,
  currency text,
  timezone_name text,
  account_status integer,
  selected boolean not null default false,
  assigned_ua_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (authorization_id, account_id)
);

create index if not exists meta_ad_accounts_selected_idx
  on public.meta_ad_accounts (authorization_id, selected);

alter table public.meta_authorizations enable row level security;
alter table public.meta_ad_accounts enable row level security;

drop policy if exists "owners read own Meta authorization" on public.meta_authorizations;
create policy "owners read own Meta authorization"
  on public.meta_authorizations for select
  using (user_id = auth.uid() and public.is_workspace_manager());

drop policy if exists "managers read Meta ad accounts" on public.meta_ad_accounts;
create policy "managers read Meta ad accounts"
  on public.meta_ad_accounts for select
  using (public.is_workspace_manager());

-- Writes are performed only by Vercel functions with the service-role key.

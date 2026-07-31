-- Run this file once in Supabase SQL Editor.
create extension if not exists pgcrypto;

create type public.workspace_role as enum ('owner', 'admin', 'ua_lead', 'ua_buyer');
create type public.member_status as enum ('invited', 'active', 'disabled');
create type public.ad_platform as enum ('meta', 'google', 'tiktok', 'appsflyer', 'adjust', 'firebase');

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role public.workspace_role not null default 'ua_buyer',
  status public.member_status not null default 'invited',
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

create table public.platform_connections (
  id uuid primary key default gen_random_uuid(),
  platform public.ad_platform not null,
  display_name text not null,
  external_account_id text,
  status text not null default 'pending',
  last_synced_at timestamptz,
  last_error text,
  created_by uuid references public.profiles(user_id),
  created_at timestamptz not null default now(),
  unique (platform, external_account_id)
);

create table public.user_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  platform public.ad_platform not null,
  external_account_id text not null,
  external_campaign_id text,
  assigned_by uuid references public.profiles(user_id),
  created_at timestamptz not null default now(),
  unique (user_id, platform, external_account_id, external_campaign_id)
);

create table public.kpi_targets (
  id uuid primary key default gen_random_uuid(),
  app_key text not null,
  platform public.ad_platform,
  country text,
  os text,
  metric text not null,
  target_value numeric not null,
  valid_from date not null,
  valid_to date,
  created_by uuid references public.profiles(user_id),
  created_at timestamptz not null default now()
);

create table public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.platform_connections(id) on delete cascade,
  status text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  rows_upserted integer not null default 0,
  error_message text
);

create table public.appsflyer_events (
  id uuid primary key default gen_random_uuid(),
  event_key text not null unique,
  app_id text not null,
  event_name text not null,
  event_time timestamptz,
  install_time timestamptz,
  media_source text,
  campaign text,
  adset text,
  ad text,
  platform text,
  country_code text,
  revenue numeric not null default 0,
  currency text,
  payload jsonb not null default '{}'::jsonb,
  received_at timestamptz not null default now()
);

create index appsflyer_events_app_time_idx
  on public.appsflyer_events (app_id, event_time desc);
create index appsflyer_events_source_idx
  on public.appsflyer_events (media_source, event_name);

create table public.appsflyer_sync_snapshots (
  id uuid primary key default gen_random_uuid(),
  app_id text not null,
  period_from date not null,
  period_to date not null,
  totals jsonb not null default '{}'::jsonb,
  breakdown jsonb not null default '[]'::jsonb,
  daily jsonb not null default '[]'::jsonb,
  row_counts jsonb not null default '{}'::jsonb,
  pulled_at timestamptz not null default now(),
  unique (app_id, period_from, period_to)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if (select count(*) from public.profiles where status <> 'disabled') >= 10 then
    raise exception 'Workspace seat limit reached';
  end if;

  insert into public.profiles (user_id, email, full_name, role, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data ->> 'requested_role')::public.workspace_role, 'ua_buyer'),
    case when new.email_confirmed_at is null then 'invited' else 'active' end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_workspace_manager()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid()
      and role in ('owner', 'admin', 'ua_lead')
      and status = 'active'
  );
$$;

alter table public.profiles enable row level security;
alter table public.platform_connections enable row level security;
alter table public.user_assignments enable row level security;
alter table public.kpi_targets enable row level security;
alter table public.sync_runs enable row level security;
alter table public.appsflyer_events enable row level security;
alter table public.appsflyer_sync_snapshots enable row level security;

create policy "members read own profile"
  on public.profiles for select using (user_id = auth.uid() or public.is_workspace_manager());
create policy "managers read connections"
  on public.platform_connections for select using (public.is_workspace_manager());
create policy "buyers read assigned connections"
  on public.platform_connections for select using (
    exists (
      select 1 from public.user_assignments a
      where a.user_id = auth.uid()
        and a.platform = platform_connections.platform
        and a.external_account_id = platform_connections.external_account_id
    )
  );
create policy "members read own assignments"
  on public.user_assignments for select using (user_id = auth.uid() or public.is_workspace_manager());
create policy "members read kpi targets"
  on public.kpi_targets for select using (auth.uid() is not null);
create policy "managers read sync runs"
  on public.sync_runs for select using (public.is_workspace_manager());
create policy "managers read AppsFlyer events"
  on public.appsflyer_events for select using (public.is_workspace_manager());
create policy "managers read AppsFlyer snapshots"
  on public.appsflyer_sync_snapshots for select using (public.is_workspace_manager());

-- The service-role key bypasses RLS and is used only by Vercel server functions.
-- Never expose SUPABASE_SERVICE_ROLE_KEY in browser code or commit it to GitHub.

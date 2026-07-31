-- Run after the base schema when adding AppsFlyer to an existing project.
create table if not exists public.appsflyer_events (
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

create index if not exists appsflyer_events_app_time_idx
  on public.appsflyer_events (app_id, event_time desc);
create index if not exists appsflyer_events_source_idx
  on public.appsflyer_events (media_source, event_name);

create table if not exists public.appsflyer_sync_snapshots (
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
alter table public.appsflyer_sync_snapshots
  add column if not exists daily jsonb not null default '[]'::jsonb;

alter table public.appsflyer_events enable row level security;
alter table public.appsflyer_sync_snapshots enable row level security;

drop policy if exists "managers read AppsFlyer events" on public.appsflyer_events;
create policy "managers read AppsFlyer events"
  on public.appsflyer_events for select using (public.is_workspace_manager());

drop policy if exists "managers read AppsFlyer snapshots" on public.appsflyer_sync_snapshots;
create policy "managers read AppsFlyer snapshots"
  on public.appsflyer_sync_snapshots for select using (public.is_workspace_manager());

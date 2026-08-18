-- Run this once after supabase/schema.sql in the Supabase SQL Editor.
-- The API accesses this table with the server-side service-role key only.

do $$
begin
  create type public.access_request_status as enum ('pending', 'approved', 'rejected');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.workspace_access_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  message text,
  status public.access_request_status not null default 'pending',
  requested_role public.workspace_role not null default 'ua_buyer',
  decided_role public.workspace_role,
  decided_by uuid references public.profiles(user_id),
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists workspace_access_requests_pending_email_idx
  on public.workspace_access_requests (lower(email))
  where status = 'pending'::public.access_request_status;

alter table public.workspace_access_requests enable row level security;

-- There is intentionally no public INSERT policy. All writes go through the
-- server route, which validates input and uses the service-role key.

-- Prevent direct anonymous Supabase sign-ups from becoming active members.
-- Server-side invite/approval routes explicitly promote an invited profile to
-- active after the Owner/Admin has approved it. Bootstrap the first Owner
-- explicitly in SQL as documented in README.md.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text;
begin
  if (
    select count(*)
    from public.profiles
    where status <> 'disabled'::public.member_status
  ) >= 10 then
    raise exception 'Workspace seat limit reached';
  end if;

  requested_role := nullif(new.raw_user_meta_data ->> 'requested_role', '');

  insert into public.profiles (user_id, email, full_name, role, status)
  values (
    new.id,
    new.email,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      split_part(new.email, '@', 1)
    ),
    case
      when requested_role in ('owner', 'admin', 'ua_lead', 'ua_buyer')
        then requested_role::public.workspace_role
      else 'ua_buyer'::public.workspace_role
    end,
    'invited'::public.member_status
  )
  on conflict (user_id) do update set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name);

  return new;
end;
$$;

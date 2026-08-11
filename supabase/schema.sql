-- ============================================================
-- Internship Tracker — Database Schema
-- Run this in the Supabase SQL Editor (project → SQL → New query)
-- ============================================================

-- Status is a fixed set used end-to-end in the app.
create type public.application_status as enum (
  'wishlist',
  'applied',
  'interview',
  'offer',
  'rejected'
);

-- Users are created by Supabase Auth (auth.users). This table holds
-- the profile fields our app needs on top of auth.
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  program text,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  company text not null,
  role text not null,
  status public.application_status not null default 'wishlist',
  posting_link text,
  applied_date date,
  deadline date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  title text not null,
  done boolean not null default false,
  due_date date
);

-- Indexes
create index applications_user_id_idx on public.applications(user_id);
create index applications_status_idx on public.applications(status);
create index applications_deadline_idx on public.applications(deadline)
  where deadline is not null;
create index tasks_application_id_idx on public.tasks(application_id);

-- Keep updated_at in sync whenever an application row changes.
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_applications_updated_at
  before update on public.applications
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.users enable row level security;
alter table public.applications enable row level security;
alter table public.tasks enable row level security;

create policy "users select own" on public.users
  for select using (auth.uid() = id);
create policy "users insert own" on public.users
  for insert with check (auth.uid() = id);
create policy "users update own" on public.users
  for update using (auth.uid() = id);

create policy "applications select own" on public.applications
  for select using (auth.uid() = user_id);
create policy "applications insert own" on public.applications
  for insert with check (auth.uid() = user_id);
create policy "applications update own" on public.applications
  for update using (auth.uid() = user_id);
create policy "applications delete own" on public.applications
  for delete using (auth.uid() = user_id);

create policy "tasks select own" on public.tasks
  for select using (
    auth.uid() = (select user_id from public.applications where id = application_id)
  );
create policy "tasks insert own" on public.tasks
  for insert with check (
    auth.uid() = (select user_id from public.applications where id = application_id)
  );
create policy "tasks update own" on public.tasks
  for update using (
    auth.uid() = (select user_id from public.applications where id = application_id)
  );
create policy "tasks delete own" on public.tasks
  for delete using (
    auth.uid() = (select user_id from public.applications where id = application_id)
  );

-- ============================================================
-- Auto-create profile on signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, name, email, program)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'program', null)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

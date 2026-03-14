-- ─────────────────────────────────────────
-- Run this in Supabase SQL Editor
-- Safely handles already-existing policies
-- ─────────────────────────────────────────

-- 1. LEADS TABLE
create table if not exists leads (
  id            uuid primary key default gen_random_uuid(),
  first_name    text not null,
  last_name     text not null,
  email         text not null unique,
  website       text,
  revenue_range text,
  source        text default 'playbook_download',
  created_at    timestamptz default now()
);

create index if not exists leads_email_idx   on leads(email);
create index if not exists leads_created_idx on leads(created_at desc);

-- 2. ANALYTICS TABLE
create table if not exists analytics (
  id         uuid primary key default gen_random_uuid(),
  event      text not null,
  page       text,
  metadata   jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists analytics_event_idx   on analytics(event);
create index if not exists analytics_created_idx on analytics(created_at desc);

-- 3. Enable RLS
alter table leads     enable row level security;
alter table analytics enable row level security;

-- 4. Drop existing policies first (safe even if they don't exist)
drop policy if exists "Allow insert leads"     on leads;
drop policy if exists "Allow select leads"     on leads;
drop policy if exists "Allow insert analytics" on analytics;
drop policy if exists "Allow select analytics" on analytics;

-- 5. Recreate clean policies
create policy "Allow insert leads"     on leads     for insert with check (true);
create policy "Allow select leads"     on leads     for select using (true);
create policy "Allow insert analytics" on analytics for insert with check (true);
create policy "Allow select analytics" on analytics for select using (true);

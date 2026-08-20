-- Supabase SQL migration: create invoices/payments tables
-- Run this in Supabase SQL editor or via migration tooling

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  name text,
  created_at timestamptz default now()
);

create table if not exists invoices (
  id text primary key,
  user_id uuid references users(id),
  amount_cents bigint not null,
  currency varchar(10) not null default 'KES',
  fee_cents bigint default 0,
  net_amount_cents bigint default 0,
  method varchar(50) not null,
  status varchar(30) not null default 'pending',
  provider varchar(50),
  provider_ref text,
  bank_destination varchar(100),
  receipt_url text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id text references invoices(id),
  provider varchar(50),
  provider_ref text,
  method varchar(50),
  amount_cents bigint not null,
  fee_cents bigint default 0,
  net_amount_cents bigint default 0,
  status varchar(30) not null default 'completed',
  created_at timestamptz default now()
);

create index if not exists idx_invoices_user_id on invoices(user_id);

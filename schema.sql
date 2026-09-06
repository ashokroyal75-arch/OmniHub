-- OmniHub Portal — Supabase schema
-- Run this in the Supabase SQL editor for your project.

create extension if not exists "uuid-ossp";

-- Cached celebrity metadata (refreshed periodically from TMDB / Wikipedia)
create table if not exists public.celebrities (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('actor', 'athlete', 'musician', 'creator')),
  tmdb_id integer,
  bio text,
  birth_date date,
  profile_image_url text,
  social_links jsonb default '{}'::jsonb,
  trending_score integer default 0,
  last_refreshed_at timestamptz default now(),
  created_at timestamptz default now()
);

create index if not exists celebrities_category_idx on public.celebrities (category);
create index if not exists celebrities_trending_idx on public.celebrities (trending_score desc);

-- Curated affiliate products attached to a celebrity profile
create table if not exists public.affiliate_products (
  id uuid primary key default uuid_generate_v4(),
  celebrity_id uuid references public.celebrities (id) on delete cascade,
  title text not null,
  amazon_url text not null,
  image_url text,
  price_snapshot text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Signed-in user bookmarks (requires Supabase Auth)
create table if not exists public.bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete cascade,
  celebrity_id uuid references public.celebrities (id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, celebrity_id)
);

-- Sponsored spotlight placements shown atop category pages
create table if not exists public.sponsored_spotlights (
  id uuid primary key default uuid_generate_v4(),
  category text not null,
  title text not null,
  subtitle text,
  link_url text not null,
  image_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean default true
);

alter table public.celebrities enable row level security;
alter table public.affiliate_products enable row level security;
alter table public.bookmarks enable row level security;
alter table public.sponsored_spotlights enable row level security;

create policy "Public read celebrities" on public.celebrities for select using (true);
create policy "Public read affiliate products" on public.affiliate_products for select using (true);
create policy "Public read active spotlights" on public.sponsored_spotlights for select using (active = true);

create policy "Users manage own bookmarks" on public.bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

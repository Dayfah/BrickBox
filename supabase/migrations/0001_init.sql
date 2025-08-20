-- Enable UUID & extensions as needed
create extension if not exists pg_trgm;
create extension if not exists pgcrypto;

-- PROFILES (mirror of auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) between 3 and 20),
  display_name text not null,
  bio text default '',
  avatar_url text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

-- FOLLOWS
create table if not exists public.follows (
  follower uuid references auth.users(id) on delete cascade,
  following uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower, following)
);
alter table public.follows enable row level security;

-- POSTS
create table if not exists public.posts (
  id bigserial primary key,
  author uuid not null references auth.users(id) on delete cascade,
  body text not null,
  media_urls text[] default '{}',
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz
);
alter table public.posts enable row level security;

-- LIKES
create table if not exists public.post_likes (
  post_id bigint references public.posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (post_id, user_id)
);
alter table public.post_likes enable row level security;

-- COMMENTS
create table if not exists public.comments (
  id bigserial primary key,
  post_id bigint not null references public.posts(id) on delete cascade,
  author uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);
alter table public.comments enable row level security;

-- SERIES (catalog)
create table if not exists public.series (
  id bigserial primary key,
  title text not null,
  publisher text not null,
  universe text default 'Main',
  start_year int,
  end_year int,
  metadata jsonb default '{}'::jsonb
);
alter table public.series enable row level security;

-- ISSUES (catalog)
create table if not exists public.issues (
  id bigserial primary key,
  series_id bigint references public.series(id) on delete cascade,
  issue_number text not null,
  title text,
  release_date date,
  story_arc text,
  variant_code text,
  metadata jsonb default '{}'::jsonb
);
alter table public.issues enable row level security;
create index if not exists idx_issues_series on public.issues(series_id);
create index if not exists idx_issues_release on public.issues(release_date);

-- USER COLLECTION
create table if not exists public.user_issues (
  id bigserial primary key,
  owner uuid not null references auth.users(id) on delete cascade,
  issue_id bigint not null references public.issues(id) on delete cascade,
  condition text check (condition in ('Mint','Near Mint','Very Fine','Fine','Good','Fair','Poor')),
  grade numeric(3,1),
  purchase_price numeric(10,2),
  location text,
  notes text,
  created_at timestamptz default now(),
  unique (owner, issue_id)
);
alter table public.user_issues enable row level security;
create index if not exists idx_user_issues_owner on public.user_issues(owner);

-- WISHLIST
create table if not exists public.wishlist (
  owner uuid references auth.users(id) on delete cascade,
  issue_id bigint references public.issues(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (owner, issue_id)
);
alter table public.wishlist enable row level security;

-- MARKETPLACE LISTINGS (MVP)
create table if not exists public.listings (
  id bigserial primary key,
  seller uuid not null references auth.users(id) on delete cascade,
  user_issue_id bigint not null references public.user_issues(id) on delete cascade,
  price numeric(10,2) not null,
  status text not null default 'active' check (status in ('active','pending','sold','cancelled')),
  created_at timestamptz default now()
);
alter table public.listings enable row level security;

-- NOTIFICATIONS
create table if not exists public.notifications (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,      -- e.g., like, comment, follow, offer, foc
  payload jsonb not null,
  read boolean default false,
  created_at timestamptz default now()
);
alter table public.notifications enable row level security;

-------------------------------------------------
-- Row Level Security Policies
-------------------------------------------------
-- profiles
create policy if not exists "profiles are readable by all"
  on public.profiles for select using (true);
create policy if not exists "users insert own profile"
  on public.profiles for insert with check (auth.uid() = id);
create policy if not exists "users update own profile"
  on public.profiles for update using (auth.uid() = id);

-- follows
create policy if not exists "read follows" on public.follows for select using (true);
create policy if not exists "write own follows" on public.follows for all using (auth.uid() = follower) with check (auth.uid() = follower);

-- posts
create policy if not exists "read posts" on public.posts for select using (true);
create policy if not exists "insert own post" on public.posts for insert with check (auth.uid() = author);
create policy if not exists "update/delete own post" on public.posts for all using (auth.uid() = author);

-- comments
create policy if not exists "read comments" on public.comments for select using (true);
create policy if not exists "insert own comment" on public.comments for insert with check (auth.uid() = author);
create policy if not exists "update/delete own comment" on public.comments for all using (auth.uid() = author);

-- user_issues
create policy if not exists "read own user_issues" on public.user_issues for select using (auth.uid() = owner);
create policy if not exists "write own user_issues" on public.user_issues for all using (auth.uid() = owner) with check (auth.uid() = owner);

-- wishlist
create policy if not exists "read own wishlist" on public.wishlist for select using (auth.uid() = owner);
create policy if not exists "write own wishlist" on public.wishlist for all using (auth.uid() = owner) with check (auth.uid() = owner);

-- listings
create policy if not exists "market read" on public.listings for select using (true);
create policy if not exists "seller writes own" on public.listings for all using (auth.uid() = seller) with check (auth.uid() = seller);

-- notifications
create policy if not exists "read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy if not exists "write notifications (system)" on public.notifications for insert with check (true);

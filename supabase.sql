-- BrickBox — Supabase schema & policies

-- 1) Auth-linked profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamp with time zone default now()
);
alter table public.profiles enable row level security;

create policy "Public profiles are viewable"
on public.profiles for select using ( true );

create policy "Users can insert their own profile"
on public.profiles for insert with check ( auth.uid() = id );

create policy "Users can update own profile"
on public.profiles for update using ( auth.uid() = id );

-- 2) Posts (feed)
create table if not exists public.posts (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  content text,
  image_url text,
  created_at timestamp with time zone default now()
);
alter table public.posts enable row level security;

create policy "Anyone can read posts" on public.posts for select using ( true );
create policy "Authed can insert posts" on public.posts for insert with check ( auth.uid() = user_id );
create policy "Owner can update/delete" on public.posts for update using (auth.uid() = user_id);
create policy "Owner can delete" on public.posts for delete using (auth.uid() = user_id);

-- 3) Collections (comics)
create table if not exists public.collections (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  issue text,
  publisher text,
  variant text,
  condition text,
  notes text,
  photo_url text,
  created_at timestamp with time zone default now()
);
alter table public.collections enable row level security;

create policy "Read own collections" on public.collections for select using ( auth.uid() = user_id );
create policy "Insert own" on public.collections for insert with check ( auth.uid() = user_id );
create policy "Update own" on public.collections for update using (auth.uid() = user_id);
create policy "Delete own" on public.collections for delete using (auth.uid() = user_id);

-- 4) Follows
create table if not exists public.follows (
  follower uuid references auth.users(id) on delete cascade,
  followee uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (follower, followee)
);
alter table public.follows enable row level security;
create policy "Read follows" on public.follows for select using (true);
create policy "Insert own follows" on public.follows for insert with check (auth.uid() = follower);
create policy "Delete own follows" on public.follows for delete using (auth.uid() = follower);

-- 5) Likes
create table if not exists public.likes (
  user_id uuid references auth.users(id) on delete cascade,
  post_id bigint references public.posts(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (user_id, post_id)
);
alter table public.likes enable row level security;
create policy "Read likes" on public.likes for select using (true);
create policy "Insert own like" on public.likes for insert with check (auth.uid() = user_id);
create policy "Delete own like" on public.likes for delete using (auth.uid() = user_id);

-- 6) Subscriptions (Stripe mirror)
create table if not exists public.subscriptions (
  user_id uuid references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan text,
  status text,
  current_period_end timestamp with time zone,
  updated_at timestamp with time zone default now(),
  primary key (user_id)
);
alter table public.subscriptions enable row level security;
create policy "Read own subscription" on public.subscriptions for select using (auth.uid() = user_id);
-- Note: service_role bypasses RLS for webhook upserts

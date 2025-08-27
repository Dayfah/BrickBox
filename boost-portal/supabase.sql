-- Table to log boost claims
create table if not exists boost_claims (
  id bigserial primary key,
  inserted_at timestamptz default now(),
  wallet text,
  signature text not null,
  content_url text,
  amount_units text not null,
  valid boolean default false
);

-- Enable RLS so only service role can read/write by default
alter table boost_claims enable row level security;

-- Allow anonymous inserts and reads (optional)
create policy "Public read" on boost_claims for select using (true);
create policy "Anon insert" on boost_claims for insert with check (true);

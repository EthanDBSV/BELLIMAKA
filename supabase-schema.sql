-- Run this in Supabase: SQL Editor -> New query -> Run.
-- After registering your own account, promote it with:
-- update public.user_profiles set role = 'moderator' where id = 'YOUR_AUTH_USER_UUID';

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  role text not null default 'viewer' check (role in ('viewer', 'moderator')),
  prediction_points integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.league_state (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.league_state (id, data) values ('main', '{}'::jsonb)
on conflict (id) do nothing;
alter publication supabase_realtime add table public.league_state;

-- Relational tables for the production migration. The current app uses league_state
-- for live shared state while these tables are ready for normalized data migration.
create table if not exists public.tournaments (
  id uuid primary key default gen_random_uuid(), name text not null,
  regulation text, start_date date, end_date date,
  phase text not null default 'groups', status text not null default 'ongoing'
);
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(), tournament_id uuid references public.tournaments(id) on delete cascade,
  phase text not null default 'group', group_name text, player_one_id uuid,
  player_two_id uuid, score_one integer, score_two integer, completed_at timestamptz
);
create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  tournament_id text not null,
  prediction_key text not null, selection text not null, points_awarded integer not null default 0,
  unique(user_id, tournament_id, prediction_key)
);

alter table public.user_profiles enable row level security;
alter table public.league_state enable row level security;
alter table public.tournaments enable row level security;
alter table public.matches enable row level security;
alter table public.predictions enable row level security;

create or replace function public.is_moderator()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_profiles where id = auth.uid() and role = 'moderator');
$$;

create policy "profiles readable" on public.user_profiles for select using (true);
drop policy if exists "state readable" on public.league_state;
drop policy if exists "moderator updates state" on public.league_state;
drop policy if exists "authenticated users update state" on public.league_state;
drop policy if exists "authenticated users insert state" on public.league_state;
drop policy if exists "allow all writes on league_state" on public.league_state;

create policy "state readable" on public.league_state for select using (true);
create policy "allow all writes on league_state" on public.league_state for all using (true) with check (true);
create policy "tournaments readable" on public.tournaments for select using (true);
create policy "moderator writes tournaments" on public.tournaments for all using (public.is_moderator()) with check (public.is_moderator());
create policy "matches readable" on public.matches for select using (true);
create policy "moderator writes matches" on public.matches for all using (public.is_moderator()) with check (public.is_moderator());
create policy "predictions readable" on public.predictions for select using (true);
create policy "players manage own predictions" on public.predictions for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Create a profile whenever somebody signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)));
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

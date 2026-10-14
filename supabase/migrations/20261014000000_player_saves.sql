create table if not exists public.player_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null,
  schema_version integer not null default 1 check (schema_version > 0),
  revision bigint not null default 1 check (revision > 0),
  updated_at timestamptz not null default now()
);

alter table public.player_saves enable row level security;

create policy "Players can read their own save" on public.player_saves for select using ((select auth.uid()) = user_id);
create policy "Players can create their own save" on public.player_saves for insert with check ((select auth.uid()) = user_id);
create policy "Players can update their own save" on public.player_saves for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Players can delete their own save" on public.player_saves for delete using ((select auth.uid()) = user_id);

create or replace function public.set_player_save_updated_at() returns trigger language plpgsql security invoker set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger player_saves_updated_at before update on public.player_saves for each row execute function public.set_player_save_updated_at();

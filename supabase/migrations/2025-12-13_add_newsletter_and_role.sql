-- Migration: Add newsletter flag and set default role to 'user'
-- Date: 2025-12-13

begin;

-- Add newsletter_subscribed column if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' 
      and table_name = 'profiles' 
      and column_name = 'newsletter_subscribed'
  ) then
    alter table public.profiles
      add column newsletter_subscribed boolean not null default false;
  end if;
end $$;

-- Ensure default role is 'user' for new profiles
alter table public.profiles
  alter column role set default 'user';

-- Backfill: convert legacy non-admin roles from 'editor' to 'user'
update public.profiles
set role = 'user'
where role = 'editor';

commit;

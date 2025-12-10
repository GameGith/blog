create extension if not exists "uuid-ossp";

create table if not exists public.categories (
  id uuid primary key default extensions.uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  email text unique,
  role text not null default 'editor',
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default extensions.uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_url text,
  tags text[] default '{}',
  category_id uuid references public.categories (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_id uuid references public.profiles (id) on delete set null,
  views integer default 0,
  likes integer default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_status_idx on public.posts (status);
create index if not exists posts_category_idx on public.posts (category_id);

create or replace function public.handle_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
before update on public.posts
for each row
execute function public.handle_posts_updated_at();

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_profiles_updated_at();

drop trigger if exists categories_updated_at on public.categories;
create trigger categories_updated_at
before update on public.categories
for each row
execute function public.handle_profiles_updated_at();

-- Migration: Update posts table to use category_id
-- Drop old category column if exists and add new category_id column
do $$
begin
  -- Check if old 'category' column exists and drop it
  if exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' 
    and table_name = 'posts' 
    and column_name = 'category'
  ) then
    alter table public.posts drop column category;
  end if;

  -- Add category_id if not exists
  if not exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' 
    and table_name = 'posts' 
    and column_name = 'category_id'
  ) then
    alter table public.posts add column category_id uuid references public.categories (id) on delete set null;
  end if;
end $$;

-- RLS
alter table public.posts enable row level security;
alter table public.profiles enable row level security;
alter table public.categories enable row level security;

create policy "Public can read published posts"
  on public.posts
  for select
  using ( status = 'published' );

create policy "Admins can manage posts"
  on public.posts
  for all
  using ( auth.role() = 'authenticated' );

create policy "Public profiles readable"
  on public.profiles
  for select
  using ( true );

create policy "Users manage own profile"
  on public.profiles
  for all
  using ( auth.uid() = id )
  with check ( auth.uid() = id );

create policy "Public can read categories"
  on public.categories
  for select
  using ( true );

create policy "Authenticated users can manage categories"
  on public.categories
  for all
  using ( auth.role() = 'authenticated' );

-- Storage bucket untuk blog media
insert into storage.buckets (id, name, public)
values ('blog-media', 'blog-media', true)
on conflict (id) do nothing;

-- Storage policies untuk blog-media bucket
-- Drop existing policies if they exist to avoid conflicts
drop policy if exists "Public can view blog media" on storage.objects;
drop policy if exists "Authenticated users can upload blog media" on storage.objects;
drop policy if exists "Users can update their own blog media" on storage.objects;
drop policy if exists "Users can delete their own blog media" on storage.objects;

create policy "Public can view blog media"
  on storage.objects for select
  using ( bucket_id = 'blog-media' );

create policy "Authenticated users can upload blog media"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-media' 
    and auth.role() = 'authenticated'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or (storage.foldername(name))[1] = 'avatar'
    )
  );

create policy "Users can update their own blog media"
  on storage.objects for update
  using (
    bucket_id = 'blog-media' 
    and auth.role() = 'authenticated'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or (storage.foldername(name))[1] = 'avatar'
    )
  );

create policy "Users can delete their own blog media"
  on storage.objects for delete
  using (
    bucket_id = 'blog-media' 
    and auth.role() = 'authenticated'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or (storage.foldername(name))[1] = 'avatar'
    )
  );

create type public.app_role as enum ('admin','user');
create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade not null, role app_role not null, unique(user_id, role));
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role) returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.user_roles where user_id=_user_id and role=_role) $$;

create or replace function public.assign_first_admin() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role='admin') then
    insert into public.user_roles(user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users for each row execute function public.assign_first_admin();

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.posts to anon;
grant select, insert, update, delete on public.posts to authenticated;
grant all on public.posts to service_role;
alter table public.posts enable row level security;
create policy "public read published" on public.posts for select to anon, authenticated using (published = true);
create policy "admin read all" on public.posts for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin insert" on public.posts for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admin update" on public.posts for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete" on public.posts for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, project_name text, service text not null,
  deadline text, runtime text, music_link text, references_text text, description text not null,
  created_at timestamptz not null default now()
);
grant insert on public.inquiries to anon, authenticated;
grant select, delete on public.inquiries to authenticated;
grant all on public.inquiries to service_role;
alter table public.inquiries enable row level security;
create policy "anyone submit" on public.inquiries for insert to anon, authenticated with check (length(name) between 1 and 120 and length(email) between 3 and 255 and length(description) between 1 and 5000);
create policy "admin read inquiries" on public.inquiries for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete inquiries" on public.inquiries for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create policy "public read covers" on storage.objects for select using (bucket_id = 'blog-covers');
create policy "admin upload covers" on storage.objects for insert to authenticated with check (bucket_id = 'blog-covers' and public.has_role(auth.uid(),'admin'));
create policy "admin delete covers" on storage.objects for delete to authenticated using (bucket_id = 'blog-covers' and public.has_role(auth.uid(),'admin'));
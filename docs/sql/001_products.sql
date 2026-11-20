create table public.products (
  id bigint generated always as identity primary key,
  title text not null,
  price numeric(10,2) not null check (price >= 0),
  description text,
  category text not null,
  image text,
  stock int not null default 0 check (stock >= 0),
  created_at timestamptz not null default now()
);

-- Row Level Security: nobody can touch rows unless a policy allows it.
alter table public.products enable row level security;

-- "Automatically expose new tables" is off, so we grant access by hand.
-- For now: anyone can READ products. Writing comes later, for admins only.
grant select on public.products to anon, authenticated;

create policy "Anyone can read products"
  on public.products for select
  to anon, authenticated
  using (true);
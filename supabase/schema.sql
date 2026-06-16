-- NMCCOY Supabase schema (Phase 2)
-- Run in Supabase SQL editor when ready

create table site_settings (
  id int primary key default 1 check (id = 1),
  launch_date date not null default '2026-08-04',
  full_price_cents int not null default 30000,
  marquee_text text,
  updated_at timestamptz default now()
);

insert into site_settings (id) values (1);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  number_label text not null,
  description_short text,
  description_long text,
  painting_story text,
  gradient_css text,
  edition_size int not null default 40,
  inventory_remaining int not null default 40,
  shopify_variant_id text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0
);

create table email_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text,
  created_at timestamptz default now()
);

create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text not null,
  subject text,
  message text,
  created_at timestamptz default now()
);

alter table site_settings enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table email_signups enable row level security;
alter table contact_submissions enable row level security;

create policy "Public read published products"
  on products for select using (published = true);

create policy "Public read product images"
  on product_images for select using (true);

create policy "Public read site settings"
  on site_settings for select using (true);

create policy "Anyone can sign up for email"
  on email_signups for insert with check (true);

create policy "Anyone can submit contact"
  on contact_submissions for insert with check (true);

-- Admin policies: restrict writes to authenticated admin users (Phase 2)

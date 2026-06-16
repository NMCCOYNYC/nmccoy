# NMCCOY — Desert Illusions

Art-led luxury ecommerce site for [NMCCOY](https://github.com/NMCCOYNYC). Built from the `nmccoy-v2.html` prototype.

## Stack

- **Next.js 15** (App Router) — customer-facing site
- **Vercel** — deployment (Phase 2)
- **Supabase** — CMS, admin auth, inventory (Phase 2)
- **Shopify** — checkout & payments via Storefront API

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — Desert Illusions launch |
| `/collection` | Full 6-design collection grid |
| `/scarves/[slug]` | Individual product pages |
| `/about` | Our Story |
| `/process` | From ink to silk |
| `/impact` | Conservation & partners |
| `/contact` | Contact form |
| `/shipping` | Shipping & returns |
| `/terms` | Terms & conditions |
| `/admin` | Hidden admin (Phase 2) |

## Site modes

Removed — the site is purchase-only at $300 per scarf.

## Getting started

### 1. Install Xcode Command Line Tools (required on Mac)

```bash
xcode-select --install
```

### 2. Install Node.js

Download from [nodejs.org](https://nodejs.org) (LTS), or:

```bash
brew install node
```

### 3. Install dependencies & run

```bash
cd ~/Desktop/nmccoy
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Shopify setup

Your store: [admin.shopify.com/store/r10eg8-1u](https://admin.shopify.com/store/r10eg8-1u)

### 1. Create a Headless sales channel

1. In Shopify admin, go to **Sales channels** → **Headless**
2. Create a storefront (or use an existing one)
3. Copy the **Storefront API access token**

### 2. Add env vars

In `.env.local`:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=r10eg8-1u.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
```

Restart the dev server after changing env vars.

### 3. Create products in Shopify

For each scarf, create a product with handle matching the site slug (e.g. `wild-mirage`) at **$300**.

### 4. Wire variant IDs in `lib/products.ts`

Copy each variant ID from Shopify admin and add to the matching scarf:

```typescript
{
  slug: "wild-mirage",
  // ...
  shopifyVariantId: "12345678901234",
}
```

Alternatively, paste a direct checkout URL in `shopifyCheckoutUrl`.

## Supabase setup

Supabase stores contact form submissions and newsletter signups. Admin CMS auth is still Phase 2.

### 1. Create a project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Name it (e.g. `nmccoy`) and choose a region close to your customers
3. Save the database password somewhere secure

### 2. Run the database schema

1. In your project, open **SQL Editor** → **New query**
2. Paste the contents of `supabase/schema.sql` from this repo
3. Click **Run**

This creates tables for `contact_submissions`, `email_signups`, products (future CMS), and row-level security policies.

### 3. Copy API credentials

1. Go to **Project Settings** (gear icon) → **API**
2. Copy these into `.env.local` (never commit this file):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Use the **Project URL**, **anon public** key, and **service_role** key (keep service_role secret — server-only).

Restart the dev server after saving.

### 4. Verify

Submit the contact form at `/contact`. In Supabase, open **Table Editor** → `contact_submissions` to confirm the row appears.

## Coming soon mode

Keep the full site hidden while you finalize. Public visitors see a minimal landing page with Klaviyo email capture; the rest of the site is blocked.

### Enable in Vercel (or `.env.local`)

```bash
COMING_SOON=true
EARLY_ACCESS_SECRET=choose-a-long-random-string
```

Redeploy after saving.

### Public experience

Visitors to `www.nmccoynyc.com` see the Coming Soon page only. All other routes redirect to `/`.

### Preview the full site

Share this link with your team (replace the secret):

```
https://www.nmccoynyc.com/early-access?key=YOUR_SECRET
```

Opening that link sets a 30-day cookie and unlocks the full site. You can also use `?key=` on any URL.

### Launch

Set `COMING_SOON=false` in Vercel and redeploy to open the site publicly.

## Push to GitHub

```bash
cd ~/Desktop/nmccoy
git init
git add .
git commit -m "Initial NMCCOY site scaffold from Desert Illusions prototype"
git branch -M main
git remote add origin https://github.com/NMCCOYNYC/nmccoy.git
git push -u origin main
```

Create the repo first at [github.com/new](https://github.com/new) named `nmccoy` under **NMCCOYNYC**, or use GitHub CLI:

```bash
gh repo create NMCCOYNYC/nmccoy --public --source=. --push
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add env vars from `.env.example`
4. Deploy

## Phase 2 checklist

- [ ] Supabase project + run `supabase/schema.sql` + env vars in `.env.local` / Vercel
- [ ] Connect admin auth at `/admin`
- [ ] Upload real scarf photography
- [x] Shopify store connected (`r10eg8-1u.myshopify.com`)
- [ ] Create 6 scarf products in Shopify ($300 each)
- [ ] Add Shopify variant IDs to `lib/products.ts`

## Design

Palette: bone, cacao, clay, taupe · Fonts: Marcellus, Gowun Batang, Jost

Original prototype: `~/Downloads/nmccoy-v2.html`

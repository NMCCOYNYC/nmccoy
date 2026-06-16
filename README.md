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

- [ ] Supabase project + run `supabase/schema.sql`
- [ ] Connect admin auth at `/admin`
- [ ] Upload real scarf photography
- [x] Shopify store connected (`r10eg8-1u.myshopify.com`)
- [ ] Create 6 scarf products in Shopify ($300 each)
- [ ] Add Shopify variant IDs to `lib/products.ts`

## Design

Palette: bone, cacao, clay, taupe · Fonts: Marcellus, Gowun Batang, Jost

Original prototype: `~/Downloads/nmccoy-v2.html`

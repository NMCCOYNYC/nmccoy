# NMCCOY — Desert Illusions

Art-led luxury ecommerce site for [NMCCOY](https://github.com/NMCCOYNYC). Built from the `nmccoy-v2.html` prototype.

## Stack

- **Next.js 15** (App Router) — customer-facing site
- **Vercel** — deployment (Phase 2)
- **Supabase** — CMS, admin auth, inventory (Phase 2)
- **Shopify** — checkout & payments (Phase 2)

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

Set in `.env.local`:

```bash
NEXT_PUBLIC_SITE_MODE=preorder   # Reserve + $150 deposit UI
NEXT_PUBLIC_SITE_MODE=launch     # Full $300 purchase UI
```

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
- [ ] Shopify store + deposit/full product variants
- [ ] Wire checkout URLs in `lib/products.ts`

## Design

Palette: bone, cacao, clay, taupe · Fonts: Marcellus, Gowun Batang, Jost

Original prototype: `~/Downloads/nmccoy-v2.html`

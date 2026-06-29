# JFR Variasi Electrical — Digital Showroom

Premium digital showroom + CMS for an automotive electrical/variation workshop (Donomulyo, Malang). Next.js 16 (App Router), React 19, Tailwind v4, Firebase. Dark theme, red/white/black brand.

## Stack
Next.js · React 19 · TypeScript (strict) · Tailwind v4 · Framer Motion · Firebase (Auth/Firestore/Storage) · React Hook Form + Zod · Embla · lucide.

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill values
npm run dev
```

### Env (`.env.local`)
- `NEXT_PUBLIC_SITE_URL` — canonical origin (e.g. https://jfrvariasi.vercel.app)
- `NEXT_PUBLIC_FIREBASE_*` — web config (client SDK; admin UI + booking)
- `FIREBASE_SERVICE_ACCOUNT_KEY` — service-account JSON (raw or base64). Used for **server-side public reads** (SEO/speed). Until set, the public site renders sensible defaults.

Get the service account: Firebase console → Project settings → Service accounts → Generate new private key. Paste the JSON (single line) or its base64.

## Architecture
- **Public reads** — Admin SDK on the server (`lib/data`), wrapped so missing creds fall back to defaults.
- **Admin UI** — client SDK with realtime `onSnapshot` via the repository layer (`lib/firebase/repo.ts`). UI never touches Firestore directly.
- **Schemas** — single source of truth in `lib/schemas` (Zod); types are `z.infer`.
- **CRUD** — config-driven: one `CrudManager` + per-entity configs in `lib/admin/configs.ts`.
- Sorting/filtering done client-side → no Firestore composite indexes required.

## Admin (`/admin`)
Email/password login. Menus: Dashboard, Hero, Layanan, Portfolio, Kategori, Galeri, Instagram, TikTok, FAQ, Testimoni, Booking, SEO, Settings, Admin. All content realtime, no redeploy.

### First admin (bootstrap)
Rules only let admins write the `admins` collection, so seed the first one manually:
1. Create the owner user in Firebase console → Authentication (email/password).
2. In Firestore, add doc `admins/{UID}` = `{ email, role: "owner" }`.
3. Deploy rules (below).

## Firebase deploy
```bash
firebase deploy --only firestore:rules,storage:rules
```
Rules: `firestore.rules` (public read / admin write / public booking-create), `storage.rules` (public read / admin write).

## Social embeds
Owner pastes Instagram / TikTok URLs in admin. Rendered as official iframe embeds — no Meta/TikTok API.

## SEO
Per-portfolio canonical URLs, dynamic `sitemap.xml` + `robots.txt`, JSON-LD (AutoRepair / Article / BreadcrumbList), OpenGraph, Twitter Card.

## Scripts
```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
npm test         # node --test (parser unit tests)
```

## Deploy (Vercel)
Push to GitHub, import to Vercel, set the env vars above. Default domain: `jfrvariasi.vercel.app`.

## Docs
Planning artifacts in `docs/`: PRD, folder structure, Firestore schema, wireframe.

# JFR Technology — PRD (Part 1)

## 1. Product
Premium digital showroom for an automotive electrical workshop (mobil & motor variation/lighting). Not a generic company profile. Design bar: Apple / Porsche / Tesla.

Roles served:
- **Visitor** — browses showroom, portfolio, books via WhatsApp.
- **Owner/Admin** — edits 100% of content from `/admin`, realtime, no redeploy.

## 2. Goals
Company profile · Portfolio · Digital showroom · Lead generation · SEO machine. Lighthouse ≥ 95.

## 3. Brand
- Name: JFR Technology
- Tagline: *Upgrade Kendaraanmu Tanpa Kompromi*
- Language: Indonesian
- Theme: dark, black background, electric-blue accent, glassmorphism, smooth motion, premium.

## 4. Scope (Part 1)

### Public site
Homepage sections, in order: Hero Video → Trusted → Layanan → Kenapa JFR → Featured Portfolio → Vehicle Finder → Before/After → Gallery → TikTok → Instagram → Testimoni → Booking → FAQ → Maps → Footer.

Portfolio detail: own URL per item, e.g. `/portfolio/toyota-fortuner-biled`.

### Admin (`/admin`)
Auth: Firebase Auth (email/password, allowlisted admins). Menu: Dashboard, Hero, Layanan, Portfolio, Kategori, Galeri, Instagram, TikTok, FAQ, Testimoni, Booking, SEO, Settings, Admin. All edits realtime via Firestore.

### Booking
Form (Nama, Nomor HP, Jenis Kendaraan, Merk, Model, Keluhan, Tanggal) → generates WhatsApp message → opens `wa.me`. Also persisted to Firestore `bookings` for admin view.

### Social
Instagram & TikTok: owner pastes URL only. Site renders official embeds. **No Meta Graph API, no TikTok API.**

### SEO
Per-portfolio canonical URL. Generate `robots.txt`, `sitemap.xml` (dynamic from Firestore), JSON-LD (LocalBusiness + per-portfolio), OpenGraph, Twitter Card, canonical tags.

## 5. Tech
Next.js 15 App Router · React 19 · TypeScript (strict) · Tailwind v4 · shadcn/ui · Framer Motion · Firebase (Auth/Firestore/Storage) · React Hook Form · Zod · Lucide · Embla. Deploy: Vercel.

## 6. Architecture rules
- Server Components by default; Client Components only when interaction/state needed (forms, carousels, admin).
- Public reads: server-side Firestore (Admin SDK or cached client read) for SEO + speed. Admin: client SDK with realtime listeners.
- No JSON content files. All content from Firestore.
- Reusable components, no duplication, no file > ~300 lines.
- Strict TS, clean separation: `lib/` (firebase, data access, schemas), `components/`, `app/`.

## 7. Non-goals (Part 1)
Payments, multi-language, user accounts for visitors, blog. (Add later if a future part requires.)

## 8. Open decisions (confirm before build phase)
- Firebase project: new or existing? Need config keys.
- WhatsApp business number for `wa.me`.
- Public Firestore reads via Admin SDK (service account on Vercel) vs client SDK + security rules — recommend **Admin SDK for public reads** (best SEO/caching), client SDK for admin.

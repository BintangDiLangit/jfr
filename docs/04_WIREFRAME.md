# Wireframe (low-fi)

Dark bg `#000`, electric-blue accent, glass cards, generous spacing, fade/slide-in on scroll.

## Homepage

```
┌──────────────────────────────────────────────┐
│ [Logo JFR]            Layanan Portfolio  [WA] │  ← sticky glass header
├──────────────────────────────────────────────┤
│                                                │
│   HERO  (fullscreen video bg, dark overlay)    │
│   Upgrade Kendaraanmu Tanpa Kompromi           │
│   subheadline                                  │
│   [ Booking Sekarang ]  [ Lihat Portfolio ]    │
│                ▼ scroll                         │
├──────────────────────────────────────────────┤
│ TRUSTED   logo · logo · logo · logo (marquee)  │
├──────────────────────────────────────────────┤
│ LAYANAN                                         │
│  [icon] [icon] [icon] [icon]                   │  ← grid of glass cards
│  BiLED  Headlamp Foglamp ...                   │
├──────────────────────────────────────────────┤
│ KENAPA JFR                                      │
│  ✓ point   ✓ point   ✓ point                  │
├──────────────────────────────────────────────┤
│ FEATURED PORTFOLIO                              │
│  [card][card][card]  → /portfolio/[slug]       │
├──────────────────────────────────────────────┤
│ VEHICLE FINDER                                  │
│  [Mobil/Motor] [Merk ▾] [Model ▾] → filter     │
│  results grid                                  │
├──────────────────────────────────────────────┤
│ BEFORE / AFTER   ◐ draggable slider            │
├──────────────────────────────────────────────┤
│ GALLERY   masonry grid, lightbox               │
├──────────────────────────────────────────────┤
│ TIKTOK   embed carousel (Embla)                │
├──────────────────────────────────────────────┤
│ INSTAGRAM   embed grid                         │
├──────────────────────────────────────────────┤
│ TESTIMONI   carousel of glass quote cards      │
├──────────────────────────────────────────────┤
│ BOOKING                                         │
│  Nama / HP / Kendaraan / Merk / Model /        │
│  Keluhan / Tanggal   [ Kirim via WhatsApp ]    │
├──────────────────────────────────────────────┤
│ FAQ   accordion                                │
├──────────────────────────────────────────────┤
│ MAPS   embedded google map + address           │
├──────────────────────────────────────────────┤
│ FOOTER  logo · nav · socials · address · ©     │
└──────────────────────────────────────────────┘
```

## Portfolio detail `/portfolio/[slug]`
```
┌──────────────────────────────────────────────┐
│ Breadcrumb: Home / Portfolio / Title           │
│ TITLE   [Merk · Model · Kategori] [Featured]   │
│ ┌────────── gallery (Embla + lightbox) ──────┐ │
│ │  thumbnail / images / video                │ │
│ └────────────────────────────────────────────┘ │
│ Deskripsi (rich)                               │
│ Produk dipakai: chip chip chip                 │
│ Garansi: ...                                   │
│ [IG embed]  [TikTok embed]                     │
│ [ Booking layanan serupa via WhatsApp ]        │
│ Related portfolio (same category)              │
└──────────────────────────────────────────────┘
JSON-LD: Product/Service + BreadcrumbList. OG image = thumbnail.
```

## Admin shell `/admin`
```
┌───────────┬──────────────────────────────────┐
│ SIDEBAR   │  TOPBAR  [user]  [logout]          │
│ Dashboard │                                    │
│ Hero      │   CRUD area:                       │
│ Layanan   │   ┌──────────────────────────────┐ │
│ Portfolio │   │ [+ New]   search   filter    │ │
│ Kategori  │   │ table rows: edit / publish / │ │
│ Galeri    │   │   delete                     │ │
│ Instagram │   └──────────────────────────────┘ │
│ TikTok    │   Drawer/modal form (RHF + Zod)   │
│ FAQ       │   ImageUploader -> Storage         │
│ Testimoni │                                    │
│ Booking   │   Realtime: Firestore onSnapshot   │
│ SEO       │                                    │
│ Settings  │                                    │
│ Admin     │                                    │
└───────────┴──────────────────────────────────┘
```

Single-doc editors (Hero, Settings, SEO) = plain form, no table.
List editors (Layanan, Portfolio, Kategori, Galeri, IG, TikTok, FAQ, Testimoni) = table + form drawer.
Booking = read-only table + status update.

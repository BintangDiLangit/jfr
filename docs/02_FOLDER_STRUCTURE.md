# Folder Structure

```
jfr/
├─ app/
│  ├─ (public)/
│  │  ├─ layout.tsx              # dark theme, header/footer, fonts
│  │  ├─ page.tsx                # homepage (server) composes sections
│  │  └─ portfolio/
│  │     ├─ page.tsx             # portfolio listing
│  │     └─ [slug]/page.tsx      # portfolio detail (generateMetadata, JSON-LD)
│  ├─ admin/
│  │  ├─ layout.tsx              # auth guard + dashboard shell
│  │  ├─ page.tsx                # dashboard
│  │  ├─ hero/page.tsx
│  │  ├─ layanan/page.tsx
│  │  ├─ portfolio/page.tsx
│  │  ├─ kategori/page.tsx
│  │  ├─ galeri/page.tsx
│  │  ├─ instagram/page.tsx
│  │  ├─ tiktok/page.tsx
│  │  ├─ faq/page.tsx
│  │  ├─ testimoni/page.tsx
│  │  ├─ booking/page.tsx
│  │  ├─ seo/page.tsx
│  │  ├─ settings/page.tsx
│  │  ├─ admin/page.tsx          # manage admin allowlist
│  │  └─ login/page.tsx
│  ├─ api/
│  │  └─ revalidate/route.ts     # on-write revalidation (admin -> public)
│  ├─ robots.ts                  # next metadata route
│  ├─ sitemap.ts                 # dynamic from Firestore
│  ├─ layout.tsx                 # root (html, metadata defaults, OG)
│  └─ globals.css                # tailwind v4 + theme tokens
│
├─ components/
│  ├─ ui/                        # shadcn primitives
│  ├─ sections/                  # Hero, Trusted, Layanan, KenapaJFR, FeaturedPortfolio,
│  │                            #   VehicleFinder, BeforeAfter, Gallery, TikTokFeed,
│  │                            #   InstagramFeed, Testimoni, Booking, Faq, Maps, Footer
│  ├─ portfolio/                 # PortfolioCard, PortfolioGallery, etc.
│  ├─ admin/                     # CrudTable, FormFields, ImageUploader, AuthGuard
│  └─ common/                    # Container, SectionHeading, GlassCard, MotionWrap
│
├─ lib/
│  ├─ firebase/
│  │  ├─ client.ts               # client SDK init (admin UI)
│  │  ├─ admin.ts                # Admin SDK init (server reads, service account)
│  │  └─ collections.ts          # collection name constants + typed refs
│  ├─ data/                      # data-access fns per collection (getHero, getPortfolios...)
│  ├─ schemas/                   # Zod schemas (one per entity) — source of truth for types
│  ├─ wa.ts                      # WhatsApp message builder
│  ├─ embed.ts                   # IG/TikTok URL -> embed
│  └─ seo.ts                     # JSON-LD builders, metadata helpers
│
├─ types/                        # inferred from Zod (z.infer)
├─ public/
├─ docs/                         # PRD, schema, wireframe (this)
├─ firestore.rules
├─ storage.rules
└─ (config: next, tailwind, tsconfig, .env.local)
```

Notes:
- One Zod schema per entity in `lib/schemas/`; TS types are `z.infer<...>`. No duplicate type defs.
- `lib/data/` is the only place that touches Firestore for public reads (server). Admin pages use client SDK listeners directly via small hooks.
- Sections are dumb presentational; data fetched in `app/(public)/page.tsx` and passed down.

# Firestore Schema

Conventions: doc ids are auto unless noted. `order:number` for sortable lists. `published:boolean` gates public visibility. Timestamps via `serverTimestamp()`. Storage paths noted where relevant.

## `settings/site` (single doc)
```ts
{
  brandName: "JFR Technology",
  tagline: string,
  logoUrl: string,            // storage: logo/
  faviconUrl?: string,
  whatsappNumber: string,     // e.g. "628xxxx" (wa.me format)
  address: string,
  operatingHours?: string,
  mapsEmbedUrl: string,       // google maps embed src
  mapsLink: string,
  socials: { instagram?: string, tiktok?: string, youtube?: string },
  stats: { vehiclesHandled: number, yearsExperience: number,
           satisfaction: number, servicesCount: number },   // "Trusted" section
  whyJfr: { title: string, items: { icon: string, title: string, text: string }[] },
  heroCta?: { label: string, target: string },
  updatedAt
}
```

## `hero/main` (single doc)
```ts
{ videoUrl?: string, imageUrl?: string, headline: string, subheadline: string,
  ctaLabel: string, ctaTarget: string, updatedAt }
```

## `services` (Layanan)
```ts
{ title, slug, icon, description, order, published, updatedAt }
```

## `categories` (Kategori)
```ts
{ name, slug, type: "mobil" | "motor", order }
```

## `portfolio`
```ts
{
  title, slug,                 // slug unique -> /portfolio/[slug]
  categoryIds: string[],       // multi-category
  vehicleType: "mobil" | "motor",
  brand, model,
  thumbnailUrl,                // storage: portfolio/thumbnail/
  gallery: string[],           // storage: portfolio/gallery/
  videoUrl?,
  instagramUrls: string[], tiktokUrls: string[],
  description,                 // rich text / markdown
  productsUsed: string[],
  warranty?: string,
  featured: boolean,
  published: boolean,
  seoTitle?, seoDescription?,
  createdAt, updatedAt
}
```
Index: `published == true` + `createdAt`; `featured == true`; `vehicleType`/`brand` for Vehicle Finder; `array-contains categoryIds`.

## `beforeAfter`
```ts
{ title?, beforeUrl, afterUrl, order, published }
```

## `gallery` (Galeri)
```ts
{ imageUrl, caption?, order, published }
```

## `social_posts`  (Instagram + TikTok)
```ts
{ platform: "instagram" | "tiktok", url, order, published }
// owner pastes URL only; official embed rendered client-side. No API.
```

## `faq`
```ts
{ question, answer, order, published }
```

## `testimonials` (Testimoni)
```ts
{ name, vehicle?, rating: 1..5, text, photoUrl?, order, published }
```

## `bookings`
```ts
{ nama, phone, vehicleType, merk, model, keluhan, tanggal,
  status: "new" | "contacted" | "done",
  createdAt }
```
Created by public form (also fires WhatsApp). Admin-only read/update.

## `seo` (per-page overrides)
```ts
// doc id = page key: "home" | "portfolio" | ...
{ title, description, ogImageUrl?, canonical?, keywords?: string[] }
```

## `admins`
```ts
// doc id = uid
{ email, role: "owner" | "editor", createdAt }
```

---

## Security rules (intent — see firestore.rules)
- Public collections (`settings, hero, services, categories, portfolios, beforeAfter, gallery, instagram, tiktok, faq, testimonials, seo`): **read = public**, **write = admin only**.
- `bookings`: **create = public** (validated shape), **read/update/delete = admin only**.
- `admins`: read/write = admin only.
- `isAdmin()` = `exists(/databases/$(db)/documents/admins/$(request.auth.uid))`.

## Storage paths
`logo/ · hero/ · portfolio/thumbnail/ · portfolio/gallery/ · gallery/ · testimoni/ · trusted/`
Write = admin only; read = public.

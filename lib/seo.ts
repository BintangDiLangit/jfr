import type { Settings, Portfolio, WithId } from "@/lib/schemas";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jfrvariasi.vercel.app";

export function localBusinessJsonLd(s: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: s.brandName,
    description: s.tagline,
    url: SITE,
    image: s.logoUrl || undefined,
    address: { "@type": "PostalAddress", streetAddress: s.address },
    telephone: s.whatsappNumber,
    openingHours: s.operatingHours,
    sameAs: Object.values(s.socials).filter(Boolean),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.url}`,
    })),
  };
}

export function portfolioJsonLd(p: WithId<Portfolio>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.seoDescription || p.description.slice(0, 160),
    image: [p.thumbnailUrl, ...p.gallery].filter(Boolean),
    url: `${SITE}/portfolio/${p.slug}`,
    about: `${p.brand} ${p.model}`,
  };
}

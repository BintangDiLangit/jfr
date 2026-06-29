import type { MetadataRoute } from "next";
import { getPortfolioSlugs } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jfrvariasi.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPortfolioSlugs();
  const now = new Date();
  return [
    { url: SITE, lastModified: now, priority: 1 },
    { url: `${SITE}/portfolio`, lastModified: now, priority: 0.8 },
    ...slugs.map((slug) => ({
      url: `${SITE}/portfolio/${slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}

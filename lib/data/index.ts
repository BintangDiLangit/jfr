import "server-only";
import { COL, DOC } from "@/lib/firebase/collections";
import { DEFAULT_SETTINGS, DEFAULT_HERO } from "@/lib/data/defaults";
import type {
  Settings, Hero, Service, Category, Portfolio, BeforeAfter,
  Gallery, SocialPost, Faq, Testimonial, WithId,
} from "@/lib/schemas";

export { DEFAULT_SETTINGS, DEFAULT_HERO };

/**
 * Public reads via Admin SDK. Every fetch is wrapped so the site renders
 * empty/fallback content when Firebase creds are absent (local/CI before keys).
 *
 * Queries use a single `where` and sort in memory — avoids Firestore
 * composite-index requirements (which would otherwise fail silently here).
 */

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const { adminDb } = await import("@/lib/firebase/admin");
    void adminDb; // ensure init throws here if creds missing
    return await fn();
  } catch {
    return fallback;
  }
}

async function getDb() {
  const { adminDb } = await import("@/lib/firebase/admin");
  return adminDb;
}

/** Convert Firestore Timestamps (class instances) to millis so data is
 *  serializable across the Server→Client boundary. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPlain(v: any): any {
  if (v && typeof v.toMillis === "function") return v.toMillis();
  if (Array.isArray(v)) return v.map(toPlain);
  if (v && typeof v === "object" && (v.constructor === Object || !v.constructor)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o: any = {};
    for (const k in v) o[k] = toPlain(v[k]);
    return o;
  }
  return v;
}

function mapDocs<T>(snap: FirebaseFirestore.QuerySnapshot): WithId<T>[] {
  return snap.docs.map((d) => ({ id: d.id, ...(toPlain(d.data()) as T) }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const byOrder = (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0);
// createdAt is already millis (number) after toPlain; tolerate other shapes too.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const millis = (t: any) =>
  typeof t === "number" ? t : typeof t?.toMillis === "function" ? t.toMillis() : t?._seconds ? t._seconds * 1000 : 0;

export async function getSettings(): Promise<Settings> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.settings).doc(DOC.siteSettings).get();
    return snap.exists ? { ...DEFAULT_SETTINGS, ...(toPlain(snap.data()) as Settings) } : DEFAULT_SETTINGS;
  }, DEFAULT_SETTINGS);
}

export async function getHero(): Promise<Hero> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.hero).doc(DOC.hero).get();
    return snap.exists ? { ...DEFAULT_HERO, ...(toPlain(snap.data()) as Hero) } : DEFAULT_HERO;
  }, DEFAULT_HERO);
}

export async function getServices(): Promise<WithId<Service>[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.services).where("published", "==", true).get();
    return mapDocs<Service>(snap).sort(byOrder);
  }, []);
}

export async function getServiceBySlug(slug: string): Promise<WithId<Service> | null> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.services).where("slug", "==", slug).limit(1).get();
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...(d.data() as Service) };
  }, null);
}

export async function getServiceSlugs(): Promise<string[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.services).where("published", "==", true).get();
    return snap.docs.map((d) => (d.data() as Service).slug);
  }, []);
}

export async function getCategories(): Promise<WithId<Category>[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.categories).get();
    return mapDocs<Category>(snap).sort(byOrder);
  }, []);
}

/** Firestore docs skip fields left empty in the admin form; fill the array/
 *  string defaults the UI and SEO helpers assume are always present. */
function fillPortfolio(p: WithId<Portfolio>): WithId<Portfolio> {
  return {
    ...p,
    description: p.description ?? "",
    categoryIds: p.categoryIds ?? [],
    gallery: p.gallery ?? [],
    instagramUrls: p.instagramUrls ?? [],
    tiktokUrls: p.tiktokUrls ?? [],
    productsUsed: p.productsUsed ?? [],
  };
}

export async function getPortfolios(opts?: { featured?: boolean; limit?: number }): Promise<WithId<Portfolio>[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.portfolio).where("published", "==", true).get();
    let rows = mapDocs<Portfolio>(snap).map(fillPortfolio);
    if (opts?.featured) rows = rows.filter((r) => r.featured);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows.sort((a, b) => millis((b as any).createdAt) - millis((a as any).createdAt));
    return opts?.limit ? rows.slice(0, opts.limit) : rows;
  }, []);
}

export async function getPortfolioBySlug(slug: string): Promise<WithId<Portfolio> | null> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.portfolio).where("slug", "==", slug).limit(1).get();
    if (snap.empty) return null;
    const d = snap.docs[0];
    return fillPortfolio({ id: d.id, ...(toPlain(d.data()) as Portfolio) });
  }, null);
}

export async function getPortfolioSlugs(): Promise<string[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.portfolio).where("published", "==", true).get();
    return snap.docs.map((d) => (d.data() as Portfolio).slug);
  }, []);
}

export async function getBeforeAfter(): Promise<WithId<BeforeAfter>[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.beforeAfter).where("published", "==", true).get();
    return mapDocs<BeforeAfter>(snap).sort(byOrder);
  }, []);
}

export async function getGallery(): Promise<WithId<Gallery>[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.gallery).where("published", "==", true).get();
    return mapDocs<Gallery>(snap).sort(byOrder);
  }, []);
}

export async function getSocialPosts(platform: "instagram" | "tiktok"): Promise<WithId<SocialPost>[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.socialPosts).where("platform", "==", platform).get();
    return mapDocs<SocialPost>(snap).filter((p) => p.published).sort(byOrder);
  }, []);
}

export async function getFaqs(): Promise<WithId<Faq>[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.faq).where("published", "==", true).get();
    return mapDocs<Faq>(snap).sort(byOrder);
  }, []);
}

export async function getTestimonials(): Promise<WithId<Testimonial>[]> {
  return safe(async () => {
    const db = await getDb();
    const snap = await db.collection(COL.testimonials).where("published", "==", true).get();
    return mapDocs<Testimonial>(snap).sort(byOrder);
  }, []);
}

import { z } from "zod";

/** Source of truth: all entity shapes. Types via z.infer below. */

export const vehicleType = z.enum(["mobil", "motor"]);

export const settingsSchema = z.object({
  brandName: z.string().min(1),
  tagline: z.string(),
  logoUrl: z.string().url().or(z.literal("")),
  faviconUrl: z.string().url().optional(),
  whatsappNumber: z.string().min(8), // wa.me format e.g. 628xxxx
  address: z.string(),
  operatingHours: z.string().optional(),
  mapsEmbedUrl: z.string(),
  mapsLink: z.string().optional(),
  socials: z.object({
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
  }),
  stats: z.object({
    vehiclesHandled: z.number(),
    yearsExperience: z.number(),
    satisfaction: z.number(),
    servicesCount: z.number(),
  }),
  whyJfr: z.object({
    title: z.string(),
    items: z.array(
      z.object({ icon: z.string(), title: z.string(), text: z.string() }),
    ),
  }),
  heroCta: z
    .object({ label: z.string(), target: z.string() })
    .optional(),
});

export const heroSchema = z.object({
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  headline: z.string(),
  subheadline: z.string(),
  ctaLabel: z.string(),
  ctaTarget: z.string(),
});

export const serviceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  icon: z.string(),
  imageUrl: z.string().optional(),
  description: z.string(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  type: vehicleType,
  order: z.number().default(0),
});

export const portfolioSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  categoryIds: z.array(z.string()).default([]),
  vehicleType,
  brand: z.string(),
  model: z.string(),
  thumbnailUrl: z.string(),
  gallery: z.array(z.string()).default([]),
  videoUrl: z.string().optional(),
  instagramUrls: z.array(z.string()).default([]),
  tiktokUrls: z.array(z.string()).default([]),
  description: z.string(),
  productsUsed: z.array(z.string()).default([]),
  warranty: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const beforeAfterSchema = z.object({
  title: z.string().optional(),
  beforeUrl: z.string(),
  afterUrl: z.string(),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const gallerySchema = z.object({
  imageUrl: z.string(),
  caption: z.string().optional(),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const socialPostSchema = z.object({
  platform: z.enum(["instagram", "tiktok"]),
  url: z.string().url(),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  name: z.string().min(1),
  vehicle: z.string().optional(),
  rating: z.number().min(1).max(5),
  text: z.string().min(1),
  photoUrl: z.string().optional(),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).default([]),
  ogImageUrl: z.string().optional(),
  canonical: z.string().optional(),
});

/** Public booking form input (validated client + server). */
export const bookingFormSchema = z.object({
  nama: z.string().min(2, "Nama wajib diisi"),
  phone: z.string().min(8, "Nomor WhatsApp tidak valid"),
  vehicleType,
  brand: z.string().min(1, "Merk wajib diisi"),
  model: z.string().min(1, "Model wajib diisi"),
  keluhan: z.string().min(3, "Jelaskan keluhan"),
  tanggal: z.string().min(1, "Pilih tanggal"),
});

export type Settings = z.infer<typeof settingsSchema>;
export type Hero = z.infer<typeof heroSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type BeforeAfter = z.infer<typeof beforeAfterSchema>;
export type Gallery = z.infer<typeof gallerySchema>;
export type SocialPost = z.infer<typeof socialPostSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Seo = z.infer<typeof seoSchema>;
export type BookingForm = z.infer<typeof bookingFormSchema>;

/** Stored doc = schema + id + timestamps. */
export type WithId<T> = T & { id: string };

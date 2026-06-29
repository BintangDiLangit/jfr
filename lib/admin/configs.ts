import { COL } from "@/lib/firebase/collections";
import type { EntityConfig } from "@/components/admin/types";

const vehicleOpts = [
  { value: "mobil", label: "Mobil" },
  { value: "motor", label: "Motor" },
];

export const layananConfig: EntityConfig = {
  collection: COL.services,
  title: "Layanan",
  fields: [
    { key: "title", label: "Nama", type: "text", column: true, required: true },
    { key: "slug", label: "Slug", type: "slug", column: true },
    { key: "icon", label: "Icon (lucide name)", type: "text", placeholder: "lightbulb" },
    { key: "imageUrl", label: "Gambar", type: "image", folder: "services" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "featured", label: "Featured", type: "boolean", column: true },
    { key: "order", label: "Urutan", type: "number" },
    { key: "published", label: "Tampilkan", type: "boolean", column: true },
  ],
};

export const kategoriConfig: EntityConfig = {
  collection: COL.categories,
  title: "Kategori",
  fields: [
    { key: "name", label: "Nama", type: "text", column: true, required: true },
    { key: "slug", label: "Slug", type: "slug", column: true },
    { key: "type", label: "Jenis", type: "select", options: vehicleOpts, column: true },
    { key: "order", label: "Urutan", type: "number" },
  ],
};

export const portfolioConfig: EntityConfig = {
  collection: COL.portfolio,
  title: "Portfolio",
  fields: [
    { key: "title", label: "Judul", type: "text", column: true, required: true },
    { key: "slug", label: "Slug", type: "slug", column: true },
    { key: "vehicleType", label: "Jenis", type: "select", options: vehicleOpts, column: true },
    { key: "brand", label: "Merk", type: "text", column: true },
    { key: "model", label: "Model", type: "text" },
    { key: "categoryIds", label: "Kategori", type: "refs", refCollection: COL.categories },
    { key: "thumbnailUrl", label: "Thumbnail", type: "image", folder: "portfolio/thumbnail" },
    { key: "gallery", label: "Galeri", type: "images", folder: "portfolio/gallery" },
    { key: "videoUrl", label: "Video URL", type: "text" },
    { key: "instagramUrls", label: "Instagram URL", type: "tags" },
    { key: "tiktokUrls", label: "TikTok URL", type: "tags" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "productsUsed", label: "Produk Dipakai", type: "tags" },
    { key: "warranty", label: "Garansi", type: "text" },
    { key: "featured", label: "Featured", type: "boolean", column: true },
    { key: "published", label: "Published", type: "boolean", column: true },
    { key: "seoTitle", label: "SEO Title", type: "text" },
    { key: "seoDescription", label: "SEO Description", type: "textarea" },
  ],
};

export const galeriConfig: EntityConfig = {
  collection: COL.gallery,
  title: "Galeri",
  fields: [
    { key: "imageUrl", label: "Gambar", type: "image", folder: "gallery", column: true },
    { key: "caption", label: "Keterangan", type: "text", column: true },
    { key: "order", label: "Urutan", type: "number" },
    { key: "published", label: "Tampilkan", type: "boolean", column: true },
  ],
};

const socialFields = (platform: "instagram" | "tiktok"): EntityConfig["fields"] => [
  { key: "url", label: "URL", type: "text", column: true, required: true },
  { key: "platform", label: "Platform", type: "select", options: [{ value: platform, label: platform }] },
  { key: "order", label: "Urutan", type: "number" },
  { key: "published", label: "Tampilkan", type: "boolean", column: true },
];

export const instagramConfig: EntityConfig = {
  collection: COL.socialPosts, title: "Instagram",
  where: { field: "platform", value: "instagram" }, defaults: { platform: "instagram" },
  fields: socialFields("instagram"),
};
export const tiktokConfig: EntityConfig = {
  collection: COL.socialPosts, title: "TikTok",
  where: { field: "platform", value: "tiktok" }, defaults: { platform: "tiktok" },
  fields: socialFields("tiktok"),
};

export const faqConfig: EntityConfig = {
  collection: COL.faq,
  title: "FAQ",
  fields: [
    { key: "question", label: "Pertanyaan", type: "text", column: true, required: true },
    { key: "answer", label: "Jawaban", type: "textarea" },
    { key: "order", label: "Urutan", type: "number" },
    { key: "published", label: "Tampilkan", type: "boolean", column: true },
  ],
};

export const testimoniConfig: EntityConfig = {
  collection: COL.testimonials,
  title: "Testimoni",
  fields: [
    { key: "name", label: "Nama", type: "text", column: true, required: true },
    { key: "vehicle", label: "Kendaraan", type: "text", column: true },
    { key: "rating", label: "Rating (1-5)", type: "number", column: true },
    { key: "text", label: "Isi", type: "textarea" },
    { key: "photoUrl", label: "Foto", type: "image", folder: "testimonials" },
    { key: "order", label: "Urutan", type: "number" },
    { key: "published", label: "Tampilkan", type: "boolean", column: true },
  ],
};

export const adminConfig: EntityConfig = {
  collection: COL.admins,
  title: "Admin",
  fields: [
    { key: "email", label: "Email", type: "text", column: true, required: true },
    { key: "role", label: "Role", type: "select", column: true,
      options: [{ value: "owner", label: "Owner" }, { value: "editor", label: "Editor" }] },
  ],
};

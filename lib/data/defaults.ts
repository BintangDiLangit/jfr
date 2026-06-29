import type { Settings, Hero } from "@/lib/schemas";

/** Client-safe defaults (no server-only imports). */
export const DEFAULT_SETTINGS: Settings = {
  brandName: "JFR Variasi Electrical",
  tagline: "Upgrade Kendaraanmu Tanpa Kompromi",
  logoUrl: "",
  whatsappNumber: "6288994229661",
  address:
    "Jl. Raya Dawung, Kedungsalam Dua, Tempursari, Kec. Donomulyo, Kabupaten Malang, Jawa Timur 65167",
  operatingHours: "Senin–Sabtu, 08.00–17.00",
  mapsEmbedUrl: "https://maps.google.com/maps?q=JFR+Variasi+Donomulyo+Malang&z=15&output=embed",
  mapsLink: "https://share.google/H2HKtqKMVpiFeFRfd",
  socials: { instagram: "https://www.instagram.com/jfr.variasi" },
  stats: { vehiclesHandled: 1000, yearsExperience: 8, satisfaction: 99, servicesCount: 12 },
  whyJfr: {
    title: "Mengapa Memilih JFR",
    items: [
      { icon: "wrench", title: "Teknisi Berpengalaman", text: "Tim ahli kelistrikan mobil & motor." },
      { icon: "sparkles", title: "Instalasi Rapi", text: "Pengerjaan presisi tanpa potong sembarangan." },
      { icon: "shield-check", title: "Garansi Pengerjaan", text: "Jaminan hasil dan after-sales." },
      { icon: "badge-check", title: "Produk Berkualitas", text: "Komponen original & teruji." },
      { icon: "message-circle", title: "Konsultasi Gratis", text: "Diskusi kebutuhanmu tanpa biaya." },
      { icon: "map-pin", title: "Bisa Panggilan", text: "Layanan ke lokasi pelanggan." },
    ],
  },
};

/** Fallback service list (from spec) when Firestore has none. */
export const DEFAULT_SERVICES: { title: string; icon: string; slug: string; description?: string }[] = [
  { title: "BiLED Projector", icon: "lightbulb", slug: "biled-projector", description: "Upgrade pencahayaan terang & fokus dengan projector BiLED berkualitas." },
  { title: "Headlamp Upgrade", icon: "car-front", slug: "headlamp-upgrade", description: "Modifikasi headlamp tampil modern dan aman." },
  { title: "Foglamp", icon: "cloud-fog", slug: "foglamp", description: "Pemasangan foglamp untuk visibilitas optimal." },
  { title: "Ambient Light", icon: "sparkles", slug: "ambient-light", description: "Sentuhan ambient light interior premium." },
  { title: "Speedometer", icon: "gauge", slug: "speedometer", description: "Custom & servis speedometer digital, spesialis dark mode." },
  { title: "Audio", icon: "volume-2", slug: "audio", description: "Instalasi & upgrade audio mobil dan motor." },
  { title: "Custom Wiring", icon: "cable", slug: "custom-wiring", description: "Wiring rapi & aman sesuai kebutuhan." },
  { title: "Electrical Troubleshooting", icon: "zap", slug: "electrical-troubleshooting", description: "Diagnosa & perbaikan masalah kelistrikan." },
  { title: "Panggilan ke Lokasi", icon: "map-pin", slug: "panggilan", description: "Layanan datang ke lokasi pelanggan." },
];

export const DEFAULT_HERO: Hero = {
  headline: "Upgrade Kendaraanmu Tanpa Kompromi",
  subheadline:
    "Spesialis kelistrikan & variasi mobil dan motor — BiLED, Headlamp, Ambient, Speedometer, Audio, Custom Wiring.",
  ctaLabel: "Konsultasi via WhatsApp",
  ctaTarget: "#booking",
};

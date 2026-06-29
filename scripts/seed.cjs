/* Seed Firestore with JFR settings + sample content. Run: node scripts/seed.cjs */
const path = require("path");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const sa = require(path.join(__dirname, "..", "jfr-technology-firebase-adminsdk-fbsvc-43ea38b711.json"));

initializeApp({ credential: cert(sa) });
const db = getFirestore();
const now = FieldValue.serverTimestamp();
const img = (s) => `https://picsum.photos/seed/${s}/900/675`;

async function main() {
  // settings/site (real data)
  await db.collection("settings").doc("site").set({
    brandName: "JFR Variasi Electrical",
    tagline: "Upgrade Kendaraanmu Tanpa Kompromi",
    logoUrl: "",
    whatsappNumber: "6288994229661",
    address: "Jl. Raya Dawung, Kedungsalam Dua, Tempursari, Kec. Donomulyo, Kabupaten Malang, Jawa Timur 65167",
    operatingHours: "Senin–Sabtu, 08.00–17.00",
    mapsEmbedUrl: "https://maps.google.com/maps?q=JFR+Variasi+Donomulyo+Malang&z=15&output=embed",
    mapsLink: "https://share.google/H2HKtqKMVpiFeFRfd",
    socials: { instagram: "https://www.instagram.com/jfr.variasi" },
    stats: { vehiclesHandled: 1200, yearsExperience: 8, satisfaction: 99, servicesCount: 12 },
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
    updatedAt: now,
  }, { merge: true });

  // hero/main
  await db.collection("hero").doc("main").set({
    headline: "Upgrade Kendaraanmu Tanpa Kompromi",
    subheadline: "Spesialis kelistrikan & variasi mobil dan motor — BiLED, Headlamp, Ambient, Speedometer, Audio, Custom Wiring.",
    imageUrl: img("hero-jfr"),
    ctaLabel: "Konsultasi via WhatsApp",
    ctaTarget: "#booking",
    updatedAt: now,
  }, { merge: true });

  // services
  const services = [
    ["BiLED Projector", "biled-projector", "lightbulb", "Upgrade pencahayaan terang & fokus dengan projector BiLED berkualitas."],
    ["Headlamp Upgrade", "headlamp-upgrade", "car-front", "Modifikasi headlamp tampil modern dan aman."],
    ["Foglamp", "foglamp", "cloud-fog", "Pemasangan foglamp untuk visibilitas optimal."],
    ["Ambient Light", "ambient-light", "sparkles", "Sentuhan ambient light interior premium."],
    ["Speedometer", "speedometer", "gauge", "Custom & servis speedometer digital, spesialis dark mode."],
    ["Audio", "audio", "volume-2", "Instalasi & upgrade audio mobil dan motor."],
    ["Custom Wiring", "custom-wiring", "cable", "Wiring rapi & aman sesuai kebutuhan."],
    ["Electrical Troubleshooting", "electrical-troubleshooting", "zap", "Diagnosa & perbaikan masalah kelistrikan."],
    ["Panggilan ke Lokasi", "panggilan", "map-pin", "Layanan datang ke lokasi pelanggan."],
  ];
  await Promise.all(services.map(([title, slug, icon, description], i) =>
    db.collection("services").doc(slug).set({ title, slug, icon, description, featured: i < 4, order: i, published: true, createdAt: now, updatedAt: now }, { merge: true })));

  // categories
  const cats = [["BiLED", "biled", "mobil"], ["Speedometer", "speedometer", "motor"], ["Audio", "audio", "mobil"], ["Ambient", "ambient", "mobil"]];
  const catIds = {};
  await Promise.all(cats.map(async ([name, slug, type], i) => {
    const ref = db.collection("categories").doc(slug);
    await ref.set({ name, slug, type, order: i }, { merge: true });
    catIds[slug] = slug;
  }));

  // portfolio
  const portfolios = [
    { title: "Toyota Fortuner BiLED 3 Inch", slug: "toyota-fortuner-biled", vehicleType: "mobil", brand: "Toyota", model: "Fortuner", categoryIds: ["biled"], seed: "fortuner", desc: "Upgrade headlamp Fortuner dengan BiLED projector 3 inch. Terang maksimal, cut-off rapi, wiring aman.", products: ["BiLED Projector 3\"", "Ballast Canbus", "Angel Eyes"], featured: true },
    { title: "Honda Vario Speedometer Dark Mode", slug: "vario-speedometer-darkmode", vehicleType: "motor", brand: "Honda", model: "Vario", categoryIds: ["speedometer"], seed: "vario", desc: "Custom speedometer digital Vario tampil dark mode modern. Backlight custom, panel presisi.", products: ["Custom Panel", "LED Backlight"], featured: true },
    { title: "Brio Ambient Light + Audio", slug: "brio-ambient-audio", vehicleType: "mobil", brand: "Honda", model: "Brio", categoryIds: ["ambient", "audio"], seed: "brio", desc: "Paket ambient light interior + upgrade audio Brio. Nuansa premium, suara jernih.", products: ["Ambient RGB", "Speaker 2-Way", "Head Unit"], featured: true },
    { title: "Xpander Foglamp + DRL", slug: "xpander-foglamp-drl", vehicleType: "mobil", brand: "Mitsubishi", model: "Xpander", categoryIds: ["biled"], seed: "xpander", desc: "Pemasangan foglamp + DRL Xpander. Tampil gagah, fungsional di segala cuaca.", products: ["Foglamp LED", "DRL Sequential"], featured: false },
  ];
  await Promise.all(portfolios.map((p) =>
    db.collection("portfolio").doc(p.slug).set({
      title: p.title, slug: p.slug, vehicleType: p.vehicleType, brand: p.brand, model: p.model,
      categoryIds: p.categoryIds, thumbnailUrl: img(p.seed),
      gallery: [img(p.seed + "-1"), img(p.seed + "-2"), img(p.seed + "-3")],
      videoUrl: "", instagramUrls: [], tiktokUrls: [],
      description: p.desc, productsUsed: p.products, warranty: "Garansi pemasangan 30 hari",
      featured: p.featured, published: true,
      seoTitle: p.title + " | JFR Variasi", seoDescription: p.desc.slice(0, 150),
      createdAt: now, updatedAt: now,
    }, { merge: true })));

  // gallery
  await Promise.all([...Array(8)].map((_, i) =>
    db.collection("gallery").doc("g" + i).set({ imageUrl: img("gallery" + i), caption: "Dokumentasi pengerjaan", order: i, published: true, createdAt: now, updatedAt: now }, { merge: true })));

  // testimonials
  const tes = [
    ["Andi", "Toyota Fortuner", 5, "Hasil BiLED-nya terang banget, pengerjaan rapi. Recommended!"],
    ["Sari", "Honda Vario", 5, "Speedometer dark mode-nya keren, beda dari yang lain."],
    ["Budi", "Honda Brio", 4, "Ambient light + audio bikin interior makin premium. Mantap."],
  ];
  await Promise.all(tes.map(([name, vehicle, rating, text], i) =>
    db.collection("testimonials").doc("t" + i).set({ name, vehicle, rating, text, order: i, published: true, createdAt: now, updatedAt: now }, { merge: true })));

  // faq
  const faqs = [
    ["Apakah ada garansi pengerjaan?", "Ya. Setiap pemasangan bergaransi, detail menyesuaikan layanan."],
    ["Bisa panggilan ke lokasi?", "Bisa. Kami melayani panggilan ke lokasi pelanggan."],
    ["Berapa lama pengerjaan?", "Tergantung jenis layanan, dari beberapa jam hingga 1 hari."],
    ["Apakah melayani mobil dan motor?", "Ya, kami spesialis kelistrikan & variasi mobil maupun motor."],
  ];
  await Promise.all(faqs.map(([question, answer], i) =>
    db.collection("faq").doc("f" + i).set({ question, answer, order: i, published: true, createdAt: now, updatedAt: now }, { merge: true })));

  console.log("Seed selesai: settings, hero, 9 services, 4 categories, 4 portfolio, 8 gallery, 3 testimoni, 4 faq.");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });

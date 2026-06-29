# JFR CLAUDE MASTER PROMPT - PART 4
# Design System, Performance, SEO, Quality Standard

## OBJECTIVE
Website harus terasa seperti brand premium otomotif, bukan template company profile.

## DESIGN SYSTEM

### Warna
Background: #050505
Surface: #111111
Primary: Electric Blue
Text: White
Secondary Text: Gray

### Font
Heading: Space Grotesk
Body: Inter

### Radius
Gunakan rounded-xl hingga rounded-3xl.

### Shadow
Soft shadow, jangan berlebihan.

## COMPONENT RULES

Semua UI wajib reusable.

Komponen minimal:
- Button
- Card
- Section Heading
- Portfolio Card
- Service Card
- Testimonial Card
- FAQ Accordion
- Gallery Lightbox
- Vehicle Finder
- WhatsApp Floating Button
- Page Header

## ANIMATION

Gunakan Framer Motion.

Durasi:
0.3 - 0.6 detik.

Gunakan easing yang halus.

Animasi:
- Fade
- Slide
- Scale
- Stagger
- Reveal on scroll

Hormati prefers-reduced-motion.

## RESPONSIVE

Breakpoint:
Mobile
Tablet
Laptop
Desktop
Ultra Wide

Semua layout mobile-first.

## PERFORMANCE

Target:
- Lighthouse Performance >=95
- Accessibility >=95
- Best Practices >=95
- SEO >=100

Optimasi:
- next/image
- lazy loading
- code splitting
- dynamic import
- font optimization
- metadata API

## SEO

Setiap halaman memiliki:
- title unik
- meta description unik
- canonical
- Open Graph
- Twitter Card

Portfolio otomatis menghasilkan slug SEO friendly.

Tambahkan JSON-LD:
- LocalBusiness
- Breadcrumb
- Article (untuk portfolio)

## ACCESSIBILITY

Gunakan semantic HTML.

Semua gambar memiliki alt.

Keyboard navigation berfungsi.

Kontras warna memenuhi standar.

## CONVERSION

Selalu tampilkan CTA:
- Konsultasi WhatsApp
- Booking

Tambahkan trust signal:
- Garansi
- Pengalaman
- Portfolio
- Testimoni

## QUALITY CHECKLIST

Sebelum project selesai:

- Tidak ada any pada TypeScript
- Tidak ada console.log
- Tidak ada duplicate component
- Tidak ada dead code
- Semua route bekerja
- Semua form tervalidasi
- Semua gambar responsive
- Admin mudah digunakan
- Dokumentasi README lengkap

## FINAL INSTRUCTION

Jangan langsung coding seluruh project sekaligus.

Lakukan bertahap:

1. Analisis requirement
2. Susun rencana implementasi
3. Buat struktur project
4. Implementasikan foundation
5. Implementasikan halaman publik
6. Implementasikan admin
7. Integrasikan Firebase
8. Testing
9. Optimasi
10. Final review

# JFR CLAUDE MASTER PROMPT - PART 3
## Admin Dashboard & Firebase

Bangun admin modern menggunakan shadcn/ui. Hindari AdminLTE.

### Authentication
- Firebase Auth
- Email/password
- Protected route /admin
- Redirect jika belum login.

### Dashboard
Tampilkan:
- Total portfolio
- Total booking
- Total layanan
- Total testimoni
- Portfolio terbaru
- Booking terbaru

### Firestore Collections
settings
services
categories
portfolio
gallery
social_posts
testimonials
faq
bookings
admins

### Portfolio Document
title
slug
vehicleType
brand
model
categoryIds
thumbnail
gallery[]
videoUrl
instagramUrls[]
tiktokUrls[]
description
productsUsed[]
warranty
featured
published
seoTitle
seoDescription
createdAt
updatedAt

### Services
CRUD lengkap:
- nama
- icon
- image
- description
- featured

### Gallery
Upload multiple image
Drag & drop sorting
Delete
Featured

### Social
Paste URL Instagram/TikTok.
Render embed di frontend.

### Booking
Table:
Nama
WA
Kendaraan
Keluhan
Tanggal
Status
Tombol buka WhatsApp.

### Settings
Logo
Favicon
Alamat
Google Maps embed
WhatsApp
Jam operasional
Social media
Hero CTA

### SEO
Global SEO editor:
Title
Description
Keywords
OG Image

### Firebase Storage
/logo
/hero
/gallery
/portfolio
/testimonials

### Firestore Rules
Hanya admin boleh write.
Public read untuk konten website.
Booking boleh create tanpa login.

### Coding
Gunakan repository/service layer.
Jangan akses Firestore langsung dari UI bila bisa diabstraksi.
Gunakan TypeScript strict.

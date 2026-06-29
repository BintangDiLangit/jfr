import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jfrvariasi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JFR Variasi Electrical — Upgrade Kendaraanmu Tanpa Kompromi",
    template: "%s | JFR Variasi Electrical",
  },
  description:
    "Spesialis kelistrikan & variasi mobil dan motor: BiLED Projector, Headlamp Upgrade, Foglamp, Ambient Light, Speedometer, Audio, Custom Wiring.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "JFR Variasi Electrical",
    url: siteUrl,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

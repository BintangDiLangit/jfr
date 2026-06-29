import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone } from "lucide-react";
import { Container } from "@/components/common";
import type { Settings } from "@/lib/schemas";

export function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="border-t border-border bg-surface/40">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/logo-trim.png" alt={settings.brandName} width={434} height={67} className="h-9 w-auto" />
          <p className="mt-3 text-sm text-muted">{settings.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-muted">
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {settings.address}
          </p>
          {settings.operatingHours && (
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              {settings.operatingHours}
            </p>
          )}
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            {settings.whatsappNumber}
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <Link href="/portfolio" className="hover:text-foreground">Portfolio</Link>
          <Link href="/#layanan" className="hover:text-foreground">Layanan</Link>
          <Link href="/#booking" className="hover:text-foreground">Booking</Link>
        </nav>

        <div className="flex flex-col gap-2 text-sm text-muted">
          {settings.socials.instagram && (
            <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              Instagram
            </a>
          )}
          {settings.socials.tiktok && (
            <a href={settings.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              TikTok
            </a>
          )}
        </div>
      </Container>
      <Container className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {settings.brandName}. All rights reserved.
      </Container>
    </footer>
  );
}

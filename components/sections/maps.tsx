import { MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/common";
import type { Settings } from "@/lib/schemas";

export function Maps({ settings }: { settings: Settings }) {
  return (
    <Section id="lokasi">
      <SectionHeading eyebrow="Lokasi" title="Kunjungi Workshop Kami" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 text-sm text-muted">
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            {settings.address}
          </p>
          {settings.operatingHours && <p>{settings.operatingHours}</p>}
        </div>
        <div className="lg:col-span-2">
          {settings.mapsEmbedUrl ? (
            <iframe
              src={settings.mapsEmbedUrl}
              title="Lokasi JFR Technology"
              className="h-80 w-full rounded-2xl border border-border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-80 items-center justify-center rounded-2xl border border-border bg-surface/40 text-sm text-muted">
              Peta belum dikonfigurasi
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

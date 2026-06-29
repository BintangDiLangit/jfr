"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Section, SectionHeading } from "@/components/common";
import type { Gallery, WithId } from "@/lib/schemas";

export function GallerySection({ items }: { items: WithId<Gallery>[] }) {
  const [active, setActive] = useState<string | null>(null);
  if (!items.length) return null;

  return (
    <Section id="gallery">
      <SectionHeading eyebrow="Galeri" title="Dokumentasi Pengerjaan" />
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {items.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.imageUrl)}
            className="block w-full overflow-hidden rounded-xl border border-border"
          >
            <Image
              src={g.imageUrl}
              alt={g.caption ?? "Galeri JFR"}
              width={500}
              height={400}
              loading="lazy"
              className="h-auto w-full object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActive(null)}
        >
          <button className="absolute right-5 top-5 text-white" aria-label="Tutup">
            <X className="h-7 w-7" />
          </button>
          <Image src={active} alt="" width={1200} height={900} className="max-h-[90vh] w-auto object-contain" />
        </div>
      )}
    </Section>
  );
}

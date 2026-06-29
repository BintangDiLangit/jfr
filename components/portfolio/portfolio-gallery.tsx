"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function PortfolioGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState<string | null>(null);
  if (!images.length) return null;
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button key={i} onClick={() => setActive(src)} className="overflow-hidden rounded-xl border border-border">
            <Image
              src={src}
              alt={`${title} ${i + 1}`}
              width={500}
              height={400}
              loading="lazy"
              className="aspect-[4/3] h-auto w-full object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setActive(null)}>
          <button className="absolute right-5 top-5 text-white" aria-label="Tutup"><X className="h-7 w-7" /></button>
          <Image src={active} alt="" width={1400} height={1000} className="max-h-[90vh] w-auto object-contain" />
        </div>
      )}
    </>
  );
}

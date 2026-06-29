"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/common";
import type { Testimonial, WithId } from "@/lib/schemas";

export function Testimoni({ items }: { items: WithId<Testimonial>[] }) {
  const [ref] = useEmblaCarousel({ align: "start", loop: true });
  if (!items.length) return null;

  return (
    <Section id="testimoni" className="bg-surface/30">
      <SectionHeading eyebrow="Testimoni" title="Apa Kata Pelanggan" />
      <div className="overflow-hidden" ref={ref}>
        <div className="flex gap-5">
          {items.map((t) => (
            <figure key={t.id} className="min-w-0 shrink-0 basis-[90%] sm:basis-1/2 lg:basis-1/3">
              <div className="glass flex h-full flex-col rounded-2xl p-6">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill={i < t.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm text-foreground/90">“{t.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {t.photoUrl && (
                    <Image src={t.photoUrl} alt={t.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    {t.vehicle && <p className="text-xs text-muted">{t.vehicle}</p>}
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

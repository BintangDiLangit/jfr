"use client";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/common";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import type { Portfolio, WithId } from "@/lib/schemas";

export function FeaturedPortfolio({ items }: { items: WithId<Portfolio>[] }) {
  const [ref, embla] = useEmblaCarousel({ align: "start", loop: false });
  const scroll = useCallback((dir: -1 | 1) => {
    if (!embla) return;
    dir === 1 ? embla.scrollNext() : embla.scrollPrev();
  }, [embla]);

  if (!items.length) return null;

  return (
    <Section>
      <div className="flex items-end justify-between">
        <SectionHeading eyebrow="Portfolio" title="Hasil Pengerjaan Pilihan" className="mb-8" />
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => scroll(-1)} aria-label="Sebelumnya" className="glass rounded-full p-2 hover:bg-white/10">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Berikutnya" className="glass rounded-full p-2 hover:bg-white/10">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden" ref={ref}>
        <div className="flex gap-5">
          {items.map((it) => (
            <div key={it.id} className="min-w-0 shrink-0 basis-[85%] sm:basis-1/2 lg:basis-1/3">
              <PortfolioCard item={it} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

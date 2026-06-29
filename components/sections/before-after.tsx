"use client";
import { useState } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/common";
import type { BeforeAfter, WithId } from "@/lib/schemas";

function Slider({ item }: { item: WithId<BeforeAfter> }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-video select-none overflow-hidden rounded-2xl border border-border">
      <Image src={item.afterUrl} alt={item.title ?? "After"} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <Image src={item.beforeUrl} alt={item.title ?? "Before"} fill className="object-cover" sizes="100vw" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs">Before</span>
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-primary/80 px-3 py-1 text-xs">After</span>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="h-full w-0.5 -translate-x-1/2 bg-white" />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Geser before/after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export function BeforeAfterSection({ items }: { items: WithId<BeforeAfter>[] }) {
  if (!items.length) return null;
  return (
    <Section>
      <SectionHeading eyebrow="Before / After" title="Perbedaan Nyata" />
      <div className="grid gap-8 lg:grid-cols-2">
        {items.map((it) => (
          <div key={it.id}>
            <Slider item={it} />
            {it.title && <p className="mt-3 text-sm text-muted">{it.title}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

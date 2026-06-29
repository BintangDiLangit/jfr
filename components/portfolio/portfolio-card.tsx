import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Portfolio, WithId } from "@/lib/schemas";

export function PortfolioCard({ item }: { item: WithId<Portfolio> }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-surface/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {item.thumbnailUrl ? (
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-primary">
          {item.brand} · {item.model}
        </p>
        <h3 className="mt-1 flex items-center gap-1 font-semibold">
          {item.title}
          <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>
      </div>
    </Link>
  );
}

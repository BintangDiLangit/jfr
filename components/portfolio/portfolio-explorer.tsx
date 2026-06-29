"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { cn } from "@/lib/utils";
import type { Portfolio, Category, WithId } from "@/lib/schemas";

export function PortfolioExplorer({
  items,
  categories,
}: {
  items: WithId<Portfolio>[];
  categories: WithId<Category>[];
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((i) => {
      const matchCat = !cat || i.categoryIds.includes(cat) || i.vehicleType === cat;
      const matchQ = !term ||
        [i.title, i.brand, i.model].some((v) => v.toLowerCase().includes(term));
      return matchCat && matchQ;
    });
  }, [items, q, cat]);

  const chips = [
    { id: "", label: "Semua" },
    { id: "mobil", label: "Mobil" },
    { id: "motor", label: "Motor" },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.id || "all"}
              onClick={() => setCat(c.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                cat === c.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari kendaraan..."
            className="h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {results.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((it) => <PortfolioCard key={it.id} item={it} />)}
        </div>
      ) : (
        <p className="text-muted">Belum ada portfolio.</p>
      )}
    </div>
  );
}

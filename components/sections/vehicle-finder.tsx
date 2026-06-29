"use client";
import { useMemo, useState } from "react";
import { Section, SectionHeading } from "@/components/common";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import type { Portfolio, WithId } from "@/lib/schemas";

const selectCls =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-primary";

export function VehicleFinder({ items }: { items: WithId<Portfolio>[] }) {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const brands = useMemo(
    () => [...new Set(items.filter((i) => !type || i.vehicleType === type).map((i) => i.brand))].sort(),
    [items, type],
  );
  const models = useMemo(
    () => [...new Set(items.filter((i) => (!type || i.vehicleType === type) && (!brand || i.brand === brand)).map((i) => i.model))].sort(),
    [items, type, brand],
  );
  const results = useMemo(
    () =>
      items.filter(
        (i) =>
          (!type || i.vehicleType === type) &&
          (!brand || i.brand === brand) &&
          (!model || i.model === model),
      ),
    [items, type, brand, model],
  );

  if (!items.length) return null;

  return (
    <Section id="vehicle-finder" className="bg-surface/30">
      <SectionHeading
        eyebrow="Vehicle Finder"
        title="Cari Berdasarkan Kendaraanmu"
        description="Pilih jenis, merk, dan model untuk melihat portfolio terkait."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <select className={selectCls} value={type} onChange={(e) => { setType(e.target.value); setBrand(""); setModel(""); }}>
          <option value="">Semua Jenis</option>
          <option value="mobil">Mobil</option>
          <option value="motor">Motor</option>
        </select>
        <select className={selectCls} value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); }}>
          <option value="">Semua Merk</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className={selectCls} value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="">Semua Model</option>
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.length ? (
          results.map((it) => <PortfolioCard key={it.id} item={it} />)
        ) : (
          <p className="text-sm text-muted">Tidak ada portfolio yang cocok.</p>
        )}
      </div>
    </Section>
  );
}

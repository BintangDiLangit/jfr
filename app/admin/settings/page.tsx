"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";
import { getSingle, saveSingle } from "@/lib/firebase/repo";
import { COL, DOC } from "@/lib/firebase/collections";
import { DEFAULT_SETTINGS } from "@/lib/data/defaults";
import type { Settings } from "@/lib/schemas";

const input = "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-primary";

export default function SettingsPage() {
  const [s, setS] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSingle<Settings>(COL.settings, DOC.siteSettings)
      .then((d) => d && setS({ ...DEFAULT_SETTINGS, ...d }))
      .finally(() => setLoading(false));
  }, []);

  function patch(p: Partial<Settings>) { setS((v) => ({ ...v, ...p })); }

  async function save() {
    setBusy(true); setSaved(false);
    try { await saveSingle(COL.settings, DOC.siteSettings, s); setSaved(true); }
    finally { setBusy(false); }
  }

  if (loading) return <p className="text-muted">Memuat...</p>;

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-heading text-2xl font-bold">Settings</h1>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Brand</h2>
        <Field label="Nama Brand"><input className={input} value={s.brandName} onChange={(e) => patch({ brandName: e.target.value })} /></Field>
        <Field label="Tagline"><input className={input} value={s.tagline} onChange={(e) => patch({ tagline: e.target.value })} /></Field>
        <Field label="Logo"><ImageUploader folder="logo" value={s.logoUrl} onChange={(url) => patch({ logoUrl: url })} /></Field>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Kontak & Lokasi</h2>
        <Field label="WhatsApp (628...)"><input className={input} value={s.whatsappNumber} onChange={(e) => patch({ whatsappNumber: e.target.value })} /></Field>
        <Field label="Alamat"><textarea className={`${input} h-20 py-2`} value={s.address} onChange={(e) => patch({ address: e.target.value })} /></Field>
        <Field label="Jam Operasional"><input className={input} value={s.operatingHours ?? ""} onChange={(e) => patch({ operatingHours: e.target.value })} /></Field>
        <Field label="Google Maps Embed URL"><input className={input} value={s.mapsEmbedUrl} onChange={(e) => patch({ mapsEmbedUrl: e.target.value })} /></Field>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Social Media</h2>
        <Field label="Instagram URL"><input className={input} value={s.socials.instagram ?? ""} onChange={(e) => patch({ socials: { ...s.socials, instagram: e.target.value } })} /></Field>
        <Field label="TikTok URL"><input className={input} value={s.socials.tiktok ?? ""} onChange={(e) => patch({ socials: { ...s.socials, tiktok: e.target.value } })} /></Field>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Statistik (Trusted)</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Kendaraan Ditangani"><input type="number" className={input} value={s.stats.vehiclesHandled} onChange={(e) => patch({ stats: { ...s.stats, vehiclesHandled: Number(e.target.value) } })} /></Field>
          <Field label="Tahun Pengalaman"><input type="number" className={input} value={s.stats.yearsExperience} onChange={(e) => patch({ stats: { ...s.stats, yearsExperience: Number(e.target.value) } })} /></Field>
          <Field label="Tingkat Kepuasan (%)"><input type="number" className={input} value={s.stats.satisfaction} onChange={(e) => patch({ stats: { ...s.stats, satisfaction: Number(e.target.value) } })} /></Field>
          <Field label="Jumlah Layanan"><input type="number" className={input} value={s.stats.servicesCount} onChange={(e) => patch({ stats: { ...s.stats, servicesCount: Number(e.target.value) } })} /></Field>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Kenapa JFR</h2>
          <button className="text-sm text-primary"
            onClick={() => patch({ whyJfr: { ...s.whyJfr, items: [...s.whyJfr.items, { icon: "sparkles", title: "", text: "" }] } })}>
            <Plus className="inline h-4 w-4" /> Tambah
          </button>
        </div>
        {s.whyJfr.items.map((it, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2">
            <input className={input} placeholder="icon" value={it.icon} onChange={(e) => updateItem(s, patch, i, { icon: e.target.value })} />
            <input className={input} placeholder="judul" value={it.title} onChange={(e) => updateItem(s, patch, i, { title: e.target.value })} />
            <input className={input} placeholder="teks" value={it.text} onChange={(e) => updateItem(s, patch, i, { text: e.target.value })} />
            <button onClick={() => patch({ whyJfr: { ...s.whyJfr, items: s.whyJfr.items.filter((_, j) => j !== i) } })}
              className="text-muted hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </section>

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={busy}>{busy ? "Menyimpan..." : "Simpan"}</Button>
        {saved && <span className="text-sm text-primary">Tersimpan ✓</span>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function updateItem(
  s: Settings,
  patch: (p: Partial<Settings>) => void,
  i: number,
  p: Partial<Settings["whyJfr"]["items"][number]>,
) {
  patch({ whyJfr: { ...s.whyJfr, items: s.whyJfr.items.map((it, j) => (j === i ? { ...it, ...p } : it)) } });
}

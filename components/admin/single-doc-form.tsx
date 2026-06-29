"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldInput } from "@/components/admin/field-input";
import { getSingle, saveSingle } from "@/lib/firebase/repo";
import type { Field } from "@/components/admin/types";

/** Editor for a single Firestore document (hero/main, seo/home, ...). */
export function SingleDocForm({
  collection, docId, title, fields,
}: { collection: string; docId: string; title: string; fields: Field[] }) {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSingle<Record<string, unknown>>(collection, docId)
      .then((d) => setForm(d ?? {}))
      .finally(() => setLoading(false));
  }, [collection, docId]);

  async function save() {
    setBusy(true);
    setSaved(false);
    try {
      await saveSingle(collection, docId, form);
      setSaved(true);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <p className="text-muted">Memuat...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 font-heading text-2xl font-bold">{title}</h1>
      <div className="space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            {f.type !== "boolean" && <label className="mb-1.5 block text-sm font-medium">{f.label}</label>}
            <FieldInput field={f} value={form[f.key]} onChange={(v) => setForm((s) => ({ ...s, [f.key]: v }))} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3">
        <Button onClick={save} disabled={busy}>{busy ? "Menyimpan..." : "Simpan"}</Button>
        {saved && <span className="text-sm text-primary">Tersimpan ✓</span>}
      </div>
    </div>
  );
}

"use client";
import { useCollection } from "@/components/admin/use-collection";
import { ImageUploader, MultiImageUploader } from "@/components/admin/image-uploader";
import type { Field } from "@/components/admin/types";

const base = "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-primary";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FieldInput({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  switch (field.type) {
    case "textarea":
      return <textarea className={`${base} h-28 py-3`} placeholder={field.placeholder} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return <input type="number" className={base} value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />;
    case "boolean":
      return (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
          {field.label}
        </label>
      );
    case "date":
      return <input type="date" className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "slug":
      return (
        <input className={base} placeholder="auto dari judul" value={value ?? ""}
               onChange={(e) => onChange(slugify(e.target.value))} />
      );
    case "select":
      return (
        <select className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>Pilih...</option>
          {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    case "tags":
      return (
        <input className={base} placeholder="pisahkan dengan koma"
               value={Array.isArray(value) ? value.join(", ") : ""}
               onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
      );
    case "image":
      return <ImageUploader folder={field.folder ?? "misc"} value={value} onChange={onChange} />;
    case "images":
      return <MultiImageUploader folder={field.folder ?? "misc"} value={value} onChange={onChange} />;
    case "refs":
      return <RefsInput field={field} value={value ?? []} onChange={onChange} />;
    default:
      return <input className={base} placeholder={field.placeholder} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  }
}

function RefsInput({ field, value, onChange }: { field: Field; value: string[]; onChange: (v: string[]) => void }) {
  const { rows } = useCollection<{ name: string }>(field.refCollection!);
  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  }
  if (!rows.length) return <p className="text-xs text-muted">Belum ada data {field.refCollection}.</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {rows.map((r) => (
        <button type="button" key={r.id} onClick={() => toggle(r.id)}
          className={`rounded-full border px-3 py-1 text-xs ${value.includes(r.id) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"}`}>
          {r.name}
        </button>
      ))}
    </div>
  );
}

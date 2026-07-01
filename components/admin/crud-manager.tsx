"use client";
import { useMemo, useState } from "react";
import { where } from "firebase/firestore";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/components/admin/use-collection";
import { FieldInput } from "@/components/admin/field-input";
import { create, update, remove, type Doc } from "@/lib/firebase/repo";
import type { EntityConfig } from "@/components/admin/types";

// Purge the static page cache so public pages reflect the write immediately.
const revalidate = () => fetch("/api/revalidate", { method: "POST" }).catch(() => {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Doc<Record<string, any>>;

export function CrudManager({ config }: { config: EntityConfig }) {
  const constraints = config.where ? [where(config.where.field, "==", config.where.value)] : [];
  const { rows: raw, loading } = useCollection<Row>(config.collection, constraints);
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);

  const sortBy = config.sortBy ?? "order";
  const rows = useMemo(
    () => [...raw].sort((a, b) => (a[sortBy] ?? 0) - (b[sortBy] ?? 0)),
    [raw, sortBy],
  );

  const columns = config.fields.filter((f) => f.column);

  function startNew() { setEditing({ id: "", ...(config.defaults ?? {}) } as Row); setOpen(true); }
  function startEdit(r: Row) { setEditing(r); setOpen(true); }

  async function onDelete(id: string) {
    if (!confirm("Hapus item ini?")) return;
    await remove(config.collection, id);
    await revalidate();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">{config.title}</h1>
        <Button size="sm" onClick={startNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      {loading ? (
        <p className="text-muted">Memuat...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-muted">
              <tr>
                {columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>)}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  {columns.map((c) => (
                    <td key={c.key} className="max-w-xs truncate px-4 py-3">{renderCell(r[c.key])}</td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(r)} className="text-muted hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => onDelete(r.id)} className="text-muted hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-muted">Belum ada data.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {open && editing && (
        <EditDrawer config={config} row={editing} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCell(v: any) {
  if (typeof v === "boolean") return v ? "Ya" : "—";
  if (Array.isArray(v)) return `${v.length} item`;
  return String(v ?? "—");
}

function EditDrawer({ config, row, onClose }: { config: EntityConfig; row: Row; onClose: () => void }) {
  const [form, setForm] = useState<Row>(row);
  const [busy, setBusy] = useState(false);
  const isNew = !row.id;

  function set(key: string, v: unknown) { setForm((f) => ({ ...f, [key]: v })); }

  async function save() {
    setBusy(true);
    try {
      // auto-slug from title/name if slug empty
      const { id: _id, ...data } = form;
      void _id;
      const slugField = config.fields.find((f) => f.type === "slug");
      if (slugField && !data[slugField.key]) {
        const src = data.title ?? data.name ?? "";
        data[slugField.key] = String(src).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
      if (isNew) await create(config.collection, data);
      else await update(config.collection, row.id, data);
      await revalidate();
      onClose();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={onClose}>
      <div className="h-full w-full max-w-lg overflow-y-auto border-l border-border bg-background p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold">{isNew ? "Tambah" : "Edit"} {config.title}</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-5">
          {config.fields.map((f) => (
            <div key={f.key}>
              {f.type !== "boolean" && <label className="mb-1.5 block text-sm font-medium">{f.label}</label>}
              <FieldInput field={f} value={form[f.key]} onChange={(v) => set(f.key, v)} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Button onClick={save} disabled={busy} className="flex-1">{busy ? "Menyimpan..." : "Simpan"}</Button>
          <Button variant="outline" onClick={onClose}>Batal</Button>
        </div>
      </div>
    </div>
  );
}

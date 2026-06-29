"use client";
import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryReady = Boolean(CLOUD && PRESET);

const urlInput = "h-9 w-full rounded-lg border border-border bg-surface px-3 text-xs outline-none focus:border-primary";

/** Upload to Cloudinary (unsigned). Free tier, no Firebase Storage needed. */
async function uploadToCloudinary(folder: string, file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", PRESET!);
  fd.append("folder", `jfr/${folder}`);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Upload gagal");
  const data = await res.json();
  return data.secure_url as string;
}

function Thumb({ url, onRemove }: { url: string; onRemove: () => void }) {
  return (
    <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-border">
      <Image src={url} alt="" fill className="object-cover" sizes="80px" />
      <button type="button" onClick={onRemove} className="absolute right-1 top-1 rounded-full bg-black/70 p-0.5">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

function UploadBox({ busy, onPick, multiple }: { busy: boolean; onPick: (f: FileList) => void; multiple?: boolean }) {
  if (!cloudinaryReady) return null;
  return (
    <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border border-dashed border-border text-muted hover:border-primary">
      {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
      <input type="file" accept="image/*" multiple={multiple} className="hidden"
             onChange={(e) => e.target.files && onPick(e.target.files)} />
    </label>
  );
}

export function ImageUploader({
  folder, value, onChange,
}: { folder: string; value?: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  async function pick(files: FileList) {
    setBusy(true);
    try { onChange(await uploadToCloudinary(folder, files[0])); } catch { /* ignore */ } finally { setBusy(false); }
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        {value ? <Thumb url={value} onRemove={() => onChange("")} /> : <UploadBox busy={busy} onPick={pick} />}
      </div>
      <input className={urlInput} placeholder="atau tempel URL gambar" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function MultiImageUploader({
  folder, value = [], onChange,
}: { folder: string; value?: string[]; onChange: (urls: string[]) => void }) {
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  async function pick(files: FileList) {
    setBusy(true);
    try {
      const urls = await Promise.all(Array.from(files).map((f) => uploadToCloudinary(folder, f)));
      onChange([...value, ...urls]);
    } catch { /* ignore */ } finally { setBusy(false); }
  }
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        {value.map((url) => <Thumb key={url} url={url} onRemove={() => onChange(value.filter((u) => u !== url))} />)}
        <UploadBox busy={busy} onPick={pick} multiple />
      </div>
      <div className="flex gap-2">
        <input className={urlInput} placeholder="atau tempel URL gambar lalu Enter" value={draft}
               onChange={(e) => setDraft(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === "Enter" && draft.trim()) {
                   e.preventDefault();
                   onChange([...value, draft.trim()]);
                   setDraft("");
                 }
               }} />
      </div>
    </div>
  );
}

"use client";
import { SingleDocForm } from "@/components/admin/single-doc-form";
import { COL, DOC } from "@/lib/firebase/collections";
import type { Field } from "@/components/admin/types";

const fields: Field[] = [
  { key: "headline", label: "Headline", type: "text" },
  { key: "subheadline", label: "Subheadline", type: "textarea" },
  { key: "videoUrl", label: "Video URL", type: "text" },
  { key: "imageUrl", label: "Gambar (poster/fallback)", type: "image", folder: "hero" },
  { key: "ctaLabel", label: "CTA Label", type: "text" },
  { key: "ctaTarget", label: "CTA Target", type: "text", placeholder: "#booking" },
];

export default function Page() {
  return <SingleDocForm collection={COL.hero} docId={DOC.hero} title="Hero" fields={fields} />;
}

"use client";
import { SingleDocForm } from "@/components/admin/single-doc-form";
import { COL } from "@/lib/firebase/collections";
import type { Field } from "@/components/admin/types";

const fields: Field[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "keywords", label: "Keywords", type: "tags" },
  { key: "ogImageUrl", label: "OG Image", type: "image", folder: "seo" },
];

export default function Page() {
  return <SingleDocForm collection={COL.seo} docId="home" title="SEO (Global)" fields={fields} />;
}

"use client";
import { CrudManager } from "@/components/admin/crud-manager";
import { kategoriConfig } from "@/lib/admin/configs";

export default function Page() {
  return <CrudManager config={kategoriConfig} />;
}

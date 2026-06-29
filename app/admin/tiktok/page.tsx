"use client";
import { CrudManager } from "@/components/admin/crud-manager";
import { tiktokConfig } from "@/lib/admin/configs";

export default function Page() {
  return <CrudManager config={tiktokConfig} />;
}

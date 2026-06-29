"use client";
import { CrudManager } from "@/components/admin/crud-manager";
import { testimoniConfig } from "@/lib/admin/configs";

export default function Page() {
  return <CrudManager config={testimoniConfig} />;
}

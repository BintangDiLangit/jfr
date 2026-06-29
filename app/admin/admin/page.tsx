"use client";
import { CrudManager } from "@/components/admin/crud-manager";
import { adminConfig } from "@/lib/admin/configs";

export default function Page() {
  return <CrudManager config={adminConfig} />;
}

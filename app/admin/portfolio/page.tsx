"use client";
import { CrudManager } from "@/components/admin/crud-manager";
import { portfolioConfig } from "@/lib/admin/configs";

export default function Page() {
  return <CrudManager config={portfolioConfig} />;
}

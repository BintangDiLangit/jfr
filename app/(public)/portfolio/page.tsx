import type { Metadata } from "next";
import { getPortfolios, getCategories } from "@/lib/data";
import { Section, SectionHeading } from "@/components/common";
import { PortfolioExplorer } from "@/components/portfolio/portfolio-explorer";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Galeri hasil pengerjaan kelistrikan & variasi mobil dan motor oleh JFR Technology.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([getPortfolios({ limit: 200 }), getCategories()]);
  return (
    <Section>
      <SectionHeading eyebrow="Portfolio" title="Hasil Pengerjaan Kami" />
      <PortfolioExplorer items={items} categories={categories} />
    </Section>
  );
}

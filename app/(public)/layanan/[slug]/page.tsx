import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getServiceBySlug, getServiceSlugs, getPortfolios, getSettings, getFaqs } from "@/lib/data";
import { DEFAULT_SERVICES } from "@/lib/data/defaults";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/components/common";
import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { consultLink } from "@/lib/wa";

export const revalidate = 3600;

async function resolve(slug: string) {
  const fromDb = await getServiceBySlug(slug);
  if (fromDb) return { title: fromDb.title, description: fromDb.description, icon: fromDb.icon };
  const fallback = DEFAULT_SERVICES.find((s) => s.slug === slug);
  return fallback ? { title: fallback.title, description: fallback.description ?? "", icon: fallback.icon } : null;
}

export async function generateStaticParams() {
  const dbSlugs = await getServiceSlugs();
  const slugs = new Set([...dbSlugs, ...DEFAULT_SERVICES.map((s) => s.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = await resolve(slug);
  if (!svc) return {};
  return {
    title: svc.title,
    description: svc.description.slice(0, 160),
    alternates: { canonical: `/layanan/${slug}` },
  };
}

export default async function LayananDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [svc, settings, related, faqs] = await Promise.all([
    resolve(slug), getSettings(), getPortfolios({ limit: 3 }), getFaqs(),
  ]);
  if (!svc) notFound();

  return (
    <article className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Layanan", url: "/#layanan" },
            { name: svc.title, url: `/layanan/${slug}` },
          ])),
        }}
      />
      <Container>
        <nav className="flex items-center gap-1 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/#layanan" className="hover:text-foreground">Layanan</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{svc.title}</span>
        </nav>

        <header className="mt-8 flex items-center gap-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon name={svc.icon} className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{svc.title}</h1>
        </header>

        <p className="mt-6 max-w-2xl whitespace-pre-line text-muted">{svc.description}</p>

        <div className="mt-8">
          <a href={consultLink(settings.whatsappNumber, `Halo JFR, saya mau konsultasi layanan ${svc.title}.`)}
             target="_blank" rel="noopener noreferrer">
            <Button size="lg">Konsultasi Layanan Ini</Button>
          </a>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold">Portfolio Terkait</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <PortfolioCard key={r.id} item={r} />)}
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="mt-16 max-w-3xl">
            <h2 className="mb-4 text-xl font-semibold">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.id} className="rounded-2xl border border-border bg-surface/40 p-5">
                  <summary className="cursor-pointer font-medium">{f.question}</summary>
                  <p className="mt-3 text-sm text-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}

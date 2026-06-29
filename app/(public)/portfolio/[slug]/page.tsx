import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { getPortfolioBySlug, getPortfolioSlugs, getPortfolios, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, portfolioJsonLd } from "@/lib/seo";
import { instagramEmbedUrl, tiktokVideoId } from "@/lib/embed";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { consultLink } from "@/lib/wa";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPortfolioSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPortfolioBySlug(slug);
  if (!p) return {};
  const title = p.seoTitle || p.title;
  const description = p.seoDescription || p.description.slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${p.slug}` },
    openGraph: { title, description, images: p.thumbnailUrl ? [p.thumbnailUrl] : [] },
  };
}

export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [p, settings] = await Promise.all([getPortfolioBySlug(slug), getSettings()]);
  if (!p) notFound();

  const related = (await getPortfolios({ limit: 4 })).filter((r) => r.id !== p.id).slice(0, 3);
  const igId = p.instagramUrls[0];
  const ttId = p.tiktokUrls[0] ? tiktokVideoId(p.tiktokUrls[0]) : null;

  return (
    <article className="py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd(p)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Portfolio", url: "/portfolio" },
              { name: p.title, url: `/portfolio/${p.slug}` },
            ]),
          ),
        }}
      />
      <Container>
        <nav className="flex items-center gap-1 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/portfolio" className="hover:text-foreground">Portfolio</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{p.title}</span>
        </nav>

        <header className="mt-6">
          <p className="text-sm uppercase tracking-wider text-primary">
            {p.vehicleType} · {p.brand} {p.model}
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{p.title}</h1>
        </header>

        {p.thumbnailUrl && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
            <Image src={p.thumbnailUrl} alt={p.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="text-xl font-semibold">Cerita Pengerjaan</h2>
              <p className="mt-3 whitespace-pre-line text-muted">{p.description}</p>
            </section>

            {p.gallery.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold">Galeri</h2>
                <PortfolioGallery images={p.gallery} title={p.title} />
              </section>
            )}

            {p.videoUrl && (
              <section>
                <h2 className="mb-4 text-xl font-semibold">Video</h2>
                <video src={p.videoUrl} controls className="w-full rounded-2xl border border-border" />
              </section>
            )}

            {(igId || ttId) && (
              <section className="grid gap-6 sm:grid-cols-2">
                {igId && (
                  <iframe src={instagramEmbedUrl(igId)} title="Instagram" loading="lazy"
                          className="h-[480px] w-full rounded-2xl border border-border bg-white" />
                )}
                {ttId && (
                  <iframe src={`https://www.tiktok.com/embed/v2/${ttId}`} title="TikTok" loading="lazy"
                          allow="encrypted-media" className="h-[600px] w-full rounded-2xl border border-border" />
                )}
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="glass rounded-2xl p-6">
              {p.productsUsed.length > 0 && (
                <>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Produk Dipakai</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.productsUsed.map((pr) => (
                      <span key={pr} className="rounded-full border border-border px-3 py-1 text-xs">{pr}</span>
                    ))}
                  </div>
                </>
              )}
              {p.warranty && (
                <p className="mt-5 flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Garansi: {p.warranty}
                </p>
              )}
              <a href={consultLink(settings.whatsappNumber, `Halo JFR, saya tertarik dengan pengerjaan "${p.title}".`)}
                 target="_blank" rel="noopener noreferrer" className="mt-6 block">
                <Button className="w-full" size="lg">Konsultasi Layanan Serupa</Button>
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold">Portfolio Lainnya</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <PortfolioCard key={r.id} item={r} />)}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}

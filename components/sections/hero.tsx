import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common";
import { consultLink } from "@/lib/wa";
import type { Hero as HeroData } from "@/lib/schemas";

export function Hero({ data, whatsappNumber }: { data: HeroData; whatsappNumber: string }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* media background */}
      <div className="absolute inset-0 -z-10">
        {data.videoUrl ? (
          <video
            className="h-full w-full object-cover"
            src={data.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster={data.imageUrl}
          />
        ) : data.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-surface to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      </div>

      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">{data.headline}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{data.subheadline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={consultLink(whatsappNumber)} target="_blank" rel="noopener noreferrer">
              <Button size="lg">{data.ctaLabel}</Button>
            </a>
            <Link href="/portfolio">
              <Button size="lg" variant="glass">Lihat Portfolio</Button>
            </Link>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}

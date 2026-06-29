import Link from "next/link";
import { Section, SectionHeading } from "@/components/common";
import { Reveal } from "@/components/common/reveal";
import { Icon } from "@/components/common/icon";
import { DEFAULT_SERVICES } from "@/lib/data/defaults";
import type { Service, WithId } from "@/lib/schemas";

export function Layanan({ services }: { services: WithId<Service>[] }) {
  const list: { title: string; icon: string; slug: string; description?: string }[] =
    services.length
      ? services.map((s) => ({ title: s.title, icon: s.icon, slug: s.slug, description: s.description }))
      : DEFAULT_SERVICES;

  return (
    <Section id="layanan">
      <SectionHeading
        eyebrow="Layanan"
        title="Spesialis Kelistrikan & Variasi"
        description="Solusi lengkap upgrade pencahayaan, audio, dan kelistrikan mobil & motor."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.08}>
            <Link
              href={`/layanan/${s.slug}`}
              className="group block h-full rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-primary/50 hover:bg-surface"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              {s.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted">{s.description}</p>
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

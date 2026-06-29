import { Section } from "@/components/common";
import { Reveal } from "@/components/common/reveal";
import type { Settings } from "@/lib/schemas";

export function Trusted({ stats }: { stats: Settings["stats"] }) {
  const items = [
    { value: `${stats.vehiclesHandled}+`, label: "Kendaraan Ditangani" },
    { value: `${stats.yearsExperience}+`, label: "Tahun Pengalaman" },
    { value: `${stats.satisfaction}%`, label: "Tingkat Kepuasan" },
    { value: `${stats.servicesCount}+`, label: "Layanan Tersedia" },
  ];
  return (
    <Section className="py-14 sm:py-16">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="glass rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">{it.value}</p>
              <p className="mt-2 text-sm text-muted">{it.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

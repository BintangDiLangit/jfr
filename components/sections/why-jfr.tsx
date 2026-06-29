import { Section, SectionHeading } from "@/components/common";
import { Reveal } from "@/components/common/reveal";
import { Icon } from "@/components/common/icon";
import type { Settings } from "@/lib/schemas";

export function WhyJfr({ data }: { data: Settings["whyJfr"] }) {
  return (
    <Section className="bg-surface/30">
      <SectionHeading eyebrow="Kenapa JFR" title={data.title} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 3) * 0.08}>
            <div className="flex h-full gap-4 rounded-2xl border border-border p-6">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={it.icon} className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-muted">{it.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

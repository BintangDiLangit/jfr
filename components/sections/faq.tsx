import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/common";
import type { Faq, WithId } from "@/lib/schemas";

const DEFAULT_FAQ = [
  { question: "Apakah ada garansi pengerjaan?", answer: "Ya. Setiap pemasangan bergaransi, detail menyesuaikan layanan." },
  { question: "Bisa panggilan ke lokasi?", answer: "Bisa. Kami melayani panggilan ke lokasi pelanggan." },
  { question: "Berapa lama pengerjaan?", answer: "Tergantung jenis layanan, dari beberapa jam hingga 1 hari." },
];

export function FaqSection({ faqs }: { faqs: WithId<Faq>[] }) {
  const list = faqs.length ? faqs : DEFAULT_FAQ;
  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" title="Pertanyaan Umum" />
      <div className="mx-auto max-w-3xl space-y-3">
        {list.map((f, i) => (
          <details key={i} className="group rounded-2xl border border-border bg-surface/40 p-5 [&_summary]:list-none">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
              {f.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

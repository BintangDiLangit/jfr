import { MessageCircle } from "lucide-react";
import { consultLink } from "@/lib/wa";

export function WhatsAppFloat({ number }: { number: string }) {
  return (
    <a
      href={consultLink(number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

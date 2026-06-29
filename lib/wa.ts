import type { BookingForm } from "@/lib/schemas";

/** Build a wa.me link with a prefilled booking message. */
export function buildWhatsAppLink(number: string, body: BookingForm): string {
  const lines = [
    "Halo JFR Technology, saya mau booking:",
    `Nama: ${body.nama}`,
    `WhatsApp: ${body.phone}`,
    `Kendaraan: ${body.vehicleType} — ${body.brand} ${body.model}`,
    `Keluhan: ${body.keluhan}`,
    `Tanggal: ${body.tanggal}`,
  ];
  const text = encodeURIComponent(lines.join("\n"));
  const num = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${text}`;
}

/** Simple consultation link (no form). */
export function consultLink(number: string, msg = "Halo JFR Technology, saya mau konsultasi."): string {
  const num = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { COL } from "@/lib/firebase/collections";
import { bookingFormSchema, type BookingForm } from "@/lib/schemas";
import { buildWhatsAppLink } from "@/lib/wa";
import { Section, SectionHeading } from "@/components/common";
import { Button } from "@/components/ui/button";

const field = "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-primary";

export function Booking({ whatsappNumber }: { whatsappNumber: string }) {
  const [done, setDone] = useState(false);
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<BookingForm>({ resolver: zodResolver(bookingFormSchema) });

  async function onSubmit(data: BookingForm) {
    // persist lead (best-effort), then open WhatsApp
    try {
      await addDoc(collection(db, COL.bookings), {
        ...data, status: "new", createdAt: serverTimestamp(),
      });
    } catch {
      // ignore — WhatsApp handoff still works
    }
    setDone(true);
    window.open(buildWhatsAppLink(whatsappNumber, data), "_blank");
  }

  const err = (k: keyof BookingForm) =>
    errors[k] && <p className="mt-1 text-xs text-red-400">{errors[k]?.message}</p>;

  return (
    <Section id="booking">
      <div className="grid gap-10 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Booking"
          title="Booking Sekarang"
          description="Isi form, pesan otomatis terkirim ke WhatsApp kami. Tim akan segera merespons."
        />
        <form onSubmit={handleSubmit(onSubmit)} className="glass space-y-4 rounded-2xl p-6">
          <div>
            <input className={field} placeholder="Nama" {...register("nama")} />
            {err("nama")}
          </div>
          <div>
            <input className={field} placeholder="Nomor WhatsApp" {...register("phone")} />
            {err("phone")}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select className={field} {...register("vehicleType")} defaultValue="">
                <option value="" disabled>Jenis Kendaraan</option>
                <option value="mobil">Mobil</option>
                <option value="motor">Motor</option>
              </select>
              {err("vehicleType")}
            </div>
            <div>
              <input className={field} placeholder="Merk" {...register("brand")} />
              {err("brand")}
            </div>
          </div>
          <div>
            <input className={field} placeholder="Model" {...register("model")} />
            {err("model")}
          </div>
          <div>
            <textarea className={`${field} h-24 py-3`} placeholder="Keluhan / kebutuhan" {...register("keluhan")} />
            {err("keluhan")}
          </div>
          <div>
            <input type="date" className={field} {...register("tanggal")} />
            {err("tanggal")}
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Kirim via WhatsApp"}
          </Button>
          {done && <p className="text-sm text-primary">Membuka WhatsApp...</p>}
        </form>
      </div>
    </Section>
  );
}

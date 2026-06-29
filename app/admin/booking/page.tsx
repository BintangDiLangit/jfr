"use client";
import { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { useCollection } from "@/components/admin/use-collection";
import { update } from "@/lib/firebase/repo";
import { COL } from "@/lib/firebase/collections";

type Booking = {
  nama: string; phone: string; vehicleType: string; brand: string; model: string;
  keluhan: string; tanggal: string; status: string;
  createdAt?: { seconds: number };
};

const STATUSES = ["new", "contacted", "done"];
const input = "h-9 rounded-lg border border-border bg-surface px-2 text-xs outline-none focus:border-primary";

export default function BookingPage() {
  const { rows, loading } = useCollection<Booking>(COL.bookings, []);
  const sorted = useMemo(
    () => [...rows].sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)),
    [rows],
  );

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold">Booking</h1>
      {loading ? (
        <p className="text-muted">Memuat...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-muted">
              <tr>
                {["Nama", "WA", "Kendaraan", "Keluhan", "Tanggal", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-3">{b.nama}</td>
                  <td className="px-4 py-3">{b.phone}</td>
                  <td className="px-4 py-3">{b.vehicleType} {b.brand} {b.model}</td>
                  <td className="max-w-xs px-4 py-3 text-muted">{b.keluhan}</td>
                  <td className="px-4 py-3">{b.tanggal}</td>
                  <td className="px-4 py-3">
                    <select className={input} value={b.status ?? "new"}
                            onChange={(e) => update(COL.bookings, b.id, { status: e.target.value })}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                       className="text-[#25D366] hover:opacity-80"><MessageCircle className="h-5 w-5" /></a>
                  </td>
                </tr>
              ))}
              {!sorted.length && <tr><td colSpan={7} className="px-4 py-8 text-center text-muted">Belum ada booking.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";
import Link from "next/link";
import { useCollection } from "@/components/admin/use-collection";
import { COL } from "@/lib/firebase/collections";

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="glass rounded-2xl p-6 transition-colors hover:bg-white/5">
      <p className="font-heading text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </Link>
  );
}

type Named = { title?: string; nama?: string };

export default function Dashboard() {
  const portfolio = useCollection<Named>(COL.portfolio, []);
  const bookings = useCollection<Named & { createdAt?: { seconds: number } }>(COL.bookings, []);
  const services = useCollection<Named>(COL.services, []);
  const testimonials = useCollection<Named>(COL.testimonials, []);

  const recentBookings = [...bookings.rows]
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
    .slice(0, 5);

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Portfolio" value={portfolio.rows.length} href="/admin/portfolio" />
        <StatCard label="Booking" value={bookings.rows.length} href="/admin/booking" />
        <StatCard label="Layanan" value={services.rows.length} href="/admin/layanan" />
        <StatCard label="Testimoni" value={testimonials.rows.length} href="/admin/testimoni" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border p-6">
          <h2 className="mb-4 font-semibold">Booking Terbaru</h2>
          <ul className="space-y-2 text-sm">
            {recentBookings.map((b) => <li key={b.id} className="text-muted">{b.nama}</li>)}
            {!recentBookings.length && <li className="text-muted">Belum ada booking.</li>}
          </ul>
        </section>
        <section className="rounded-2xl border border-border p-6">
          <h2 className="mb-4 font-semibold">Portfolio Terbaru</h2>
          <ul className="space-y-2 text-sm">
            {portfolio.rows.slice(0, 5).map((p) => <li key={p.id} className="text-muted">{p.title}</li>)}
            {!portfolio.rows.length && <li className="text-muted">Belum ada portfolio.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth, login, logout } from "@/components/admin/auth";

const MENU = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/layanan", label: "Layanan" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/kategori", label: "Kategori" },
  { href: "/admin/galeri", label: "Galeri" },
  { href: "/admin/instagram", label: "Instagram" },
  { href: "/admin/tiktok", label: "TikTok" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/testimoni", label: "Testimoni" },
  { href: "/admin/booking", label: "Booking" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/admin", label: "Admin" },
];

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await login(email, pass);
    } catch {
      setErr("Email atau password salah.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={submit} className="glass w-full max-w-sm space-y-4 rounded-2xl p-8">
        <h1 className="font-heading text-2xl font-bold">JFR Admin</h1>
        <input className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-primary"
               type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-primary"
               type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required />
        {err && <p className="text-sm text-red-400">{err}</p>}
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Masuk..." : "Masuk"}</Button>
      </form>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const pathname = usePathname();

  if (loading)
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  if (!user) return <LoginForm />;

  if (!isAdmin)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-muted">Akun ini belum terdaftar sebagai admin.</p>
        <Button variant="outline" onClick={() => logout()}>Keluar</Button>
      </div>
    );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-surface/40 md:block">
        <div className="px-6 py-5 font-heading text-lg font-bold">JFR Admin</div>
        <nav className="flex flex-col gap-1 px-3">
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === m.href ? "bg-primary/10 text-primary" : "text-muted hover:bg-white/5 hover:text-foreground",
              )}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-6">
          <span className="text-sm text-muted">{user.email}</span>
          <button onClick={() => logout()} className="flex items-center gap-2 text-sm text-muted hover:text-foreground">
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

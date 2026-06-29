"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common";
import { consultLink } from "@/lib/wa";

const NAV = [
  { label: "Layanan", href: "/#layanan" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimoni", href: "/#testimoni" },
  { label: "FAQ", href: "/#faq" },
];

export function Header({ brandName, whatsappNumber }: { brandName: string; whatsappNumber: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label={brandName} className="flex items-center">
          <Image src="/logo-trim.png" alt={brandName} width={434} height={67} priority className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-muted transition-colors hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href={consultLink(whatsappNumber)} target="_blank" rel="noopener noreferrer">
            <Button size="sm">Konsultasi</Button>
          </a>
        </div>

        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </Container>

      <div className={cn("md:hidden", open ? "block" : "hidden")}>
        <Container className="flex flex-col gap-4 pb-6 pt-2">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-muted" onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <a href={consultLink(whatsappNumber)} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="w-full">Konsultasi via WhatsApp</Button>
          </a>
        </Container>
      </div>
    </header>
  );
}

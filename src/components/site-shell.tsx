"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Menu, Sparkles } from "lucide-react";

const navItems = [
  { label: "Journal", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admin", href: "/admin" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%),linear-gradient(135deg,_#05070b_0%,_#0d121a_55%,_#05070b_100%)] text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-zinc-200">
            <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 p-2">
              <Compass className="h-4 w-4 text-cyan-300" />
            </span>
            Family Travels
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <button className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 md:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
        {children}
      </motion.main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Stories, photos, and memories from the road.</p>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Crafted for immersive travel storytelling
          </div>
        </div>
      </footer>
    </div>
  );
}

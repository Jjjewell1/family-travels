import Link from "next/link";
import { ArrowRight, Camera, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_24%)]" />
      <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Self-hosted travel storytelling
            </div>
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              The world, framed in light and memory.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-zinc-300">
              A sleek travel blog designed for immersive journal entries, cinematic galleries, and a polished admin experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/60">
                Explore journal <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/40">
                <Camera className="h-4 w-4" /> View gallery
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Highlights</p>
              <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Immersive landing experience with editorial typography</li>
                <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Rich blog feed for travel stories and media-rich posts</li>
                <li className="rounded-2xl border border-white/10 bg-black/20 p-4">Gallery-ready layout for a modern photo archive</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

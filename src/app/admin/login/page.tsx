"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase-client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/admin");
      }
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!supabase || !isSupabaseConfigured) {
      setError("Add your Supabase URL and anon key to continue.");
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <section className="mx-auto flex min-h-[78vh] max-w-6xl items-center justify-center px-6 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 text-cyan-300">
          <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-2">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-sm uppercase tracking-[0.35em]">Admin access</p>
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Sign in to your publishing studio.
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          Use your Supabase-authenticated account to manage stories, photos, and the travel journal.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm text-zinc-300">
            <span className="mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block text-sm text-zinc-300">
            <span className="mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4" /> Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
              placeholder="Enter your password"
              required
            />
          </label>

          {error ? <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </motion.div>
    </section>
  );
}

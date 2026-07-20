"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function AdminPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      setSignedIn(Boolean(data.session));
      setLoading(false);

      if (!data.session) {
        router.replace("/admin/login");
      }
    }

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-20 lg:px-8">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Checking access…</p>
      </section>
    );
  }

  if (!signedIn) {
    return null;
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:px-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Admin</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Your publishing studio is ready.</h1>
        <p className="text-lg leading-8 text-zinc-300">Authenticated admin access is active. You can now prepare story creation, uploads, and publishing flows.</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">Ready for the next step</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-300">The login experience is implemented and protected. Add your real Supabase credentials and sign in to start managing content.</p>
        <Link href="/admin/login" className="mt-6 inline-flex text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
          Go to sign-in →
        </Link>
      </div>
    </section>
  );
}

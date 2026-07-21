export const dynamic = "force-dynamic";

import Link from "next/link";
import { Suspense } from "react";
import { ImmichImage } from "@/components/immich-image";
import { getAllPosts } from "@/lib/posts";

function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="h-48 w-full animate-pulse bg-zinc-800/70" />
      <div className="space-y-3 p-8">
        <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-700/70" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-800/70" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-800/70" />
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:px-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Travel journal</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Notes from the road, written in light and motion.</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="relative h-48 w-full overflow-hidden">
              <Suspense fallback={<div className="h-full w-full animate-pulse bg-zinc-800/70" />}>
                <ImmichImage assetId={post.image} alt={post.title} fill className="object-cover" thumbnail />
              </Suspense>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{post.blurb}</p>
              <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-medium text-cyan-300 transition hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
                Read story →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

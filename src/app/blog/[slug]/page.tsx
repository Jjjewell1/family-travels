export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ImmichImage } from "@/components/immich-image";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:px-8">
      <Link href="/blog" className="inline-flex max-w-fit items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
        <ArrowLeft className="h-4 w-4" /> Back to journal
      </Link>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="relative h-80 w-full overflow-hidden">
          <ImmichImage assetId={post.image} alt={post.title} fill className="object-cover" priority thumbnail />
        </div>
        <div className="space-y-5 p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Travel journal</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{post.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-zinc-300">{post.excerpt}</p>
          <div className="space-y-4 text-base leading-8 text-zinc-300">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

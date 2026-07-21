export const dynamic = "force-dynamic";

import Link from "next/link";
import { Suspense } from "react";
import { ImmichImage } from "@/components/immich-image";
import { getAlbumAssets } from "@/lib/immich";

const IMMICH_ALBUM_ID = process.env.IMMICH_GALLERY_ALBUM_ID || process.env.NEXT_PUBLIC_IMMICH_ALBUM_ID || "ca62b8d2-22a5-4de4-97fe-148fbc2ef5b6";

async function GalleryGrid() {
  const assets = await getAlbumAssets(IMMICH_ALBUM_ID);

  if (!assets.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-sm text-zinc-400">
        No Immich album assets were returned yet. Add your album ID or verify the API key and album permissions.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {assets.map((asset, index) => {
        const className = index % 5 === 0 ? "md:col-span-2 md:row-span-2" : "";
        return (
          <Link key={asset.id} href={`/api/immich/asset/${asset.id}`} className={`group relative min-h-64 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 ${className}`}>
            <ImmichImage assetId={asset.id} alt={asset.originalFileName || "Immich gallery image"} fill className="object-cover transition duration-500 group-hover:scale-105" thumbnail />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.2),_transparent_45%),linear-gradient(135deg,_rgba(255,255,255,0.08),_transparent_60%)]" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6">
              <p className="text-lg font-medium text-white">{asset.originalFileName || "Immich asset"}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:px-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Photo gallery</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">A cinematic archive of the places we loved.</h1>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-zinc-900/70" />}>
        <GalleryGrid />
      </Suspense>
    </section>
  );
}

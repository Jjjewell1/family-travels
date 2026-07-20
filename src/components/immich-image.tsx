"use client";

import Image from "next/image";
import { useState } from "react";
import { getImmichAssetUrl } from "@/lib/immich";

export function ImmichImage({
  assetId,
  alt,
  className,
  fill = false,
  priority = false,
  thumbnail = true,
}: {
  assetId?: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  thumbnail?: boolean;
}) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(assetId));

  if (!assetId || isError) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900/70 text-sm text-zinc-400 ${className ?? ""}`}>
        <span>Image unavailable</span>
      </div>
    );
  }

  const src = getImmichAssetUrl(assetId, thumbnail);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {isLoading ? (
        <div className="absolute inset-0 animate-pulse bg-zinc-800/70" />
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={className}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsError(true)}
        unoptimized
      />
    </div>
  );
}

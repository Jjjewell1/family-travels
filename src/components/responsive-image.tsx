"use client";

import Image from "next/image";
import { useState } from "react";

export function ResponsiveImage({
  src,
  alt,
  className,
  fill = false,
  priority = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  const [isError, setIsError] = useState(false);
  const resolvedSrc = src && !src.includes("${") ? src : "/placeholder-image.svg";

  if (isError) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900/70 text-sm text-zinc-400 ${className ?? ""}`}>
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      className={className}
      onError={() => setIsError(true)}
    />
  );
}

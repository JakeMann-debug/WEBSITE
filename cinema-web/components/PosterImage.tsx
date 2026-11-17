"use client";

// components/PosterImage.tsx
// Shows a gradient behind the image, so the layout still looks fine
// before you add your real files to /public. Parent must be `relative`.

import { useState } from "react";
import Image from "next/image";

export default function PosterImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  // If the file is missing, hide the broken-image icon and keep the gradient.
  const [failed, setFailed] = useState(false);
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-[#1c1c22] to-indigo-900/40" />
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover"
        />
      )}
    </>
  );
}

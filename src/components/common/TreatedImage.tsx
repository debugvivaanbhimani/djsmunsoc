"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface TreatedImageProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide" | "poster";
  className?: string;
  priority?: boolean;
  sizes?: string;
  unoptimized?: boolean;
}

export default function TreatedImage({
  src,
  alt,
  aspectRatio = "portrait",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  unoptimized = false,
}: TreatedImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[4/3]",
    wide: "aspect-[16/9]",
    poster: "aspect-[1/1.4]",
  };

  return (
    <div
      className={`group relative overflow-hidden bg-ink/80 select-none ${aspectClasses[aspectRatio]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor={isHovered ? "VIEW" : undefined}
    >
      {/* Underlying Image */}
      <div
        className="relative h-full w-full transition-all duration-700 ease-out will-change-[filter,transform]"
        style={{
          filter: isHovered
            ? "grayscale(0%) contrast(100%) brightness(100%)"
            : "grayscale(100%) contrast(140%) brightness(88%)",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized={unoptimized || src.endsWith(".svg")}
          className="object-cover object-center"
        />
      </div>

      {/* Halftone Dot Matrix Overlay Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-700"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(237, 232, 223, 0.45) 1px, transparent 1.2px)",
          backgroundSize: "6px 6px",
          mixBlendMode: "overlay",
          opacity: isHovered ? 0.08 : 0.42,
        }}
        aria-hidden="true"
      />

      {/* Tactile Film Grain & Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-700"
        style={{
          boxShadow: "inset 0 0 45px rgba(10, 10, 11, 0.75)",
          opacity: isHovered ? 0.3 : 0.85,
        }}
        aria-hidden="true"
      />

      {/* Delicate Gold corner classification tick */}
      <div
        className="pointer-events-none absolute bottom-2 left-2 z-30 font-mono text-[9px] uppercase tracking-widest transition-colors duration-500"
        style={{
          color: isHovered ? "#C9A96E" : "#8A8780",
        }}
      >
        [REC]
      </div>
    </div>
  );
}

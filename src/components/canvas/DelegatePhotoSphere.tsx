"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";

interface SpherePhoto {
  id: string;
  title: string;
  caption: string;
  image: string;
  tag: string;
}

export default function DelegatePhotoSphere({
  photos,
  onSelectPhoto,
}: {
  photos: SpherePhoto[];
  onSelectPhoto: (p: SpherePhoto) => void;
}) {
  const [rotation, setRotation] = useState({ x: 12, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 12, y: 0 });

  // Map photos into a clean 3D sphere coordinate shell
  const sphereItems = useMemo(() => {
    const list: Array<SpherePhoto & { x: number; y: number; z: number; phi: number; theta: number }> = [];
    const count = photos.length;
    const radius = 240; // Pixel radius for full visible circle

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(theta) * Math.sin(phi);

      list.push({ ...photos[i], x, y, z, phi, theta });
    }
    return list;
  }, [photos]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    currentRotation.current = { ...rotation };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - dragStart.current.x) * 0.45;
    const deltaY = (e.clientY - dragStart.current.y) * 0.45;

    setRotation({
      x: Math.max(-60, Math.min(60, currentRotation.current.x - deltaY)),
      y: currentRotation.current.y + deltaX,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative flex h-[500px] sm:h-[560px] w-full items-center justify-center select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Outer Luminous Circular Atmosphere Rim */}
      <div className="absolute h-[480px] w-[480px] rounded-full border border-gold/30 bg-gradient-to-br from-gold/10 via-navy/40 to-navy-dark shadow-[0_0_80px_rgba(201,169,110,0.18)] pointer-events-none" />

      {/* Orbit Rings around the sphere */}
      <div className="absolute h-[520px] w-[520px] rounded-full border border-white/10 pointer-events-none rotate-45 scale-y-50" />
      <div className="absolute h-[540px] w-[540px] rounded-full border border-gold/20 pointer-events-none -rotate-30 scale-y-60" />

      {/* Center 3D Interactive Rotating Sphere */}
      <div
        className="relative h-[480px] w-[480px] transform-style-3d cursor-grab active:cursor-grabbing transition-transform duration-75"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {sphereItems.map((item) => {
          // Calculate item transform position on sphere
          return (
            <div
              key={item.id}
              onClick={() => onSelectPhoto(item)}
              className="absolute left-1/2 top-1/2 -ml-14 -mt-10 h-20 w-28 group transition-all duration-300"
              style={{
                transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
              }}
            >
              {/* Photo Card with Gold Border & Rich Color */}
              <div className="relative h-full w-full rounded-lg overflow-hidden border-2 border-gold/60 bg-navy shadow-xl transition-all duration-300 group-hover:scale-125 group-hover:border-gold group-hover:z-50 group-hover:shadow-[0_0_25px_rgba(201,169,110,0.6)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-cream font-bold">
                  <span className="truncate">{item.tag.split(" ")[0]}</span>
                  <span className="text-gold">●</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions badge */}
      <div className="absolute bottom-4 inset-x-0 mx-auto w-max rounded-full border border-gold/30 bg-navy/85 backdrop-blur-md px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-gold shadow-md">
        Drag to Rotate 3D Photo Sphere · Tap Photo to Inspect
      </div>
    </div>
  );
}

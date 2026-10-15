"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { Move3d } from "lucide-react";

interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  thumb?: string;
  tag: string;
}

// Projects a 3D point onto 2D screen-space using perspective division.
// Cards are then absolutely positioned — they never rotate, always face forward.
function project(x: number, y: number, z: number, fov: number) {
  const scale = fov / (fov + z);
  return { sx: x * scale, sy: y * scale, scale };
}

// Fibonacci sphere distribution — uniform coverage
function fibonacciSphere(count: number, radius: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    pts.push({
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta),
    });
  }
  return pts;
}

// Rotate a 3D point by Y then X euler angles (in degrees)
function rotatePoint(
  x: number,
  y: number,
  z: number,
  rotX: number,
  rotY: number
) {
  const rx = (rotX * Math.PI) / 180;
  const ry = (rotY * Math.PI) / 180;

  // Rotate Y
  const x1 = x * Math.cos(ry) + z * Math.sin(ry);
  const y1 = y;
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);

  // Rotate X
  const x2 = x1;
  const y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx);

  return { x: x2, y: y2, z: z2 };
}

export default function DelegatePhotoGlobe({
  photos,
  onSelectPhoto,
}: {
  photos: PhotoItem[];
  onSelectPhoto: (p: PhotoItem) => void;
}) {
  const CARD_W = 112; // px
  const CARD_H = 80;
  const RADIUS = 220;
  const FOV = 600;
  const CARD_COUNT = 28;

  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(12);
  const [mounted, setMounted] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: 12, rotY: 0 });
  const animRef = useRef<number | null>(null);
  const lastTime = useRef(performance.now());
  const hovered = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Build static sphere positions (Fibonacci)
  const basePoints = useMemo(() => fibonacciSphere(CARD_COUNT, RADIUS), []);

  // Map photo repeating
  const cards = useMemo(() =>
    basePoints.map((pt, i) => ({
      ...pt,
      photo: photos[i % photos.length],
      key: `card-${i}`,
    })),
    [basePoints, photos]
  );

  // Auto-rotation loop
  useEffect(() => {
    const loop = (time: number) => {
      const delta = (time - lastTime.current) / 1000;
      lastTime.current = time;
      if (!isDragging.current && !hovered.current) {
        setRotY((prev) => (prev + delta * 14) % 360);
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, rotX, rotY };
  }, [rotX, rotY]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - dragStart.current.x) * 0.45;
    const dy = (e.clientY - dragStart.current.y) * 0.45;
    setRotY((dragStart.current.rotY + dx) % 360);
    setRotX(Math.max(-60, Math.min(60, dragStart.current.rotX - dy)));
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  // Touch support
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, rotX, rotY };
  }, [rotX, rotY]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = (e.touches[0].clientX - dragStart.current.x) * 0.45;
    const dy = (e.touches[0].clientY - dragStart.current.y) * 0.45;
    setRotY((dragStart.current.rotY + dx) % 360);
    setRotX(Math.max(-60, Math.min(60, dragStart.current.rotX - dy)));
  }, []);

  const onTouchEnd = useCallback(() => { isDragging.current = false; }, []);

  // Project cards to 2D and sort by depth (painter's algorithm)
  const projected = useMemo(() => {
    return cards
      .map((card) => {
        const rot = rotatePoint(card.x, card.y, card.z, rotX, rotY);
        const { sx, sy, scale } = project(rot.x, rot.y, rot.z, FOV);
        return { ...card, sx, sy, scale, depth: rot.z };
      })
      .sort((a, b) => a.depth - b.depth); // back-to-front
  }, [cards, rotX, rotY]);

  const SIZE = 520; // container px

  if (!mounted) {
    return (
      <div className="relative w-full flex flex-col items-center justify-center py-6 select-none" style={{ minHeight: SIZE }}>
        <div className="w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-gold/10 via-navy/5 to-gold/8 blur-3xl pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 select-none">
      {/* Ambient glow rings */}
      <div className="absolute w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-gold/10 via-navy/5 to-gold/8 blur-3xl pointer-events-none" />
      <div className="absolute w-[490px] h-[490px] rounded-full border border-gold/25 pointer-events-none" />
      <div
        className="absolute w-[520px] h-[520px] rounded-full border border-navy/10 pointer-events-none"
        style={{ transform: "rotateX(70deg) rotateZ(25deg)" }}
      />

      {/* Billboard canvas — cards are 2D positioned, always face forward */}
      <div
        className="relative cursor-grab active:cursor-grabbing"
        style={{ width: SIZE, height: SIZE }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseEnter={() => { hovered.current = true; }}
        onMouseOut={() => { hovered.current = false; }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {projected.map((card) => {
          const left = SIZE / 2 + card.sx - CARD_W / 2;
          const top = SIZE / 2 + card.sy - CARD_H / 2;
          const opacity = Math.max(0.35, (card.depth + RADIUS) / (2 * RADIUS));
          const isBack = card.depth < -RADIUS * 0.2;

          return (
            <div
              key={card.key}
              onClick={() => !isDragging.current && onSelectPhoto(card.photo)}
              className="absolute group cursor-pointer"
              style={{
                left,
                top,
                width: CARD_W,
                height: CARD_H,
                transform: `scale(${Math.max(0.55, card.scale)})`,
                transformOrigin: "center center",
                opacity: isBack ? opacity * 0.6 : opacity,
                transition: "opacity 0.15s",
                zIndex: Math.round(card.depth + RADIUS),
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-white/90 shadow-lg bg-navy group-hover:border-gold group-hover:shadow-xl group-hover:scale-110 transition-all duration-200">
                <Image
                  src={card.photo.thumb || card.photo.image}
                  alt={card.photo.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                <div className="absolute bottom-1 left-1.5 right-1.5 text-[7px] font-mono font-bold text-gold uppercase tracking-wider truncate">
                  {card.photo.tag.split(" ")[0]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status label — no oval/pill */}
      <div className="mt-3 text-[11px] font-mono uppercase tracking-wider text-slate-500">
        <Move3d className="inline w-3.5 h-3.5 mr-1.5 text-gold" />
        Drag to rotate · Click to view
      </div>
    </div>
  );
}

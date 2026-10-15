"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";

interface Committee {
  id: string;
  code: string;
  order: string;
  name: string;
  level: string;
  category: string;
  image: string;
  eb: { name: string; role: string }[];
  agendas: { num: string; title: string }[];
  bgGuideUrl: string;
}

export default function FlipCard({ committee }: { committee: Committee }) {
  const [flipped, setFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Mouse tilt tracking (max 6deg)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rY = ((x - centerX) / centerX) * 6;
    const rX = -((y - centerY) / centerY) * 6;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="perspective-1200 h-[480px] w-full cursor-pointer select-none"
      onClick={() => setFlipped(!flipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={flipped ? "REVERSE" : "FLIP"}
    >
      <div
        className="relative h-full w-full transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: `rotateY(${flipped ? 180 : rotateY}deg) rotateX(${
            flipped ? 0 : rotateX
          }deg)`,
        }}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden flex flex-col justify-between border border-border bg-ink p-6 overflow-hidden shadow-2xl group">
          {/* Halftone & Background Thematic Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={committee.image}
              alt={committee.name}
              fill
              unoptimized
              className="object-cover opacity-20 filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-dot-matrix-fine opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
          </div>

          {/* Front Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
              {committee.order}
            </span>
            <span
              className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border ${
                committee.level === "Crisis"
                  ? "border-red-900/60 text-red-300"
                  : committee.level === "Advanced"
                  ? "border-gold/60 text-gold"
                  : "border-border text-smoke"
              }`}
            >
              {committee.level}
            </span>
          </div>

          {/* Center: Giant Serif Code */}
          <div className="relative z-10 my-auto text-center py-8">
            <h3 className="font-serif text-6xl sm:text-7xl text-ivory tracking-tight group-hover:text-gold transition-colors duration-500">
              {committee.code}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-smoke mt-2">
              {committee.name}
            </p>
          </div>

          {/* Front Footer */}
          <div className="relative z-10 flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] text-smoke uppercase tracking-wider">
            <span>{committee.category} LEVEL</span>
            <span className="text-gold group-hover:underline flex items-center gap-1">
              CLICK TO FLIP
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* BACK FACE (180deg) */}
        <div
          className="absolute inset-0 backface-hidden flex flex-col justify-between border border-gold/40 bg-[#0E0E10] p-6 shadow-2xl"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Back Header */}
          <div className="border-b border-border pb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
            <span>{committee.code} // DOSSIER</span>
            <span>{committee.level}</span>
          </div>

          {/* Agendas list */}
          <div className="space-y-4 my-auto">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-smoke">
              SUBSTANTIVE AGENDAS
            </div>

            {committee.agendas.map((ag) => (
              <div key={ag.num} className="space-y-1">
                <div className="font-mono text-[10px] text-gold font-semibold">
                  AGENDA {ag.num}
                </div>
                <div className="font-serif text-sm sm:text-base text-ivory leading-snug">
                  {ag.title}
                </div>
              </div>
            ))}

            {/* Executive Board */}
            <div className="pt-3 border-t border-border/60">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-smoke mb-1.5">
                EXECUTIVE BOARD
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-ivory/80">
                {committee.eb.map((m) => (
                  <div key={m.name}>
                    <div className="text-smoke text-[8px] uppercase">{m.role}</div>
                    <div className="text-ivory">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Back Action */}
          <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-[10px]">
            <a
              href={committee.bgGuideUrl}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-gold hover:underline"
            >
              <Download className="w-3 h-3" />
              <span>Background Guide</span>
            </a>
            <span className="text-smoke uppercase tracking-wider">TAP TO REVERT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

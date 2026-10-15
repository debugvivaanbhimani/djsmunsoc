"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import secretariatData from "../../../data/secretariat.json";

export default function SecretariatPreview() {
  const [activePortrait, setActivePortrait] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative bg-ink py-24 sm:py-32 hairline-top overflow-hidden select-none"
    >
      {/* Background Dot texture */}
      <div className="absolute inset-0 bg-dot-matrix-fine opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-12 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 mb-12 gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-2">
              05 — EXECUTIVE SECRETARIAT
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory tracking-tight">
              The Directorate of DJS MUNSoc.
            </h2>
          </div>

          <Link
            href="/secretariat"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold hover:text-ivory transition-colors group"
          >
            <span>Full Secretariat Roster</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Editorial Roster List */}
        <div className="divide-y divide-border border-b border-border">
          {secretariatData.map((member) => (
            <div
              key={member.id}
              onMouseEnter={() => setActivePortrait(member.portrait)}
              onMouseLeave={() => setActivePortrait(null)}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 transition-all duration-300 hover:bg-white/[0.02] px-4 cursor-pointer"
              data-cursor="OFFICER"
            >
              {/* Name in Large Serif */}
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-smoke group-hover:text-gold transition-colors">
                  {member.id.replace("sec-", "0")}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory group-hover:text-gold transition-colors">
                  {member.name}
                </h3>
              </div>

              {/* Role in Mono & Department */}
              <div className="flex items-center justify-between md:justify-end gap-6 mt-2 md:mt-0">
                <div className="text-right">
                  <div className="font-mono text-xs uppercase tracking-widest text-ivory">
                    {member.role}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-smoke">
                    {member.department}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-smoke group-hover:text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Portrait following mouse on desktop */}
      {activePortrait && (
        <div
          className="pointer-events-none fixed z-50 hidden md:block w-48 h-64 overflow-hidden border border-gold/60 bg-ink shadow-2xl transition-all duration-150 ease-out"
          style={{
            top: mousePos.y - 120,
            left: mousePos.x + 30,
          }}
        >
          <div className="relative h-full w-full grayscale contrast-125">
            <Image
              src={activePortrait}
              alt="Secretariat Member"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-dot-matrix-fine opacity-30 mix-blend-overlay" />
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Download, RotateCw } from "lucide-react";
import committeesData from "../../../data/committees.json";

const FILTERS = ["All", "Beginner", "Intermediate", "Advanced", "Crisis"];

export default function CommitteePreview() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = committeesData.filter((c) => {
    if (activeFilter === "All") return true;
    return c.level === activeFilter || c.category === activeFilter;
  });

  return (
    <section id="committees" className="bg-navy py-24 text-cream relative">
      <div className="absolute inset-0 bg-subtle-dots opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
              03 — THE SUBSTANTIVE CHAMBERS
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-cream">
              Seven arenas of sovereign conflict.
            </h2>
            <p className="text-sm text-cream/70 max-w-lg leading-relaxed">
              Click any card to flip and inspect classified agendas, executive boards, and background guides.
            </p>
          </div>

          <Link
            href="/committees"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold hover:text-cream transition-colors font-bold"
          >
            <span>View Complete Chambers Guide</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeFilter === f
                  ? "bg-gold text-navy font-bold shadow-md shadow-gold/20"
                  : "bg-white/5 border border-white/15 text-cream/80 hover:bg-white/10 hover:border-white/30"
                }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-cream/60 hidden sm:inline">
            Showing {filtered.length} of {committeesData.length} committees
          </span>
        </div>

        {/* Committees 3D Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((comm) => {
            const isFlipped = !!flippedCards[comm.id];

            return (
              <div
                key={comm.id}
                onClick={() => toggleFlip(comm.id)}
                className="perspective-1000 h-[440px] w-full cursor-pointer select-none"
              >
                <div
                  className="relative h-full w-full transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-navy-card to-navy p-7 flex flex-col justify-between shadow-2xl overflow-hidden group">
                    {/* Background chamber silhouette */}
                    <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-35 transition-opacity">
                      <Image
                        src={comm.image}
                        alt={comm.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-navy/80" />
                    </div>

                    {/* Front Header */}
                    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                      <span className="text-cream/70 font-bold">{comm.order}</span>
                      <span className="rounded-full bg-gold/15 border border-gold/40 text-gold px-2.5 py-0.5 text-[10px] font-bold">
                        {comm.level}
                      </span>
                    </div>

                    {/* Front Title */}
                    <div className="relative z-10 my-auto text-center py-6">
                      <h3 className="font-serif text-5xl sm:text-6xl font-bold text-cream group-hover:text-gold transition-colors">
                        {comm.code}
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-wider text-cream/80 mt-2 font-medium">
                        {comm.name}
                      </p>
                    </div>

                    {/* Front Footer */}
                    <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-mono text-cream/70">
                      <span>{comm.category} LEVEL</span>
                      <span className="text-gold flex items-center gap-1 font-bold group-hover:underline">
                        <span>FLIP DOSSIER</span>
                        <RotateCw className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 backface-hidden rounded-2xl border border-gold bg-[#0E1E38] p-7 flex flex-col justify-between shadow-2xl"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    {/* Back Header */}
                    <div className="border-b border-gold/30 pb-3 flex items-center justify-between font-mono text-xs text-gold font-bold">
                      <span>{comm.code} // CLASSIFIED</span>
                      <span>{comm.level}</span>
                    </div>

                    {/* Back Content */}
                    <div className="space-y-4 my-auto">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-cream/60">
                        SUBSTANTIVE AGENDAS
                      </div>

                      {comm.agendas.map((ag) => (
                        <div key={ag.num} className="space-y-0.5">
                          <div className="font-mono text-[10px] text-gold font-bold">
                            AGENDA {ag.num}
                          </div>
                          <div className="text-xs text-cream/90 leading-snug">
                            {ag.title}
                          </div>
                        </div>
                      ))}

                      {/* EB Members */}
                      <div className="pt-3 border-t border-white/10">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-cream/60 mb-1">
                          EXECUTIVE BOARD
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-cream">
                          {comm.eb.map((m) => (
                            <div key={m.name}>
                              <div className="text-gold text-[9px] uppercase">{m.role}</div>
                              <div className="truncate">{m.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Back Action */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <a
                        href={comm.bgGuideUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-gold hover:underline font-bold"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Study Guide</span>
                      </a>
                      <span className="text-cream/50 text-[10px]">CLICK TO REVERT</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

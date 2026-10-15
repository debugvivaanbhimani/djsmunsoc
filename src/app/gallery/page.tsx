"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowUpRight, Play, Quote } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";
import galleryData from "../../../data/gallery.json";
import testimonialsData from "../../../data/testimonials.json";

export default function GalleryPage() {
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const tags = [
    "ALL",
    "LEADERSHIP & ADDRESSES",
    "SECRETARIAT BOARD",
    "INSTITUTIONAL PATRONS",
    "EXECUTIVE BOARD",
    "VALEDICTORY & HONORS",
    "COMMITTEE PROCEEDINGS",
  ];

  const filtered = galleryData.items.filter((item) => {
    if (selectedTag === "ALL") return true;
    return item.tag === selectedTag;
  });

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-14">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
          OFFICIAL VISUAL ARCHIVE · DJSMUN CAPTURES
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Conference Retrospective & Gallery
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Documenting relentless debate, midnight crisis directives, diplomatic alliances, and valedictory honors across DJS MUNSoc editions.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Filter Tags */}
        <div className="flex flex-wrap items-center gap-2 card-clean p-4">
          <span className="text-xs font-mono font-bold text-slate-500 mr-2">CATEGORIES:</span>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`rounded-lg px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedTag === t
                  ? "bg-navy text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Photography Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="card-clean overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-gold transition-all"
            >
              <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.thumb || item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gold font-bold">
                    {item.tag}
                  </div>
                  <h3 className="font-serif text-lg font-bold leading-tight truncate">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-white space-y-2">
                <p className="text-xs text-slate-600 line-clamp-2">
                  {item.caption}
                </p>
                <div className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>Click to Inspect Full Photo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cinematic Aftermovie Section */}
        <div className="card-clean p-8 sm:p-14 bg-navy text-white border-none shadow-xl space-y-6">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
              OFFICIAL CINEMATIC AFTERMOVIE
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              "The gavel falls, the order speaks."
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Experience the cadence of high-stakes multilateral diplomacy. From emergency crisis dispatches to historic midnight accords at DJSCE.
            </p>
            <div className="pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-navy shadow-md hover:bg-gold-light transition-all"
              >
                <Play className="w-4 h-4 fill-navy" />
                <span>Watch Official Trailer on YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Delegate Testimonials Grid */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
              DELEGATE REFLECTIONS
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy">
              Voices from the Chamber Floor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((t, idx) => (
              <div key={idx} className="card-clean p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-gold opacity-80" />
                  <p className="font-serif text-base text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 font-mono text-xs">
                  <div className="font-bold text-navy">{t.author}</div>
                  <div className="text-gold text-[11px] font-semibold">{t.college}</div>
                  <div className="text-slate-400 text-[10px]">{t.committee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}

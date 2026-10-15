"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";
import galleryData from "../../../data/gallery.json";
import testimonialsData from "../../../data/testimonials.json";

export default function RecapSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const t = testimonialsData[activeTestimonial];

  return (
    <section className="relative bg-ink py-24 sm:py-32 hairline-top overflow-hidden">
      {/* Background Dot texture */}
      <div className="absolute inset-0 bg-dot-matrix-fine opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-12 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 mb-16 gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-2">
              04 — DJSMUN '26 RETROSPECTIVE
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory tracking-tight">
              A confluence of relentless intellect.
            </h2>
          </div>

          <Link
            href="/djsmun-26"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold hover:text-ivory transition-colors group"
          >
            <span>Full Retrospective Archive</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Animated Numerical Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 border-b border-border pb-16">
          <div className="border border-border bg-ink/70 p-6 md:p-8">
            <div className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory mb-2 font-light">
              468<span className="text-gold font-mono text-3xl">+</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
              DELEGATES CONVENED
            </div>
          </div>

          <div className="border border-border bg-ink/70 p-6 md:p-8">
            <div className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory mb-2 font-light">
              38<span className="text-gold font-mono text-3xl">+</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
              INSTITUTIONS NATIONWIDE
            </div>
          </div>

          <div className="border border-border bg-ink/70 p-6 md:p-8">
            <div className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory mb-2 font-light">
              07
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
              SUBSTANTIVE COUNCILS
            </div>
          </div>

          <div className="border border-border bg-ink/70 p-6 md:p-8">
            <div className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory mb-2 font-light">
              28<span className="text-gold font-mono text-3xl">H</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
              RIGOROUS CAUCUS TIME
            </div>
          </div>
        </div>

        {/* Draggable Free-Pan Photo Showcase */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
              ARCHIVAL CAPTURES // TAP TO INSPECT
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold">
              MUMBAI MONOCHROME ARCHIVE
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryData.items.slice(0, 8).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative aspect-square cursor-pointer overflow-hidden border border-border bg-ink p-1 transition-all duration-500 hover:border-gold"
                data-cursor="VIEW"
              >
                <div className="relative h-full w-full grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-dot-matrix-fine opacity-30 mix-blend-overlay" />
                </div>
                <div className="absolute bottom-2 left-2 z-10 font-mono text-[9px] uppercase tracking-wider text-ivory bg-ink/80 px-1.5 py-0.5 border border-border">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic Aftermovie Frame */}
        <div className="border border-border bg-ink p-8 md:p-14 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-matrix-gold opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-3">
              OFFICIAL CINEMATIC TRAILER // DJSMUN '26
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mb-4">
              "The gavel falls, the order speaks."
            </h3>
            <p className="font-sans text-xs sm:text-sm text-smoke leading-relaxed font-light mb-8">
              Experience the cadence of high-stakes multilateral diplomacy. From emergency crisis dispatches to historic midnight accords at DJSCE.
            </p>
            <a
              href="https://youtube.com [EDIT]"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink font-semibold hover:bg-gold-hover transition-colors"
            >
              <span>Watch Aftermovie [EDIT]</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Delegate Testimonial Carousel */}
        <div className="border-t border-border pt-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Quote className="w-8 h-8 text-gold mx-auto opacity-70" />
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory italic leading-snug tracking-tight">
              "{t.quote}"
            </blockquote>
            <div className="pt-2 font-mono text-xs uppercase tracking-[0.2em] text-smoke">
              <span className="text-ivory font-medium">{t.author}</span> —{" "}
              <span className="text-gold">{t.college}</span>
              <div className="text-[10px] text-smoke/70 mt-1">{t.committee}</div>
            </div>

            {/* Testimonial Nav dots */}
            <div className="flex items-center justify-center gap-3 pt-4">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 transition-all duration-300 ${
                    activeTestimonial === idx
                      ? "w-8 bg-gold"
                      : "w-2 bg-smoke/40 hover:bg-smoke"
                  }`}
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}

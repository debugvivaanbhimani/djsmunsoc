"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles, Trophy, Users, Shield } from "lucide-react";
import DelegatePhotoGlobe from "@/components/canvas/DelegatePhotoGlobe";
import Lightbox from "@/components/ui/Lightbox";
import { useCountdown } from "@/hooks/useCountdown";
import galleryData from "../../../data/gallery.json";

export default function HeroSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const timeLeft = useCountdown("2026-10-30T09:00:00+05:30");

  return (
    <section className="relative w-full bg-cream pt-28 pb-16 border-b border-slate-200 overflow-visible">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-light-dots opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Diplomatic Intro */}
        <div className="lg:col-span-6 space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-navy shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-bold">Dwarkadas J. Sanghvi College of Engineering</span>
          </div>

          {/* Monumental Clean Headline */}
          <h1 className="font-sans font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[5.9rem] xl:text-[7.1rem] tracking-[-0.035em] text-navy leading-[0.96]">
            Debate. <br />
            <span className="text-gold">Dissent.</span> <br />
            Discussion.
          </h1>

          {/* Intro Description */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-sans">
            The Model United Nations Society of DJSCE provides Western India's most exacting forum for substantive dialogue, geopolitical crisis resolution, and collegiate student leadership.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/conferences/djsmun-2026"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all duration-200"
            >
              <span>Register Delegation</span>
              <ArrowUpRight className="w-4 h-4 text-gold" />
            </Link>

            <Link
              href="/committees"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-navy hover:border-navy transition-all duration-200 shadow-sm"
            >
              <span>Explore 7 Chambers</span>
            </Link>
          </div>

          {/* Countdown Capsule Strip */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold shrink-0" />
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-navy font-bold">
                  FLAGSHIP CONCLAVE · DJSMUN '26
                </div>
                <div className="text-xs text-slate-500">
                  30 Oct – 01 Nov 2026 · DJSCE Campus, Mumbai
                </div>
              </div>
            </div>

            {/* Countdown Badges */}
            <div className="flex items-center gap-2 font-mono">
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-center shadow-xs">
                <div className="text-base font-bold text-navy">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <div className="text-[8px] text-slate-500 uppercase tracking-wider">DAYS</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-center shadow-xs">
                <div className="text-base font-bold text-navy">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-[8px] text-slate-500 uppercase tracking-wider">HRS</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-center shadow-xs">
                <div className="text-base font-bold text-navy">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-[8px] text-slate-500 uppercase tracking-wider">MIN</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-center shadow-xs">
                <div className="text-base font-bold text-navy">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-[8px] text-slate-500 uppercase tracking-wider">SEC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Complete Uncropped 3D Delegate Photo Globe */}
        <div className="lg:col-span-6 relative flex items-center justify-center overflow-visible">
          <DelegatePhotoGlobe
            photos={galleryData.items}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        </div>
      </div>

      {/* Lightbox for inspecting selected delegate captures */}
      <Lightbox
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}

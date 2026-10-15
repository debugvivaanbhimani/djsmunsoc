"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import conferencesData from "../../../data/conferences.json";

// Verified image galleries for each conference event
const EVENT_GALLERIES: Record<string, string[]> = {
  "djsmun-2026": [
    "/assets/posters/djsmun26-poster.jpg",
    "/assets/real/unsc-session-1.jpg",
    "/assets/real/delegate-iran-unsc-best.jpg",
    "/assets/real/delegation-winners.jpg",
    "/assets/real/organizing-committee.jpg",
    "/assets/real/best-delegate-faculty.jpg",
  ],
  "youth-summit-3": [
    "/assets/posters/youth-summit-3.jpg",
    "/assets/real/committee-session-2.jpg",
    "/assets/real/executive-board-felicitation.jpg",
  ],
  "djsmun-2025": [
    "/assets/posters/djsmun25-poster.jpg",
    "/assets/real/committee-session-3.jpg",
    "/assets/real/best-delegate-gavel.jpg",
  ],
  "youth-summit-2": [
    "/assets/posters/youth-summit-2.jpg",
    "/assets/real/committee-session-4.jpg",
  ],
  "youth-summit-1": [
    "/assets/posters/youth-summit-1.jpg",
    "/assets/real/committee-session-5.jpg",
  ],
  "djmun-2023": [
    "/assets/posters/djmun-2023.jpg",
    "/assets/real/secretariat-team.jpg",
  ],
  "munch-madness": [
    "/assets/posters/munch-madness.jpg",
    "/assets/real/core-and-associate-team.jpg",
  ],
};

function EventImageSlider({
  images,
  title,
  number,
}: {
  images: string[];
  title: string;
  number: string;
}) {
  const [index, setIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden card-clean border border-slate-200/90 shadow-md bg-slate-100 group">
      <Image
        src={images[index]}
        alt={`${title} visual ${index + 1}`}
        fill
        unoptimized
        className="object-cover transition-transform duration-500 group-hover:scale-102"
      />

      {/* Numbered Pill Badge (matching reference screenshot) */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy/90 backdrop-blur-md border border-gold/40 text-gold flex items-center justify-center font-mono text-xs font-bold shadow-md z-10">
        {number}
      </div>

      {/* Interactive Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy/85 hover:bg-navy text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md z-10 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy/85 hover:bg-navy text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md z-10 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  index === i ? "w-6 bg-gold" : "w-1.5 bg-white/70 hover:bg-white"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EventDetails({
  conf,
  isFlagship,
}: {
  conf: any;
  isFlagship: boolean;
}) {
  return (
    <div className="space-y-4 flex flex-col justify-center">
      <div className="flex items-center gap-3 font-mono text-xs font-bold">
        <span className="text-gold uppercase tracking-wider">{conf.edition}</span>
        {conf.status && (
          <span
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
              conf.status === "CONCLUDED"
                ? "bg-slate-100 text-slate-600 border border-slate-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
          >
            {conf.status}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight leading-tight">
          {conf.title}
        </h3>
        {conf.subtitle && (
          <p className="font-serif text-lg text-gold italic font-medium mt-1">
            "{conf.subtitle}"
          </p>
        )}
      </div>

      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
        {conf.summary}
      </p>

      {/* Specifications Strip */}
      <div className="grid grid-cols-2 gap-3 pt-3 text-xs font-mono text-slate-600 border-t border-slate-200/80">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
          <span className="truncate">{conf.dates}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
          <span className="truncate">{conf.venue.split(",")[0]}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>{conf.committeesCount} Committees</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">YEAR:</span>
          <span>{conf.year}</span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2">
        <Link
          href={isFlagship ? "/djsmun-26" : `/conferences/${conf.slug}`}
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all"
        >
          <span>{isFlagship ? "Explore DJSMUN '26 Dossier" : "View Conference Archive"}</span>
          <ArrowUpRight className="w-4 h-4 text-gold" />
        </Link>
      </div>
    </div>
  );
}

export default function ConferencesPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const conferences = conferencesData.upcoming;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-28 text-slate-800 relative">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3 mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
          CONFERENCE ARCHIVES & CHRONOLOGY
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Conferences & Summits
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Trace the evolution of DJS MUNSoc through our flagship annual editions and bilateral youth conclaves since 2022. Scroll down to explore each historical milestone.
        </p>
      </div>

      {/* Alternating Zigzag Flow Runner Timeline */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        {/* Central Vertical Spine (Desktop only) */}
        <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-slate-200/90 -translate-x-1/2" />

        <div className="space-y-20 sm:space-y-24 relative">
          {conferences.map((conf, index) => {
            const isEven = index % 2 === 0;
            const images = EVENT_GALLERIES[conf.slug] || [conf.poster];
            const numberFormatted = String(index + 1).padStart(2, "0");
            const isFlagship = conf.slug === "djsmun-2026";

            return (
              <div key={conf.id} className="relative">
                {/* Central Timeline Node (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-4 border-navy shadow-md items-center justify-center z-20">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </div>

                {/* 2-Column Zigzag Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  {/* Left Column */}
                  <div className={isEven ? "order-1" : "order-2 lg:order-1"}>
                    {isEven ? (
                      <EventImageSlider
                        images={images}
                        title={conf.title}
                        number={numberFormatted}
                      />
                    ) : (
                      <EventDetails conf={conf} isFlagship={isFlagship} />
                    )}
                  </div>

                  {/* Right Column */}
                  <div className={isEven ? "order-2" : "order-1 lg:order-2"}>
                    {isEven ? (
                      <EventDetails conf={conf} isFlagship={isFlagship} />
                    ) : (
                      <EventImageSlider
                        images={images}
                        title={conf.title}
                        number={numberFormatted}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Scroll-To-Top Button (matching reference) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-navy text-gold hover:bg-navy-light border border-gold/40 shadow-2xl flex items-center justify-center transition-all duration-300 z-50 cursor-pointer hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-gold" />
        </button>
      )}
    </div>
  );
}

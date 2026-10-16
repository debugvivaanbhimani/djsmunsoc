"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Users, CheckCircle2 } from "lucide-react";
import conferencesData from "../../../data/conferences.json";

export default function HorizontalConferences() {
  const upcomingConfs = conferencesData.upcoming.slice(0, 3);

  return (
    <section id="conferences" className="bg-cream text-navy py-24 border-t border-b border-navy/10 relative">
      <div className="absolute inset-0 bg-cream-dots opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-navy font-bold">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>CONFERENCES & FLAGSHIP SUMMITS</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
            A forum for substantive dialogue.
          </h2>
          <p className="text-base text-slate leading-relaxed">
            DJS MUNSOC convenes collegiate and school delegates from across India for rigorous committee proceedings, considered negotiation, and memorable diplomatic exchanges.
          </p>
        </div>

        {/* Featured Conference Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: DJSMUN '26 (Primary Flagship) */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-navy/10 p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  REGISTRATIONS OPEN
                </span>
                <span className="text-gold font-bold">14TH EDITION / 2026</span>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate font-semibold">
                  FLAGSHIP THREE-DAY CONCLAVE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-navy mt-1">
                  DJSMUN '26
                </h3>
                <p className="font-serif text-lg text-gold font-medium italic mt-1">
                  "Where diplomacy finds its voice."
                </p>
              </div>

              <p className="text-sm text-slate leading-relaxed">
                Our hallmark simulation convened at the DJSCE campus. 7 specialized chambers spanning the UN Security Council, economic councils, and crisis directives with over 450 envoys.
              </p>

              {/* Poster Preview */}
              <div className="relative h-64 w-full rounded-xl overflow-hidden border border-navy/10 shadow-sm bg-navy">
                <Image
                  src="/assets/posters/djsmun26-poster.jpg"
                  alt="DJSMUN '26"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Quick Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-navy/10 font-mono text-xs text-slate">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold shrink-0" />
                  <span>30 OCT – 01 NOV 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <span>DJSCE, MUMBAI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold shrink-0" />
                  <span>7 COMMITTEES</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-navy/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-slate uppercase block">DELEGATE DEPOSIT</span>
                <span className="font-serif text-xl font-bold text-navy">INR 2,200</span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/conferences/djsmun-2026"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-cream hover:bg-navy-dark transition-colors"
                >
                  <span>Inspect Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://forms.gle/djsmun2026"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold bg-gold/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy hover:bg-gold transition-colors"
                >
                  Register
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 & 3: Youth Summit 3.0 & Archive */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            {/* Youth Summit 3.0 Card */}
            <div className="rounded-2xl bg-white border border-navy/10 p-8 shadow-xl space-y-6 flex-1 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs font-bold">
                  <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1">
                    CONCLUDED
                  </span>
                  <span className="text-slate">2026 EDITION</span>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="relative h-28 w-20 shrink-0 rounded-lg overflow-hidden border border-navy/10 shadow-sm">
                    <Image
                      src="/assets/posters/youth-summit-3.jpg"
                      alt="Youth Summit 3.0"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-navy">
                      DJS Youth Summit 3.0
                    </h3>
                    <p className="text-xs font-mono text-gold uppercase mt-1">
                      28 – 29TH MARCH, 2026
                    </p>
                    <p className="text-xs text-slate mt-2 line-clamp-3">
                      India — A strong voice in global dialogue. Tailored for collegiate and high-school orators.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy/10 flex items-center justify-between">
                <span className="font-serif text-base font-bold text-navy">5 Committees</span>
                <Link
                  href="/conferences/youth-summit-3"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-navy hover:text-gold uppercase tracking-wider"
                >
                  <span>View Summit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Historical Milestone Card */}
            <div className="rounded-2xl bg-navy text-cream p-8 shadow-xl space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold font-bold">
                  HERITAGE & ARCHIVE
                </span>
                <h3 className="font-serif text-2xl font-bold text-cream mt-1">
                  Historical Conferences
                </h3>
                <p className="text-xs text-cream/70 mt-2 leading-relaxed">
                  Explore our documented editions including DJMUN 2025, Youth Summit 2.0, DJMUN 2023, and MUNch Madness.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-gold">4 Concluded Chapters</span>
                <Link
                  href="/djsmun-26"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cream hover:text-gold uppercase tracking-wider"
                >
                  <span>Explore Archive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

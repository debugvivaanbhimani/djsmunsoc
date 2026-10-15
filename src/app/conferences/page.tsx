"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Users, CheckCircle2 } from "lucide-react";
import conferencesData from "../../../data/conferences.json";

export default function ConferencesPage() {
  const djsmun26 = conferencesData.upcoming.find((c) => c.slug === "djsmun-2026") || conferencesData.upcoming[0];
  const youthSummit3 = conferencesData.upcoming.find((c) => c.slug === "youth-summit-3") || conferencesData.upcoming[1];
  const pastConferences = conferencesData.upcoming.filter((c) => c.status === "CONCLUDED");

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3 mb-14">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
          CONFERENCE PORTFOLIO · 2022 – 2026
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Conferences & Summits
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          From our flagship annual edition convening over 300 delegates, to bilateral youth conclaves and historic crisis simulations.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Flagship Conference (DJSMUN '26) */}
        <div className="card-clean p-8 sm:p-12 overflow-hidden relative group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  FLAGSHIP SIMULATION · CONCLUDED
                </span>
                <span className="text-gold font-bold">14TH ANNUAL EDITION</span>
              </div>

              <div>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-navy tracking-tight">
                  DJSMUN '26
                </h2>
                <p className="font-serif text-xl text-gold italic font-medium mt-1">
                  "Navigating the Multipolar Order"
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                Hosted on 3rd & 4th October 2026 at the DJSCE Campus, Mumbai. Convening over 300 collegiate delegates across 4 specialized councils with authentic parliamentary crisis directives and unmoderated caucus negotiations.
              </p>

              {/* Specifications Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-200 text-xs font-mono text-slate-600">
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">DATES</div>
                  <div className="font-bold text-navy mt-0.5">3–4 OCT 2026</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">VENUE</div>
                  <div className="font-bold text-navy mt-0.5">DJSCE, MUMBAI</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">DELEGATES</div>
                  <div className="font-bold text-gold mt-0.5">300+ CONVENED</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">COUNCILS</div>
                  <div className="font-bold text-navy mt-0.5">4 COMMITTEES</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/djsmun-26"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all"
                >
                  <span>View DJSMUN '26 Recap & Committees</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-navy hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <span>View Conference Captures</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Real Photo Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-navy">
                <Image
                  src="/assets/real/secretariat-team.jpg"
                  alt="DJSMUN 2026"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="font-mono text-[10px] text-gold uppercase tracking-wider font-bold">OCTOBER 3–4, 2026</div>
                  <div className="font-serif text-lg font-bold">DJSMUN '26 Executive Directorate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Youth Summit 3.0 Spotlight */}
        {youthSummit3 && (
          <div className="card-clean p-8 sm:p-10 border-l-4 border-l-gold">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-full max-w-xs h-72 rounded-xl overflow-hidden border border-slate-200 shadow-md">
                  <Image
                    src={youthSummit3.poster}
                    alt={youthSummit3.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-8 space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                  CONCLAVE · 3RD EDITION
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                  {youthSummit3.title}
                </h2>
                <p className="text-sm font-serif italic text-gold">
                  "{youthSummit3.subtitle}"
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {youthSummit3.summary} An intense platform specifically curated to foster oratory and parliamentary skills in emerging collegiate diplomats.
                </p>
                <div className="flex flex-wrap gap-6 pt-2 font-mono text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold shrink-0" />
                    <span>{youthSummit3.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span>{youthSummit3.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold shrink-0" />
                    <span>{youthSummit3.committeesCount} Committees</span>
                  </div>
                </div>
                <div className="pt-3">
                  <Link
                    href={`/conferences/${youthSummit3.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-navy hover:text-gold tracking-wider"
                  >
                    <span>View Youth Summit Dossier</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Past Editions & Concluded Summits */}
        <div className="space-y-8 pt-4">
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <div className="font-mono text-xs uppercase tracking-widest text-navy font-bold">
              ARCHIVAL CHRONOLOGY
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              Past Editions & Concluded Summits
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              A documented timeline of conferences organized by DJS MUNSoc with verified posters and committee chambers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastConferences.map((conf) => (
              <div key={conf.id} className="card-clean overflow-hidden flex flex-col justify-between group">
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={conf.poster}
                    alt={conf.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-md text-[10px] font-mono font-bold text-navy shadow-sm">
                    {conf.year}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                      {conf.edition}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-navy">
                      {conf.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {conf.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-500">{conf.dates}</span>
                    <Link
                      href={`/conferences/${conf.slug}`}
                      className="text-navy font-bold hover:text-gold inline-flex items-center gap-1"
                    >
                      <span>Archive</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

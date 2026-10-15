"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Trophy, Award, Medal, CheckCircle2, ArrowUpRight } from "lucide-react";
import achievementsData from "../../../data/achievements.json";

export default function AchievementsPage() {
  const [selectedYear, setSelectedYear] = useState("ALL");

  const years = ["ALL", "2026", "2025", "2024"];

  const filtered = achievementsData.filter((a) => {
    if (selectedYear === "ALL") return true;
    return a.year === selectedYear;
  });

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1 text-xs font-mono uppercase tracking-wider text-navy font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>INSTITUTIONAL PEDIGREE · NATIONAL CONQUESTS</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Delegation Honors Ledger
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          A verified chronological record of delegations fielded by DJS MUNSOC across India's premier collegiate circuits, securing Best Delegation trophies and individual gavels.
        </p>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono text-xs max-w-3xl">
          <div className="card-clean p-4 space-y-0.5">
            <div className="text-slate-400 text-[10px] uppercase">CIRCUITS SWEPT</div>
            <div className="font-serif text-2xl font-bold text-navy">18+ National</div>
          </div>
          <div className="card-clean p-4 space-y-0.5">
            <div className="text-slate-400 text-[10px] uppercase">BEST DELEGATE GAVELS</div>
            <div className="font-serif text-2xl font-bold text-gold">42+ Won</div>
          </div>
          <div className="card-clean p-4 space-y-0.5">
            <div className="text-slate-400 text-[10px] uppercase">DELEGATION TROPHIES</div>
            <div className="font-serif text-2xl font-bold text-navy">6 Major</div>
          </div>
          <div className="card-clean p-4 space-y-0.5">
            <div className="text-slate-400 text-[10px] uppercase">DELEGATES TRAINED</div>
            <div className="font-serif text-2xl font-bold text-navy">300+ Active</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Visual Showcase: Moments of National Triumph */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-slate-200 pb-3">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
              MOMENTS OF NATIONAL VICTORY
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy">
              Triumphs on the Circuit
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Grand Trophy Banner */}
            <div className="lg:col-span-7 card-clean overflow-hidden group flex flex-col justify-between">
              <div className="relative h-72 sm:h-96 w-full bg-slate-100 overflow-hidden">
                <Image
                  src="/assets/real/delegation-winners.jpg"
                  alt="DJS MUNSOC Best Delegation Winners"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3 py-0.5 text-[10px] font-mono font-bold text-gold uppercase tracking-wider">
                    <Trophy className="w-3 h-3 text-gold" />
                    <span>NATIONAL CHAMPIONS</span>
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Best Delegation Laureates
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                    DJSCE delegates lifting the championship trophy following clean sweeps across multiple council chambers.
                  </p>
                </div>
              </div>
            </div>

            {/* Dual Right Spotlights */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              <div className="card-clean overflow-hidden group flex-1 flex flex-col sm:flex-row lg:flex-col">
                <div className="relative h-48 sm:h-auto sm:w-1/2 lg:w-full lg:h-44 bg-slate-100 shrink-0 overflow-hidden">
                  <Image
                    src="/assets/real/best-delegate-gavel.jpg"
                    alt="Best Delegate Presentation"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-center">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                    INDIVIDUAL GAVELS
                  </div>
                  <h4 className="font-serif text-xl font-bold text-navy">
                    Best Delegate Accolades
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Celebrating supreme oratorical mastery, tactical negotiation, and draft resolution sponsorship across committee floors.
                  </p>
                </div>
              </div>

              <div className="card-clean overflow-hidden group flex-1 flex flex-col sm:flex-row lg:flex-col">
                <div className="relative h-48 sm:h-auto sm:w-1/2 lg:w-full lg:h-44 bg-slate-100 shrink-0 overflow-hidden">
                  <Image
                    src="/assets/real/best-delegate-faculty.jpg"
                    alt="Best Delegate with Faculty"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-center">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                    ACADEMIC RECOGNITION
                  </div>
                  <h4 className="font-serif text-xl font-bold text-navy">
                    Honored by Faculty Dignitaries
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Delegates felicitated alongside college faculty mentors, bridging engineering analytical rigor with sovereign diplomacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 card-clean p-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 mr-2">FILTER BY YEAR:</span>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedYear === y
                    ? "bg-navy text-white font-bold shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs font-bold text-slate-500">
            RECORDED: {filtered.length} CITATIONS
          </span>
        </div>

        {/* Ledger Table */}
        <div className="card-clean overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 font-mono text-xs uppercase text-slate-600">
                  <th className="py-4 px-6 font-bold">Year</th>
                  <th className="py-4 px-6 font-bold">Host Conference</th>
                  <th className="py-4 px-6 font-bold">Chamber / Committee</th>
                  <th className="py-4 px-6 font-bold">Award Citation</th>
                  <th className="py-4 px-6 font-bold">Delegate & Portfolio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-gold">
                      {item.year}
                    </td>
                    <td className="py-4 px-6 font-serif text-base font-bold text-navy">
                      {item.conference}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs uppercase text-slate-600 font-semibold">
                      {item.committee}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-xs font-bold text-gold-hover">
                        <Trophy className="w-3 h-3 text-gold shrink-0" />
                        <span>{item.award}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                        {item.delegate}
                      </div>
                      <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                        {item.delegation}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

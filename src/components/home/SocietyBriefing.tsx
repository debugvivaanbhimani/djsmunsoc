"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award, Compass, Shield, Users, Sparkles } from "lucide-react";

export default function SocietyBriefing() {
  return (
    <section className="bg-white py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Mission */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-navy font-bold">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span>01 — THE SOCIETY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight">
              A decade of sovereign discourse.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-sans">
              Founded in 2013 at Dwarkadas J. Sanghvi College of Engineering, DJS MUNSOC has evolved into one of India's most intellectually rigorous collegiate societies. We convene orators, debaters, and future diplomats to dissect global crises through the prism of international law and realpolitik.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-navy hover:text-gold transition-colors"
              >
                <span>Inspect Delegation Honors Ledger</span>
                <ArrowUpRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Editorial Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card-clean p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-navy">
                <Shield className="w-5 h-5 text-gold shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  PILLAR 01
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">
                Substantive Rigour
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Background guides, directives, and resolutions adhere strictly to authentic UN procedural protocols and fast-paced crisis dynamics.
              </p>
            </div>

            <div className="card-clean p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-navy">
                <Compass className="w-5 h-5 text-gold shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  PILLAR 02
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">
                Multilateral Arenas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hosting delegations across law, technology, economics, and humanities colleges across Mumbai, Pune, Delhi, and Bangalore.
              </p>
            </div>

            <div className="card-clean p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-navy">
                <Award className="w-5 h-5 text-gold shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  PILLAR 03
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">
                Institutional Pedigree
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consistently sweeping flagship circuits nationwide, including Harvard MUN India, IIT Bombay, GLC Mumbai, and BITS Pilani.
              </p>
            </div>

            <div className="card-clean p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-navy">
                <Users className="w-5 h-5 text-gold shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  PILLAR 04
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">
                Lifelong Diplomatic Network
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our alumni excel across global consulting, international diplomacy, corporate legal counsel, and sovereign civil services.
              </p>
            </div>
          </div>
        </div>

        {/* 3-Photo Authentic Society Chronicle Strip */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>THE ARCHIVE IN ACTION</span>
            </div>
            <Link
              href="/gallery"
              className="text-xs font-mono font-bold text-navy hover:text-gold uppercase tracking-wider flex items-center gap-1"
            >
              <span>View Full Visual Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/secretariat"
              className="card-clean overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                <Image
                  src="/assets/real/secretariat-team.jpg"
                  alt="DJS MUNSOC Secretariat Board"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gold font-bold">
                    EXECUTIVE LEADERSHIP
                  </div>
                  <h4 className="font-serif text-lg font-bold leading-tight">
                    The Secretariat Directorate
                  </h4>
                </div>
              </div>
              <div className="p-4 bg-white flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600">Central Governing Board</span>
                <span className="text-navy font-bold group-hover:text-gold flex items-center gap-1">
                  <span>Meet Team</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/committees"
              className="card-clean overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                <Image
                  src="/assets/real/committee-session-1.jpg"
                  alt="Committee Proceedings"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gold font-bold">
                    CHAMBER PROCEEDINGS
                  </div>
                  <h4 className="font-serif text-lg font-bold leading-tight">
                    High-Stakes Caucuses
                  </h4>
                </div>
              </div>
              <div className="p-4 bg-white flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600">7 Sovereign Councils</span>
                <span className="text-navy font-bold group-hover:text-gold flex items-center gap-1">
                  <span>Explore Chambers</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/achievements"
              className="card-clean overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                <Image
                  src="/assets/real/delegation-winners.jpg"
                  alt="Delegation Winners"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gold font-bold">
                    VALEDICTORY HONORS
                  </div>
                  <h4 className="font-serif text-lg font-bold leading-tight">
                    National Delegations
                  </h4>
                </div>
              </div>
              <div className="p-4 bg-white flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600">Best Delegation Trophies</span>
                <span className="text-navy font-bold group-hover:text-gold flex items-center gap-1">
                  <span>View Honors</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

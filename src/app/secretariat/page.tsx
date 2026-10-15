"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Mail, ArrowUpRight, Download, ShieldCheck, Users, Award } from "lucide-react";
import secretariatData from "../../../data/secretariat.json";
import sponsorsData from "../../../data/sponsors.json";

function LinkedInIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6c0-.88-.72-1.6-1.6-1.6a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.6 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8Z" />
    </svg>
  );
}

export default function SecretariatPage() {
  const secGen = secretariatData[0];
  const otherMembers = secretariatData.slice(1);

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
          EXECUTIVE LEADERSHIP · 2026–2027
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          The Executive Secretariat
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Guiding substantive academic rigour, collegiate diplomacy, and conference operations for the Model United Nations Society of Dwarkadas J. Sanghvi College of Engineering.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Full Secretariat Directorate Feature Banner */}
        <div className="card-clean overflow-hidden group">
          <div className="relative h-80 sm:h-96 md:h-[480px] w-full bg-slate-100 overflow-hidden">
            <Image
              src="/assets/real/secretariat-team.jpg"
              alt="DJS MUNSOC Secretariat Board"
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                The Secretariat Directorate
              </h2>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                Stewarding the legacy of DJS MUNSOC across strategic institutional diplomacy, academic substance, and seamless summit execution.
              </p>
            </div>
          </div>
        </div>

        {/* Secretary-General Feature Card */}
        {secGen && (
          <div className="card-clean p-8 sm:p-12 overflow-hidden border-l-4 border-l-gold">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-full max-w-xs h-96 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-navy">
                  <Image
                    src={secGen.portrait}
                    alt={secGen.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="font-serif text-xl font-bold">{secGen.name}</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-5">
                <div className="space-y-1">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                    Dispatch from the Secretary-General
                  </h2>
                </div>

                <blockquote className="font-serif text-lg sm:text-xl text-slate-700 italic border-l-2 border-l-gold pl-4 py-1 leading-snug">
                  "At DJS MUNSOC, our fundamental conviction is that debate without substantive depth is mere noise. We construct simulation environments where every sovereign clause carries weight, every directive changes the room, and every delegate leaves transformed."
                </blockquote>

                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {secGen.bio}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                  <a
                    href={`mailto:${secGen.email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 font-bold text-navy hover:text-gold hover:border-gold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    <span>{secGen.email}</span>
                  </a>
                  <a
                    href={secGen.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 font-bold text-navy hover:text-gold hover:border-gold transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-navy" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Directorate Members Grid */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
              DEPARTMENTAL SECRETARIAT
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy">
              Executive Directorate
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherMembers.map((member) => (
              <div key={member.id} className="card-clean overflow-hidden flex flex-col justify-between group">
                <div className="relative h-72 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={member.portrait}
                    alt={member.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 space-y-2 flex-1 flex flex-col justify-start bg-white">
                  <h3 className="font-serif text-2xl font-bold text-navy">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distinguished Faculty Advisory Board */}
        <div className="card-clean p-8 sm:p-12 overflow-hidden border-l-4 border-l-navy bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative h-72 sm:h-84 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md">
              <Image
                src="/assets/real/faculty-advisors.jpg"
                alt="Faculty Advisors of DJS MUNSOC"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="font-serif text-lg font-bold">DJSCE Faculty Advisory Board</div>
              </div>
            </div>
            <div className="md:col-span-7 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                Guided by Academic Excellence
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The Model United Nations Society operates under the steadfast guidance and mentorship of distinguished faculty members of Dwarkadas J. Sanghvi College of Engineering. Their enduring patronage ensures institutional decorum, ethical stewardship, and academic excellence across all collegiate undertakings.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs text-slate-600">
                <div className="rounded-lg bg-slate-50 border border-slate-200 px-3.5 py-2">
                  <span className="text-navy font-bold">Dwarkadas J. Sanghvi College of Engineering</span>
                </div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 px-3.5 py-2">
                  <span className="text-gold font-bold">Vile Parle (West), Mumbai</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core & Associate Organizing Committee */}
        <div className="card-clean overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            <div className="md:col-span-6 p-8 sm:p-12 space-y-4 flex flex-col justify-center bg-white">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                Core & Associate Organizing Committee
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Behind every smooth-running committee session, precision-timed crisis injection, and hospitality arrangement stands our dedicated cohort of core and associate members. From logistics, hospitality, delegate registrations, and audio-visual command to design and public relations, they form the operational backbone of DJS MUNSOC.
              </p>
              <div className="pt-2 flex items-center gap-4 font-mono text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-bold text-navy">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <span>45+ Student Organizers</span>
                </div>
                <div>·</div>
                <div>7 Operations Wings</div>
              </div>
            </div>
            <div className="md:col-span-6 relative h-72 sm:h-96 md:h-auto min-h-[300px] bg-slate-100 overflow-hidden">
              <Image
                src="/assets/real/core-and-associate-team.jpg"
                alt="Core and Associate Members"
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Executive Board Felicitation */}
        <div className="card-clean p-8 sm:p-12 overflow-hidden border-l-4 border-l-gold bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                Honoring the Executive Board
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Presidents, Chairpersons, and Directors honored on stage during the valedictory ceremony for steering exacting debate, adjudicating complex crisis directives, and upholding the integrity of the council chambers.
              </p>
              <div className="pt-1">
                <Link
                  href="/committees"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors"
                >
                  <span>Explore 7 Substantive Chambers & Agendas</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-5 relative h-72 sm:h-84 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md">
              <Image
                src="/assets/real/executive-board-felicitation.jpg"
                alt="Executive Board Members Felicitation"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="font-serif text-lg font-bold">Chamber Presidents & Directors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional & Corporate Sponsorships Section */}
        <div className="card-clean p-8 sm:p-12 space-y-8 bg-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                Institutional & Corporate Partners
              </h2>
              <p className="text-sm text-slate-600 max-w-lg">
                Collaborate with Western India's most prestigious collegiate conference and engage hundreds of top university students.
              </p>
            </div>

            <div>
              <a
                href={sponsorsData.deckUrl}
                onClick={(e) => {
                  e.preventDefault();
                  alert("Official DJS MUNSOC 2026-27 Partnership Prospectus will be downloaded.");
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-navy-light transition-all"
              >
                <Download className="w-3.5 h-3.5 text-gold" />
                <span>Download Partnership Deck (PDF)</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {sponsorsData.partners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-center space-y-2 hover:bg-white hover:border-navy transition-all shadow-xs"
              >
                <div className="relative h-10 w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                  [{partner.tier}]
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

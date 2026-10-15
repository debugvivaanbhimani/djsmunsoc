"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, RotateCw, Download, MapPin, Calendar, Users } from "lucide-react";

const COMMITTEES = [
  {
    id: "unsc",
    code: "UNSC",
    fullName: "United Nations Security Council",
    level: "Advanced / Crisis",
    color: "#0B1930",
    agendas: [
      "Evaluating Preemptive Sovereign Military Actions in Non-Contiguous Maritime Zones",
      "Establishment of Demilitarized Verification Regimes in Contested Littoral Corridors",
    ],
    eb: [
      { role: "President", name: "Executive Board Member" },
      { role: "Vice-President", name: "Executive Board Member" },
    ],
    desc: "The preeminent body tasked with global peace and security, operating with instantaneous crisis injections and binding presidential statements.",
    image: "/assets/real/committee-session-1.jpg",
  },
  {
    id: "unhrc",
    code: "UNHRC",
    fullName: "United Nations Human Rights Council",
    level: "Intermediate",
    color: "#1a3a6e",
    agendas: [
      "Addressing Systematic Human Rights Violations in Conflict Zones Through International Accountability",
      "Protecting the Rights of Internally Displaced Persons in Climate-Induced Migration",
    ],
    eb: [
      { role: "President", name: "Executive Board Member" },
      { role: "Vice-President", name: "Executive Board Member" },
    ],
    desc: "The principal UN body responsible for promoting and protecting human rights globally, evaluating state compliance and humanitarian accountability.",
    image: "/assets/real/committee-session-2.jpg",
  },
  {
    id: "aippm",
    code: "AIPPM",
    fullName: "All India Political Parties Meet",
    level: "Beginner / Intermediate",
    color: "#7c3d0f",
    agendas: [
      "Deliberating Legislative Frameworks for Uniform Civil Code Implementation Across States",
      "Addressing Electoral Bond Transparency and Political Finance Reform",
    ],
    eb: [
      { role: "Chairperson", name: "Executive Board Member" },
      { role: "Rapporteur", name: "Executive Board Member" },
    ],
    desc: "A dynamic Indian parliamentary committee simulating cross-party deliberations, coalition negotiations, and domestic policy resolutions.",
    image: "/assets/real/committee-session-3.jpg",
  },
  {
    id: "unw",
    code: "UNW",
    fullName: "United Nations Women",
    level: "Beginner",
    color: "#5c1a6e",
    agendas: [
      "Achieving Economic Empowerment and Financial Inclusion for Women in Developing Economies",
      "Combating Gender-Based Violence in Digital Spaces and Social Media Platforms",
    ],
    eb: [
      { role: "Chairperson", name: "Executive Board Member" },
      { role: "Vice-Chair", name: "Executive Board Member" },
    ],
    desc: "Dedicated to gender equality and the empowerment of women worldwide, drafting binding resolutions across socio-economic and political domains.",
    image: "/assets/real/committee-session-4.jpg",
  },
];

function CommitteeFlipCard({ comm }: { comm: typeof COMMITTEES[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 h-[460px] w-full cursor-pointer select-none"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative h-full w-full transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden card-clean flex flex-col justify-between group bg-white border border-slate-200">
          <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
            <Image
              src={comm.image}
              alt={comm.code}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-6 bg-white space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-gold font-bold uppercase tracking-wider">{comm.level}</span>
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  TAP TO FLIP <RotateCw className="w-3 h-3 text-gold" />
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-navy tracking-tight">{comm.code}</h3>
              <p className="font-mono text-xs uppercase tracking-wider text-slate-700 font-semibold">{comm.fullName}</p>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 pt-1">{comm.desc}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-navy font-bold uppercase tracking-wider flex items-center justify-between group-hover:text-gold transition-colors">
              <span>View Agendas & Executive Board</span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-[#0E1E38] border border-gold/40 p-6 flex flex-col justify-between shadow-2xl"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="border-b border-gold/30 pb-3 flex items-center justify-between font-mono text-xs text-gold font-bold">
            <span>{comm.code} // CLASSIFIED</span>
            <span>{comm.level.toUpperCase()}</span>
          </div>

          <div className="space-y-4 flex-1 pt-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-cream/60">SUBSTANTIVE AGENDAS</div>
            {comm.agendas.map((ag, i) => (
              <div key={i} className="space-y-1">
                <div className="font-mono text-[10px] text-gold font-bold">AGENDA {String(i + 1).padStart(2, "0")}</div>
                <div className="text-xs text-white/90 leading-snug">{ag}</div>
              </div>
            ))}

            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="font-mono text-[9px] uppercase tracking-wider text-cream/60">EXECUTIVE BOARD</div>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs text-white">
                {comm.eb.map((m, i) => (
                  <div key={i}>
                    <div className="text-gold text-[9px] uppercase">{m.role}</div>
                    <div className="truncate text-[11px]">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <a
              href="#"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-gold hover:underline font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Study Guide</span>
            </a>
            <span className="text-cream/40 text-[10px]">CLICK TO REVERT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DJSMUN26Page() {
  return (
    <div className="bg-cream min-h-screen pt-24 pb-24 text-slate-800">
      {/* Hero Banner — Conference Concluded */}
      <div className="relative overflow-hidden">
        <div className="relative h-[480px] sm:h-[560px]">
          <Image
            src="/assets/real/secretariat-team.jpg"
            alt="DJSMUN 2026"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl space-y-5">
                <div className="flex items-center gap-3 font-mono text-xs font-bold text-gold">
                  <span>CONCLUDED</span>
                  <span>·</span>
                  <span>4TH FLAGSHIP EDITION</span>
                </div>

                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.05]">
                  DJSMUN '26
                </h1>
                <p className="font-serif text-xl sm:text-2xl text-gold italic font-medium">
                  "Navigating the Multipolar Order"
                </p>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  The 4th flagship edition of DJSMUN, hosted at Dwarkadas J. Sanghvi College of Engineering, brought together delegates from across India for two days of high-intensity debate, coalition-building, and diplomatic resolution.
                </p>

                <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-white/70 pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold shrink-0" />
                    <span>3rd – 4th October 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span>DJSCE Campus, Vile Parle, Mumbai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold shrink-0" />
                    <span>4 Committees · 100+ Delegates Impacted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-8 relative z-10">
          {[
            { label: "Delegates Impacted", value: "100+" },
            { label: "Committees", value: "4" },
            { label: "Colleges", value: "30+" },
            { label: "Days", value: "2" },
          ].map((stat) => (
            <div key={stat.label} className="card-clean p-5 text-center">
              <div className="font-serif text-3xl font-bold text-navy">{stat.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        {/* Committees Section */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-5">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold mb-1">
              THE FOUR COUNCILS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              Simulated Committees at DJSMUN '26
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Each chamber operated under authentic parliamentary procedure with live crisis injections, press conferences, and working paper drafting. Tap any card to flip and inspect classified agendas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMITTEES.map((comm) => (
              <CommitteeFlipCard key={comm.id} comm={comm} />
            ))}
          </div>
        </div>

        {/* Conference Recap Photo Grid */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-5">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold mb-1">
              CONFERENCE CAPTURES
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              Moments from the Floor
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: "/assets/real/committee-session-1.jpg", cap: "Coalition-building during unmoderated caucuses" },
              { img: "/assets/real/committee-session-2.jpg", cap: "Delegates on the General Speakers List" },
              { img: "/assets/real/executive-board-felicitation.jpg", cap: "Executive Board Chairs felicitated at valedictory" },
              { img: "/assets/real/delegation-winners.jpg", cap: "Best Delegation champions on stage" },
              { img: "/assets/real/best-delegate-gavel.jpg", cap: "Individual gavel presentations" },
              { img: "/assets/real/secretary-general.jpg", cap: "Opening address by the Secretary-General" },
            ].map((item, i) => (
              <div key={i} className="card-clean overflow-hidden group">
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.img}
                    alt={item.cap}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="text-xs text-slate-600 font-sans">{item.cap}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all"
            >
              <span>View Full Conference Gallery</span>
              <ArrowUpRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>

        {/* Honors & Valedictory */}
        <div className="card-clean p-8 sm:p-12 overflow-hidden border-l-4 border-l-gold bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                VALEDICTORY & HONORS
              </div>
              <h2 className="font-serif text-3xl font-bold text-navy">
                Best Delegation & Individual Gavels
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The valedictory ceremony at DJSMUN '26 honored outstanding diplomatic performance across all four chambers. Best Delegation trophies and individual gavels were awarded to delegates who demonstrated exceptional oratory, resolution-drafting, and crisis-navigation skills.
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors"
              >
                <span>View Honors & Awards in Gallery</span>
                <ArrowUpRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
            <div className="md:col-span-5 relative h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <Image
                src="/assets/real/delegation-winners.jpg"
                alt="Best Delegation DJSMUN 2026"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Secretariat */}
        <div className="card-clean overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
              <Image
                src="/assets/real/secretariat-team.jpg"
                alt="DJSMUN 2026 Secretariat"
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
            </div>
            <div className="p-8 sm:p-10 space-y-4 flex flex-col justify-center bg-white">
              <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                EXECUTIVE LEADERSHIP
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                The Secretariat Behind DJSMUN '26
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Orchestrated by a dedicated secretariat team from DJSCE, the 4th flagship edition was brought to life through months of planning, academic research, and institutional coordination.
              </p>
              <Link
                href="/secretariat"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors"
              >
                <span>Meet the Secretariat</span>
                <ArrowUpRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

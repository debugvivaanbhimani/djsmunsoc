"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Sparkles, Download, ArrowUpRight, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Understanding Model United Nations",
    image: "/assets/real/committee-session-3.jpg",
    imageCaption: "Envoys raising sovereign placards on the council floor to introduce motions.",
    summary:
      "A simulation of the United Nations in which students assume the roles of sovereign diplomats representing distinct member states. Delegates debate, draft resolutions, and navigate geopolitical crises according to international law.",
    details: [
      "You represent the foreign policy of your assigned nation, not your personal beliefs.",
      "The goal is building multilateral coalitions to pass binding or recommendatory draft resolutions.",
      "Diplomatic decorum, courtesy, and parliamentary language are enforced by the Executive Board.",
    ],
    term: {
      title: "Delegate",
      definition: "A student representing a sovereign nation, organization, or historical personality in a committee chamber.",
    },
  },
  {
    num: "02",
    title: "Rules of Procedure & Caucus Dynamics",
    image: "/assets/real/committee-session-1.jpg",
    imageCaption: "Cross-bloc unmoderated negotiations and coalition consultations in action.",
    summary:
      "Debate proceeds under structured rules of procedure governed by motions raised by delegates from the floor.",
    details: [
      "General Speakers List (GSL): The primary default debate forum where nations deliver broad opening policy speeches.",
      "Moderated Caucus: A focused, timed round of short speeches addressing a specific sub-issue (e.g. 10 minutes total, 60 seconds per speaker).",
      "Unmoderated Caucus: Informal suspension of rules allowing delegates to walk around, negotiate blocs, and author working papers.",
    ],
    term: {
      title: "Moderated Caucus",
      definition: "A structured, rapid debate on a specific agenda subset with predetermined speaker time limits.",
    },
  },
  {
    num: "03",
    title: "Drafting Position Papers & Resolutions",
    image: "/assets/real/committee-session-4.jpg",
    imageCaption: "Delegates collaborating on clauses and sponsor directives during working paper drafting.",
    summary:
      "Concrete solutions are articulated through formal documents presented to the Executive Board and the chamber.",
    details: [
      "Position Paper: A one to two-page policy briefing submitted prior to conference detailing your nation's historical stance and proposed solutions.",
      "Working Paper: Informal compilation of ideas, clauses, and policy directions authored during unmoderated caucuses.",
      "Draft Resolution: A formally sponsored document containing preambulatory clauses (context) and numbered operative clauses (actions).",
    ],
    term: {
      title: "Operative Clauses",
      definition: "Action-oriented clauses beginning with verbs (e.g. 'Urges', 'Authorizes', 'Establishes') directing concrete multilateral policy.",
    },
  },
  {
    num: "04",
    title: "Conference Etiquette, Formals & Dress Code",
    image: "/assets/real/best-delegate-gavel.jpg",
    imageCaption: "Western & Indian business formals worn with stately diplomatic decorum.",
    summary:
      "A prestigious summit requires professional decorum, respect for the Executive Board, and sharp presentation.",
    details: [
      "Western Business Formals: Suits, blazers, formal trousers, formal shirts, neckties, formal skirts or dresses, and formal shoes.",
      "Indian Traditional Formals: Bandhgala suits, Nehru jackets, crisp kurta-pajamas with formal jackets, sarees, or formal salwar suits.",
      "Points of Order & Inquiries: Respectfully raised when committee procedural rules are violated or for clarification from the chair.",
    ],
    term: {
      title: "Point of Order",
      definition: "A procedural inquiry raised by a delegate when improper parliamentary rules have been applied by the chair.",
    },
  },
];

const GLOSSARY = [
  {
    term: "Placard",
    desc: "The physical sign displaying your country's name, raised to vote, speak, or introduce motions.",
  },
  {
    term: "Right of Reply",
    desc: "A formal speech granted when a sovereign nation's territorial integrity or national honor is directly insulted.",
  },
  {
    term: "Point of Inquiry",
    desc: "A question directed to the Executive Board regarding parliamentary rules or committee proceedings.",
  },
  {
    term: "Presidential Statement",
    desc: "A unanimous consensus declaration issued by the Security Council in response to an immediate crisis directive.",
  },
  {
    term: "Signatory vs Sponsor",
    desc: "A Sponsor co-authored the resolution; a Signatory simply wants to see the paper brought to the floor for debate.",
  },
  {
    term: "Roll-Call Vote",
    desc: "A formal vote where each nation is called alphabetically and votes 'In Favor', 'Against', or 'Abstain'.",
  },
];

export default function DelegateGuidePage() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1 text-xs font-mono uppercase tracking-wider text-navy font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>DELEGATE ACADEMY & RESOURCES</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Delegate Starter Guide
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Whether you are preparing for your very first committee session or refining crisis maneuvers for the Security Council, here is your essential guide to diplomatic mastery.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Interactive 4-Step Walkthrough */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {STEPS.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeStep === idx
                    ? "bg-navy text-white border-navy shadow-md"
                    : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                      activeStep === idx ? "bg-gold text-navy" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-bold">
                    {step.title}
                  </span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 shrink-0 ${
                    activeStep === idx ? "text-gold" : "text-slate-400"
                  }`}
                />
              </button>
            ))}

            {/* Starter Kit Download Banner */}
            <div className="card-clean p-6 bg-slate-50/60 mt-6 space-y-3 border-l-4 border-l-gold">
              <h4 className="font-serif text-base font-bold text-navy">
                Download Official MUN Handbook
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Includes sample position papers, resolution templates, and motion quick-reference cards.
              </p>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Official DJS MUNSOC Delegate Handbook 2026 will be dispatched to your email upon conference registration.");
                }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-navy hover:text-gold uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5 text-gold" />
                <span>Request Handbook (PDF)</span>
              </a>
            </div>
          </div>

          {/* Step Detailed Panel */}
          <div className="lg:col-span-7">
            <div className="card-clean p-8 sm:p-10 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="font-mono text-xs font-bold text-gold uppercase tracking-wider">
                  CHAPTER {current.num} OF 04
                </span>
                <span className="text-xs font-mono text-slate-400">PROCEDURAL PROTOCOL</span>
              </div>

              {/* Real Procedural Visual */}
              <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-xs">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-mono">
                  <span className="text-gold font-bold">●</span> {current.imageCaption}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-navy">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2">
                  {current.summary}
                </p>
              </div>

              {/* Key Bullet Points */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  CORE PRINCIPLES
                </div>
                <ul className="space-y-2.5">
                  {current.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Term to know card */}
              <div className="rounded-xl border border-navy/15 bg-navy/5 p-5 space-y-1.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                  CRITICAL PARLIAMENTARY TERM
                </div>
                <h5 className="font-serif text-xl font-bold text-navy">
                  {current.term.title}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {current.term.definition}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Glossary Grid */}
        <div className="space-y-6 pt-8">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
              PARLIAMENTARY VOCABULARY
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy">
              Key Terms to Know on the Floor
            </h2>
            <p className="text-sm text-slate-600">
              Familiarize yourself with standard procedural terminology heard throughout unmoderated negotiations and debate rounds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="card-clean p-6 space-y-2">
                <h4 className="font-serif text-xl font-bold text-navy">{g.term}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next step banner */}
        <div className="card-clean p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-l-navy bg-white">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-navy">
              Ready to find your committee?
            </h3>
            <p className="text-sm text-slate-600">
              Use our situational quiz to discover which council matches your debating temperament.
            </p>
          </div>
          <Link
            href="/advisor"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-navy-light transition-all shrink-0"
          >
            <span>Take Advisor Quiz</span>
            <ArrowUpRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </div>
    </div>
  );
}

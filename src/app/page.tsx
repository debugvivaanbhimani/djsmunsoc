"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight, Trophy, RefreshCw,
  ChevronRight, CheckCircle2, Users, Globe2
} from "lucide-react";
import DelegatePhotoGlobe from "@/components/canvas/DelegatePhotoGlobe";
import Lightbox from "@/components/ui/Lightbox";
import galleryData from "../../data/gallery.json";

// ─── QUIZ DATA ───────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    question: "A high-intensity geopolitical crisis erupts. What is your immediate instinct?",
    options: [
      { text: "Draft an emergency directive to reposition sovereign assets.", comm: "UNSC" },
      { text: "Rally regional blocs to author a draft resolution.", comm: "UNHRC" },
      { text: "Analyze legal precedents and file a point-of-order.", comm: "AIPPM" },
      { text: "Build cross-party coalitions and negotiate amendments.", comm: "UNW" },
    ],
  },
  {
    question: "Which issue excites you the most?",
    options: [
      { text: "Military security, nuclear treaties, and sovereign borders.", comm: "UNSC" },
      { text: "Human rights accountability in conflict zones.", comm: "UNHRC" },
      { text: "Domestic legislative reform and political finance.", comm: "AIPPM" },
      { text: "Gender equality, women's economic empowerment.", comm: "UNW" },
    ],
  },
  {
    question: "What is your primary oratorical strength?",
    options: [
      { text: "Factual accuracy and unyielding logical argumentation.", comm: "UNSC" },
      { text: "Persuasive speeches that shift undecided delegates.", comm: "UNHRC" },
      { text: "Rapid rebuttals and parliamentary cross-examination.", comm: "AIPPM" },
      { text: "Compassionate advocacy and coalition building.", comm: "UNW" },
    ],
  },
  {
    question: "What debate pace suits you best?",
    options: [
      { text: "Fast-moving crisis updates where directives change every 30 minutes.", comm: "UNSC" },
      { text: "Structured debate on in-depth human rights frameworks.", comm: "UNHRC" },
      { text: "Political horse-trading with rival party blocs.", comm: "AIPPM" },
      { text: "Methodical resolution writing with consensus-building.", comm: "UNW" },
    ],
  },
  {
    question: "What is your collegiate MUN experience level?",
    options: [
      { text: "First-timer seeking a welcoming beginner environment.", comm: "UNW" },
      { text: "Intermediate delegate ready for intense diplomacy.", comm: "UNHRC" },
      { text: "Experienced debater looking for high-stakes crisis.", comm: "UNSC" },
      { text: "Political enthusiast comfortable with domestic debates.", comm: "AIPPM" },
    ],
  },
];

const RECOMMENDATIONS: Record<string, { code: string; name: string; level: string; desc: string }> = {
  UNSC: {
    code: "UNSC",
    name: "United Nations Security Council",
    level: "Advanced / Crisis",
    desc: "You are a crisis strategist. You command the room under pressure, calculate diplomatic leverage, and thrive when midnight directives upend the balance of power.",
  },
  UNHRC: {
    code: "UNHRC",
    name: "United Nations Human Rights Council",
    level: "Intermediate",
    desc: "You are a human rights advocate. You excel at building coalitions around accountability frameworks and compelling humanitarian narratives.",
  },
  AIPPM: {
    code: "AIPPM",
    name: "All India Political Parties Meet",
    level: "Beginner / Intermediate",
    desc: "You are a political strategist. You understand domestic coalition dynamics, legislative trade-offs, and cross-party negotiations.",
  },
  UNW: {
    code: "UNW",
    name: "United Nations Women",
    level: "Beginner",
    desc: "You are a compassionate advocate. You champion gender equity, build consensus across blocs, and draft inclusive resolutions with social impact.",
  },
};

const HIGHLIGHT_PHOTOS = [
  { img: "/assets/real/unsc-session-1.jpg", caption: "High-intensity unmoderated caucus debate in UNSC", title: "UNSC in Session" },
  { img: "/assets/real/delegate-iran-unsc-best.jpg", caption: "Delegate of Iran addressing the council floor", title: "Sovereign Floor Speeches" },
  { img: "/assets/real/delegation-winners.jpg", caption: "National delegation champions receiving trophies", title: "Best Delegation Champions" },
  { img: "/assets/real/executive-board-felicitation.jpg", caption: "Executive Board chairs honored at the valedictory", title: "Executive Board Felicitation" },
  { img: "/assets/real/delegate-netherlands-unsc.jpg", caption: "Delegates drafting clauses and working papers", title: "Multilateral Negotiations" },
  { img: "/assets/real/best-delegate-gavel.jpg", caption: "Individual gavel presentation ceremony", title: "Best Delegate Gavel" },
  { img: "/assets/real/organizing-committee.jpg", caption: "Student organizers managing summit operations", title: "Organizing Committee" },
  { img: "/assets/real/secretariat-team.jpg", caption: "The central governing secretariat of DJS MUNSOC", title: "Executive Secretariat" },
  { img: "/assets/real/best-delegate-faculty.jpg", caption: "Faculty advisors and institutional leadership", title: "Faculty Mentorship" },
  { img: "/assets/real/unsc-session-2.jpg", caption: "Emergency directive deliberations in committee", title: "Chamber Interventions" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  // Quiz state
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (comm: string) => {
    const updated = [...answers, comm];
    setAnswers(updated);
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const counts: Record<string, number> = {};
      updated.forEach((c) => { counts[c] = (counts[c] || 0) + 1; });
      setResult(Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b)));
    }
  };

  const resetQuiz = () => { setCurrentStep(0); setAnswers([]); setResult(null); };
  const recommendation = result ? RECOMMENDATIONS[result] || RECOMMENDATIONS.UNSC : null;

  return (
    <div className="relative w-full">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-cream pt-24 pb-16 border-b border-slate-200 overflow-visible">

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block — Order 2 on mobile (below globe), Order 1 on laptop (left) */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-6">
            <h1
              className="font-cinzel font-black text-6xl sm:text-7xl md:text-8xl lg:text-[5.4rem] xl:text-[6.4rem] tracking-[-0.02em] text-navy leading-[0.98]"
              style={{ fontFamily: 'var(--font-cinzel), "Cinzel", serif', fontWeight: 900 }}
            >
              Debate. <br />
              <span className="text-gold">Dissent.</span> <br />
              Discussion.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-sans">
              The official Model United Nations Society of Dwarkadas J. Sanghvi College of Engineering, Mumbai.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/djsmun-26"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all duration-200"
              >
                <span>DJSMUN '26 Recap</span>
                <ArrowUpRight className="w-4 h-4 text-gold" />
              </Link>
              <Link
                href="/conferences"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-navy hover:border-navy transition-all duration-200 shadow-sm"
              >
                All Conferences
              </Link>
            </div>
          </div>

          {/* Right Billboard Globe — Order 1 on mobile (on top), Order 2 on laptop (right) */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative flex items-center justify-center overflow-visible w-full scale-[0.78] sm:scale-90 md:scale-100 -my-6 sm:my-0">
            <DelegatePhotoGlobe
              photos={galleryData.items}
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
            />
          </div>
        </div>

        <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      </section>

      {/* ── QUICK STATS ──────────────────────────────────────────────────── */}
      <section className="bg-navy py-14 text-white border-y border-gold/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {[
              { val: "4th", label: "Flagship Edition" },
              { val: "100+", label: "Delegates Impacted" },
              { val: "30+", label: "Institutions Represented" },
              { val: "4", label: "Committees in Session" },
            ].map((s) => (
              <div key={s.label} className="px-4 space-y-1">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-gold">{s.val}</div>
                <div className="font-mono text-xs uppercase tracking-wider text-slate-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITTEE ADVISOR QUIZ ────────────────────────────────────────── */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Which committee are you?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Answer five quick questions and we'll match you to the right DJSMUN committee based on your debate style and interests.
            </p>
          </div>

          <div className="card-clean p-8 sm:p-12 shadow-xl border-t-4 border-t-gold">
            {!result ? (
              <div className="space-y-8">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                    <span>QUESTION {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
                    <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% COMPLETE</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-navy transition-all duration-400"
                      style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy leading-snug">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h3>

                <div className="space-y-3">
                  {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt.comm)}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-navy transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-slate-100 text-navy font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-navy group-hover:text-gold transition-colors">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm font-semibold text-slate-800 leading-relaxed">{opt.text}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-navy shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Result */
              <div className="text-center space-y-8 py-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-4xl sm:text-5xl font-bold text-navy tracking-tight">{recommendation?.code}</h3>
                  <div className="font-mono text-sm text-slate-700 uppercase font-semibold">{recommendation?.name}</div>
                </div>

                <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">{recommendation?.desc}</p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <Link
                    href="/djsmun-26"
                    className="inline-flex items-center gap-2 rounded-xl bg-navy px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all"
                  >
                    <span>Explore {recommendation?.code} at DJSMUN '26</span>
                    <ArrowUpRight className="w-4 h-4 text-gold" />
                  </Link>
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SITE NAVIGATION CARDS ─────────────────────────────────────────── */}
      <section className="bg-cream py-20 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Explore the Platform
            </h2>
            <p className="text-sm text-slate-600">
              Navigate across all sections of the DJS MUNSOC website.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/djsmun-26",
                label: "DJSMUN '26",
                sub: "4th Edition · Oct 3–4, 2026",
                desc: "Conference recap, 4 committee flip cards, photo archive, and honors.",
                img: "/assets/real/unsc-session-1.jpg",
              },
              {
                href: "/conferences",
                label: "All Conferences",
                sub: "2022 – 2026 editions",
                desc: "Full history of DJSMUN flagship editions and Youth Summit conclaves.",
                img: "/assets/real/unsc-session-2.jpg",
              },
              {
                href: "/secretariat",
                label: "Secretariat",
                sub: "Executive Leadership",
                desc: "Meet the Secretary-General, Director-General, and the organizing team.",
                img: "/assets/real/secretariat-team.jpg",
              },
              {
                href: "/gallery",
                label: "Gallery",
                sub: "Official Visual Archive",
                desc: "High-res photography from DJSMUN '26 with fullscreen lightbox.",
                img: "/assets/real/delegation-winners.jpg",
              },
              {
                href: "/delegate",
                label: "Delegate Zone",
                sub: "Guide + Country Matrix",
                desc: "Starter guide for new delegates and live portfolio allocation matrix.",
                img: "/assets/real/delegate-netherlands-unsc.jpg",
              },
              {
                href: "/contact",
                label: "Contact Us",
                sub: "Reach the Secretariat",
                desc: "Submit delegation queries, partnership inquiries, and media requests.",
                img: "/assets/real/faculty-advisors.jpg",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="card-clean overflow-hidden group flex flex-col justify-between hover:border-gold transition-all"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={card.img}
                    alt={card.label}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-white space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy leading-tight group-hover:text-gold transition-colors">
                      {card.label}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-xs text-navy group-hover:text-gold transition-colors font-bold">
                    <span>Explore</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO MARQUEE RUNNER ─────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-slate-200 overflow-hidden relative">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marqueeScrollAnimation {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
          .marquee-active-runner {
            display: flex !important;
            width: max-content !important;
            animation: marqueeScrollAnimation 36s linear infinite !important;
            will-change: transform;
          }
          .marquee-active-runner:hover {
            animation-play-state: paused !important;
          }
        `}} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy tracking-tight">Conference Highlights</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400 hidden sm:inline">Hover to pause · Click to inspect</span>
              <Link
                href="/gallery"
                className="font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors flex items-center gap-1"
              >
                <span>Full Gallery</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Infinite Runner Track with Edge Fades */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle gradient edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          <div className="marquee-active-runner flex gap-5 py-2">
            {[...HIGHLIGHT_PHOTOS, ...HIGHLIGHT_PHOTOS].map((item, i) => (
              <div
                key={i}
                onClick={() => setSelectedPhoto({ title: item.title, caption: item.caption, image: item.img })}
                className="relative w-72 sm:w-80 h-52 flex-none rounded-2xl overflow-hidden cursor-pointer group card-clean border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-gold hover:-translate-y-1 transition-all duration-300"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

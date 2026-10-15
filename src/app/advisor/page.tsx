"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Trophy, ArrowUpRight, RefreshCw, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

const QUIZ_QUESTIONS = [
  {
    question: "A high-intensity geopolitical crisis erupts. What is your immediate instinct?",
    options: [
      { text: "Draft a lightning emergency directive to reposition sovereign assets.", comm: "UNSC" },
      { text: "Rally regional voting blocs into an unmoderated caucus to author a draft resolution.", comm: "ECOSOC" },
      { text: "Analyze legal precedents and file an impromptu point-of-order against the chair.", comm: "DISEC" },
      { text: "Investigate conflicting accounts and publish an editorial expose on the contradiction.", comm: "IPC" },
    ],
  },
  {
    question: "Which aspect of international relations excites you the most?",
    options: [
      { text: "Military defense treaties, nuclear non-proliferation, and sovereign borders.", comm: "UNSC" },
      { text: "Humanitarian demobilization, refugee protection, and children's welfare in armed conflict.", comm: "UNICEF" },
      { text: "Transnational trade dispute bodies, intellectual property, and tariff embargoes.", comm: "WTO" },
      { text: "Illicit narcotics interdiction, offshore asset recovery, and sovereign extradition.", comm: "UNODC" },
    ],
  },
  {
    question: "What is your primary oratorical strength on the speaker's list?",
    options: [
      { text: "Factual accuracy, treaty citations, and unyielding logical argumentation.", comm: "DISEC" },
      { text: "Persuasive and emotionally resonant speeches that shift undecided delegates.", comm: "ECOSOC" },
      { text: "Rapid cross-examination, incisive rebuttals, and crisis negotiations.", comm: "UNSC" },
      { text: "Holding the Executive Board and delegates accountable through sharp inquiries.", comm: "IPC" },
    ],
  },
  {
    question: "What pace of committee debate allows you to perform at your peak?",
    options: [
      { text: "Fast-moving, high-stakes crisis updates where directives change every 30 minutes.", comm: "UNSC" },
      { text: "Structured and methodical, focusing on in-depth working papers and compromise.", comm: "ECOSOC" },
      { text: "Bilateral back-room negotiations with economic horse-trading and leverage.", comm: "WTO" },
      { text: "Moderate pace with equal focus on debate, legal precision, and resolution writing.", comm: "UNODC" },
    ],
  },
  {
    question: "What is your collegiate MUN experience level?",
    options: [
      { text: "First-timer or beginner seeking a structured, welcoming learning environment.", comm: "ECOSOC" },
      { text: "Intermediate delegate with 2-4 conferences ready for intense multi-party diplomacy.", comm: "UNODC" },
      { text: "Advanced debater looking for the ultimate test of strategy, crisis, and gavel pursuit.", comm: "UNSC" },
      { text: "Journalist or writer passionate about investigative reporting and press conferences.", comm: "IPC" },
    ],
  },
];

const RECOMMENDATIONS: Record<string, { code: string; name: string; level: string; desc: string; agendas: string[] }> = {
  UNSC: {
    code: "UNSC",
    name: "United Nations Security Council",
    level: "Advanced / Crisis",
    desc: "You are a crisis strategist. You command the room under pressure, calculate diplomatic leverage, and thrive when midnight directives upend the balance of power.",
    agendas: [
      "Evaluating Preemptive Sovereign Military Actions in Non-Contiguous Maritime Zones",
      "Demilitarized Verification Regimes in Contested Littoral Corridors",
    ],
  },
  ECOSOC: {
    code: "ECOSOC",
    name: "Economic and Social Council",
    level: "Beginner / Intermediate",
    desc: "You are a consensus-builder. You excel at rallying disparate blocs together, negotiating sovereign debt frameworks, and authoring comprehensive draft resolutions.",
    agendas: [
      "Sovereign Debt Distress and Restructuring Frameworks for Developing Economies",
      "Mitigating Cross-Border Climate Displacement and Infrastructure Financing",
    ],
  },
  WTO: {
    code: "WTO",
    name: "World Trade Organization",
    level: "Intermediate",
    desc: "You are an economic negotiator. You understand trade subsidies, tariff retaliation, and multilateral dispute mechanisms that dictate the global economy.",
    agendas: [
      "Restructuring the Dispute Settlement Body Appellate Mechanism",
      "Addressing Subsidy Asymmetries and Critical Mineral Monopoly Constraints",
    ],
  },
  UNODC: {
    code: "UNODC",
    name: "United Nations Office on Drugs and Crime",
    level: "Intermediate",
    desc: "You are a legal interdiction specialist. You master multilateral asset recovery, illicit precursor diversion, and unified cross-border extradition treaties.",
    agendas: [
      "Standardising Multilateral Asset Recovery Procedures across Non-Compliant Jurisdictions",
      "Countering the Illicit Diversion of Controlled Precursor Pharmaceuticals",
    ],
  },
  DISEC: {
    code: "DISEC",
    name: "Disarmament & International Security Committee",
    level: "Crisis / Intermediate",
    desc: "You are an analytical security hawk. You dissect arms latency, autonomous lethal weapons conventions, and verification regimes with forensic legal precision.",
    agendas: [
      "Regulating Autonomous Lethal Weapon Systems (LAWS) and AI in Warfare",
      "Proliferation Risks in Non-Signatory Nuclear Latency States",
    ],
  },
  UNICEF: {
    code: "UNICEF",
    name: "United Nations Children's Fund",
    level: "Beginner",
    desc: "You are a passionate humanitarian advocate. You champion binding international protections for vulnerable populations across protracted armed conflicts.",
    agendas: [
      "Safeguarding Minors in Protracted Armed Hostilities and Post-Conflict Demobilisation",
      "Combating Exploitative Digital Labor Networks and Under-Age Trafficking",
    ],
  },
  IPC: {
    code: "IPC",
    name: "International Press Corps",
    level: "Advanced Journalism",
    desc: "You are the Fourth Estate. You interrogate delegates in impromptu press briefings, expose hypocrisy between words and votes, and shape committee public opinion.",
    agendas: [
      "Real-time Investigative Journalism, Press Conferences, and Crisis Fact-Checking",
      "Publishing Editorial Exposes and Holding Committee Chairs Accountable",
    ],
  },
};

export default function AdvisorQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (comm: string) => {
    const updated = [...answers, comm];
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tally most frequent committee recommendation
      const counts: Record<string, number> = {};
      updated.forEach((c) => {
        counts[c] = (counts[c] || 0) + 1;
      });
      const topComm = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
      setResult(topComm || "UNSC");
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const recommendation = result ? RECOMMENDATIONS[result] || RECOMMENDATIONS.UNSC : null;

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-14 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1 text-xs font-mono uppercase tracking-wider text-navy font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>DELEGATE ALLOCATION ADVISOR</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Committee Advisory Quiz
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Answer five brief situational questions to receive an instant academic recommendation tailored to your debate pace, research strengths, and experience level.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="card-clean p-8 sm:p-12 shadow-xl border-t-4 border-t-gold">
          {!result ? (
            /* Quiz Active Questions */
            <div className="space-y-8">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                  <span>QUESTION {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% COMPLETED</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-navy transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy leading-snug">
                {QUIZ_QUESTIONS[currentStep].question}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(opt.comm)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-navy transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-slate-100 text-navy font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-navy group-hover:text-gold transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 leading-relaxed">
                        {opt.text}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-navy shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center space-y-8 py-4">
              <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto shadow-sm">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-gold">
                  OFFICIAL ADVISORY RESULT · {recommendation?.level}
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
                  {recommendation?.code}
                </h2>
                <div className="font-mono text-sm text-slate-600 uppercase font-semibold">
                  {recommendation?.name}
                </div>
              </div>

              <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                {recommendation?.desc}
              </p>

              {/* Agendas Preview */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 max-w-xl mx-auto text-left space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-navy">
                  SUBSTANTIVE AGENDAS FOR THIS CHAMBER
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {recommendation?.agendas.map((ag, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/conferences/djsmun-2026"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all"
                >
                  <span>Apply for {recommendation?.code} Portfolio</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Advisory Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

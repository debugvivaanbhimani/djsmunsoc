"use client";

import { useState } from "react";
import { ArrowUpRight, Award, Compass, RefreshCw, Sparkles, Trophy } from "lucide-react";

const QUESTIONS = [
  {
    q: "A severe international crisis breaks in committee. What is your instinct?",
    options: [
      { text: "Build an immediate multilateral coalition & draft resolution", comm: "UNHRC" },
      { text: "Draft a lightning midnight directive to shift troop positions", comm: "UNSC" },
      { text: "Call out statistical contradictions & publish an editorial dispatch", comm: "IPC" },
      { text: "Negotiate bilateral sanctions relief and economic swaps", comm: "WTO" },
    ],
  },
  {
    q: "What is your primary oratorical strength on the speaker's list?",
    options: [
      { text: "Uncompromising factual evidence & treaty citations", comm: "UNODC" },
      { text: "Persuasive rhetoric that rallies regional voting blocs", comm: "ECOSOC" },
      { text: "Impromptu point-of-orders & cross-examination", comm: "DISEC" },
      { text: "Passionate human rights appeals & moral clarity", comm: "UNICEF" },
    ],
  },
  {
    q: "What pace of committee debate do you thrive in?",
    options: [
      { text: "Structured and diplomatic with deep scholarly analysis", comm: "ECOSOC" },
      { text: "Fast, unpredictable, and crisis-driven directives", comm: "UNSC" },
      { text: "High-stakes regulatory negotiations and tariff arguments", comm: "WTO" },
      { text: "Dynamic journalism holding delegates accountable", comm: "IPC" },
    ],
  },
];

const RECOMMENDATIONS: Record<string, { name: string; level: string; bio: string }> = {
  UNSC: {
    name: "United Nations Security Council",
    level: "Advanced / Crisis",
    bio: "You thrive under high pressure, calculating geopolitical leverage and orchestrating binding sovereign directives.",
  },
  UNHRC: {
    name: "United Nations Human Rights Council",
    level: "Beginner / Intermediate",
    bio: "You excel at consensus-building, human rights protocols, and commanding the floor through persuasive rhetoric.",
  },
  IPC: {
    name: "International Press Corps",
    level: "Advanced Journalism",
    bio: "You have a hawk's eye for political contradiction and master real-time editorial dispatches under deadline pressure.",
  },
  WTO: {
    name: "World Trade Organization",
    level: "Intermediate",
    bio: "You master sovereign dispute settlement mechanisms, trade tariffs, and economic multilateral accords.",
  },
  DISEC: {
    name: "Disarmament & International Security Committee",
    level: "Crisis / Intermediate",
    bio: "You command treaty protocols on autonomous lethal weaponry, non-proliferation, and sovereign verification regimes.",
  },
  ECOSOC: {
    name: "Economic and Social Council",
    level: "Beginner",
    bio: "You excel at macroeconomic frameworks, debt restructuring, and humanitarian structural financing.",
  },
  UNICEF: {
    name: "United Nations Children's Fund",
    level: "Beginner",
    bio: "You lead with humanitarian conviction, drafting binding conventions for vulnerable populations across conflict zones.",
  },
  UNODC: {
    name: "United Nations Office on Drugs and Crime",
    level: "Intermediate",
    bio: "You specialize in interdiction vectors, transnational asset recovery, and sovereign extradition pacts.",
  },
};

export default function CommitteeAdvisorQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);

  const handleSelectOption = (comm: string) => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSelectedCommittee(comm);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSelectedCommittee(null);
  };

  const rec = selectedCommittee ? RECOMMENDATIONS[selectedCommittee] || RECOMMENDATIONS.UNSC : null;

  return (
    <section id="advisor" className="bg-cream text-navy py-24 border-t border-navy/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Intro */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-navy font-bold">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>INTERACTIVE COMMITTEE ADVISORY</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
              Identify the chamber best suited to your instincts.
            </h2>
            <p className="text-base text-slate leading-relaxed">
              Answer 3 brief situational questions to receive an instantaneous academic recommendation based on your debate style and experience level.
            </p>
          </div>

          {/* Right Column: Quiz Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-navy/15 p-8 sm:p-10 shadow-2xl">
              {!selectedCommittee ? (
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate">
                    <span>QUESTION {currentStep + 1} OF {QUESTIONS.length}</span>
                    <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-cream-subtle overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy py-2">
                    {QUESTIONS[currentStep].q}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {QUESTIONS[currentStep].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt.comm)}
                        className="w-full text-left rounded-xl border border-navy/10 bg-cream/30 hover:bg-gold/10 hover:border-gold p-4 transition-all duration-200 flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-cream">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm font-semibold text-navy group-hover:text-navy">
                            {opt.text}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate group-hover:text-navy shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Result Screen */
                <div className="text-center space-y-6 py-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold mx-auto">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                      RECOMMENDED ALLOCATION // {rec?.level}
                    </span>
                    <h3 className="font-serif text-4xl sm:text-5xl font-bold text-navy mt-1">
                      {selectedCommittee}
                    </h3>
                    <p className="font-mono text-sm text-slate uppercase mt-1">
                      {rec?.name}
                    </p>
                  </div>
                  <p className="text-sm text-slate max-w-md mx-auto leading-relaxed">
                    {rec?.bio}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <a
                      href="https://forms.gle/djsmun2026"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-navy-dark transition-colors shadow-lg"
                    >
                      <span>Claim Portfolio in {selectedCommittee}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate hover:text-navy uppercase tracking-wider"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Take Advisory Again</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

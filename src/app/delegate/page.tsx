"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, Search, CheckCircle, Clock, CheckCircle2, ChevronRight, Download, ArrowUpRight } from "lucide-react";

// ─── GUIDE DATA ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Understanding Model United Nations",
    summary:
      "A simulation of the United Nations in which students assume the roles of sovereign diplomats representing distinct member states. Delegates debate, draft resolutions, and navigate geopolitical crises according to international law.",
    details: [
      "You represent the foreign policy of your assigned nation, not your personal beliefs.",
      "The goal is building multilateral coalitions to pass binding or recommendatory draft resolutions.",
      "Diplomatic decorum, courtesy, and parliamentary language are enforced by the Executive Board.",
    ],
    term: { title: "Delegate", definition: "A student representing a sovereign nation, organization, or historical personality in a committee chamber." },
  },
  {
    num: "02",
    title: "Rules of Procedure & Caucus Dynamics",
    summary: "Debate proceeds under structured rules of procedure governed by motions raised by delegates from the floor.",
    details: [
      "General Speakers List (GSL): The primary default debate forum where nations deliver broad opening policy speeches.",
      "Moderated Caucus: A focused, timed round of short speeches addressing a specific sub-issue.",
      "Unmoderated Caucus: Informal suspension of rules allowing delegates to negotiate blocs and author working papers.",
    ],
    term: { title: "Moderated Caucus", definition: "A structured, rapid debate on a specific agenda subset with predetermined speaker time limits." },
  },
  {
    num: "03",
    title: "Drafting Position Papers & Resolutions",
    summary: "Concrete solutions are articulated through formal documents presented to the Executive Board and the chamber.",
    details: [
      "Position Paper: A one to two-page policy briefing submitted prior to conference detailing your nation's historical stance and proposed solutions.",
      "Working Paper: Informal compilation of ideas, clauses, and policy directions authored during unmoderated caucuses.",
      "Draft Resolution: A formally sponsored document containing preambulatory clauses (context) and operative clauses (actions).",
    ],
    term: { title: "Operative Clauses", definition: "Action-oriented clauses beginning with verbs (e.g. 'Urges', 'Authorizes', 'Establishes') directing concrete multilateral policy." },
  },
  {
    num: "04",
    title: "Conference Etiquette, Formals & Dress Code",
    summary: "A prestigious summit requires professional decorum, respect for the Executive Board, and sharp presentation.",
    details: [
      "Western Business Formals: Suits, blazers, formal trousers, formal shirts, neckties, formal skirts or dresses, and formal shoes.",
      "Indian Traditional Formals: Bandhgala suits, Nehru jackets, crisp kurta-pajamas, sarees, or formal salwar suits.",
      "Points of Order & Inquiries: Respectfully raised when committee procedural rules are violated or for clarification from the chair.",
    ],
    term: { title: "Point of Order", definition: "A procedural inquiry raised by a delegate when improper parliamentary rules have been applied by the chair." },
  },
];

const GLOSSARY = [
  { term: "Placard", desc: "The physical sign displaying your country's name, raised to vote, speak, or introduce motions." },
  { term: "Right of Reply", desc: "A formal speech granted when a sovereign nation's territorial integrity or national honor is directly insulted." },
  { term: "Point of Inquiry", desc: "A question directed to the Executive Board regarding parliamentary rules or committee proceedings." },
  { term: "Presidential Statement", desc: "A unanimous consensus declaration issued by the Security Council in response to an immediate crisis directive." },
  { term: "Signatory vs Sponsor", desc: "A Sponsor co-authored the resolution; a Signatory simply wants to see the paper brought to the floor for debate." },
  { term: "Roll-Call Vote", desc: "A formal vote where each nation is called alphabetically and votes 'In Favor', 'Against', or 'Abstain'." },
];

// ─── ALLOCATION DATA ─────────────────────────────────────────────────────────
const PORTFOLIOS = [
  { committee: "UNSC", country: "United States of America", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "Russian Federation", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "France", status: "Available", level: "Advanced" },
  { committee: "UNSC", country: "United Kingdom", status: "Available", level: "Advanced" },
  { committee: "UNSC", country: "People's Republic of China", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "Japan", status: "Available", level: "Advanced" },
  { committee: "UNHRC", country: "India", status: "Taken", level: "Intermediate" },
  { committee: "UNHRC", country: "Germany", status: "Available", level: "Intermediate" },
  { committee: "UNHRC", country: "Kenya", status: "Available", level: "Intermediate" },
  { committee: "UNHRC", country: "Brazil", status: "Available", level: "Intermediate" },
  { committee: "UNHRC", country: "Netherlands", status: "Taken", level: "Intermediate" },
  { committee: "AIPPM", country: "Bharatiya Janata Party", status: "Taken", level: "Beginner" },
  { committee: "AIPPM", country: "Indian National Congress", status: "Available", level: "Beginner" },
  { committee: "AIPPM", country: "Aam Aadmi Party", status: "Available", level: "Beginner" },
  { committee: "AIPPM", country: "Trinamool Congress", status: "Available", level: "Beginner" },
  { committee: "AIPPM", country: "Dravida Munnetra Kazhagam", status: "Available", level: "Beginner" },
  { committee: "UNW", country: "Norway", status: "Available", level: "Beginner" },
  { committee: "UNW", country: "Rwanda", status: "Taken", level: "Beginner" },
  { committee: "UNW", country: "Iceland", status: "Available", level: "Beginner" },
  { committee: "UNW", country: "New Zealand", status: "Available", level: "Beginner" },
  { committee: "UNW", country: "Bangladesh", status: "Available", level: "Beginner" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function DelegateZonePage() {
  const [activeTab, setActiveTab] = useState<"guide" | "matrix">("guide");
  const [activeStep, setActiveStep] = useState(0);

  // Matrix state
  const [query, setQuery] = useState("");
  const [filterComm, setFilterComm] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filtered = useMemo(() => {
    return PORTFOLIOS.filter((p) => {
      const matchesSearch = p.country.toLowerCase().includes(query.toLowerCase()) || p.committee.toLowerCase().includes(query.toLowerCase());
      const matchesComm = filterComm === "ALL" || p.committee === filterComm;
      const matchesStatus = filterStatus === "ALL" || p.status === filterStatus;
      return matchesSearch && matchesComm && matchesStatus;
    });
  }, [query, filterComm, filterStatus]);

  const current = STEPS[activeStep];
  const committees = ["ALL", "UNSC", "UNHRC", "AIPPM", "UNW"];
  const availableCount = PORTFOLIOS.filter((p) => p.status === "Available").length;

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Delegate Zone
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Everything you need to prepare — your starter guide to MUN procedure, and the live country allocation matrix for DJSMUN conferences.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${activeTab === "guide" ? "bg-navy text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:border-navy"
              }`}
          >
            <BookOpen className="w-4 h-4" />
            Delegate Guide
          </button>
          <button
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${activeTab === "matrix" ? "bg-navy text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:border-navy"
              }`}
          >
            <Search className="w-4 h-4" />
            Country Matrix
            <span className="ml-1 rounded-md bg-gold/20 text-gold px-2 py-0.5 text-[10px]">{availableCount} open</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── GUIDE TAB ────────────────────────────────────────────────────── */}
        {activeTab === "guide" && (
          <div className="space-y-12">
            {/* Interactive walkthrough */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Step Tabs */}
              <div className="lg:col-span-5 space-y-3">
                {STEPS.map((step, idx) => (
                  <button
                    key={step.num}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${activeStep === idx
                        ? "bg-navy text-white border-navy shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${activeStep === idx ? "bg-gold text-navy" : "bg-slate-100 text-slate-600"}`}>
                        {step.num}
                      </span>
                      <span className="font-serif text-base sm:text-lg font-bold">{step.title}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 shrink-0 ${activeStep === idx ? "text-gold" : "text-slate-400"}`} />
                  </button>
                ))}

                <div className="card-clean p-6 bg-slate-50/60 mt-2 space-y-3 border-l-4 border-l-gold">
                  <h4 className="font-serif text-base font-bold text-navy">Download Official MUN Handbook</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Includes sample position papers, resolution templates, and motion quick-reference cards.</p>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert("Official DJS MUNSOC Delegate Handbook will be dispatched upon conference registration."); }}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-navy hover:text-gold uppercase tracking-wider"
                  >
                    <Download className="w-3.5 h-3.5 text-gold" />
                    Request Handbook (PDF)
                  </a>
                </div>
              </div>

              {/* Step Detail */}
              <div className="lg:col-span-7">
                <div className="card-clean p-8 sm:p-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="font-mono text-xs font-bold text-gold uppercase tracking-wider">CHAPTER {current.num} OF 04</span>
                    <span className="text-xs font-mono text-slate-400">PROCEDURAL PROTOCOL</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl font-bold text-navy">{current.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2">{current.summary}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">CORE PRINCIPLES</div>
                    <ul className="space-y-2.5">
                      {current.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-navy/15 bg-navy/5 p-5 space-y-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">CRITICAL PARLIAMENTARY TERM</div>
                    <h5 className="font-serif text-xl font-bold text-navy">{current.term.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{current.term.definition}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glossary */}
            <div className="space-y-6 pt-4">
              <div className="border-b border-slate-200 pb-4">
                <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold mb-1">PARLIAMENTARY VOCABULARY</div>
                <h2 className="font-serif text-3xl font-bold text-navy">Key Terms to Know</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {GLOSSARY.map((g) => (
                  <div key={g.term} className="card-clean p-6 space-y-2">
                    <h4 className="font-serif text-xl font-bold text-navy">{g.term}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── MATRIX TAB ───────────────────────────────────────────────────── */}
        {activeTab === "matrix" && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="card-clean p-5 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search country or committee..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-sans text-slate-700 focus:outline-none focus:border-navy"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold text-slate-700 uppercase tracking-wider focus:outline-none focus:border-navy cursor-pointer"
                >
                  <option value="ALL">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Taken">Taken</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                {committees.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilterComm(c)}
                    className={`rounded-lg px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer font-bold ${filterComm === c ? "bg-navy text-white shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {c}
                  </button>
                ))}
                <span className="ml-auto font-mono text-xs text-slate-500 self-center">{filtered.length} portfolios</span>
              </div>
            </div>

            {/* Table */}
            <div className="card-clean overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 font-mono text-xs uppercase text-slate-500">
                      <th className="py-3.5 px-5 font-bold">Committee</th>
                      <th className="py-3.5 px-5 font-bold">Country / Portfolio</th>
                      <th className="py-3.5 px-5 font-bold">Level</th>
                      <th className="py-3.5 px-5 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filtered.map((p, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-5 font-mono font-bold text-navy">{p.committee}</td>
                        <td className="py-3.5 px-5 font-semibold text-slate-800">{p.country}</td>
                        <td className="py-3.5 px-5 font-mono text-xs text-slate-500 uppercase">{p.level}</td>
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs font-bold ${p.status === "Available"
                              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                              : "bg-slate-100 border border-slate-200 text-slate-500"
                            }`}>
                            {p.status === "Available" ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="card-clean p-8 flex flex-col sm:flex-row items-center justify-between gap-5 border-l-4 border-l-navy bg-white">
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy">Claim your portfolio</h3>
                <p className="text-sm text-slate-600 mt-1">Register for the upcoming DJSMUN conference to secure your country allocation.</p>
              </div>
              <Link
                href="/conferences"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all shrink-0"
              >
                <span>View Conferences</span>
                <ArrowUpRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

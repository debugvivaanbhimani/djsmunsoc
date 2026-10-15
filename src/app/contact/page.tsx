"use client";

import { useState } from "react";
import { Sparkles, Send, CheckCircle2, Mail, MapPin, Phone, HelpCircle, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Can first-time delegates participate?",
    a: "Absolutely. Our beginner-friendly chambers (ECOSOC and UNICEF), comprehensive delegate handbook, and pre-conference orientation sessions are specifically designed to give first-timers complete confidence.",
  },
  {
    q: "What does the registration fee include?",
    a: "Every confirmed delegate receives full 3-day conference access, delegate kit (placard, official handbook, notepad, pen, lapel badge), high tea and lunch on all days, and an official participation certificate.",
  },
  {
    q: "Is accommodation assistance available for outstation delegations?",
    a: "Yes. Our External Affairs directorate assists outstation collegiate contingents with subsidized partner hotel accommodations in Vile Parle and Juhu, along with local Mumbai transit guidance.",
  },
  {
    q: "What is the official conference dress code?",
    a: "Western Business Formals (suits, blazers, formal trousers, formal shirts, neckties, skirts/dresses) or Indian Traditional Formals (bandhgalas, Nehru jackets, formal kurtas, sarees). Casual attire is strictly prohibited in committee rooms.",
  },
  {
    q: "How are country and committee allocations processed?",
    a: "Allocations are granted on a rolling basis upon receipt of your registration form and review of past MUN experience and preferred committee choices. Early applicants have the highest probability of securing their first choice.",
  },
  {
    q: "What awards and recognitions are granted at the valedictory ceremony?",
    a: "Committees award Best Delegate (Gavel & Certificate), High Commendation, Special Mention, and Best Position Paper. The contingent with the highest aggregate score receives the prestigious Best Delegation Trophy.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    role: "Delegate",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-14">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
          DIPLOMATIC DESPATCHES & INQUIRIES
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Contact & Diplomatic Communique
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Submit official institutional communiques, outstation delegation inquiries, or consult our frequently asked questions.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Diplomatic Form */}
          <div className="lg:col-span-7 card-clean p-8 sm:p-12 space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                Dispatch an Official Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Our Charge d'Affaires and Delegate Affairs directorate will reply within 24 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Communique Dispatched
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-navy">{form.name}</span>. Your dispatch has been transmitted to the Secretariat. A formal response will be issued to <span className="font-bold text-navy">{form.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-navy underline hover:text-gold"
                >
                  Dispatch Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Advait Singhania"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:bg-white focus:border-navy focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                      INSTITUTIONAL EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="envoy@institution.edu"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:bg-white focus:border-navy focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                      COLLEGE / UNIVERSITY *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.college}
                      onChange={(e) => setForm({ ...form, college: e.target.value })}
                      placeholder="e.g. St. Xavier's College, Mumbai"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:bg-white focus:border-navy focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                    YOUR INQUIRY / DELEGATION DETAILS *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Specify your inquiry, contingent size, sponsorship inquiry, or accommodation questions..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:bg-white focus:border-navy focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-navy py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Diplomatic Dispatch</span>
                  <Send className="w-4 h-4 text-gold" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Campus Coordinates & Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus Address Card */}
            <div className="card-clean p-6 sm:p-8 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-gold font-bold">
                CAMPUS HEADQUARTERS
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy">
                Dwarkadas J. Sanghvi College of Engineering
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Plot No. U-15, J.V.P.D. Scheme, Bhaktivedanta Swami Marg, Opp. Cooper Hospital, Vile Parle (West), Mumbai, Maharashtra 400056, India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 font-mono text-xs text-navy font-bold">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>19.1075° N, 72.8368° E</span>
              </div>
            </div>

            {/* Direct Channels Card */}
            <div className="card-clean p-6 sm:p-8 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-gold font-bold">
                COMMUNICATION LINES
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">SECRETARY-GENERAL</div>
                  <a
                    href="mailto:djsmunsoc@gmail.com"
                    className="text-navy font-bold hover:text-gold transition-colors text-sm"
                  >
                    djsmunsoc@gmail.com
                  </a>
                </div>

                <div>
                  <div className="text-slate-400 uppercase text-[10px]">DELEGATE AFFAIRS</div>
                  <a
                    href="mailto:djsmunsoc@gmail.com"
                    className="text-navy font-bold hover:text-gold transition-colors text-sm"
                  >
                    djsmunsoc@gmail.com
                  </a>
                </div>

                <div>
                  <div className="text-slate-400 uppercase text-[10px]">SOCIAL DISPATCHES</div>
                  <div className="flex gap-4 pt-1 font-sans text-xs font-bold text-navy">
                    <a href="https://instagram.com/djsmunsoc" target="_blank" rel="noreferrer" className="hover:underline">
                      Instagram: @djsmunsoc ↗
                    </a>
                    <a href="https://linkedin.com/company/djsmunsoc" target="_blank" rel="noreferrer" className="hover:underline">
                      LinkedIn ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Interactive FAQ Accordion */}
        <div className="space-y-6 pt-8">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy">
              Delegate & Institutional Protocols
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="card-clean overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-serif text-lg sm:text-xl font-bold text-navy">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

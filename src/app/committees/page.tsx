import CommitteePreview from "@/components/home/CommitteePreview";
import { Sparkles, Download, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Substantive Committees & Chambers — DJS MUNSOC",
  description:
    "Explore the 7 substantive chambers of DJS MUNSOC: UNSC, UNODC, WTO, ECOSOC, UNICEF, IPC, and DISEC. Access agendas, executive board details, and background guides.",
};

export default function CommitteesPage() {
  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1 text-xs font-mono uppercase tracking-wider text-navy font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>ACADEMIC DOSSIER · SEVEN SIMULATED COUNCILS</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Chambers & Agendas
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Each chamber operates under authentic parliamentary procedure and crisis dynamics. Click any card to flip and inspect classified agendas, executive boards, and study guides.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Render Committee Chamber Grid */}
        <CommitteePreview />

        {/* Quick Links banner */}
        <div className="card-clean p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-l-gold">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-navy">
              Not sure which committee fits your style?
            </h3>
            <p className="text-sm text-slate-600">
              Take our interactive 5-question situational advisor to find your ideal match.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/advisor"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-navy-light transition-all"
            >
              <span>Take Advisor Quiz</span>
              <ArrowUpRight className="w-4 h-4 text-gold" />
            </Link>
            <Link
              href="/allocations"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy hover:bg-slate-50 transition-colors"
            >
              <span>Check Country Matrix</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

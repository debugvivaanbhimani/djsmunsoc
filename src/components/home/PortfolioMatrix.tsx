"use client";

import { useState, useMemo } from "react";
import { Search, CheckCircle, Clock } from "lucide-react";

const INITIAL_PORTFOLIOS = [
  { committee: "UNSC", country: "United States of America", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "Russian Federation", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "France", status: "Available", level: "Advanced" },
  { committee: "UNSC", country: "United Kingdom", status: "Available", level: "Advanced" },
  { committee: "UNSC", country: "People's Republic of China", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "Japan", status: "Available", level: "Advanced" },
  { committee: "UNODC", country: "Mexico", status: "Available", level: "Intermediate" },
  { committee: "UNODC", country: "Colombia", status: "Taken", level: "Intermediate" },
  { committee: "UNODC", country: "Netherlands", status: "Available", level: "Intermediate" },
  { committee: "UNODC", country: "Singapore", status: "Available", level: "Intermediate" },
  { committee: "WTO", country: "India", status: "Taken", level: "Intermediate" },
  { committee: "WTO", country: "European Union", status: "Available", level: "Intermediate" },
  { committee: "WTO", country: "Brazil", status: "Available", level: "Intermediate" },
  { committee: "WTO", country: "Australia", status: "Available", level: "Intermediate" },
  { committee: "ECOSOC", country: "Germany", status: "Available", level: "Beginner" },
  { committee: "ECOSOC", country: "South Africa", status: "Available", level: "Beginner" },
  { committee: "ECOSOC", country: "Argentina", status: "Available", level: "Beginner" },
  { committee: "DISEC", country: "Israel", status: "Taken", level: "Crisis" },
  { committee: "DISEC", country: "Islamic Republic of Iran", status: "Available", level: "Crisis" },
  { committee: "DISEC", country: "Democratic People's Republic of Korea", status: "Available", level: "Crisis" },
];

export default function PortfolioMatrix() {
  const [query, setQuery] = useState("");
  const [filterComm, setFilterComm] = useState("ALL");

  const filtered = useMemo(() => {
    return INITIAL_PORTFOLIOS.filter((p) => {
      const matchesSearch =
        p.country.toLowerCase().includes(query.toLowerCase()) ||
        p.committee.toLowerCase().includes(query.toLowerCase());
      const matchesComm = filterComm === "ALL" || p.committee === filterComm;
      return matchesSearch && matchesComm;
    });
  }, [query, filterComm]);

  const committees = ["ALL", "UNSC", "UNODC", "WTO", "ECOSOC", "DISEC"];

  return (
    <section id="portfolio" className="bg-navy py-24 text-cream border-t border-white/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
              LIVE ALLOCATION MATRIX
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-cream">
              Country & Portfolio Availability
            </h2>
            <p className="text-sm text-cream/70 max-w-lg leading-relaxed">
              Search real-time portfolio allocations across committees. Allocations are confirmed on a rolling basis by the Secretariat.
            </p>
          </div>

          {/* Committee Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {committees.map((c) => (
              <button
                key={c}
                onClick={() => setFilterComm(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  filterComm === c
                    ? "bg-gold text-navy font-bold"
                    : "bg-white/5 border border-white/15 text-cream/80 hover:bg-white/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar & Table Shell */}
        <div className="rounded-2xl border border-white/10 bg-navy-card/80 backdrop-blur-md p-6 shadow-2xl space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by country, committee, or tier..."
              className="w-full rounded-xl border border-white/10 bg-navy px-11 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-mono text-xs uppercase text-gold">
                  <th className="py-3 px-4">Committee</th>
                  <th className="py-3 px-4">Country / Portfolio</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4 text-right">Allocation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cream">
                      {item.committee}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-cream/95">
                      {item.country}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-cream/70">
                      {item.level}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {item.status === "Available" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3 py-0.5 text-xs font-mono font-bold">
                          <CheckCircle className="w-3 h-3" />
                          <span>AVAILABLE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 text-cream/50 px-3 py-0.5 text-xs font-mono">
                          <Clock className="w-3 h-3" />
                          <span>ALLOCATED</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

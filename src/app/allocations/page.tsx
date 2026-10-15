"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, CheckCircle, Clock, ArrowUpRight, Sparkles, Filter } from "lucide-react";

const INITIAL_PORTFOLIOS = [
  { committee: "UNSC", country: "United States of America", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "Russian Federation", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "France", status: "Available", level: "Advanced" },
  { committee: "UNSC", country: "United Kingdom", status: "Available", level: "Advanced" },
  { committee: "UNSC", country: "People's Republic of China", status: "Taken", level: "Advanced" },
  { committee: "UNSC", country: "Japan", status: "Available", level: "Advanced" },
  { committee: "UNSC", country: "Algeria", status: "Available", level: "Advanced" },
  { committee: "UNSC", country: "Guyana", status: "Available", level: "Advanced" },
  { committee: "UNODC", country: "Mexico", status: "Available", level: "Intermediate" },
  { committee: "UNODC", country: "Colombia", status: "Taken", level: "Intermediate" },
  { committee: "UNODC", country: "Netherlands", status: "Available", level: "Intermediate" },
  { committee: "UNODC", country: "Singapore", status: "Available", level: "Intermediate" },
  { committee: "UNODC", country: "United States", status: "Taken", level: "Intermediate" },
  { committee: "UNODC", country: "Thailand", status: "Available", level: "Intermediate" },
  { committee: "WTO", country: "India", status: "Taken", level: "Intermediate" },
  { committee: "WTO", country: "European Union", status: "Available", level: "Intermediate" },
  { committee: "WTO", country: "Brazil", status: "Available", level: "Intermediate" },
  { committee: "WTO", country: "Australia", status: "Available", level: "Intermediate" },
  { committee: "WTO", country: "Canada", status: "Available", level: "Intermediate" },
  { committee: "ECOSOC", country: "Germany", status: "Available", level: "Beginner" },
  { committee: "ECOSOC", country: "South Africa", status: "Available", level: "Beginner" },
  { committee: "ECOSOC", country: "Argentina", status: "Available", level: "Beginner" },
  { committee: "ECOSOC", country: "Bangladesh", status: "Available", level: "Beginner" },
  { committee: "DISEC", country: "Israel", status: "Taken", level: "Crisis" },
  { committee: "DISEC", country: "Islamic Republic of Iran", status: "Available", level: "Crisis" },
  { committee: "DISEC", country: "Democratic People's Republic of Korea", status: "Available", level: "Crisis" },
  { committee: "DISEC", country: "Pakistan", status: "Available", level: "Crisis" },
  { committee: "IPC", country: "Reuters International", status: "Available", level: "Advanced" },
  { committee: "IPC", country: "Al Jazeera English", status: "Taken", level: "Advanced" },
  { committee: "IPC", country: "BBC World Service", status: "Available", level: "Advanced" },
];

export default function AllocationsPage() {
  const [query, setQuery] = useState("");
  const [filterComm, setFilterComm] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filtered = useMemo(() => {
    return INITIAL_PORTFOLIOS.filter((p) => {
      const matchesSearch =
        p.country.toLowerCase().includes(query.toLowerCase()) ||
        p.committee.toLowerCase().includes(query.toLowerCase());
      const matchesComm = filterComm === "ALL" || p.committee === filterComm;
      const matchesStatus = filterStatus === "ALL" || p.status === filterStatus;
      return matchesSearch && matchesComm && matchesStatus;
    });
  }, [query, filterComm, filterStatus]);

  const committees = ["ALL", "UNSC", "UNODC", "WTO", "ECOSOC", "DISEC", "IPC"];
  const availableCount = INITIAL_PORTFOLIOS.filter((p) => p.status === "Available").length;
  const takenCount = INITIAL_PORTFOLIOS.filter((p) => p.status === "Taken").length;

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1 text-xs font-mono uppercase tracking-wider text-navy font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>REAL-TIME DELEGATE MATRIX</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
          Country & Portfolio Matrix
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Search live allocations across all seven chambers. Submit your priority preferences early to secure your desired member state or press bureau.
        </p>

        {/* Live Counters */}
        <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-600">Available:</span>
            <span className="font-bold text-navy">{availableCount} Portfolios</span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span className="text-slate-600">Confirmed:</span>
            <span className="font-bold text-navy">{takenCount} Allocated</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls Card */}
        <div className="card-clean p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by country, member state, or council..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:bg-white focus:border-navy focus:outline-none transition-all"
              />
            </div>

            {/* Status Select */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 shrink-0">STATUS:</span>
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 w-full text-xs font-mono">
                {["ALL", "Available", "Taken"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`flex-1 py-1.5 rounded-lg text-center transition-colors font-bold ${
                      filterStatus === s
                        ? "bg-white text-navy shadow-xs"
                        : "text-slate-500 hover:text-navy"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Committee Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-mono font-bold text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>COUNCIL:</span>
            </span>
            {committees.map((c) => (
              <button
                key={c}
                onClick={() => setFilterComm(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  filterComm === c
                    ? "bg-navy text-white font-bold"
                    : "bg-slate-100 border border-slate-200/80 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className="card-clean overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 font-mono text-xs uppercase text-slate-600">
                  <th className="py-4 px-6 font-bold">Committee</th>
                  <th className="py-4 px-6 font-bold">Country / Member State</th>
                  <th className="py-4 px-6 font-bold">Chamber Level</th>
                  <th className="py-4 px-6 font-bold text-center">Status</th>
                  <th className="py-4 px-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-navy">
                      {item.committee}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {item.country}
                    </td>
                    <td className="py-4 px-6 text-xs font-mono text-slate-500">
                      {item.level}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.status === "Available" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-3 py-0.5 text-xs font-mono font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>AVAILABLE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-500 px-3 py-0.5 text-xs font-mono">
                          <Clock className="w-3.5 h-3.5" />
                          <span>ALLOCATED</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {item.status === "Available" ? (
                        <a
                          href="https://forms.gle/djsmun2026"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-navy hover:text-gold uppercase tracking-wider"
                        >
                          <span>Claim</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">Locked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Explanatory Policy Card */}
        <div className="card-clean p-6 bg-slate-50/60 border-l-4 border-l-gold">
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-navy">
              Allocation Procedure & Guidelines
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Portfolios are granted on a rolling basis following submission of your registration form and review of past committee experience. If your first choice is marked as allocated, you may specify 3 preferences in the registration portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

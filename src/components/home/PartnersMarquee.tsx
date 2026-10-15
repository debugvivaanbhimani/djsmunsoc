"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import sponsorsData from "../../../data/sponsors.json";

export default function PartnersMarquee() {
  return (
    <section className="relative bg-ink py-20 hairline-top overflow-hidden select-none">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-12 z-10 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-1">
            06 — STRATEGIC ALLIANCES
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory tracking-tight">
            Institutional Patronage & Partners
          </h3>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-smoke hover:text-gold transition-colors"
        >
          <span>Partner with DJS MUNSoc</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Seamless Marquee Ticker */}
      <div className="relative w-full overflow-hidden border-y border-border py-8 bg-ink/50">
        <div className="flex w-max animate-marquee space-x-12 sm:space-x-16 items-center">
          {[...sponsorsData.partners, ...sponsorsData.partners].map((p, idx) => (
            <div
              key={`${p.name}-${idx}`}
              className="group flex items-center space-x-4 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <div className="relative h-10 w-28 sm:w-36 grayscale contrast-125 filter group-hover:grayscale-0">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-smoke group-hover:text-gold transition-colors">
                [{p.tier}]
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StickyRegisterPill() {
  const [visible, setVisible] = useState(false);
  const [daysLeft, setDaysLeft] = useState(17);

  useEffect(() => {
    // Calculate days until DJSMUN '26 (October 30, 2026)
    const target = new Date("2026-10-30T09:00:00+05:30").getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
    setDaysLeft(diff);

    const handleScroll = () => {
      // Appear after scrolling past the hero (around 600px)
      if (window.scrollY > 600) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in transition-all duration-300">
      <Link
        href="/conferences/djsmun-2026"
        className="group flex items-center gap-3 rounded-full border border-gold/40 bg-ink/90 px-5 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
        data-cursor="REGISTER"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
        </span>

        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ivory group-hover:text-ink transition-colors">
          Register — DJSMUN '26 <span className="text-smoke group-hover:text-ink/80">({daysLeft}d left)</span>
        </span>

        <ArrowUpRight className="h-3.5 w-3.5 text-gold group-hover:text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}

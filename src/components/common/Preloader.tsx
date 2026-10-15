"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only show once per session
    const hasSeen = sessionStorage.getItem("djsmun_preloader_seen");
    if (hasSeen) {
      return;
    }
    setShouldRender(true);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setComplete(true);
            sessionStorage.setItem("djsmun_preloader_seen", "true");
          }, 350);
          return 100;
        }
        // Organic progress acceleration
        const increment = Math.max(1, Math.floor((100 - prev) * 0.12) + Math.floor(Math.random() * 4));
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-ink p-8 md:p-14 select-none pointer-events-auto"
        >
          {/* Top Classification Stamp */}
          <div className="w-full flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-smoke border-b border-border pb-4">
            <span>DJS MUNSOC // PROTOCOL</span>
            <span className="text-gold">MUMBAI — EST. 2013</span>
          </div>

          {/* Central Logo Vector Animation */}
          <div className="relative flex flex-col items-center justify-center my-auto">
            <svg
              className="w-28 h-28 md:w-36 md:h-36 mb-6"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Laurel Wreath with animated SVG stroke */}
              <motion.path
                d="M120 290 C85 240, 85 160, 125 105 M280 290 C315 240, 315 160, 275 105"
                stroke="#EDE8DF"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />

              {/* Central Book / Chamber Podium */}
              <motion.path
                d="M200 155 L155 168 C145 171, 140 180, 140 190 L140 245 L200 232 L260 245 L260 190 C260 180, 255 171, 245 168 Z"
                stroke="#EDE8DF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              />

              {/* Sun & Star Radiant Emitting */}
              <motion.circle
                cx="200"
                cy="130"
                r="6"
                fill="#C9A96E"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </svg>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-3xl md:text-5xl text-ivory tracking-tight text-center"
            >
              DJS MUNSOC
            </motion.h1>

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-smoke mt-2">
              Diplomatic Simulation System
            </p>
          </div>

          {/* Bottom Precision Progress Counter */}
          <div className="w-full flex items-end justify-between border-t border-border pt-4">
            <div className="font-mono text-[11px] text-smoke tracking-widest">
              INITIALIZING ARCHIVE
            </div>
            <div className="font-mono text-3xl md:text-4xl text-ivory font-light tabular-nums">
              {String(count).padStart(3, "0")}
              <span className="text-gold text-lg ml-1 font-mono">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

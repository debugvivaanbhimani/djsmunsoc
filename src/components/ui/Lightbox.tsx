"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  tag?: string;
}

interface LightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function Lightbox({
  item,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-xl p-4 md:p-12 select-none"
      >
        {/* Background Click dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Container */}
        <div className="relative z-10 flex max-h-[90vh] max-w-4xl w-full flex-col md:flex-row border border-border bg-ink overflow-hidden shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-ivory/70 hover:text-gold border border-border bg-ink/80 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Container with Full Tone */}
          <div className="relative h-[320px] md:h-[540px] md:w-3/5 w-full bg-black/60">
            <Image
              src={item.image}
              alt={item.title}
              fill
              unoptimized
              className="object-contain p-2 md:p-6"
            />
          </div>

          {/* Right: Editorial Meta & Caption */}
          <div className="flex md:w-2/5 flex-col justify-between p-6 md:p-8 border-t md:border-t-0 md:border-l border-border bg-ink">
            <div>
              {item.tag && (
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-3">
                  CLASSIFICATION // {item.tag}
                </div>
              )}
              <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-tight mb-4 leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-smoke leading-relaxed font-light">
                {item.caption}
              </p>
            </div>

            <div className="pt-6 border-t border-border mt-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-smoke">
                <span>DJSMUN '26 ARCHIVE</span>
                <div className="flex gap-2">
                  {onPrev && (
                    <button
                      onClick={onPrev}
                      className="p-1.5 border border-border hover:border-gold hover:text-gold transition-colors"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                  {onNext && (
                    <button
                      onClick={onNext}
                      className="p-1.5 border border-border hover:border-gold hover:text-gold transition-colors"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

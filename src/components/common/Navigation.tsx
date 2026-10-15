"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_PAGES = [
  { href: "/", label: "Home" },
  { href: "/djsmun-26", label: "DJSMUN '26" },
  { href: "/secretariat", label: "Secretariat" },
  { href: "/conferences", label: "Conferences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
  { href: "/delegate", label: "Delegate Zone" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2.5"
          : "bg-white/85 backdrop-blur-sm border-b border-slate-200/50 py-3.5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-9 w-44 sm:w-52">
            <Image
              src="/djs-munsoc-logo.png"
              alt="DJS MUNSOC"
              fill
              priority
              unoptimized
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_PAGES.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] xl:text-xs uppercase tracking-[0.12em] font-semibold transition-colors duration-200 py-1 border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-navy text-navy font-bold"
                    : "border-transparent text-slate-600 hover:text-navy hover:border-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-navy hover:text-gold focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-xl space-y-3">
          {NAV_PAGES.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block w-full p-3 rounded-xl border text-sm font-semibold text-center transition-colors ${
                  isActive
                    ? "bg-navy text-white border-navy font-bold"
                    : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

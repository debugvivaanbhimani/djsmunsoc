"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = [
  {
    heading: "EXPLORE",
    links: [
      { href: "/", label: "Home" },
      { href: "/djsmun-26", label: "DJSMUN '26 Recap" },
      { href: "/conferences", label: "All Conferences" },
      { href: "/secretariat", label: "Secretariat" },
    ],
  },
  {
    heading: "RESOURCES",
    links: [
      { href: "/gallery", label: "Photo Gallery" },
      { href: "/delegate", label: "Delegate Zone" },
      { href: "/delegate#guide", label: "Delegate Starter Guide" },
      { href: "/delegate#matrix", label: "Country Matrix" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-700 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-200 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative h-10 w-52">
              <Image
                src="/djs-munsoc-logo.png"
                alt="DJS MUNSOC"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              The Model United Nations Society of Dwarkadas J. Sanghvi College of Engineering, Mumbai. Fostering diplomatic rigour, informed dissent, and responsible leadership since 2013.
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>DJSCE Campus, Vile Parle (W), Mumbai 400056</span>
              </div>
              <a
                href="mailto:djsmunsoc@gmail.com"
                className="flex items-center gap-2 text-xs font-mono text-navy hover:text-gold transition-colors font-semibold"
              >
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>djsmunsoc@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-navy font-bold">
                {col.heading}
              </h4>
              <ul className="space-y-2 text-sm font-medium">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-navy hover:underline text-slate-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="md:col-span-1" />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>© 2026 DJS MUNSOC · Dwarkadas J. Sanghvi College of Engineering, Mumbai</div>
          <div className="flex items-center gap-4 text-navy font-bold">
            <span>DEBATE</span>
            <span>·</span>
            <span>DISSENT</span>
            <span>·</span>
            <span>DISCUSSION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

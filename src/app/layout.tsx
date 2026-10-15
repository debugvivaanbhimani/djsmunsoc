import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DJS MUNSOC — Model United Nations Society, DJSCE Mumbai",
  description:
    "Official website of DJS MUNSOC, Dwarkadas J. Sanghvi College of Engineering. Debate. Dissent. Discussion. Discover DJSMUN '26, Youth Summit 3.0, and substantive committees.",
  keywords: [
    "DJS MUNSOC",
    "DJSMUN",
    "DJS Youth Summit",
    "Model United Nations",
    "DJSCE",
    "Mumbai MUN",
  ],
  icons: {
    icon: "/djs-munsoc-logo.png",
    apple: "/djs-munsoc-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1930",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${plusJakartaSans.variable} ${cinzel.variable} scroll-smooth`}
    >
      <body className="bg-cream text-slate-800 antialiased min-h-screen selection:bg-gold selection:text-navy flex flex-col justify-between">
        <Navigation />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Users, Download, HelpCircle, CheckCircle, ArrowLeft } from "lucide-react";
import conferencesData from "../../../../data/conferences.json";
import committeesData from "../../../../data/committees.json";

export async function generateStaticParams() {
  return conferencesData.upcoming.map((conf) => ({
    slug: conf.slug,
  }));
}

export default async function ConferencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const conf = conferencesData.upcoming.find((c) => c.slug === slug);

  if (!conf) {
    notFound();
  }

  const relatedCommittees = committeesData.slice(0, conf.committeesCount || 6);

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/conferences"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-500 hover:text-navy font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Conferences</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="card-clean p-8 sm:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
                <span className="rounded-full bg-navy/10 text-navy px-3 py-1">
                  {conf.edition}
                </span>
                <span className="text-gold">{conf.status}</span>
              </div>

              <div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight">
                  {conf.title}
                </h1>
                <p className="font-serif text-xl sm:text-2xl text-gold italic font-medium mt-1">
                  "{conf.subtitle}"
                </p>
              </div>

              <p className="text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
                {conf.summary}
              </p>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 font-mono text-xs text-slate-600">
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">DATES</div>
                  <div className="font-bold text-navy mt-0.5">{conf.dates}</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">VENUE</div>
                  <div className="font-bold text-navy mt-0.5">{conf.venue}</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">DELEGATE FEE</div>
                  <div className="font-bold text-gold mt-0.5">{conf.fee}</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">COMMITTEES</div>
                  <div className="font-bold text-navy mt-0.5">{conf.committeesCount} Councils</div>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 flex flex-wrap gap-4">
                {conf.status !== "CONCLUDED" && conf.registrationLink && (
                  <a
                    href={conf.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-navy-light transition-all"
                  >
                    <span>Register for {conf.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-gold" />
                  </a>
                )}
                <Link
                  href="/allocations"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <span>View Country Matrix</span>
                </Link>
              </div>
            </div>

            {/* Poster Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-navy">
                <Image
                  src={conf.poster}
                  alt={conf.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Substantive Theme & Academic Framework */}
        <div className="card-clean p-8 sm:p-10 space-y-3">
          <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
            ACADEMIC FRAMEWORK
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
            Theme: {conf.theme}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Delegates at {conf.title} will operate under authentic crisis mandates and parliamentary procedure. Through multi-lateral coalition building, emergency unmoderated directives, and intense draft resolution voting, committees will formulate sovereign doctrines to counter modern geopolitical vulnerabilities.
          </p>
        </div>

        {/* Section: Simulated Committees Lineup */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                COUNCILS IN SESSION
              </div>
              <h2 className="font-serif text-3xl font-bold text-navy">
                Simulated Committees ({relatedCommittees.length})
              </h2>
            </div>
            <Link
              href="/committees"
              className="font-mono text-xs font-bold text-navy hover:underline flex items-center gap-1"
            >
              <span>View All Study Guides</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCommittees.map((comm) => (
              <div key={comm.id} className="card-clean p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500 font-bold">{comm.order}</span>
                    <span className="rounded-full bg-gold/15 text-gold px-2.5 py-0.5 font-bold">
                      {comm.level}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-navy">{comm.code}</h3>
                  <div className="font-mono text-xs text-slate-600 uppercase font-semibold">{comm.name}</div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {comm.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <a
                    href={comm.bgGuideUrl}
                    className="text-navy hover:text-gold font-bold inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3 text-gold" />
                    <span>Background Guide</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Schedule Timeline */}
        <div className="card-clean p-8 sm:p-10 space-y-6">
          <div className="space-y-1">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
              CONFERENCE PROTOCOL
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy">
              Three-Day Diplomatic Itinerary
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-navy font-bold">
                DAY 01 · OPENING PLENARY
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-600">
                <li>09:00 — Registration & Delegate Kits</li>
                <li>10:30 — Opening Ceremony & Keynote</li>
                <li>12:00 — Committee Session I</li>
                <li>15:30 — Committee Session II</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-navy font-bold">
                DAY 02 · CRISIS DELIBERATION
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-600">
                <li>09:30 — Committee Session III</li>
                <li>12:00 — Midnight / Joint Crisis Directives</li>
                <li>14:30 — Working Paper Submission</li>
                <li>17:30 — Informal Caucus Negotiations</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-navy font-bold">
                DAY 03 · ACCORD & AWARDS
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-600">
                <li>10:00 — Committee Session IV (Resolutions)</li>
                <li>13:30 — Final Voting Procedure & Gavel</li>
                <li>16:00 — Valedictory & Best Delegation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Conference Atmosphere & Floor Proceedings */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
              THE DEBATE ENVIRONMENT
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy">
              Chamber Atmosphere & Proceedings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card-clean overflow-hidden group">
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src="/assets/real/committee-session-1.jpg"
                  alt="Delegate Caucus"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-mono">
                  <span className="text-gold font-bold">●</span> Unmoderated Caucuses
                </div>
              </div>
            </div>

            <div className="card-clean overflow-hidden group">
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src="/assets/real/committee-session-2.jpg"
                  alt="Parliamentary Debate"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-mono">
                  <span className="text-gold font-bold">●</span> General Speakers List
                </div>
              </div>
            </div>

            <div className="card-clean overflow-hidden group">
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src="/assets/real/executive-board-felicitation.jpg"
                  alt="Executive Board"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-mono">
                  <span className="text-gold font-bold">●</span> Executive Board Leadership
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

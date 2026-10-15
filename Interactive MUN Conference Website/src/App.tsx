import { useEffect, useMemo, useState } from "react";

type IconName =
  | "arrow"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "globe"
  | "instagram"
  | "linkedin"
  | "location"
  | "mail"
  | "menu"
  | "search"
  | "spark"
  | "users"
  | "whatsapp"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    linkedin: <><path d="M6 9v9M6 6v.01M10 18v-5a4 4 0 0 1 8 0v5M10 9v9" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    spark: <path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z" /><path d="M8.5 8.5c.5 3 2 4.5 5 5" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const committees = [
  { code: "UNHRC", name: "Human Rights Council", type: "General Assembly", level: "Beginner", agenda: "Safeguarding digital privacy and human rights in the age of mass surveillance.", color: "blue" },
  { code: "DISEC", name: "Disarmament & Security", type: "General Assembly", level: "Beginner", agenda: "Addressing autonomous weapons and accountability in modern warfare.", color: "orange" },
  { code: "UNSC", name: "Security Council", type: "Security Council", level: "Advanced", agenda: "The evolving security situation in the Red Sea and its global implications.", color: "pink" },
  { code: "AIPPM", name: "All India Political Parties Meet", type: "Indian Committees", level: "Intermediate", agenda: "Deliberating electoral reforms with special emphasis on simultaneous elections.", color: "lime" },
  { code: "CCC", name: "Continuous Crisis Committee", type: "Crisis", level: "Advanced", agenda: "A fast-moving historical crisis where every directive changes the room.", color: "violet" },
  { code: "WHO", name: "World Health Organization", type: "General Assembly", level: "Intermediate", agenda: "Building equitable systems for the next global health emergency.", color: "cyan" },
];

const portfolioData = [
  ["UNHRC", "Brazil", "Available"],
  ["UNHRC", "Japan", "Available"],
  ["UNHRC", "United Kingdom", "Taken"],
  ["DISEC", "South Africa", "Available"],
  ["DISEC", "India", "Taken"],
  ["UNSC", "France", "Available"],
  ["UNSC", "United States", "Taken"],
  ["AIPPM", "Member of Parliament", "Available"],
];

const faqs = [
  ["Can first-timers participate?", "Absolutely. Our beginner-friendly committees, delegate resources and training session are designed to help you walk into committee with confidence."],
  ["What does the registration fee include?", "The final fee and inclusions will be published when registrations open. Every confirmed delegate receives conference access, a delegate kit, meals and a participation certificate."],
  ["Is accommodation available for outstation delegates?", "We help outstation delegations with nearby accommodation recommendations and local travel guidance. Write to us before booking."],
  ["What should I wear?", "Western business formals or Indian formals. Think professional, comfortable and ready for a full day of diplomacy."],
  ["Will I receive a certificate?", "Yes. All delegates who attend the full conference receive a certificate; outstanding delegates are recognised with committee awards."],
];

const photos = [
  { url: "https://images.unsplash.com/photo-1607037183811-2a54d746cd35?auto=format&fit=crop&w=1200&q=85", label: "The room comes alive", credit: "Matthew TenBruggencate" },
  { url: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&w=1000&q=85", label: "Diplomacy in motion", credit: "Wan San Yip" },
  { url: "https://images.unsplash.com/photo-1536181783029-1097aaf179de?auto=format&fit=crop&w=1200&q=85", label: "Ideas from every seat", credit: "Frederic Köberl" },
  { url: "https://images.unsplash.com/photo-1519276649662-7bd2db2658fe?auto=format&fit=crop&w=1000&q=85", label: "One table. Many worlds.", credit: "Davi Mendes" },
];

function Button({ children, variant = "primary", onClick, href, className = "" }: { children: React.ReactNode; variant?: "primary" | "ghost" | "light"; onClick?: () => void; href?: string; className?: string }) {
  const classes = `btn btn-${variant} ${className}`;
  return href ? <a className={classes} href={href}>{children}</a> : <button className={classes} onClick={onClick}>{children}</button>;
}

function SectionTitle({ eyebrow, title, copy, light = false }: { eyebrow: string; title: React.ReactNode; copy?: string; light?: boolean }) {
  return (
    <div className={`section-title ${light ? "on-light" : ""}`}>
      <span className="eyebrow"><Icon name="spark" size={15} />{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Countdown() {
  const calculate = () => {
    const distance = Math.max(0, new Date("2026-03-28T09:00:00+05:30").getTime() - Date.now());
    return {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance / 3600000) % 24),
      mins: Math.floor((distance / 60000) % 60),
      secs: Math.floor((distance / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calculate);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="countdown" aria-label="Countdown to DJS Youth Summit 3.0">
      {Object.entries(time).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
    </div>
  );
}

function Globe() {
  return (
    <div className="globe-wrap" aria-label="Highlights from recent DJS MUNSOC conferences">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="globe">
        <div className="globe-gallery">
          {photos.slice(0, 3).map((photo) => <img key={photo.url} src={photo.url} alt="" />)}
        </div>
        <div className="globe-lines" />
        {["Mumbai", "Delhi", "Dubai", "Singapore"].map((city, i) => <div className={`pin pin-${i + 1}`} key={city}><span /><em>{city}</em></div>)}
      </div>
      <div className="globe-caption"><span>Recent conferences</span><strong>Dialogue across borders</strong></div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <a className="brand" href="#home" aria-label="DJS MUNSOC home"><img src="/djs-munsoc-logo.png" alt="DJS MUNSOC" /></a>
      <div className={`nav-links ${open ? "open" : ""}`}>
        <a href="#conferences" onClick={() => setOpen(false)}>DJSMUN '26</a>
        <a href="#committees" onClick={() => setOpen(false)}>Committees</a>
        <a href="#new-to-mun" onClick={() => setOpen(false)}>New to MUN?</a>
        <a href="#past" onClick={() => setOpen(false)}>Past Conferences</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </div>
      <Button href="#register" className="nav-cta">Register <Icon name="arrow" size={17} /></Button>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Icon name={open ? "x" : "menu"} /></button>
    </nav>
  );
}

function Hero() {
  return (
    <header id="home" className="hero">
      <Nav />
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="live-pill"><span /> Dwarkadas J. Sanghvi College of Engineering</div>
          <h1>Debate.<br /><em>Dissent.</em><br />Discussion.</h1>
          <p className="hero-intro">The Model United Nations Society of DJSCE provides a distinguished forum for informed debate, multilateral diplomacy and responsible student leadership.</p>
          <div className="hero-actions">
            <Button href="#register">Register your delegation <Icon name="arrow" /></Button>
            <Button href="#conferences" variant="ghost">View DJSMUN '26</Button>
          </div>
          <div className="next-date"><Icon name="calendar" /><span><small>28–29 March 2026</small>DJSCE, Mumbai</span></div>
        </div>
        <div className="hero-visual"><Globe /></div>
      </div>
      <div className="countdown-row"><span>Conference countdown</span><Countdown /><span className="scroll-note">DJS Youth Summit 3.0 · 28–29 March 2026</span></div>
    </header>
  );
}

function Conferences() {
  return (
    <section id="conferences" className="section light-section">
      <SectionTitle eyebrow="Conferences" title={<>A forum for <span className="marker">substantive dialogue</span></>} copy="DJS MUNSOC convenes students from schools and universities for rigorous committee proceedings, considered negotiation and meaningful exchange." light />
      <div className="event-grid">
        <article className="event-card featured">
          <div className="event-top">
            <span className="status"><i /> Registrations open soon</span><span className="edition">03 / 2026</span>
          </div>
          <div className="event-shape"><span>DJS</span><strong>YOUTH<br />SUMMIT</strong><b>3.0</b></div>
          <div className="event-info">
            <div><span className="event-kicker">Flagship conference</span><h3>DJS Youth Summit 3.0</h3></div>
            <div className="event-meta">
              <span><Icon name="calendar" />28–29 Mar 2026</span>
              <span><Icon name="location" />DJSCE, Vile Parle</span>
              <span><Icon name="users" />6 committees</span>
            </div>
          </div>
          <p>India — a strong voice in global dialogue.</p>
          <div className="seat-row"><span><b>Delegate interest</b></span><span>Priority registration updates available</span></div>
          <div className="progress"><i /></div>
          <div className="card-actions"><Button href="#register" variant="light">Get priority access <Icon name="arrow" /></Button><button className="circle-btn" aria-label="View conference details"><Icon name="arrow" /></button></div>
        </article>
        <article className="event-card past-card">
          <div className="event-top"><span className="status concluded"><Icon name="check" size={14} /> Recently concluded</span><span className="edition">01 / 2026</span></div>
          <div className="past-poster"><span>Diplomacy</span><span>Debate</span><span>Power</span><strong>DJMUN<br />'26</strong></div>
          <div className="event-info"><div><span className="event-kicker">The latest chapter</span><h3>DJSMUN '26</h3></div></div>
          <p>Our recently concluded conference brought together delegates for two days of focused deliberation and collaboration.</p>
          <Button href="#past" variant="ghost">View conference archive <Icon name="arrow" /></Button>
        </article>
      </div>
    </section>
  );
}

function Committees() {
  const [level, setLevel] = useState("All");
  const [selected, setSelected] = useState<(typeof committees)[0] | null>(null);
  const filtered = committees.filter((item) => level === "All" || item.level === level);
  return (
    <section id="committees" className="section committee-section">
      <SectionTitle eyebrow="Committee portfolio" title={<>Explore the<br /><span className="pink-text">committees.</span></>} copy="Review each committee by experience level and consult the agenda before submitting your preferences." />
      <div className="filters">{["All", "Beginner", "Intermediate", "Advanced"].map((item) => <button className={level === item ? "active" : ""} key={item} onClick={() => setLevel(item)}>{item}</button>)}</div>
      <div className="committee-grid">
        {filtered.map((committee, i) => (
          <button className={`committee-card ${committee.color}`} key={committee.code} onClick={() => setSelected(committee)}>
            <span className="committee-card-inner">
              <span className="committee-face committee-front">
                <span><span className="card-no">0{i + 1}</span><span className="difficulty">{committee.level}</span></span>
                <strong>{committee.code}</strong><h3>{committee.name}</h3>
                <span className="explore">View agenda <Icon name="arrow" size={17} /></span>
              </span>
              <span className="committee-face committee-back">
                <span className="agenda-label">On the agenda</span>
                <strong>{committee.code}</strong>
                <p>{committee.agenda}</p>
                <span className="explore">Open committee details <Icon name="arrow" size={17} /></span>
              </span>
            </span>
          </button>
        ))}
      </div>
      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="committee-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><Icon name="x" /></button><span className="eyebrow">{selected.type}</span><strong className="modal-code">{selected.code}</strong><h2>{selected.name}</h2><p>{selected.agenda}</p><div className="modal-note">Background guide publishing soon. Join the priority list and we will send it to your inbox.</div><Button href="#register">Register for {selected.code} <Icon name="arrow" /></Button></div></div>}
    </section>
  );
}

function Quiz() {
  const questions = [
    ["A crisis breaks. You…", ["Build a coalition", "Draft a directive", "Call out the facts"]],
    ["Your greatest strength?", ["Reading the room", "Quick thinking", "Deep research"]],
    ["Choose your pace", ["Structured", "Chaotic", "Somewhere between"]],
    ["Your speech style?", ["Persuasive", "Punchy", "Evidence-heavy"]],
    ["Pick a headline", ["A deal is reached", "Cabinet in chaos", "Rights under threat"]],
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const result = ["UNHRC", "CCC", "UNSC"][answers.reduce((a, b) => a + b, 0) % 3] || "UNHRC";
  const choose = (index: number) => { setAnswers([...answers, index]); setStep(step + 1); };
  const reset = () => { setStep(0); setAnswers([]); };
  return (
    <section className="quiz-section">
      <div className="quiz-copy"><span className="sticker">COMMITTEE ADVISORY</span><SectionTitle eyebrow="Committee guidance" title={<>Identify the committee<br />best suited to you.</>} copy="Answer five short questions to receive a recommendation based on your interests and preferred style of debate." /></div>
      <div className="quiz-card">
        {step < questions.length ? <>
          <div className="quiz-progress"><span>Question {step + 1} of 5</span><div><i style={{ width: `${(step + 1) * 20}%` }} /></div></div>
          <h3>{questions[step][0]}</h3>
          <div className="quiz-options">{questions[step][1].map((option, i) => <button key={option} onClick={() => choose(i)}><span>{String.fromCharCode(65 + i)}</span>{option}<Icon name="arrow" /></button>)}</div>
        </> : <div className="quiz-result"><span className="eyebrow">Your room is waiting</span><strong>{result}</strong><h3>{committees.find((c) => c.code === result)?.name}</h3><p>You stay sharp under pressure, listen before you strike, and know exactly when to move the room.</p><Button href="#register">Claim this committee <Icon name="arrow" /></Button><button className="text-btn" onClick={reset}>Take it again</button></div>}
      </div>
    </section>
  );
}

function PortfolioMatrix() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => portfolioData.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <section className="section matrix-section">
      <SectionTitle eyebrow="Portfolio matrix" title={<>Country and <span className="marker orange-marker">portfolio allocation</span></>} copy="Search available portfolios by committee or country. Final allocations remain subject to confirmation by the Secretariat." light />
      <div className="matrix-shell">
        <label className="search-box"><Icon name="search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search committee or country…" /></label>
        <div className="matrix-head"><span>Committee</span><span>Country / Portfolio</span><span>Status</span></div>
        {rows.map((row) => <div className="matrix-row" key={row.join("-")}><strong>{row[0]}</strong><span>{row[1]}</span><span className={`availability ${row[2].toLowerCase()}`}><i />{row[2]}</span></div>)}
      </div>
    </section>
  );
}

function Guide() {
  const steps = [
    ["01", "Understanding Model United Nations", "A simulation of the United Nations in which delegates represent a country, deliberate on international issues and work towards a collective resolution."],
    ["02", "Committee procedure", "Motions establish the course of debate. Moderated caucuses facilitate structured speeches, while unmoderated caucuses support negotiation and drafting."],
    ["03", "Preparing a position paper", "Research your country's established policy, define the issue and present practical solutions supported by credible evidence."],
    ["04", "Conference preparation", "Attend in western business or Indian formals, bring your research and participate with confidence and professional courtesy."],
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="new-to-mun" className="section guide-section">
      <div className="guide-heading"><SectionTitle eyebrow="Delegate resources" title={<>A considered introduction<br />to <span className="pink-text">Model United Nations.</span></>} copy="A concise guide to procedure, preparation and professional conduct for delegates attending their first conference." light /></div>
      <div className="guide-layout">
        <div className="guide-tabs">{steps.map((item, i) => <button key={item[0]} onClick={() => setActive(i)} className={active === i ? "active" : ""}><span>{item[0]}</span>{item[1]}<Icon name="arrow" /></button>)}</div>
        <div className="guide-panel"><span>STEP {steps[active][0]}</span><h3>{steps[active][1]}</h3><p>{steps[active][2]}</p><div className="term-card"><small>TERM TO KNOW</small><strong>{active === 1 ? "Moderated caucus" : active === 2 ? "Position paper" : active === 3 ? "Point of order" : "Delegate"}</strong><p>{active === 1 ? "A focused, timed round of speeches on one sub-topic." : "A useful phrase you will hear in committee — and master faster than you think."}</p></div><Button variant="light" href="#register">Get the starter kit <Icon name="arrow" /></Button></div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats-strip">
      {[["07", "Conferences hosted"], ["1,200+", "Delegates welcomed"], ["40+", "Colleges represented"], ["09", "Cities in the room"]].map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}
    </section>
  );
}

function Past() {
  const [photo, setPhoto] = useState<(typeof photos)[0] | null>(null);
  return (
    <section id="past" className="section past-section">
      <SectionTitle eyebrow="Conference archive" title={<>A record of<br /><span className="marker">our proceedings.</span></>} copy="Selected moments from past conferences, documenting formal debate, collaboration and participation across institutions." />
      <div className="timeline">
        {[["2023", "DJMUN 2023", "The room returns"], ["2024", "Youth Summit 1.0", "Building bridges"], ["2025", "DJMUN '25", "Diplomacy. Debate. Power."], ["2026", "DJSMUN '26", "Our newest chapter"]].map((item, i) => <div className={i === 3 ? "current" : ""} key={item[0]}><span>{item[0]}</span><strong>{item[1]}</strong><small>{item[2]}</small></div>)}
      </div>
      <div className="gallery-grid">{photos.map((item, i) => <button key={item.url} className={`photo photo-${i + 1}`} onClick={() => setPhoto(item)}><img src={item.url} alt={item.label} /><span>{item.label}<small>Photo: {item.credit} / Unsplash</small></span></button>)}</div>
      <div className="testimonial"><span className="quote-mark">“</span><blockquote>I came in terrified of raising my placard. By the final session, I was fighting to get one last speech in.</blockquote><div><strong>A first-time delegate</strong><span>DJMUN '25</span></div></div>
      {photo && <div className="lightbox" onClick={() => setPhoto(null)}><button aria-label="Close lightbox"><Icon name="x" /></button><img src={photo.url} alt={photo.label} /><span>{photo.label} · Photo by {photo.credit} on Unsplash</span></div>}
    </section>
  );
}

function TeamPartners() {
  const team = [
    ["Secretary-General", "Conference leadership", "Responsible for the academic direction and institutional standards of the conference."],
    ["Director-General", "Conference operations", "Oversees planning, coordination and the effective delivery of conference proceedings."],
    ["USG Delegate Affairs", "Delegate relations", "Supports participating institutions and delegates throughout the registration process."],
    ["USG Marketing", "Communications", "Leads conference communications, outreach and external engagement."],
  ];
  return (
    <section className="section team-section">
      <SectionTitle eyebrow="The Secretariat" title={<>Leadership with<br /><span className="pink-text">purpose.</span></>} copy="Meet the student leadership responsible for the academic, operational and institutional work of DJS MUNSOC." />
      <div className="team-grid">{team.map((member, i) => <article className="team-card" key={member[0]}><span className={`avatar avatar-${i + 1}`}>{String(i + 1).padStart(2, "0")}</span><small>{member[0]}</small><h3>{member[1]}</h3><p>{member[2]}</p><a href="#contact" aria-label={`Connect with ${member[0]} on LinkedIn`}><Icon name="linkedin" /></a></article>)}</div>
      <div className="partner-box"><div><span className="eyebrow">Partners & institutions</span><h2>Support student<br />leadership.</h2><p>Partner with a conference that brings together informed and ambitious students from institutions across Mumbai and India.</p><Button href="mailto:djsmunsoc@gmail.com" variant="light">Request partnership prospectus <Icon name="arrow" /></Button></div><div className="partner-visual"><span>INSTITUTIONAL<br />PARTNER</span><i>×</i><strong>DJS<br />MUNSOC</strong><small>Sponsorship prospectus available upon request</small></div></div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq-section">
      <SectionTitle eyebrow="Frequently asked questions" title="Delegate information" copy="Key information for delegates, participating institutions and parents." light />
      <div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${open === i ? "open" : ""}`} key={question}><button onClick={() => setOpen(open === i ? -1 : i)}><span>{String(i + 1).padStart(2, "0")}</span>{question}<Icon name="chevron" /></button><div><p>{answer}</p></div></div>)}</div>
    </section>
  );
}

function RegisterFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email) setSent(true); };
  return (
    <>
      <section id="register" className="register-section">
        <span className="eyebrow"><Icon name="mail" /> Registration updates</span>
        <h2>Join the delegate<br /><em>interest list.</em></h2>
        <p>Registrations for DJS Youth Summit 3.0 open soon. Receive the registration link, committee matrix and official conference updates.</p>
        {sent ? <div className="success"><Icon name="check" /> You're on the list. Watch your inbox.</div> : <form onSubmit={submit}><label><Icon name="mail" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@college.edu" /></label><button type="submit">Notify me <Icon name="arrow" /></button></form>}
        <small>Your details will be used only for official DJS MUNSOC communications.</small>
      </section>
      <footer id="contact">
        <div className="footer-top"><img src="/djs-munsoc-logo.png" alt="DJS MUNSOC" /><p>Creating sharper minds, braver voices and unforgettable committee rooms since 2022.</p><div className="socials"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a><a href="mailto:djsmunsoc@gmail.com" aria-label="Email"><Icon name="mail" /></a></div></div>
        <div className="footer-grid"><div><strong>Explore</strong><a href="#conferences">Conferences</a><a href="#committees">Committees</a><a href="#new-to-mun">New to MUN?</a><a href="#past">Past editions</a></div><div><strong>Say hello</strong><a href="mailto:djsmunsoc@gmail.com">djsmunsoc@gmail.com</a><span>+91 • Mumbai, India</span></div><div><strong>Find us</strong><span>Dwarkadas J. Sanghvi College of Engineering<br />Vile Parle West, Mumbai 400056</span><a href="https://maps.google.com" target="_blank" rel="noreferrer">Open in Maps ↗</a></div></div>
        <div className="footer-bottom"><span>© DJS MUNSOC 2026</span><span>Dwarkadas J. Sanghvi College of Engineering</span></div>
      </footer>
      <div className="floating-actions"><a className="float-register" href="#register">Register <Icon name="arrow" /></a><a className="float-contact" href="https://wa.me/" aria-label="Chat on WhatsApp"><Icon name="whatsapp" /></a></div>
    </>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <Conferences />
      <Committees />
      <Quiz />
      <PortfolioMatrix />
      <Guide />
      <Stats />
      <Past />
      <TeamPartners />
      <FAQ />
      <RegisterFooter />
    </main>
  );
}

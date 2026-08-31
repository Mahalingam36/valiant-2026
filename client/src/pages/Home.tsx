/**
 * VALIANT 2026 / Midnight Blockbuster direction.
 * This page uses a left-rail cinematic composition, voltage-blue signal light,
 * restrained amber accents, and purposeful motion that respects reduced-motion preferences.
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CirclePlay,
  Compass,
  ExternalLink,
  Github,
  Instagram,
  MapPin,
  Menu,
  Pause,
  Radio,
  Sparkles,
  Trophy,
  X,
  Zap,
} from "lucide-react";

const heroImage = "/manus-storage/valiant-hero-portal_ae9dffe9.jpg";
const circuitImage = "/manus-storage/valiant-circuit-texture_fd9ec9a0.jpg";
const mythicImage = "/manus-storage/valiant-mythic-arena_a4dfae4c.jpg";
const locationImage = "/manus-storage/valiant-location-beacon_88c88ee8.jpg";
const markImage = "/manus-storage/valiant-mark_55583ff8.png";
const signalBandImage = "/manus-storage/valiant-signal-band_21293eaf.jpg";
const arenaFlareImage = "/manus-storage/valiant-arena-flare_7fd97932.jpg";
const driveImages = {
  ironman: "/manus-storage/ironman_c0cd7dc4.jpg",
  spiderman: "/manus-storage/spiderman_6bddbb0f.jpg",
  thor: "/manus-storage/thor_7de46931.jpg",
  harrypotter: "/manus-storage/harrypotter_88050ac7.jpg",
  harrygroup: "/manus-storage/harrygroup_e1c5a315.jpg",
  superman: "/manus-storage/superman_6bca66cd.jpg",
  aquaman: "/manus-storage/aquaman_1dd70568.jpg",
  wonderwoman: "/manus-storage/wonderwoman_adb776e1.jpg",
  clown: "/manus-storage/clown_375a5dc7.jpg",
  nun: "/manus-storage/nun_875d8f95.jpg",
};

const events = {
  technical: [
    { no: "01", title: "Paper Presentation", tag: "IDEAS / STAGE", desc: "Turn a sharp question into a story the room cannot ignore.", icon: Radio, venue: "ECE Seminar Hall", time: "09:30 AM – 11:00 AM", team: "1–2 Members", details: "Present innovative ideas, research work, technical solutions, or futuristic concepts related to engineering and technology.", rules: ["Maximum 10 slides.", "Presentation duration: 7 minutes.", "Q&A: 3 minutes.", "Topics must be technical.", "Bring presentation in PPT/PDF format."] },
    { no: "02", title: "Circuit Craze", tag: "BUILD / SPEED", desc: "Read the signal. Route the current. Make the board sing.", icon: Zap, venue: "Electronics Laboratory", time: "11:15 AM – 12:30 PM", team: "Individual", details: "A practical electronics challenge testing circuit analysis, troubleshooting, component identification, and problem-solving skills.", rules: ["Participants must complete assigned tasks within the given time.", "Judging is based on accuracy and completion time.", "Electronic components will be provided."] },
    { no: "03", title: "Technical Quiz", tag: "KNOWLEDGE / LIVE", desc: "Three rounds. Rapid fire, picture round, true or false blitz.", icon: Trophy, venue: "Smart Classroom", time: "01:30 PM – 03:00 PM", team: "2 Members", details: "Compete in multiple exciting rounds designed to test technical knowledge, logical thinking, and engineering fundamentals.", rounds: [{ name: "Round 1: Rapid Fire", points: "30 seconds per team. Answer maximum questions; speed and accuracy matter." }, { name: "Round 2: Picture Round", points: "Identify technical terms, inventions, scientists, electronic components, and technologies from images." }, { name: "Round 3: True or False Blitz", points: "Quick technical facts. Decide whether each statement is True or False." }], rules: ["No electronic gadgets allowed.", "Quiz master's decision is final."] },
  ],
  nonTechnical: [
    { no: "04", title: "Anime Arena", tag: "CULTURE / PLAY", desc: "A neon collision of fandom, recall, and arena energy.", icon: Sparkles, venue: "Mini Auditorium", time: "10:00 AM – 11:30 AM", team: "Individual", details: "A fun event for anime enthusiasts featuring anime trivia, character identification, logo guessing, and themed challenges.", rules: ["Questions will be based on popular anime series.", "Fastest correct answers score points."] },
    { no: "05", title: "Escape Room", tag: "PUZZLE / TEAM", desc: "The gate is locked. The room is talking. Find the way out.", icon: Compass, venue: "Innovation Lab", time: "01:00 PM – 02:30 PM", team: "3–5 Members", details: "Work together to solve clues, decode puzzles, and escape the room before time runs out.", rules: ["Time Limit: 30 minutes.", "Teamwork is mandatory.", "No external assistance allowed."] },
    { no: "06", title: "MazeBound", tag: "TACTICS / RACE", desc: "Choose a path before the path chooses you.", icon: CirclePlay, venue: "Open Ground / Indoor Arena", time: "03:00 PM – 04:00 PM", team: "Individual", details: "Navigate through a challenging maze filled with checkpoints and obstacles to reach the finish line.", rules: ["Fastest completion time wins.", "Follow all checkpoint instructions.", "Any shortcut leads to disqualification."] },
  ],
};

function useCountdown() {
  const target = useMemo(() => new Date("2026-09-24T09:00:00+05:30").getTime(), []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const distance = Math.max(target - now, 0);
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function CornerMark() {
  return <span className="corner-mark" aria-hidden="true" />;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.72, delay, ease: [0.23, 1, 0.32, 1] }}>{children}</motion.div>;
}

function EventCard({ event, image }: { event: (typeof events.technical)[number]; image?: string }) {
  const [open, setOpen] = useState(false);
  const Icon = event.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 180, damping: 20 }), [-100, 100], [4, -4]);
  const rotateY = useTransform(useSpring(x, { stiffness: 180, damping: 20 }), [-100, 100], [-4, 4]);
  return (
    <>
      <motion.article
        className="event-card group"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        whileTap={{ scale: 0.985 }}
      >
        {image && <div className="card-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 20%, rgba(4,7,14,.92)), url(${image})` }} />}
        <div className="event-card-top"><span><b className="dossier-code">DOSSIER</b> {event.no}</span><Icon size={18} strokeWidth={1.4} /></div>
        <div className="event-card-content">
          <p className="eyebrow">{event.tag}</p>
          <h3>{event.title}</h3>
          <p className="event-desc">{event.desc}</p>
          <button className="event-link" onClick={() => setOpen(true)} aria-haspopup="dialog">View event brief <ArrowUpRight size={15} /></button>
        </div>
        <CornerMark />
      </motion.article>
      {open && <div className="event-modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
        <motion.div className="event-modal" role="dialog" aria-modal="true" aria-labelledby={`event-${event.no}`} initial={{ opacity: 0, y: 14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} onClick={(e) => e.stopPropagation()}>
          <button className="event-modal-close" onClick={() => setOpen(false)} aria-label={`Close ${event.title} details`}><X size={19} /></button>
          <p className="eyebrow">DOSSIER / {event.no} / EVENT BRIEF</p>
          <h3 id={`event-${event.no}`}>{event.title}</h3>
          <div className="event-facts"><span><b>VENUE</b>{event.venue}</span><span><b>TIME</b>{event.time}</span><span><b>TEAM SIZE</b>{event.team}</span></div>
          <p className="event-modal-description">{event.details}</p>
          {event.rounds && <div className="event-modal-block"><b className="event-block-label">ROUNDS</b>{event.rounds.map((round) => <div className="event-round" key={round.name}><strong>{round.name}</strong><span>{round.points}</span></div>)}</div>}
          <div className="event-modal-block"><b className="event-block-label">RULES</b><ul>{event.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul></div>
        </motion.div>
      </div>}
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const countdown = useCountdown();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`site-shell ${loaded ? "is-loaded" : ""}`}>
      <div className="loader" aria-hidden={loaded}>
        <div className="loader-inner"><img src={markImage} alt="" /><span>INITIALIZING SIGNAL</span><div className="loader-line"><i /></div><strong>VALIANT / 2026</strong></div>
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="ambient-dock ambient-dock-left" aria-hidden="true"><img className="dock-image dock-spider" src={driveImages.spiderman} alt="" /><img className="dock-image dock-wonder" src={driveImages.wonderwoman} alt="" /><img className="dock-image dock-clown" src={driveImages.clown} alt="" /><img className="dock-image dock-harry" src={driveImages.harrypotter} alt="" /></div>
      <div className="ambient-dock ambient-dock-right" aria-hidden="true"><img className="dock-image dock-iron" src={driveImages.ironman} alt="" /><img className="dock-image dock-thor" src={driveImages.thor} alt="" /><img className="dock-image dock-aqua" src={driveImages.aquaman} alt="" /><img className="dock-image dock-nun" src={driveImages.nun} alt="" /></div>
      <aside className="signal-rail" aria-label="Section progress">
        <div className="rail-brand"><img src={markImage} alt="Valiant mark" /><span>VLT / 26</span></div>
        <div className="rail-line"><i /><span className="rail-tick tick-1">01</span><span className="rail-tick tick-2">02</span><span className="rail-tick tick-3">03</span><span className="rail-tick tick-4">04</span></div>
        <span className="rail-caption">ECE • AAA CET</span>
      </aside>
      <header className="topbar">
        <button className="wordmark" onClick={() => scrollTo("home")} aria-label="Back to home"><img src={markImage} alt="" /><span>VALIANT</span><b>2026</b></button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <button onClick={() => scrollTo("home")}>Home</button><button onClick={() => scrollTo("events")}>Events</button><button onClick={() => scrollTo("technical")}>Technical</button><button onClick={() => scrollTo("non-technical")}>Non-Technical</button><button onClick={() => scrollTo("contact")}>Contact</button><button onClick={() => scrollTo("register")}>Register</button>
        </nav>
        <div className="top-actions"><button className="sound-toggle" onClick={() => setSoundOn(!soundOn)} aria-label={soundOn ? "Mute ambient sound" : "Enable ambient sound"}>{soundOn ? <Pause size={15} /> : <CirclePlay size={15} />} <span>{soundOn ? "SOUND ON" : "SOUND OFF"}</span></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-backdrop" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="hero-beam" />
          <div className="hero-copy">
            <motion.p className="eyebrow reveal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }}>TRANSMISSION 01 / THE SIGNAL IS LIVE</motion.p>
            <motion.h1 className="hero-title reveal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.38, duration: .7 }}><span>VALIANT</span><em>2026</em></motion.h1>
            <motion.p className="hero-subtitle reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.62 }}>National Level<br /><strong>Technical Symposium</strong></motion.p>
            <motion.div className="hero-actions reveal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.76 }}><button className="primary-cta" onClick={() => scrollTo("register")}>Enter the arena <ArrowUpRight size={17} /></button><button className="text-cta" onClick={() => scrollTo("events")}>Explore events <ChevronRight size={15} /></button></motion.div>
          </div>
          <div className="hero-dossier">
            <p className="eyebrow">LIVE DOSSIER / 24.09.26</p><div className="dossier-rule" /><p className="dossier-title">Where<br /><strong>ideas become</strong><br />impact.</p><div className="dossier-meta"><span>DEPARTMENT OF ECE</span><span>AAA CET / SIVAKASI</span></div>
          </div>
          <div className="hero-scroll" onClick={() => scrollTo("events")}><span>Scroll to discover</span><ArrowDownRight size={17} /></div>
        </section>

        <section className="countdown-strip"><div><p className="eyebrow">NEXT TRANSMISSION</p><p className="strip-date"><CalendarDays size={16} /> 24 SEPTEMBER 2026 <span>•</span> SIVAKASI, TAMIL NADU</p></div><div className="countdown"><div><strong>{String(countdown.days).padStart(3, "0")}</strong><span>DAYS</span></div><b>:</b><div><strong>{String(countdown.hours).padStart(2, "0")}</strong><span>HRS</span></div><b>:</b><div><strong>{String(countdown.minutes).padStart(2, "0")}</strong><span>MIN</span></div><b>:</b><div><strong>{String(countdown.seconds).padStart(2, "0")}</strong><span>SEC</span></div></div></section>

        <section id="events" className="events-section section-pad">
          <Reveal className="section-head"><div><p className="eyebrow">TRANSMISSION 02 / THE PROGRAM</p><h2>Six ways to<br /><i>make a mark.</i></h2></div><p className="section-intro">A symposium is more than a stage. It is a room full of live wires, curious minds, and the moment an idea finds its voltage.</p></Reveal>
          <Reveal className="cinema-band signal-band" delay={0.08}><div className="cinema-band-image" style={{ backgroundImage: `url(${signalBandImage})` }} /><div className="cinema-band-copy"><span className="eyebrow">LIVE FEED / TECHNICAL</span><strong>Build the signal.</strong><span>TRANSMISSION 02A</span></div></Reveal>
          <motion.div id="technical" className="event-group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .7, ease: [0.23, 1, 0.32, 1] }}><div className="group-label"><span>01</span><h3>Technical events</h3><p>Build. Present. Defend.</p></div><div className="event-grid">{events.technical.map((event, index) => <motion.div key={event.no} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ delay: index * .08, duration: .5 }}><EventCard event={event} image={circuitImage} /></motion.div>)}</div></motion.div>
          <Reveal className="cinema-band arena-band" delay={0.06}><div className="cinema-band-image" style={{ backgroundImage: `url(${arenaFlareImage})` }} /><div className="cinema-band-copy"><span className="eyebrow">LIVE FEED / AFTER DARK</span><strong>Play outside the frame.</strong><span>TRANSMISSION 02B</span></div></Reveal>
          <motion.div id="non-technical" className="event-group non-tech" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .7, ease: [0.23, 1, 0.32, 1] }}><div className="group-label"><span>02</span><h3>Non-technical events</h3><p>Play. Decode. Escape.</p></div><div className="event-grid">{events.nonTechnical.map((event, index) => <motion.div key={event.no} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ delay: index * .08, duration: .5 }}><EventCard event={event} image={mythicImage} /></motion.div>)}</div></motion.div>
        </section>


        <motion.section id="register" className="register-section section-pad" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: .9 }}><div className="register-art" style={{ backgroundImage: `url(${heroImage})` }} /><div className="register-copy"><p className="eyebrow">TRANSMISSION 03 / YOUR MOVE</p><h2>Bring the idea.<br /><i>Enter the arena.</i></h2><p>Registration opens the gate to a day of technical intensity, unexpected detours, and new people worth remembering.</p><div className="registration-details"><div><b>REPORTING</b><span>09:00 AM / 24 SEPTEMBER 2026</span></div><div><b>VENUE</b><span>AAA College of Engineering and Technology, Amathur, Sivakasi</span></div><div><b>PRIZES</b><span>Certificates + trophies for first and second prize winners. Participation certificate for all registered participants.</span></div></div><a className="primary-cta" href="https://forms.google.com/" target="_blank" rel="noreferrer">Register now <ExternalLink size={16} /></a></div><div className="register-stamp"><span>OPEN</span><strong>REG / 26</strong></div></motion.section>

        <motion.section id="contact" className="location-section section-pad" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: .8, ease: [0.23, 1, 0.32, 1] }}><div className="location-copy"><p className="eyebrow">TRANSMISSION 04 / COORDINATES</p><h2>Find the<br /><i>signal.</i></h2><div className="location-address"><MapPin size={18} /><p><strong>AAA College of Engineering and Technology</strong><br />Amathur, Sivakasi<br />Tamil Nadu, India</p></div><a className="text-cta" href="https://www.google.com/maps/search/?api=1&query=AAA+College+of+Engineering+and+Technology+Amathur+Sivakasi" target="_blank" rel="noreferrer">Open coordinates <ArrowUpRight size={15} /></a></div><div className="map-panel" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,8,15,.18), rgba(5,8,15,.42)), url(${locationImage})` }}><div className="map-grid" /><div className="map-pin"><span /><b>AAA CET</b></div><span className="map-coord">9°24' N / 77°48' E</span></div></motion.section>
      </main>
      <footer className="footer"><div className="footer-brand"><img src={markImage} alt="" /><span>VALIANT <b>2026</b></span></div><p>Department of ECE<br />AAA College of Engineering and Technology</p><div className="footer-social"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a></div><span className="footer-note">MADE FOR THE BOLD / © 2026</span></footer>
    </div>
  );
}

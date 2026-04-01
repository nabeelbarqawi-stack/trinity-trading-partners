"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ── Fade-up hook ── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────
   TICKER
───────────────────────────────────────── */
function Ticker() {
  const items = ["OPTIONS TRADING", "RISK MANAGEMENT", "IRON CONDORS", "CREDIT SPREADS", "MOMENTUM TRADING", "BREAKOUT STRATEGIES", "MARKET STRUCTURE", "TRADE RECAPS"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#1a2d4a] h-10 flex items-center" style={{ background: "linear-gradient(90deg, #070f1e, #0a1628, #070f1e)" }}>
      <div className="ticker-left flex items-center gap-10 text-[#4a9eff] tracking-widest text-xs uppercase font-semibold leading-none" style={{ fontFamily: "var(--font-inter)" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            {item}
            <span className="text-[#1a6fd4] opacity-60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Strategies", href: "#strategies" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050d1a]/95 backdrop-blur-sm border-b border-[#1a2d4a]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <a href="#hero" className="flex items-center gap-3">
          <div className="w-10 h-10 relative flex-shrink-0 rounded-full overflow-hidden">
            <Image src="/images/logo.png" alt="TTP Logo" fill className="object-cover" onError={() => {}} />
          </div>
          <div className="flex flex-col leading-none">
            <span style={{ fontFamily: "var(--font-bebas), sans-serif" }} className="text-lg tracking-widest text-white">TRINITY TRADING</span>
            <span style={{ fontFamily: "var(--font-bebas), sans-serif" }} className="text-lg tracking-widest blue-text -mt-1">PARTNERS</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>

        <a href="#pricing" className="hidden md:inline-block btn-blue text-sm px-6 py-3">Subscribe Now</a>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#050d1a]/98 border-t border-[#1a2d4a] px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-lg py-2" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#pricing" className="btn-blue text-center mt-2">Subscribe Now</a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grid-overlay">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2d8fff 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#2d8fff]" />
            <span className="text-[#4a9eff] tracking-[0.3em] text-xs uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Options Trading Education
            </span>
          </div>

          <h1 className="section-title text-white leading-none mb-5" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
            TRADE WITH
            <br />
            <span className="blue-text">DISCIPLINE.</span>
            <br />
            WIN WITH
            <br />
            <span className="blue-text">PROCESS.</span>
          </h1>

          <p className="text-[#8ab4d4] text-lg max-w-lg mb-10 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Professional options trading strategies — real-world execution,
            consistent risk management, and the mindset to trade like a pro.
            Not hype. Not luck. <strong className="text-white">Process.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#pricing" className="btn-blue text-center">Start Subscription</a>
            <a href="#about" className="btn-outline text-center">Learn More</a>
          </div>

          <div className="flex gap-10 mt-14 pt-10 border-t border-[#1a2d4a]">
            {[
              { num: "500+", label: "Active Members" },
              { num: "Weekly", label: "Trade Recaps" },
              { num: "6+", label: "Strategies Covered" },
            ].map((s) => (
              <div key={s.label}>
                <p className="stat-num text-4xl">{s.num}</p>
                <p className="text-[#4a7a9b] text-xs uppercase tracking-widest mt-1" style={{ fontFamily: "var(--font-inter)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full opacity-20 animate-pulse" style={{ background: "radial-gradient(circle, #2d8fff 0%, transparent 70%)" }} />
            <div className="absolute inset-8 rounded-full border border-[#2d8fff]/20" />
            <div className="absolute inset-16 rounded-full border border-[#2d8fff]/10" />
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 rounded-full overflow-hidden">
                <Image src="/images/logo.png" alt="Trinity Trading Partners" width={260} height={260} className="object-cover w-full h-full" onError={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-[#4a9eff] tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#4a9eff] to-transparent" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ABOUT
───────────────────────────────────────── */
function About() {
  const ref = useFadeUp();
  return (
    <section id="about" className="py-28" style={{ background: "linear-gradient(180deg, #050d1a 0%, #070f1e 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div ref={ref} className="fade-up relative">
          <div className="relative border border-[#1a2d4a] p-10 feature-card">
            <div className="flex items-center justify-center mb-8">
              <Image src="/images/logo-full.png" alt="TTP" width={240} height={120} className="object-contain opacity-90" onError={() => {}} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Day Trading", icon: "📈" },
                { label: "Swing Trading", icon: "⚡" },
                { label: "Premium Selling", icon: "💰" },
                { label: "Risk Management", icon: "🛡" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-[#8ab4d4] border border-[#1a2d4a] px-3 py-2" style={{ fontFamily: "var(--font-inter)" }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#2d8fff]/20 pointer-events-none" />
        </div>

        <div>
          <p className="text-[#4a9eff] tracking-[0.3em] text-xs uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>Who We Are</p>
          <h2 className="section-title text-white leading-none text-6xl md:text-7xl mb-4">
            BUILT FOR
            <br />
            <span className="blue-text">REAL TRADERS.</span>
          </h2>
          <div className="blue-divider" />
          <p className="text-[#8ab4d4] leading-relaxed mb-5 mt-6" style={{ fontFamily: "var(--font-inter)" }}>
            Trinity Trading Partners is an options trading channel focused on real-world
            strategies, disciplined execution, and consistent risk management. We&apos;re not
            here to sell you dreams — we&apos;re here to teach you how professional options
            traders actually think.
          </p>
          <p className="text-[#8ab4d4] leading-relaxed mb-8" style={{ fontFamily: "var(--font-inter)" }}>
            Our content is designed for traders who want to understand the <em className="text-white not-italic">why</em> behind
            every trade — not just what buttons to press. From small account concepts to
            advanced premium selling, we cover the full spectrum.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Weekly options trade recaps",
              "Step-by-step strategy breakdowns",
              "Small account trading concepts",
              "Market commentary & volatility analysis",
              "Educational content for all levels",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="text-[#2d8fff] flex-shrink-0">◆</span>
                <span className="text-[#8ab4d4] text-sm" style={{ fontFamily: "var(--font-inter)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   STRATEGIES
───────────────────────────────────────── */
function Strategies() {
  const ref = useFadeUp();
  const strategies = [
    { icon: "📈", title: "Options Trading", desc: "Day trading and swing trading options with defined risk entries, clear targets, and disciplined exits." },
    { icon: "⚡", title: "Momentum & Breakouts", desc: "Identifying high-probability momentum setups and breakout trades before they make their move." },
    { icon: "🧠", title: "Market Structure", desc: "Support & resistance, trend identification, and recognizing fake breakouts before you get trapped." },
    { icon: "💰", title: "Premium Selling", desc: "Iron condors, iron butterflies, and credit spreads — collecting premium with defined max risk." },
    { icon: "📊", title: "Trade Recaps", desc: "Weekly live market examples and real trade recaps with full breakdowns of entries, exits, and lessons." },
    { icon: "🛡", title: "Risk Management", desc: "Position sizing, drawdown control, and the trader mindset required to survive and thrive long-term." },
  ];

  return (
    <section id="strategies" className="py-28 grid-overlay" style={{ background: "#070f1e" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="fade-up text-center mb-16">
          <p className="text-[#4a9eff] tracking-[0.3em] text-xs uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>What We Cover</p>
          <h2 className="section-title text-white leading-none text-6xl md:text-8xl">
            OUR <span className="blue-text">STRATEGIES</span>
          </h2>
          <p className="text-[#4a7a9b] mt-4 max-w-xl mx-auto text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            Six core pillars that form the foundation of professional options trading.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {strategies.map((s) => (
            <div key={s.title} className="feature-card p-7">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="section-title text-white text-2xl mb-3">{s.title}</h3>
              <p className="text-[#4a7a9b] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PRICING
───────────────────────────────────────── */
function Pricing() {
  const ref = useFadeUp();
  return (
    <section id="pricing" className="py-28" style={{ background: "linear-gradient(180deg, #070f1e 0%, #050d1a 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="fade-up text-center mb-16">
          <p className="text-[#4a9eff] tracking-[0.3em] text-xs uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>Membership</p>
          <h2 className="section-title text-white leading-none text-6xl md:text-8xl">
            JOIN <span className="blue-text">TTP</span>
          </h2>
          <p className="text-[#4a7a9b] mt-4 max-w-xl mx-auto text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            One straightforward subscription. Full access to everything we produce.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Monthly */}
          <div className="feature-card p-10 flex flex-col">
            <span className="self-start text-xs text-[#4a7a9b] uppercase tracking-widest border border-[#1a2d4a] px-3 py-1 mb-5" style={{ fontFamily: "var(--font-inter)" }}>Monthly</span>
            <h3 className="section-title text-white text-4xl mb-1">Monthly Access</h3>
            <div className="flex items-end gap-2 my-4">
              <span className="stat-num text-6xl">$49</span>
              <span className="text-[#4a7a9b] mb-2 text-sm" style={{ fontFamily: "var(--font-inter)" }}>/month</span>
            </div>
            <p className="text-[#4a7a9b] text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-inter)" }}>
              Full access, cancel anytime. Perfect for traders who want to try before committing.
            </p>
            <ul className="flex flex-col gap-3 mb-10 flex-1">
              {["Weekly trade recaps", "All strategy content", "Market commentary", "Community access", "Beginner to advanced content"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[#8ab4d4]" style={{ fontFamily: "var(--font-inter)" }}>
                  <span className="text-[#2d8fff] flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-outline text-center">Get Started</a>
          </div>

          {/* Annual */}
          <div className="plan-highlight p-10 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1a6fd4] to-[#4a9eff]" />
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs text-[#4a9eff] uppercase tracking-widest border border-[#2d8fff] px-3 py-1" style={{ fontFamily: "var(--font-inter)" }}>Annual</span>
              <span className="text-xs bg-[#2d8fff] text-white px-3 py-1 uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>Best Value</span>
            </div>
            <h3 className="section-title text-white text-4xl mb-1">Annual Access</h3>
            <div className="flex items-end gap-2 my-4">
              <span className="stat-num text-6xl">$399</span>
              <span className="text-[#4a7a9b] mb-2 text-sm" style={{ fontFamily: "var(--font-inter)" }}>/year</span>
            </div>
            <p className="text-[#4a7a9b] text-sm leading-relaxed mb-1" style={{ fontFamily: "var(--font-inter)" }}>
              Save 32% vs monthly. Best for serious traders committed to growth.
            </p>
            <p className="text-[#4a9eff] text-xs mb-6" style={{ fontFamily: "var(--font-inter)" }}>That&apos;s $33.25/month — 2 months free.</p>
            <ul className="flex flex-col gap-3 mb-10 flex-1">
              {["Everything in Monthly", "Priority support", "Exclusive annual Q&A sessions", "Early access to new content", "Locked-in rate guarantee"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[#8ab4d4]" style={{ fontFamily: "var(--font-inter)" }}>
                  <span className="text-[#2d8fff] flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-blue text-center">Subscribe Annually</a>
          </div>
        </div>

        <p className="text-center text-[#2a4a6b] text-xs mt-8 max-w-lg mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
          * TTP provides educational content only. Nothing here constitutes financial advice. Always trade with proper risk management.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FAQ
───────────────────────────────────────── */
function FAQ() {
  const ref = useFadeUp();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Who is TTP for?", a: "Trinity Trading Partners is for anyone who wants to understand how professional options traders think — from complete beginners learning the basics to intermediate traders looking to sharpen their edge." },
    { q: "What will I get with my subscription?", a: "Weekly trade recaps, step-by-step strategy breakdowns, market commentary, volatility analysis, and educational content covering day trading, swing trading, premium selling, and risk management." },
    { q: "Do I need experience with options to join?", a: "No. We cover content for all levels. Beginners get foundational concepts and small account strategies, while advanced traders get deeper market structure and premium selling content." },
    { q: "Can I cancel anytime?", a: "Yes — monthly subscribers can cancel at any time with no penalty. Annual subscriptions are non-refundable but provide the best value for committed traders." },
    { q: "Is this financial advice?", a: "No. TTP provides educational content only. We share strategies, analysis, and trade recaps for learning purposes. Always conduct your own research and use proper risk management." },
  ];

  return (
    <section id="faq" className="py-28 grid-overlay" style={{ background: "#050d1a" }}>
      <div className="max-w-3xl mx-auto px-6">
        <div ref={ref} className="fade-up text-center mb-14">
          <p className="text-[#4a9eff] tracking-[0.3em] text-xs uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>Common Questions</p>
          <h2 className="section-title text-white leading-none text-6xl md:text-7xl">
            FREQUENTLY <span className="blue-text">ASKED</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="feature-card border border-[#1a2d4a]">
              <button className="w-full flex items-center justify-between px-7 py-5 text-left" onClick={() => setOpen(open === i ? null : i)}>
                <span className="section-title text-white text-xl">{faq.q}</span>
                <span className={`text-[#4a9eff] text-xl transition-transform duration-300 flex-shrink-0 ml-4 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-48" : "max-h-0"}`}>
                <p className="px-7 pb-6 text-[#4a7a9b] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #050d1a 0%, #071428 50%, #050d1a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2d8fff 0%, transparent 70%)" }} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#2d8fff] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px bg-[#2d8fff]/40" />
          <div className="w-12 h-12 rounded-full overflow-hidden opacity-80">
            <Image src="/images/logo.png" alt="TTP" width={48} height={48} className="object-cover w-full h-full" onError={() => {}} />
          </div>
          <div className="w-12 h-px bg-[#2d8fff]/40" />
        </div>
        <h2 className="section-title text-white leading-none mb-4" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
          STOP TRADING ON<br />
          <span className="blue-text">GUESSES.</span>
        </h2>
        <p className="text-[#4a7a9b] max-w-xl mx-auto mb-10 text-base" style={{ fontFamily: "var(--font-inter)" }}>
          Join hundreds of traders learning to execute with discipline, manage risk properly, and build sustainable trading habits.
        </p>
        <a href="#pricing" className="btn-blue text-lg px-10 py-5">Join Trinity Trading Partners</a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT
───────────────────────────────────────── */
function Contact() {
  const ref = useFadeUp();
  return (
    <section id="contact" className="py-28" style={{ background: "#070f1e" }}>
      <div className="max-w-2xl mx-auto px-6">
        <div ref={ref} className="fade-up text-center mb-12">
          <p className="text-[#4a9eff] tracking-[0.3em] text-xs uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>Get In Touch</p>
          <h2 className="section-title text-white leading-none text-5xl md:text-6xl">
            START YOUR <span className="blue-text">SUBSCRIPTION</span>
          </h2>
          <p className="text-[#4a7a9b] mt-4 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            Fill out the form and we&apos;ll get you set up within 24 hours.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name"
              className="bg-[#0a1628] border border-[#1a2d4a] text-white px-5 py-4 focus:outline-none focus:border-[#2d8fff] transition-colors placeholder-[#2a4a6b]"
              style={{ fontFamily: "var(--font-inter)" }} />
            <input type="text" placeholder="Last Name"
              className="bg-[#0a1628] border border-[#1a2d4a] text-white px-5 py-4 focus:outline-none focus:border-[#2d8fff] transition-colors placeholder-[#2a4a6b]"
              style={{ fontFamily: "var(--font-inter)" }} />
          </div>
          <input type="email" placeholder="Email Address"
            className="bg-[#0a1628] border border-[#1a2d4a] text-white px-5 py-4 focus:outline-none focus:border-[#2d8fff] transition-colors placeholder-[#2a4a6b]"
            style={{ fontFamily: "var(--font-inter)" }} />
          <select className="bg-[#0a1628] border border-[#1a2d4a] text-[#4a7a9b] px-5 py-4 focus:outline-none focus:border-[#2d8fff] transition-colors appearance-none"
            style={{ fontFamily: "var(--font-inter)" }}>
            <option value="">Select Plan</option>
            <option value="monthly">Monthly — $49/mo</option>
            <option value="annual">Annual — $399/yr (Best Value)</option>
          </select>
          <select className="bg-[#0a1628] border border-[#1a2d4a] text-[#4a7a9b] px-5 py-4 focus:outline-none focus:border-[#2d8fff] transition-colors appearance-none"
            style={{ fontFamily: "var(--font-inter)" }}>
            <option value="">Trading Experience Level</option>
            <option value="beginner">Beginner (0–1 years)</option>
            <option value="intermediate">Intermediate (1–3 years)</option>
            <option value="advanced">Advanced (3+ years)</option>
          </select>
          <textarea rows={3} placeholder="Any questions or goals you'd like to share..."
            className="bg-[#0a1628] border border-[#1a2d4a] text-white px-5 py-4 focus:outline-none focus:border-[#2d8fff] transition-colors placeholder-[#2a4a6b] resize-none"
            style={{ fontFamily: "var(--font-inter)" }} />
          <button type="submit" className="btn-blue text-center py-5 text-lg mt-2">
            Submit &amp; Get Access
          </button>
        </form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#1a2d4a] py-14" style={{ background: "#050d1a" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-10">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/images/logo-full.png" alt="Trinity Trading Partners" width={200} height={80} className="object-contain" onError={() => {}} />
            </div>
            <p className="text-[#2a4a6b] text-xs leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              Options trading education built around process over hype. Real strategies. Real discipline. Real results.
            </p>
          </div>

          <div>
            <h4 className="section-title text-[#4a9eff] text-xl mb-5 tracking-widest">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", href: "#hero" },
                { label: "About", href: "#about" },
                { label: "Strategies", href: "#strategies" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Subscribe", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#2a4a6b] hover:text-[#4a9eff] text-xs transition-colors uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="section-title text-[#4a9eff] text-xl mb-5 tracking-widest">Connect</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "YouTube", handle: "@TrinityTradingPartners" },
                { label: "Twitter", handle: "@TTPTrading" },
                { label: "Discord", handle: "TTP Community" },
                { label: "Email", handle: "info@trinitytrading.com" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="text-[#4a9eff] text-xs uppercase tracking-widest w-16" style={{ fontFamily: "var(--font-inter)" }}>{s.label}</span>
                  <span className="text-[#2a4a6b] text-xs" style={{ fontFamily: "var(--font-inter)" }}>{s.handle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a2d4a] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#1a3050] text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} Trinity Trading Partners. All rights reserved.
          </p>
          <p className="text-[#1a3050] text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            Educational content only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Strategies />
      <Pricing />
      <CTABanner />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

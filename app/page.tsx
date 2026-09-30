"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { sitePath } from "./site-path";

const practices = [
  { number: "01", title: "Family law", text: "Steady counsel for separation, parenting, support, and the agreements that shape what comes next." },
  { number: "02", title: "Employment law", text: "Clear advice for employees and employers navigating contracts, exits, disputes, and workplace change." },
  { number: "03", title: "Civil litigation", text: "Focused representation for commercial and personal disputes, from early strategy through resolution." },
  { number: "04", title: "Estate disputes", text: "Thoughtful guidance through contested estates, capacity concerns, and difficult family disagreements." },
];

const testimonials = [
  { quote: "They made a difficult process feel manageable. Every question was answered plainly, and every decision still felt like ours.", matter: "Family law client" },
  { quote: "The advice was strategic, direct, and deeply considered. We always understood the reason behind the next step.", matter: "Employment law client" },
  { quote: "We felt listened to from the first conversation. The team brought both perspective and resolve when we needed them most.", matter: "Estate litigation client" },
];

function Placeholder({ label, ratio = "4 / 5", className = "", src }: { label: string; ratio?: string; className?: string; src?: string }) {
  return (
    <div className={`image-placeholder ${src ? "has-image" : ""} ${className}`} style={{ aspectRatio: ratio }}>
      {src ? <img src={sitePath(src)} alt={label} /> : <><span>{label}</span><small>IMAGE PLACEHOLDER · {ratio.replace("/", ":")}</small></>}
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [counting, setCounting] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let animation = 0;
    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        wasVisible = false;
        return;
      }
      if (wasVisible) return;
      wasVisible = true;
      cancelAnimationFrame(animation);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setCount(value);
        setCounting(false);
      }
      else {
        setCount(0);
        setCounting(true);
        const start = performance.now() + 120;
        const duration = 1750;
        const tick = (now: number) => {
          const progress = Math.max(0, Math.min((now - start) / duration, 1));
          setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) animation = requestAnimationFrame(tick);
          else setCounting(false);
        };
        animation = requestAnimationFrame(tick);
      }
    }, { threshold: .2, rootMargin: "0px 0px -8% 0px" });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(animation); };
  }, [value]);
  const compact = value === 480 || value === 92;
  return <span ref={ref} className={`${counting ? "is-counting" : ""}${compact ? " is-compact" : ""}`} aria-label={`${value}${suffix}`}>{count}{suffix}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [sent, setSent] = useState(false);
  const [triageStep, setTriageStep] = useState(1);
  const [triage, setTriage] = useState({ matter: "", urgency: "", meeting: "" });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? window.scrollY / available : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTestimonial((current) => (current + 1) % testimonials.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const submitForm = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  const resetTriage = () => { setTriage({ matter: "", urgency: "", meeting: "" }); setTriageStep(1); };
  const selectedArea = triage.matter === "I’m not sure" ? "Not sure yet" : triage.matter;

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Meera Law home">
          <span className="brand-mark">ML</span><span>Meera Law</span>
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          <a href="#expertise" onClick={closeMenu}>Expertise</a><a href="#right-help" onClick={closeMenu}>Find help</a><a href="#approach" onClick={closeMenu}>Our approach</a>
          <a href="#people" onClick={closeMenu}>Attorneys</a><a href="#insights" onClick={closeMenu}>Insights</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="header-cta" href="#contact">Book a consultation</a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span /><span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal-first">
          <p className="eyebrow">Family · Employment · Civil · Estates</p>
          <h1><span>Law, with a <em>human</em></span> <span>point of view.</span></h1>
          <p className="hero-intro">Practical legal guidance for life&apos;s defining transitions—delivered with clarity, care, and quiet confidence.</p>
          <div className="hero-actions"><a className="primary-button" href="#contact">Book a consultation</a><a className="text-link" href="#expertise">Explore our expertise <span>↗</span></a></div>
          <p className="hero-note">Serving individuals and businesses since 2008</p>
        </div>
        <div className="hero-visual reveal-second">
          <Placeholder label="Meera Raman, principal attorney" src="/images/meera-raman.webp" />
          <div className="portrait-caption"><span>Meera Raman</span><small>Founder &amp; Principal Counsel</small></div>
        </div>
      </section>

      <div className="trust-marquee" aria-label="Selected fictional recognition">
        <div className="marquee-track">
          {[0, 1].map((copy) => <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
            <span>Regional Law Review</span><i>◆</i><span>Business Counsel Network</span><i>◆</i><span>Family Law Association</span><i>◆</i><span>Workplace Legal Journal</span><i>◆</i><span>Community Advocacy Council</span><i>◆</i>
          </div>)}
        </div>
      </div>

      <section className="expertise section-pad" id="expertise">
        <div className="section-heading"><p className="eyebrow">How we can help</p><h2>Legal experience shaped around <em>your life.</em></h2></div>
        <div className="practice-list">
          {practices.map((practice) => <a className="practice-row" href="#contact" key={practice.number}>
            <span className="practice-number">{practice.number}</span><h3>{practice.title}</h3><p>{practice.text}</p><span className="practice-arrow">↗</span>
          </a>)}
        </div>
      </section>

      <section className="right-help section-pad" id="right-help" aria-labelledby="right-help-title">
        <div className="right-help-intro">
          <p className="eyebrow light">Find the right help</p>
          <h2 id="right-help-title">Three questions.<br /><em>A clearer next step.</em></h2>
          <p>This private demo guide does not collect or send your answers. It helps identify the most suitable starting point.</p>
        </div>
        <div className="triage-panel">
          <div className="triage-progress" aria-label={`Step ${Math.min(triageStep, 3)} of 3`}>
            {[1, 2, 3].map((step) => <span className={triageStep >= step ? "is-active" : ""} key={step}>0{step}</span>)}
          </div>
          {triageStep === 1 && <div className="triage-step">
            <span>Step 1 of 3</span><h3>What kind of matter brings you here?</h3>
            <div className="triage-options">
              {["Family law", "Employment law", "Civil litigation", "Estate dispute", "I’m not sure"].map((matter) => <button type="button" key={matter} onClick={() => { setTriage({ ...triage, matter }); setTriageStep(2); }}>{matter}<i>→</i></button>)}
            </div>
          </div>}
          {triageStep === 2 && <div className="triage-step">
            <span>Step 2 of 3</span><h3>Is there a hearing or important deadline?</h3>
            <div className="triage-options">
              {["Within 7 days", "Within 30 days", "Later than 30 days", "No deadline", "I’m not sure"].map((urgency) => <button type="button" key={urgency} onClick={() => { setTriage({ ...triage, urgency }); setTriageStep(3); }}>{urgency}<i>→</i></button>)}
            </div>
            <button className="triage-back" type="button" onClick={() => setTriageStep(1)}>← Back</button>
          </div>}
          {triageStep === 3 && <div className="triage-step">
            <span>Step 3 of 3</span><h3>How would you prefer to speak with us?</h3>
            <div className="triage-options">
              {["Video consultation", "Phone consultation", "In-person meeting"].map((meeting) => <button type="button" key={meeting} onClick={() => { setTriage({ ...triage, meeting }); setTriageStep(4); }}>{meeting}<i>→</i></button>)}
            </div>
            <button className="triage-back" type="button" onClick={() => setTriageStep(2)}>← Back</button>
          </div>}
          {triageStep === 4 && <div className="triage-result" role="status">
            <span>Your suggested next step</span>
            <h3>{triage.urgency === "Within 7 days" ? "Request a priority call." : "Arrange an initial consultation."}</h3>
            <p>Start with our {triage.matter === "I’m not sure" ? "general intake" : triage.matter.toLowerCase()} team by {triage.meeting.toLowerCase()}. We&apos;ll first confirm availability and complete a conflict check before discussing confidential details.</p>
            <dl><div><dt>Matter</dt><dd>{triage.matter}</dd></div><div><dt>Timing</dt><dd>{triage.urgency}</dd></div><div><dt>Format</dt><dd>{triage.meeting}</dd></div></dl>
            <p className="carry-note">These answers will be carried into the enquiry form, where you can review or change them.</p>
            <div className="triage-actions"><a className="primary-button" href="#contact">Continue to enquiry</a><button type="button" onClick={resetTriage}>Start again</button></div>
          </div>}
        </div>
      </section>

      <section className="approach" id="approach">
        <div className="approach-visual"><Placeholder label="Attorney speaking with a client during a consultation" ratio="3 / 4" src="/images/consultation.webp" /></div>
        <div className="approach-copy">
          <p className="eyebrow light">Our point of view</p>
          <h2>Before there is a legal problem, there is a <em>human one.</em></h2>
          <p>Legal matters rarely arrive at a convenient time. They touch families, work, identity, and plans for the future. Our first task is to understand what the problem means for you—not only what it looks like on paper.</p>
          <p>From there, we bring plain language, disciplined preparation, and a strategy designed for your priorities.</p>
          <a className="light-link" href="#people">Meet the people behind the work <span>→</span></a>
        </div>
      </section>

      <section className="numbers section-pad" aria-labelledby="numbers-title">
        <div className="numbers-intro"><p className="eyebrow">Experience, in perspective</p><h2 id="numbers-title">A steady record of showing up.</h2><p>Fictional statistics shown for demonstration purposes only.</p></div>
        <div className="stats-grid">
          <div className="stat"><strong><Counter value={16} /></strong><span>Years of practice</span></div>
          <div className="stat"><strong><Counter value={480} suffix="+" /></strong><span>Matters handled</span></div>
          <div className="stat"><strong><Counter value={92} suffix="%" /></strong><span>Resolved without trial</span></div>
          <div className="stat"><strong><Counter value={4} /></strong><span>Focused practice areas</span></div>
        </div>
      </section>

      <section className="outcomes section-pad">
        <div className="section-heading outcomes-heading"><p className="eyebrow light">Selected outcomes</p><h2>Strategy made <em>specific.</em></h2><p>Representative fictional matters. Past results do not guarantee future outcomes.</p></div>
        <div className="case-grid">
          <article className="case-card"><span>01 / Employment</span><h3>A thoughtful exit from a complex executive role.</h3><p>Negotiated a confidential resolution that protected reputation, compensation, and future opportunity.</p><a href="#contact">Discuss a similar matter →</a></article>
          <article className="case-card"><span>02 / Family</span><h3>Creating stability across borders.</h3><p>Built a practical parenting arrangement for a family balancing two countries, schools, and changing work demands.</p><a href="#contact">Discuss a similar matter →</a></article>
          <article className="case-card"><span>03 / Estates</span><h3>Resolving a long-held family dispute.</h3><p>Used focused mediation to reach agreement while preserving important relationships and estate value.</p><a href="#contact">Discuss a similar matter →</a></article>
        </div>
      </section>

      <section className="people section-pad" id="people">
        <div className="section-heading"><p className="eyebrow">Our people</p><h2>Serious about the law.<br /><em>Human about everything else.</em></h2></div>
        <div className="people-grid">
          <article className="person featured"><Placeholder label="Meera Raman, founder and principal counsel" ratio="4 / 5" src="/images/meera-raman.webp" /><div><span>Founder &amp; Principal Counsel</span><h3>Meera Raman</h3><p>Family law · Employment law · Mediation</p><a href="#contact">View profile ↗</a></div></article>
          <article className="person"><Placeholder label="Arjun Dev, counsel" ratio="4 / 5" src="/images/arjun-dev.webp" /><div><span>Counsel</span><h3>Arjun Dev</h3><p>Civil litigation · Estate disputes</p><a href="#contact">View profile ↗</a></div></article>
          <article className="person"><Placeholder label="Nila Krishnan, associate" ratio="4 / 5" src="/images/nila-krishnan-new.webp" /><div><span>Associate</span><h3>Nila Krishnan</h3><p>Family law · Workplace matters</p><a href="#contact">View profile ↗</a></div></article>
        </div>
      </section>

      <section className="testimonial" aria-label="Client perspectives">
        <p className="eyebrow light">Client perspective · Fictional demo copy</p>
        <blockquote key={testimonial}>“{testimonials[testimonial].quote}”</blockquote>
        <p className="testimonial-source">— {testimonials[testimonial].matter}</p>
        <div className="testimonial-controls">
          <button type="button" onClick={() => setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial">←</button>
          <span>0{testimonial + 1} / 0{testimonials.length}</span>
          <button type="button" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} aria-label="Next testimonial">→</button>
        </div>
      </section>

      <section className="insights section-pad" id="insights">
        <div className="section-heading compact"><p className="eyebrow">From the desk</p><h2>Useful thinking,<br /><em>plainly shared.</em></h2></div>
        <div className="insight-list">
          <article><span>Family law · 6 min read</span><h3>What to prepare before your first legal consultation</h3><a href={sitePath("insights/preparing-for-your-first-consultation")}>Read the note ↗</a></article>
          <article><span>Employment · 8 min read</span><h3>When a workplace issue needs legal advice</h3><a href={sitePath("insights/when-workplace-issues-need-legal-advice")}>Read the note ↗</a></article>
          <article><span>Dispute resolution · 7 min read</span><h3>Mediation or litigation: understanding the difference</h3><a href={sitePath("insights/mediation-or-litigation")}>Read the note ↗</a></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy"><p className="eyebrow light">Start a conversation</p><h2>You don&apos;t need to have the right words. <em>Start where you are.</em></h2><p>Tell us a little about what brings you here. A member of our fictional demo team will follow up within one business day.</p><div className="contact-details"><a href="tel:+914455550184">+91 44 5555 0184</a><a href="mailto:hello@meeralaw.demo">hello@meeralaw.demo</a><span>Chennai · Mon–Fri · 9:00–18:00</span></div></div>
        <div className="contact-form-wrap">
          {sent ? <div className="success" role="status"><span>Thank you.</span><h3>Your message has been received.</h3><p>This is a demo confirmation. No information was transmitted or stored.</p><button type="button" onClick={() => setSent(false)}>Send another message</button></div> :
          <form onSubmit={submitForm}>
            {triageStep === 4 && <div className="carried-answers">
              <span>Carried over from “Find the right help”</span>
              <div><strong>{triage.matter}</strong><strong>{triage.urgency}</strong><strong>{triage.meeting}</strong></div>
            </div>}
            <input type="hidden" name="urgency" value={triage.urgency} />
            <div className="field-pair"><label>Name<input name="name" required /></label><label>Email or phone<input name="contact" required /></label></div>
            <div className="field-pair">
              <label>Area of concern<select name="area" value={selectedArea} onChange={(event) => setTriage({ ...triage, matter: event.target.value })}><option value="" disabled>Select one</option><option>Family law</option><option>Employment law</option><option>Civil litigation</option><option>Estate dispute</option><option>Not sure yet</option></select></label>
              <label>Preferred consultation<select name="consultation" value={triage.meeting} onChange={(event) => setTriage({ ...triage, meeting: event.target.value })}><option value="" disabled>Select one</option><option>Video consultation</option><option>Phone consultation</option><option>In-person meeting</option></select></label>
            </div>
            <label>Briefly, how can we help?<textarea name="message" rows={4} required /></label>
            <fieldset><legend>Preferred contact method</legend><label className="radio"><input type="radio" name="method" value="email" defaultChecked /> Email</label><label className="radio"><input type="radio" name="method" value="phone" /> Phone</label></fieldset>
            <button className="submit-button" type="submit">Request a consultation <span>→</span></button><small>Demo form only. Nothing entered here is sent or stored.</small>
          </form>}
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">ML</span><strong>Meera Law</strong><p>Law, with a human point of view.</p></div>
        <div className="footer-col"><span>Explore</span><a href="#expertise">Expertise</a><a href="#approach">Our approach</a><a href="#people">Attorneys</a><a href="#insights">Insights</a></div>
        <div className="footer-col"><span>Visit</span><p>18 Cathedral Garden Road<br />Chennai, Tamil Nadu<br />600 034</p><a href="#contact">LinkedIn ↗</a></div>
        <div className="footer-bottom"><span>© 2026 Meera Law — fictional demonstration website</span><span>Privacy · Legal disclaimer · Attorney advertising</span></div>
      </footer>
    </main>
  );
}

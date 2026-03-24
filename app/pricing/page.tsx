"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

gsap.registerPlugin(useGSAP);

// ─── DATA ────────────────────────────────────────────────────────────────────

const tiers = [
  {
    id: "starter",
    label: "STARTER",
    name: "Professional Foundation",
    price: 1500,
    deposit: 750,
    tagline: "Get online fast with a site that looks the part.",
    recommended: false,
    accentColor: "#6B7280",
    features: [
      { text: "Custom homepage — Hero, Services, About, Contact", included: true },
      { text: "Click-to-call button & contact/estimate form", included: true },
      { text: "Mobile-first responsive design", included: true },
      { text: "Your service area cities listed", included: true },
      { text: "About section with your photo & story", included: true },
      { text: "Basic SEO — page title, meta, OG tags", included: true },
      { text: "Deployed to Vercel (free hosting forever)", included: true },
      { text: "Photo gallery & lightbox", included: false },
      { text: "Before/after comparison slider", included: false },
      { text: "Blog (local SEO articles)", included: false },
      { text: "Online shop / gift cards", included: false },
    ],
    cta: "Start with Starter",
  },
  {
    id: "pro",
    label: "PRO",
    name: "The Full Brand Experience",
    price: 3000,
    deposit: 1500,
    tagline: "Everything you need to look premium and win bigger jobs.",
    recommended: true,
    accentColor: "#E8221A",
    features: [
      { text: "Everything in Starter", included: true },
      { text: "Photo gallery with lightbox — showcase your work", included: true },
      { text: "Before/after drag-to-reveal slider", included: true },
      { text: "Blog — 3 local SEO articles included", included: true },
      { text: "Full testimonials page with platform filters", included: true },
      { text: "Animated trust stats bar", included: true },
      { text: "Process / How We Work section", included: true },
      { text: "Local business schema markup", included: true },
      { text: "Priority 14-day delivery", included: true },
      { text: "Online shop / gift cards", included: false },
      { text: "Contractor/B2B landing section", included: false },
    ],
    cta: "Get the Pro Site",
  },
  {
    id: "premium",
    label: "PREMIUM",
    name: "Complete Business Platform",
    price: 5500,
    deposit: 2750,
    tagline: "A full digital engine — take bookings and sell online.",
    recommended: false,
    accentColor: "#1A3FA8",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Online shop — gift cards, consultations, bundles", included: true },
      { text: "Snipcart e-commerce (no monthly platform fee)", included: true },
      { text: "Contractor / Investor B2B landing section", included: true },
      { text: "Service area sub-pages for 6 cities (local SEO)", included: true },
      { text: "Google Business Profile setup & optimization", included: true },
      { text: "Color consultation booking flow", included: true },
      { text: "30-day post-launch support window", included: true },
      { text: "1-on-1 training call on launch day", included: true },
      { text: "3 revision rounds", included: true },
      { text: "Payment plan available — split 50/50", included: true },
    ],
    cta: "Build the Full Stack",
  },
];

const faqs = [
  {
    q: "Do I need to provide professional photos?",
    a: "No. We build around whatever you have — even phone photos from job sites. The Pro and Premium packages include a before/after slider specifically designed to make smartphone photos look polished.",
  },
  {
    q: "What are the ongoing monthly costs after launch?",
    a: "Zero platform fees. You pay for your domain (~$15/year) and Vercel hosting (~$0–10/month). The Premium shop uses Snipcart, which only charges a small transaction fee when you actually make a sale.",
  },
  {
    q: "How is this different from a $500 Wix or Squarespace site?",
    a: "Wix loads slow, ranks poorly on Google, and charges $30–60/month forever. This is custom Next.js code — sub-second load times, zero monthly fees, and built specifically to rank in local painting contractor searches.",
  },
  {
    q: "Can I update the site myself after it's built?",
    a: "Yes. The blog uses plain text files — no CMS login required. We hand over the full codebase and walk you through it. Premium clients get a 1-on-1 training call on launch day.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your business name, list of services, the cities you work in, any photos you have, and your phone number. We can have a Starter site live in under two weeks with just that.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. All packages can be split 50% to start and 50% on launch day. Just mention it when you reach out.",
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Check({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Dash() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isAnchor = tier.recommended;

  return (
    <div
      ref={ref}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? isAnchor ? "translateY(-12px)" : "translateY(0)"
          : "translateY(28px)",
        transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
        background: isAnchor ? "#0d1520" : "#111e29",
        border: isAnchor ? "1.5px solid rgba(232,34,26,0.5)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isAnchor ? "0 0 60px rgba(232,34,26,0.12), 0 24px 48px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Rainbow top line on anchor */}
      {isAnchor && <div className="h-[3px] w-full" style={{ background: "var(--rainbow)" }} />}

      <div className="p-8 flex flex-col flex-1">
        {/* Badge row */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">{tier.label}</span>
          {isAnchor && (
            <span
              className="text-[10px] font-black px-3 py-1 rounded-full tracking-[0.12em] uppercase"
              style={{ background: "rgba(232,34,26,0.2)", color: "#E8221A", border: "1px solid rgba(232,34,26,0.3)" }}
            >
              ★ Recommended
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-2">
          <span
            className="font-black leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 3.75rem)",
              color: isAnchor ? "#E8221A" : "white",
            }}
          >
            ${tier.price.toLocaleString()}
          </span>
        </div>
        <p className="text-white/30 text-xs tracking-widest uppercase mb-1">One-Time Investment</p>
        <p className="text-white/55 text-sm mb-8">{tier.name}</p>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-8">
          {tier.features.map((f) => (
            <li key={f.text} className="flex items-start gap-2.5">
              {f.included ? <Check color={isAnchor ? "#E8221A" : "rgba(255,255,255,0.5)"} /> : <Dash />}
              <span
                className="text-sm leading-snug"
                style={{ color: f.included ? (isAnchor ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.65)") : "rgba(255,255,255,0.2)" }}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div>
          <a
            href="mailto:Xpertisepainting25@gmail.com?subject=Website%20Package%20Inquiry%20—%20"
            className="block w-full text-center font-bold py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={isAnchor ? {
              background: "linear-gradient(135deg, #f2261d 0%, #E8221A 45%, #cc1c10 100%)",
              color: "white",
              boxShadow: "0 6px 24px rgba(232,34,26,0.4)",
              animation: "cta-breathe 3s ease-in-out infinite",
            } : {
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {tier.cta}
          </a>
          <p className="text-white/20 text-xs text-center mt-3">
            ${tier.deposit.toLocaleString()} deposit · ${tier.deposit.toLocaleString()} before launch
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      gsap.to(el, { height: "auto", opacity: 1, duration: 0.28, ease: "power2.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div
      ref={ref}
      className="border-b"
      style={{
        borderColor: "rgba(255,255,255,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.4s ease ${index * 0.06}s, transform 0.4s ease ${index * 0.06}s`,
      }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white/80 font-medium text-sm lg:text-base">{q}</span>
        <span
          className="text-white/30 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="text-white/45 text-sm leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(badge1Ref.current, { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" })
      .from(line1Ref.current, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.3")
      .from(line2Ref.current, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.65")
      .from(subRef.current, { y: 24, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
      .from(trustRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");
  }, { scope: heroRef });

  return (
    <>
      <Navigation />
      <main style={{ background: "#0d1520" }}>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
          style={{ paddingTop: "100px", paddingBottom: "80px" }}
        >
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)", backgroundSize: "36px 36px" }} />
          {/* Red glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,34,26,0.1) 0%, transparent 65%)", transform: "translate(25%, -25%)" }} />
          {/* Blue glow */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(26,63,168,0.08) 0%, transparent 65%)", transform: "translate(-25%, 25%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            {/* Eyebrow */}
            <div ref={badge1Ref} className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium">Website Build Proposal</span>
              <div className="h-px w-12 bg-white/20" />
            </div>

            {/* Headline */}
            <h1
              ref={line1Ref}
              className="text-white leading-[1.08] mb-2"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, letterSpacing: "-0.02em" }}
            >
              A website built to
            </h1>
            <h1
              ref={line2Ref}
              className="leading-[1.08] mb-8"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, fontStyle: "italic", letterSpacing: "-0.02em" }}
            >
              <span className="rainbow-shimmer">win you jobs.</span>
            </h1>

            <p
              ref={subRef}
              className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Custom-designed for painting contractors. No WordPress. No monthly platform fees.
              One investment — you own the asset forever.
            </p>

            {/* Trust micro-badges */}
            <div ref={trustRef} className="flex flex-wrap items-center justify-center gap-3">
              {["100% Custom Code", "Delivered in 7–14 Days", "No Monthly Fees", "Mobile-First & Google-Ready"].map((t) => (
                <span key={t} className="text-white/50 text-xs px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Separator line — like the example */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16"
            style={{ background: "linear-gradient(to bottom, rgba(232,34,26,0.6), transparent)" }} />
        </section>

        {/* ── PRICING CARDS ── */}
        <section className="py-20 lg:py-28" style={{ background: "#111e29" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:items-start">
              {tiers.map((tier, i) => (
                <PricingCard key={tier.id} tier={tier} index={i} />
              ))}
            </div>

            {/* Mid-section social proof */}
            <div className="mt-14 max-w-3xl mx-auto">
              <div className="rounded-2xl p-8 lg:p-10 relative overflow-hidden"
                style={{ background: "#0d1520", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="absolute top-5 right-7 text-7xl font-serif leading-none select-none"
                  style={{ color: "rgba(232,34,26,0.12)", fontFamily: "Georgia, serif" }}>&ldquo;</div>
                <StarRow />
                <blockquote className="text-white/75 text-base lg:text-lg leading-relaxed italic mt-4 mb-5"
                  style={{ fontFamily: "var(--font-display)" }}>
                  &ldquo;Used Xpertise for a full flip renovation — kitchen cabinets, drywall repair, and full interior repaint.
                  Alysha coordinated everything smoothly, hit the timeline, and the results were show-ready.
                  Will use again on my next project.&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: "rgba(66,133,244,0.25)", border: "1.5px solid rgba(66,133,244,0.4)" }}>M</div>
                  <div>
                    <span className="text-white/60 text-sm font-semibold">Mike R.</span>
                    <span className="text-white/30 text-sm"> — Manchester, NH</span>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded text-white ml-2" style={{ background: "#4285F4" }}>Google</span>
                  <span className="text-white/25 text-xs ml-auto italic">Built on the Pro package</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "var(--rainbow)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="py-20 lg:py-28" style={{ background: "#0d1520" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-white text-3xl lg:text-4xl font-black"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                Compare Packages
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="p-5 text-left text-white/30 text-xs font-medium tracking-widest uppercase w-[40%]"
                      style={{ background: "#111e29", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Feature</th>
                    {tiers.map((t) => (
                      <th key={t.id} className="p-5 text-center"
                        style={{
                          background: t.recommended ? "#0d1520" : "#111e29",
                          borderBottom: "1px solid rgba(255,255,255,0.07)",
                          borderLeft: "1px solid rgba(255,255,255,0.07)",
                        }}>
                        <div className="text-[10px] font-black tracking-[0.2em] uppercase"
                          style={{ color: t.recommended ? "#E8221A" : "rgba(255,255,255,0.3)" }}>{t.label}</div>
                        <div className="text-white font-black text-lg mt-1"
                          style={{ fontFamily: "var(--font-display)" }}>${t.price.toLocaleString()}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { category: "Foundation", rows: [
                      ["Custom homepage design", true, true, true],
                      ["Mobile-first responsive layout", true, true, true],
                      ["Click-to-call + contact form", true, true, true],
                      ["About section with photo & story", true, true, true],
                      ["Service area cities listed", true, true, true],
                      ["Deployed free to Vercel", true, true, true],
                    ]},
                    { category: "Content & Portfolio", rows: [
                      ["Photo gallery with lightbox", false, true, true],
                      ["Before/after comparison slider", false, true, true],
                      ["Blog platform (3 articles included)", false, true, true],
                      ["Testimonials page with filters", false, true, true],
                      ["Process / How We Work section", false, true, true],
                      ["Service area sub-pages × 6 cities", false, false, true],
                    ]},
                    { category: "E-Commerce", rows: [
                      ["Online shop (gift cards, packages)", false, false, true],
                      ["Snipcart checkout — no platform fee", false, false, true],
                      ["Color consultation booking flow", false, false, true],
                    ]},
                    { category: "SEO & Marketing", rows: [
                      ["Page titles + meta descriptions", true, true, true],
                      ["Local business schema markup", false, true, true],
                      ["3 local SEO blog articles", false, true, true],
                      ["Google Business Profile setup", false, false, true],
                    ]},
                    { category: "Support", rows: [
                      ["Delivery timeline", "14 days", "14 days", "21 days"],
                      ["Post-launch support", "48hr email", "7 days", "30 days"],
                      ["Training call on launch", false, false, true],
                      ["Revision rounds", "1", "2", "3"],
                    ]},
                  ].map((group) => (
                    <>
                      <tr key={`cat-${group.category}`}>
                        <td colSpan={4} className="px-5 py-3 text-[10px] font-black tracking-[0.2em] uppercase text-white/25"
                          style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                          {group.category}
                        </td>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={String(row[0])} className="group hover:bg-white/[0.015] transition-colors">
                          <td className="px-5 py-3.5 text-white/50 border-b"
                            style={{ borderColor: "rgba(255,255,255,0.05)" }}>{row[0]}</td>
                          {[row[1], row[2], row[3]].map((val, ci) => (
                            <td key={ci} className="px-5 py-3.5 text-center border-b border-l"
                              style={{
                                borderColor: "rgba(255,255,255,0.05)",
                                background: ci === 1 ? "rgba(232,34,26,0.03)" : "transparent",
                              }}>
                              {val === true ? (
                                <Check color={ci === 1 ? "#E8221A" : "rgba(255,255,255,0.4)"} />
                              ) : val === false ? (
                                <Dash />
                              ) : (
                                <span className="text-white/40 text-xs">{String(val)}</span>
                              )}
                              {val === true && <span className="sr-only">Included</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                  {/* Price row */}
                  <tr style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <td className="px-5 py-5 text-white font-semibold">Total investment</td>
                    {tiers.map((t) => (
                      <td key={t.id} className="px-5 py-5 text-center border-l"
                        style={{ borderColor: "rgba(255,255,255,0.07)", background: t.recommended ? "rgba(232,34,26,0.04)" : "transparent" }}>
                        <span className="font-black text-lg"
                          style={{ color: t.recommended ? "#E8221A" : "white", fontFamily: "var(--font-display)" }}>
                          ${t.price.toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 lg:py-28" style={{ background: "#111e29" }}>
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase block mb-3">Common Questions</span>
              <h2 className="text-white text-3xl lg:text-4xl font-black"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                Everything you want to know
              </h2>
            </div>
            <div>
              {faqs.map((faq, i) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#0d1520" }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)", backgroundSize: "36px 36px" }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,34,26,0.08) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
          <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase block mb-4">Ready to Get More Calls?</span>
            <h2 className="text-white text-3xl lg:text-5xl font-black mb-3 leading-tight"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
              Let&apos;s build your
            </h2>
            <h2 className="text-3xl lg:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 5vw, 3.1rem)", fontStyle: "italic", letterSpacing: "-0.02em" }}>
              <span className="rainbow-shimmer">painting business website.</span>
            </h2>
            <p className="text-white/45 leading-relaxed mb-10 max-w-lg mx-auto">
              Most painting contractors in your area don&apos;t have a real website yet.
              The ones who do get the calls. Let&apos;s make sure that&apos;s you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a
                href="mailto:Xpertisepainting25@gmail.com?subject=Website%20Package%20Inquiry"
                className="inline-flex items-center justify-center gap-2.5 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #f2261d 0%, #E8221A 45%, #cc1c10 100%)",
                  boxShadow: "0 6px 24px rgba(232,34,26,0.4)",
                  animation: "cta-breathe 3s ease-in-out infinite",
                }}
              >
                Email Alysha
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="tel:6035340115"
                className="inline-flex items-center justify-center gap-2.5 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Call (603) 534-0115
              </a>
            </div>
            <p className="text-white/20 text-xs tracking-wide">No commitment &nbsp;·&nbsp; Fast reply &nbsp;·&nbsp; Delivered in days</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

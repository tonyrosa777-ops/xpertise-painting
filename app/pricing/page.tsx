"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── DATA ─────────────────────────────────────────────────────────────────────

const tiers = [
  {
    id: "starter",
    label: "STARTER",
    name: "Professional Foundation",
    price: 1500,
    deposit: 750,
    recommended: false,
    features: [
      { text: "Custom homepage — Hero, Services, About, Contact", included: true },
      { text: "Click-to-call button & contact/estimate form", included: true },
      { text: "Mobile-first responsive design", included: true },
      { text: "Process / How We Work section", included: true },
      { text: "Trust stats bar with your numbers", included: true },
      { text: "Your service area cities listed", included: true },
      { text: "Basic SEO — page title, meta, OG tags", included: true },
      { text: "Deployed to Vercel (free hosting forever)", included: true },
      { text: "Photo gallery & lightbox", included: false },
      { text: "Before/after comparison slider", included: false },
      { text: "Blog (10 SEO articles)", included: false },
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
    recommended: true,
    features: [
      { text: "Everything in Starter", included: true },
      { text: "Photo gallery with lightbox — showcase your work", included: true },
      { text: "Before/after drag-to-reveal slider", included: true },
      { text: "Blog — 10 local SEO articles included", included: true },
      { text: "Full testimonials page with platform filters", included: true },
      { text: "Local business schema markup", included: true },
      { text: "Priority 14-day delivery", included: true },
      { text: "2 revision rounds", included: true },
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
    recommended: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Online shop — gift cards, consultations, bundles", included: true },
      { text: "Snipcart e-commerce (no monthly platform fee)", included: true },
      { text: "Contractor / Investor B2B landing section", included: true },
      { text: "Service area sub-pages for 6 cities (local SEO)", included: true },
      { text: "30-day post-launch support window", included: true },
      { text: "1-on-1 training call on launch day", included: true },
      { text: "3 revision rounds", included: true },
      { text: "Payment plan available — split 50/50", included: true },
    ],
    cta: "Build the Full Stack",
  },
];

const comparisonGroups = [
  {
    category: "Foundation",
    rows: [
      ["Custom homepage design", true, true, true],
      ["Mobile-first responsive layout", true, true, true],
      ["Click-to-call + contact form", true, true, true],
      ["About section with photo & story", true, true, true],
      ["Process / How We Work section", true, true, true],
      ["Animated trust stats bar", true, true, true],
      ["Service area cities listed", true, true, true],
      ["Deployed free to Vercel", true, true, true],
    ],
  },
  {
    category: "Content & Portfolio",
    rows: [
      ["Photo gallery with lightbox", false, true, true],
      ["Before/after comparison slider", false, true, true],
      ["Blog (10 local SEO articles)", false, true, true],
      ["Testimonials page with filters", false, true, true],
      ["Local business schema markup", false, true, true],
      ["Service area sub-pages × 6 cities", false, false, true],
    ],
  },
  {
    category: "E-Commerce",
    rows: [
      ["Online shop (gift cards, packages)", false, false, true],
      ["Snipcart checkout — no platform fee", false, false, true],
    ],
  },
  {
    category: "Support",
    rows: [
      ["Delivery timeline", "14 days", "14 days", "21 days"],
      ["Post-launch support", "48hr email", "7 days", "30 days"],
      ["Training call on launch", false, false, true],
      ["Revision rounds", "1", "2", "3"],
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Check({ pro }: { pro: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={pro ? "#E8221A" : "rgba(255,255,255,0.45)"}
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className="flex-shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Dash() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.12)" strokeWidth="2"
      className="flex-shrink-0 mt-0.5">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function Stars() {
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

// ─── ROI CALCULATOR ───────────────────────────────────────────────────────────

function ROICalculator() {
  const [jobValue, setJobValue] = useState(2400);
  const [clientsPerMonth, setClientsPerMonth] = useState(4);
  const [selectedTier, setSelectedTier] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const packagePrice = tiers[selectedTier].price;
  const monthlyRevenue = jobValue * clientsPerMonth;
  const annualRevenue = monthlyRevenue * 12;
  const breakEvenMonths = Math.ceil((packagePrice / monthlyRevenue) * 10) / 10;
  const roi12 = Math.round(((annualRevenue - packagePrice) / packagePrice) * 100);
  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;
  const sliderBg = (val: number, min: number, max: number) =>
    `linear-gradient(to right, #E8221A ${((val - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((val - min) / (max - min)) * 100}%)`;

  useGSAP(() => {
    gsap.from(headRef.current, {
      y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: headRef.current, start: "top 85%" },
    });
    gsap.from(cardRef.current, {
      y: 40, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.1,
      scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 lg:py-28" style={{ background: "#0d1520" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="text-center mb-12">
          <span className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase block mb-3">Run The Numbers</span>
          <h2 className="text-white text-3xl lg:text-4xl font-black mb-3"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
            What does a website actually make you?
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            The average Southern NH painting job is worth $2,400. Adjust the sliders to see your real return.
          </p>
        </div>

        <div ref={cardRef} className="rounded-2xl overflow-hidden"
          style={{ background: "#111e29", border: "1px solid rgba(255,255,255,0.07)" }}>

          <div className="p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Inputs */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white/55 text-sm">Average job value</label>
                  <span className="text-white font-black text-xl" style={{ fontFamily: "var(--font-display)" }}>
                    ${jobValue.toLocaleString()}
                  </span>
                </div>
                <input type="range" min={500} max={8000} step={100} value={jobValue}
                  onChange={(e) => setJobValue(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: sliderBg(jobValue, 500, 8000) }} />
                <div className="flex justify-between text-white/20 text-xs mt-1.5">
                  <span>$500</span><span>$8,000</span>
                </div>
                <p className="text-white/20 text-xs mt-2">Interior avg: $1,800 · Exterior avg: $3,200 · Full reno: $6,000+</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white/55 text-sm">New clients per month from website</label>
                  <span className="text-white font-black text-xl" style={{ fontFamily: "var(--font-display)" }}>
                    {clientsPerMonth}
                  </span>
                </div>
                <input type="range" min={1} max={15} step={1} value={clientsPerMonth}
                  onChange={(e) => setClientsPerMonth(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: sliderBg(clientsPerMonth, 1, 15) }} />
                <div className="flex justify-between text-white/20 text-xs mt-1.5">
                  <span>1 client</span><span>15 clients</span>
                </div>
                <p className="text-white/20 text-xs mt-2">Local contractors typically see 3–8 new inquiries/month once ranked</p>
              </div>

              <div>
                <label className="text-white/55 text-sm block mb-3">Package</label>
                <div className="flex gap-2">
                  {tiers.map((t, i) => (
                    <button key={t.id} onClick={() => setSelectedTier(i)}
                      className="flex-1 py-2.5 rounded-lg text-xs font-bold transition-all"
                      style={{
                        background: selectedTier === i
                          ? (i === 1 ? "#E8221A" : "rgba(255,255,255,0.12)")
                          : "rgba(255,255,255,0.04)",
                        color: selectedTier === i ? "white" : "rgba(255,255,255,0.35)",
                        border: selectedTier === i ? "none" : "1px solid rgba(255,255,255,0.07)",
                      }}>
                      {t.label}<br />
                      <span className="font-black text-sm">${t.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-4">
              <div className="rounded-xl p-5 flex-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">Monthly Revenue</p>
                <p className="font-black leading-none text-white"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,2.8rem)" }}>
                  {fmt(monthlyRevenue)}
                </p>
                <p className="text-white/25 text-xs mt-1">{clientsPerMonth} jobs × ${jobValue.toLocaleString()} avg</p>
              </div>

              <div className="rounded-xl p-5 flex-1"
                style={{ background: "rgba(232,34,26,0.07)", border: "1px solid rgba(232,34,26,0.2)" }}>
                <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">Annual Revenue</p>
                <p className="font-black leading-none"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,2.8rem)", color: "#E8221A" }}>
                  {fmt(annualRevenue)}
                </p>
                <p className="text-white/25 text-xs mt-1">From website leads alone</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">12-Month ROI</p>
                  <p className="font-black text-2xl"
                    style={{ fontFamily: "var(--font-display)", color: roi12 > 0 ? "#4ade80" : "white" }}>
                    {roi12 > 0 ? "+" : ""}{roi12.toLocaleString()}%
                  </p>
                </div>
                <div className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">Break Even</p>
                  <p className="font-black text-2xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {breakEvenMonths < 1 ? `${Math.round(breakEvenMonths * 30)}d` : `${breakEvenMonths}mo`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-8 lg:px-10 py-5 border-t"
            style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(232,34,26,0.04)" }}>
            <p className="text-white/55 text-sm text-center">
              A <span className="text-white font-semibold">{tiers[selectedTier].name}</span> at{" "}
              <span className="text-brand-red font-bold">${tiers[selectedTier].price.toLocaleString()}</span> pays for itself in{" "}
              <span className="text-white font-bold">
                {breakEvenMonths < 1
                  ? `${Math.round(breakEvenMonths * 30)} days`
                  : `${breakEvenMonths} month${breakEvenMonths !== 1 ? "s" : ""}`}
              </span>. After that, every client is pure profit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING CARD ─────────────────────────────────────────────────────────────

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(ref.current, {
      y: 50, opacity: 0, duration: 0.7, ease: "power3.out",
      delay: index * 0.1,
      scrollTrigger: { trigger: ref.current, start: "top 88%" },
    });
  });

  return (
    <div ref={ref} className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: tier.recommended ? "#0d1520" : "#111e29",
        border: tier.recommended ? "1.5px solid rgba(232,34,26,0.45)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: tier.recommended
          ? "0 0 60px rgba(232,34,26,0.1), 0 24px 48px rgba(0,0,0,0.4)"
          : "0 8px 24px rgba(0,0,0,0.25)",
        transform: tier.recommended ? "translateY(-10px)" : "none",
      }}>
      {tier.recommended && (
        <div className="h-[3px] w-full" style={{ background: "var(--rainbow)" }} />
      )}

      <div className="p-7 lg:p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-black tracking-[0.2em] text-white/35 uppercase">{tier.label}</span>
          {tier.recommended && (
            <span className="text-[10px] font-black px-3 py-1 rounded-full tracking-[0.12em] uppercase"
              style={{ background: "rgba(232,34,26,0.18)", color: "#E8221A", border: "1px solid rgba(232,34,26,0.3)" }}>
              ★ Recommended
            </span>
          )}
        </div>

        <div className="mb-1">
          <span className="font-black leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem,7vw,3.75rem)",
              color: tier.recommended ? "#E8221A" : "white",
            }}>
            ${tier.price.toLocaleString()}
          </span>
        </div>
        <p className="text-white/25 text-[10px] tracking-widest uppercase mb-1">One-Time Investment</p>
        <p className="text-white/50 text-sm mb-7">{tier.name}</p>

        <ul className="space-y-3 flex-1 mb-7">
          {tier.features.map((f) => (
            <li key={f.text} className="flex items-start gap-2.5">
              {f.included ? <Check pro={tier.recommended} /> : <Dash />}
              <span className="text-sm leading-snug"
                style={{
                  color: f.included
                    ? tier.recommended ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.62)"
                    : "rgba(255,255,255,0.18)",
                }}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        <div>
          <a href={`mailto:Xpertisepainting25@gmail.com?subject=${encodeURIComponent(tier.name + " Package Inquiry")}`}
            className="block w-full text-center font-bold py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={tier.recommended ? {
              background: "linear-gradient(135deg, #f2261d 0%, #E8221A 45%, #cc1c10 100%)",
              color: "white",
              boxShadow: "0 6px 20px rgba(232,34,26,0.4)",
              animation: "cta-breathe 3s ease-in-out infinite",
            } : {
              background: "transparent",
              color: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
            {tier.cta}
          </a>
          <p className="text-white/20 text-xs text-center mt-3">
            ${tier.deposit.toLocaleString()} deposit · ${tier.deposit.toLocaleString()} on launch
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── COMPARISON TABLE ─────────────────────────────────────────────────────────

function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headRef.current, {
      y: 25, opacity: 0, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: headRef.current, start: "top 85%" },
    });
    gsap.from(tableRef.current, {
      y: 35, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.1,
      scrollTrigger: { trigger: tableRef.current, start: "top 85%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "#111e29" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="text-center mb-12">
          <h2 className="text-white text-3xl lg:text-4xl font-black"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
            Compare Packages
          </h2>
        </div>

        <div ref={tableRef} className="overflow-x-auto rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="p-5 text-left text-white/25 text-[10px] font-semibold tracking-widest uppercase w-[40%]"
                  style={{ background: "#111e29", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  Feature
                </th>
                {tiers.map((t) => (
                  <th key={t.id} className="p-5 text-center"
                    style={{
                      background: t.recommended ? "#0d1520" : "#111e29",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      borderLeft: "1px solid rgba(255,255,255,0.07)",
                    }}>
                    <div className="text-[10px] font-black tracking-[0.2em] uppercase mb-1"
                      style={{ color: t.recommended ? "#E8221A" : "rgba(255,255,255,0.3)" }}>
                      {t.label}
                    </div>
                    <div className="text-white font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>
                      ${t.price.toLocaleString()}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonGroups.map((group) => (
                <>
                  <tr key={`cat-${group.category}`}>
                    <td colSpan={4} className="px-5 py-3 text-[10px] font-black tracking-[0.2em] uppercase text-white/20"
                      style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      {group.category}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={String(row[0])} className="hover:bg-white/[0.015] transition-colors">
                      <td className="px-5 py-3.5 text-white/45 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                        {row[0]}
                      </td>
                      {[row[1], row[2], row[3]].map((val, ci) => (
                        <td key={ci} className="px-5 py-3.5 text-center border-b border-l"
                          style={{
                            borderColor: "rgba(255,255,255,0.05)",
                            background: ci === 1 ? "rgba(232,34,26,0.03)" : "transparent",
                          }}>
                          {val === true ? (
                            <span className="flex justify-center"><Check pro={ci === 1} /></span>
                          ) : val === false ? (
                            <span className="flex justify-center"><Dash /></span>
                          ) : (
                            <span className="text-white/35 text-xs">{String(val)}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
              <tr style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <td className="px-5 py-5 text-white font-semibold text-sm">Total investment</td>
                {tiers.map((t) => (
                  <td key={t.id} className="px-5 py-5 text-center border-l"
                    style={{
                      borderColor: "rgba(255,255,255,0.07)",
                      background: t.recommended ? "rgba(232,34,26,0.04)" : "transparent",
                    }}>
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
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1aRef = useRef<HTMLHeadingElement>(null);
  const h1bRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(badgeRef.current, { y: -20, opacity: 0, duration: 0.55, ease: "power2.out" })
      .from(h1aRef.current, { y: 55, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.25")
      .from(h1bRef.current, { y: 55, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.65")
      .from(subRef.current, { y: 22, opacity: 0, duration: 0.65, ease: "power2.out" }, "-=0.4")
      .from(pillsRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");
  }, { scope: heroRef });

  return (
    <>
      <main style={{ background: "#0d1520" }}>

        {/* ── HERO ── */}
        <section ref={heroRef}
          className="relative min-h-[72vh] flex items-center justify-center overflow-hidden"
          style={{ paddingTop: 110, paddingBottom: 80 }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)", backgroundSize: "36px 36px" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none rounded-full"
            style={{ background: "radial-gradient(circle, rgba(232,34,26,0.1) 0%, transparent 65%)", transform: "translate(25%,-25%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none rounded-full"
            style={{ background: "radial-gradient(circle, rgba(26,63,168,0.08) 0%, transparent 65%)", transform: "translate(-25%,25%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div ref={badgeRef} className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-10 bg-white/15" />
              <span className="text-white/35 text-xs tracking-[0.3em] uppercase font-medium">Website Build Proposal</span>
              <div className="h-px w-10 bg-white/15" />
            </div>

            <h1 ref={h1aRef} className="text-white leading-[1.07] mb-2"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              A website built to
            </h1>
            <h1 ref={h1bRef} className="leading-[1.07] mb-8"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 900, fontStyle: "italic", letterSpacing: "-0.02em" }}>
              <span className="rainbow-shimmer">win you jobs.</span>
            </h1>

            <p ref={subRef} className="text-white/48 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Custom-designed for painting contractors. No WordPress. No monthly platform fees.
              One investment — you own the asset forever.
            </p>

            <div ref={pillsRef} className="flex flex-wrap items-center justify-center gap-2.5">
              {["100% Custom Code", "Delivered in 7–14 Days", "No Monthly Fees", "Mobile-First & Google-Ready"].map((t) => (
                <span key={t} className="text-white/45 text-xs px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-14"
            style={{ background: "linear-gradient(to bottom, rgba(232,34,26,0.55), transparent)" }} />
        </section>

        {/* ── PRICING CARDS ── */}
        <section className="py-20 lg:py-28" style={{ background: "#111e29" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:items-start">
              {tiers.map((tier, i) => (
                <PricingCard key={tier.id} tier={tier} index={i} />
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-14 max-w-3xl mx-auto">
              <div className="rounded-2xl p-8 lg:p-10 relative overflow-hidden"
                style={{ background: "#0d1520", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="absolute top-5 right-7 text-7xl font-serif leading-none select-none"
                  style={{ color: "rgba(232,34,26,0.1)", fontFamily: "Georgia,serif" }}>&ldquo;</div>
                <Stars />
                <blockquote className="text-white/70 text-base lg:text-lg leading-relaxed italic mt-4 mb-5"
                  style={{ fontFamily: "var(--font-display)" }}>
                  &ldquo;Used Xpertise for a full flip renovation — kitchen cabinets, drywall repair, and full interior repaint.
                  Alysha coordinated everything smoothly, hit the timeline, and the results were show-ready.
                  Will use again on my next project.&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: "rgba(66,133,244,0.22)", border: "1.5px solid rgba(66,133,244,0.4)" }}>M</div>
                  <div>
                    <span className="text-white/55 text-sm font-semibold">Mike R.</span>
                    <span className="text-white/25 text-sm"> — Manchester, NH</span>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded text-white ml-1" style={{ background: "#4285F4" }}>Google</span>
                  <span className="text-white/20 text-xs ml-auto italic">Built on the Pro package</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "var(--rainbow)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── ROI CALCULATOR ── */}
        <ROICalculator />

        {/* ── COMPARISON TABLE ── */}
        <ComparisonTable />

        {/* ── CLOSING CTA ── */}
        <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#0d1520" }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)", backgroundSize: "36px 36px" }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none rounded-full"
            style={{ background: "radial-gradient(circle, rgba(232,34,26,0.08) 0%, transparent 65%)", transform: "translate(30%,-30%)" }} />

          <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase block mb-4">Ready to Get More Calls?</span>
            <h2 className="text-white font-black mb-3 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.25rem)", letterSpacing: "-0.02em" }}>
              Let&apos;s build your
            </h2>
            <h2 className="font-black mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.25rem)", fontStyle: "italic", letterSpacing: "-0.02em" }}>
              <span className="rainbow-shimmer">painting business website.</span>
            </h2>
            <p className="text-white/40 leading-relaxed mb-10 max-w-lg mx-auto">
              Most painting contractors in your area don&apos;t have a real website yet.
              The ones who do get the calls. Let&apos;s make sure that&apos;s you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a href="mailto:Xpertisepainting25@gmail.com?subject=Website%20Package%20Inquiry"
                className="inline-flex items-center justify-center gap-2.5 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #f2261d 0%, #E8221A 45%, #cc1c10 100%)",
                  boxShadow: "0 6px 24px rgba(232,34,26,0.4)",
                  animation: "cta-breathe 3s ease-in-out infinite",
                }}>
                Email Alysha
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="tel:6035340115"
                className="inline-flex items-center justify-center gap-2.5 text-white/65 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                Call (603) 534-0115
              </a>
            </div>
            <p className="text-white/18 text-xs tracking-wide">No commitment &nbsp;·&nbsp; Fast reply &nbsp;·&nbsp; Delivered in days</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

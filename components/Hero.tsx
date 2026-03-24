"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const brushRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      // Animate brush stroke drawing first
      if (brushRef.current) {
        const length = brushRef.current.getTotalLength?.() ?? 600;
        gsap.set(brushRef.current, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
        gsap.to(brushRef.current, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
          delay: 0.2,
        });
      }

      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(line1Ref.current, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        }, "-=0.3")
        .from(line2Ref.current, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        }, "-=0.65")
        .from(subRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        }, "-=0.4")
        .from(ctaRef.current!.children, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        }, "-=0.35")
        .from(trustRef.current, {
          opacity: 0,
          duration: 0.5,
        }, "-=0.2");
    },
    { scope: containerRef }
  );

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#1C2B3A" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Red glow — top right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232,34,26,0.12) 0%, transparent 65%)",
          transform: "translate(25%, -25%)",
        }}
      />

      {/* Blue glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,63,168,0.10) 0%, transparent 65%)",
          transform: "translate(-25%, 25%)",
        }}
      />

      {/* Single clean rainbow brush stroke at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: "160px" }}>
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="brush1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8221A" />
              <stop offset="20%" stopColor="#FF6B00" />
              <stop offset="40%" stopColor="#FFD700" />
              <stop offset="60%" stopColor="#00A651" />
              <stop offset="80%" stopColor="#1A3FA8" />
              <stop offset="100%" stopColor="#7B2D8B" />
            </linearGradient>
          </defs>
          <path
            ref={brushRef}
            d="M-20 120 C200 60, 400 140, 600 90 C800 40, 1000 130, 1200 80 C1320 55, 1400 95, 1460 70"
            stroke="url(#brush1)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center"
        style={{ paddingTop: "100px", paddingBottom: "60px" }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: "0 0 6px #4ade80", animation: "pulse 2s infinite" }} />
          <span className="text-white/80 text-xs font-medium tracking-[0.18em] uppercase">
            Female-Owned &nbsp;·&nbsp; Nashua, NH &nbsp;·&nbsp; 15+ Years Experience
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={line1Ref}
          className="text-white leading-[1.05] mb-1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
          Infinite Shades,
        </h1>

        <h1
          ref={line2Ref}
          className="rainbow-shimmer leading-[1.05] mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
          }}
        >
          Infinite Smiles.
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-white/65 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Southern New Hampshire&apos;s premier painting, drywall &amp; finishing
          company. Interior, exterior, cabinets, floors, and full renovations —
          done right by Alysha Pillsbury and her team.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* Primary */}
          <button
            onClick={scrollToContact}
            className="group relative overflow-hidden text-white font-bold px-10 py-4 rounded-lg text-base lg:text-lg transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
            style={{
              background: "linear-gradient(135deg, #E8221A 0%, #c91d14 100%)",
              boxShadow: "0 8px 30px rgba(232,34,26,0.35)",
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book Your Free Quote
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>

          {/* Secondary */}
          <a
            href="tel:6035340115"
            className="flex items-center justify-center gap-3 bg-white/8 hover:bg-white/15 border border-white/25 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-lg text-base lg:text-lg transition-all duration-200 hover:scale-105 w-full sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (603) 534-0115
          </a>

          {/* View Work */}
          <button
            onClick={() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden lg:flex items-center gap-2 text-white/50 hover:text-white/80 font-medium text-sm transition-colors px-4 py-4"
          >
            See Our Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Trust micro-bar */}
        <div
          ref={trustRef}
          className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-white/40 text-sm"
        >
          {["No obligation · Free estimate", "Response within 24 hours", "Fully licensed & insured"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 cursor-pointer hover:text-white/50 transition-colors"
        onClick={() => document.querySelector("#trust")?.scrollIntoView({ behavior: "smooth" })}
        style={{ animation: "bounce 2.5s ease-in-out 2s infinite" }}
      >
        <span className="text-[9px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

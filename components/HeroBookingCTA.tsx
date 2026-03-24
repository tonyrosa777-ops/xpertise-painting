"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HeroBookingCTA({ onClick }: { onClick: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;

    // Smooth magnetic tracking
    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
      yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3);
    };

    const onEnter = () => {
      gsap.to(btn, { scale: 1.07, duration: 0.3, ease: "back.out(2)" });
      if (arrowRef.current)
        gsap.to(arrowRef.current, { x: 8, duration: 0.35, ease: "power2.out" });
      if (glowRef.current)
        gsap.to(glowRef.current, { opacity: 1, duration: 0.25 });
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(btn, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      if (arrowRef.current)
        gsap.to(arrowRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
      if (glowRef.current)
        gsap.to(glowRef.current, { opacity: 0, duration: 0.35 });
    };

    const onDown = () => {
      gsap.timeline()
        .to(btn, { scale: 0.94, duration: 0.08, ease: "power3.in" })
        .to(btn, { scale: 1.05, duration: 0.22, ease: "back.out(3)" })
        .to(btn, { scale: 1, x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" });
      xTo(0);
      yTo(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mousedown", onDown);
    btn.addEventListener("click", onClick);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mousedown", onDown);
      btn.removeEventListener("click", onClick);
    };
  }, [onClick]);

  return (
    <div
      ref={wrapRef}
      className="relative inline-flex items-center justify-center"
      style={{ padding: "44px 64px" }}
    >
      {/* Pulsing rings — always alive at rest */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "30px 50px",
          borderRadius: "18px",
          border: "1.5px solid rgba(232,34,26,0.5)",
          animation: "cta-ring 2.6s ease-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "30px 50px",
          borderRadius: "18px",
          border: "1.5px solid rgba(232,34,26,0.28)",
          animation: "cta-ring 2.6s ease-out 0.85s infinite",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "30px 50px",
          borderRadius: "18px",
          border: "1.5px solid rgba(232,34,26,0.12)",
          animation: "cta-ring 2.6s ease-out 1.7s infinite",
        }}
      />

      {/* Hover glow bloom */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          inset: "20px 40px",
          borderRadius: "20px",
          background: "radial-gradient(ellipse at center, rgba(232,34,26,0.4) 0%, transparent 70%)",
          filter: "blur(16px)",
          opacity: 0,
        }}
      />

      {/* THE BUTTON */}
      <button
        ref={btnRef}
        className="relative overflow-hidden cursor-pointer select-none"
        style={{
          padding: "22px 56px",
          borderRadius: "16px",
          fontSize: "clamp(1rem, 1.8vw, 1.22rem)",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          letterSpacing: "0.015em",
          color: "#fff",
          background: "linear-gradient(135deg, #f2261d 0%, #E8221A 45%, #cc1c10 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 40px rgba(232,34,26,0.55), 0 2px 10px rgba(0,0,0,0.4)",
          willChange: "transform",
          border: "none",
          outline: "none",
        }}
        aria-label="Book your free consultation with Alysha"
      >
        {/* Idle shimmer sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(108deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
            backgroundSize: "250% 100%",
            animation: "cta-shimmer 3s ease-in-out infinite",
          }}
        />

        {/* Label + arrow */}
        <span className="relative z-10 flex items-center gap-4 whitespace-nowrap">
          <span>Book Your Free Consultation</span>
          <svg
            ref={arrowRef}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
}

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

    // Disable magnetic on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

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
        gsap.to(arrowRef.current, { x: 7, duration: 0.35, ease: "power2.out" });
      if (glowRef.current)
        gsap.to(glowRef.current, { opacity: 1, duration: 0.25 });
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(btn, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      if (arrowRef.current)
        gsap.to(arrowRef.current, { x: 0, duration: 0.3 });
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
      className="relative inline-flex items-center justify-center p-5"
    >
      {/* Hover glow bloom */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(232,34,26,0.5) 0%, transparent 70%)",
          filter: "blur(20px)",
          opacity: 0,
        }}
      />

      <button
        ref={btnRef}
        onClick={onClick}
        className="relative overflow-hidden cursor-pointer select-none text-white font-black rounded-2xl"
        style={{
          padding: "clamp(14px, 2.5vw, 22px) clamp(28px, 5vw, 56px)",
          fontSize: "clamp(0.95rem, 2.5vw, 1.18rem)",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.015em",
          background: "linear-gradient(135deg, #f2261d 0%, #E8221A 45%, #cc1c10 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 32px rgba(232,34,26,0.5), 0 2px 8px rgba(0,0,0,0.35)",
          willChange: "transform",
          border: "none",
          animation: "cta-breathe 3s ease-in-out infinite",
        }}
        aria-label="Book your free consultation with Alysha"
      >
        {/* Shimmer sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(108deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
            backgroundSize: "250% 100%",
            animation: "cta-shimmer 3s ease-in-out infinite",
          }}
        />

        <span className="relative z-10 flex items-center gap-3 whitespace-nowrap">
          <span>Book Your Free Consultation</span>
          <svg
            ref={arrowRef}
            width="20"
            height="20"
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

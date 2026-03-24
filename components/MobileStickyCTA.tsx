"use client";

import { useState, useEffect } from "react";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 500px)
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Rainbow top accent */}
      <div className="rainbow-bar h-[3px]" />

      <div className="bg-navy/95 backdrop-blur-md px-4 py-3 flex gap-3">
        <a
          href="tel:6035340115"
          className="flex-1 flex items-center justify-center gap-2.5 bg-brand-red text-white font-bold py-3.5 rounded text-sm"
          aria-label="Call Alysha Pillsbury at (603) 534-0115"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Alysha
        </a>
        <button
          onClick={() =>
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-3.5 rounded text-sm"
        >
          Free Estimate
        </button>
      </div>

      {/* Safe area for iOS */}
      <div className="bg-navy/95 h-safe-bottom" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}

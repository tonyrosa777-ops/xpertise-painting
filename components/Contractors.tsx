"use client";

import { useRef, useEffect, useState } from "react";

const capabilities = [
  "Full interior & exterior painting on flip timelines",
  "Drywall installation, repair, and finishing",
  "Mud, sand, and paint — full cycle",
  "Cabinet & fixture refinishing",
  "Floor finishing and staining",
  "Wallpaper removal",
  "Coordination with your GC schedule",
  "Budget-conscious, results-driven approach",
];

export default function Contractors() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contractors" className="bg-navy py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
              For Contractors & Investors
            </span>
            <h2
              className="text-white text-4xl lg:text-5xl font-black mb-6 leading-[1.15]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Painting Partner
              <br />
              <span className="rainbow-text">for Every Flip</span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed mb-5">
              Xpertise Painting is contractor-ready. We understand flip
              timelines, renovation budgets, and the pressure of getting a
              property show-ready on time.
            </p>

            <p className="text-white/60 leading-relaxed mb-8">
              Alysha has worked alongside general contractors and real estate
              investors across Southern NH, delivering clean, professional
              finishes that photograph well and sell fast. We plug seamlessly
              into your workflow — just call Alysha and we&apos;ll handle the rest.
            </p>

            {/* Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${i * 0.07 + 0.3}s`,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E8221A"
                    strokeWidth="2.5"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-white/70 text-sm">{cap}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:6035340115"
                className="flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-7 py-3.5 rounded transition-all hover:scale-105"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Alysha: (603) 534-0115
              </a>
              <a
                href="mailto:Xpertisepainting25@gmail.com"
                className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold px-7 py-3.5 rounded transition-all"
              >
                Email for Project Details
              </a>
            </div>
          </div>

          {/* Visual */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <div className="bg-navy-light rounded-2xl p-8 border border-white/10">
              <h3
                className="text-white font-bold text-xl mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Why Contractors Choose Xpertise
              </h3>

              <div className="space-y-5">
                {[
                  {
                    icon: "⚡",
                    title: "Fast Turnaround",
                    desc: "We understand flip timelines. We schedule quickly and work efficiently to keep your project on track.",
                  },
                  {
                    icon: "📞",
                    title: "Direct Communication",
                    desc: "No call centers. Reach Alysha directly. Get real answers, real quotes, real commitments.",
                  },
                  {
                    icon: "💰",
                    title: "Budget-Smart",
                    desc: "We deliver show-ready results without the premium price tag. Quality finishes that appraise well.",
                  },
                  {
                    icon: "🏗️",
                    title: "Full-Scope Capability",
                    desc: "Painting, drywall, cabinets, floors — one crew, one call. Less coordination for you.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4"
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.4s ease ${i * 0.1 + 0.4}s`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/60 text-sm">
                    Currently accepting new contractor partnerships
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

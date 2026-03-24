"use client";

import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience", icon: "⭐" },
  { value: 500, suffix: "+", label: "Projects Completed", icon: "🏠" },
  { value: 100, suffix: "%", label: "Satisfaction Guaranteed", icon: "✅" },
  { value: 3, suffix: "", label: "Cities Served in NH", icon: "📍" },
];

function CountUp({
  end,
  suffix,
  duration = 1800,
  isVisible,
}: {
  end: number;
  suffix: string;
  duration?: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trust" className="bg-navy-dark py-14" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Trust labels */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {["Female-Owned & Operated", "Fully Licensed & Insured", "Contractor-Ready", "Free Estimates"].map(
            (badge) => (
              <span
                key={badge}
                className="bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full tracking-wide"
              >
                {badge}
              </span>
            )
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
              }}
            >
              <div
                className="text-4xl lg:text-5xl font-black text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  isVisible={visible}
                />
              </div>
              <div className="text-white/50 text-sm font-medium tracking-wide uppercase">
                {stat.label}
              </div>
              {/* Rainbow divider */}
              <div className="w-10 h-[3px] mt-3 rounded-full rainbow-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    name: "Jennifer M.",
    location: "Nashua, NH",
    platform: "Google",
    rating: 5,
    text: "Alysha and her team did an incredible job on our living room and dining room. They were on time, professional, and the finish is absolutely flawless. We couldn't be happier — already planning to book them for the exterior next spring!",
    project: "Interior Painting",
  },
  {
    name: "Mike R.",
    location: "Manchester, NH",
    platform: "Yelp",
    rating: 5,
    text: "Used Xpertise for a full flip renovation — kitchen cabinets, drywall repair, and full interior repaint. Alysha coordinated everything smoothly, hit the timeline, and the results were show-ready. Will use again on my next project.",
    project: "Renovation & Cabinets",
  },
  {
    name: "Sarah K.",
    location: "Concord, NH",
    platform: "Facebook",
    rating: 5,
    text: "So glad I found a female-owned painting company in NH! Alysha was thorough, communicative, and the color consultation was worth it alone. My home went from builder-grade beige to absolutely stunning. Major transformation!",
    project: "Full Interior",
  },
  {
    name: "David L.",
    location: "Bedford, NH",
    platform: "Google",
    rating: 5,
    text: "Had some significant drywall damage from a water leak. Xpertise did the sheetrock repair, mud, sand, and matched the existing texture perfectly. You'd never know anything happened. Fast, clean, and quality work.",
    project: "Drywall Repair",
  },
  {
    name: "Amanda T.",
    location: "Nashua, NH",
    platform: "Yelp",
    rating: 5,
    text: "Called Alysha on a Tuesday, had an estimate Thursday, and work started the following Monday. That kind of responsiveness is rare in the trades. Exterior came out gorgeous and she stayed within budget the whole way.",
    project: "Exterior Painting",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#FFD700" : "none"}
          stroke="#FFD700"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const platformColors: Record<string, string> = {
  Google: "#4285F4",
  Yelp: "#D32323",
  Facebook: "#1877F2",
};

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-navy-dark py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
            What Clients Say
          </span>
          <h2
            className="text-white text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Smiles, Every Time
          </h2>

          {/* Platform ratings */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {Object.entries(platformColors).map(([platform, color]) => (
              <div key={platform} className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: color, color: "white" }}
                >
                  {platform}
                </span>
                <StarRating count={5} />
                <span className="text-white/40 text-xs">5.0</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured testimonial */}
        <div
          className="max-w-3xl mx-auto mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          <div className="bg-navy rounded-2xl p-8 lg:p-12 border border-white/10 relative overflow-hidden">
            {/* Quote mark */}
            <div
              className="absolute top-6 right-8 text-8xl font-serif leading-none select-none"
              style={{ color: "rgba(232,34,26,0.12)", fontFamily: "Georgia, serif" }}
            >
              &ldquo;
            </div>

            {/* Animated content */}
            <div
              key={activeIndex}
              style={{
                animation: "fadeUp 0.4s ease forwards",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{
                    background: `${platformColors[testimonials[activeIndex].platform]}30`,
                    border: `2px solid ${platformColors[testimonials[activeIndex].platform]}50`,
                  }}
                >
                  {testimonials[activeIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-sm">
                      {testimonials[activeIndex].location}
                    </span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        background:
                          platformColors[testimonials[activeIndex].platform],
                        color: "white",
                      }}
                    >
                      {testimonials[activeIndex].platform}
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                  <StarRating count={testimonials[activeIndex].rating} />
                  <div className="text-white/30 text-xs mt-1 text-right">
                    {testimonials[activeIndex].project}
                  </div>
                </div>
              </div>

              <blockquote
                className="text-white/80 text-lg leading-relaxed italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "24px" : "8px",
                  height: "8px",
                  background:
                    i === activeIndex
                      ? "#E8221A"
                      : "rgba(255,255,255,0.2)",
                }}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All testimonials grid (visible cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.12 + 0.3}s, transform 0.5s ease ${i * 0.12 + 0.3}s`,
              }}
              onClick={() => setActiveIndex(i)}
            >
              <div className="flex items-center gap-2 mb-3">
                <StarRating count={t.rating} />
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-auto"
                  style={{
                    background: platformColors[t.platform],
                    color: "white",
                  }}
                >
                  {t.platform}
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-white/80 text-xs font-semibold">
                  {t.name}
                </span>
                <span className="text-white/30 text-xs">— {t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Free Estimate",
    desc: "Call Alysha directly at (603) 534-0115 or fill out the form. We visit your space, listen to your vision, and provide a clear, honest quote — no surprises.",
    color: "#E8221A",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Custom Plan & Colors",
    desc: "We help you choose the perfect shades from our extensive experience. We factor in lighting, finishes, and your style to create a cohesive color plan.",
    color: "#FF6B00",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" />
        <circle cx="17.5" cy="10.5" r=".5" />
        <circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Expert Execution",
    desc: "Our skilled team arrives on time, protects your home, and does the work with precision. We clean up daily and keep you updated throughout the project.",
    color: "#00A651",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Your Smile, Guaranteed",
    desc: "We do a final walkthrough with you. If anything isn't perfect, we fix it — no questions asked. Your satisfaction is our name, and our name is everything.",
    color: "#1A3FA8",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function Process() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-light-dark py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
            How It Works
          </span>
          <h2
            className="text-navy text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Xpertise Way
          </h2>
          <p className="text-navy/60 max-w-xl mx-auto">
            A simple, stress-free process designed around your schedule, your
            home, and your peace of mind.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-full w-full h-[2px] z-0"
                  style={{
                    background: `linear-gradient(90deg, ${step.color}40, ${steps[i + 1].color}40)`,
                    width: "calc(100% - 4rem)",
                    left: "calc(100% - 0rem)",
                  }}
                />
              )}

              {/* Card */}
              <div className="bg-white rounded-2xl p-7 border border-light-dark relative z-10 h-full">
                {/* Number */}
                <div
                  className="text-6xl font-black leading-none mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: `${step.color}20`,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {step.number}
                </div>

                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 -mt-8"
                  style={{ background: `${step.color}15`, color: step.color }}
                >
                  {step.icon}
                </div>

                <h3
                  className="text-navy font-bold text-xl mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>

                <p className="text-navy/60 text-sm leading-relaxed">
                  {step.desc}
                </p>

                {/* Bottom color bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                  style={{
                    background: step.color,
                    opacity: 0.7,
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform 0.6s ease ${i * 0.15 + 0.4}s`,
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom guarantee callout */}
        <div
          className="mt-16 bg-navy rounded-2xl px-8 py-10 flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.7s",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center"
            style={{ background: "rgba(232, 34, 26, 0.2)" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8221A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3
              className="text-white font-bold text-2xl mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              100% Satisfaction Guarantee
            </h3>
            <p className="text-white/60">
              We don&apos;t consider a project done until you&apos;re smiling.
              If something isn&apos;t right, we come back and make it right —
              period. That&apos;s the Xpertise promise.
            </p>
          </div>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-shrink-0 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-7 py-3 rounded transition-all hover:scale-105 whitespace-nowrap"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}

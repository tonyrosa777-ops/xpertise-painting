"use client";

import { useRef, useEffect, useState } from "react";

const cities = [
  { name: "Nashua", state: "NH", primary: true },
  { name: "Manchester", state: "NH", primary: true },
  { name: "Concord", state: "NH", primary: true },
  { name: "Bedford", state: "NH" },
  { name: "Merrimack", state: "NH" },
  { name: "Derry", state: "NH" },
  { name: "Londonderry", state: "NH" },
  { name: "Hudson", state: "NH" },
  { name: "Salem", state: "NH" },
  { name: "Milford", state: "NH" },
  { name: "Amherst", state: "NH" },
  { name: "Goffstown", state: "NH" },
];

export default function ServiceArea() {
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
    <section className="bg-light py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map placeholder */}
          <div
            className="order-2 lg:order-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* NH Map SVG - simplified */}
            <div className="relative bg-navy rounded-2xl overflow-hidden aspect-[4/3]">
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #1C2B3A 0%, #243547 100%)",
                }}
              />

              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Southern NH outline */}
              <svg
                viewBox="0 0 400 300"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* NH state shape (simplified southern region) */}
                <path
                  d="M80 40 L280 40 L300 60 L310 80 L300 120 L280 130 L300 150 L310 180 L300 220 L280 250 L260 270 L200 275 L140 270 L100 250 L70 220 L60 180 L70 150 L80 120 L60 80 Z"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                />

                {/* City dots */}
                {/* Nashua */}
                <circle cx="190" cy="240" r="8" fill="#E8221A" opacity="0.9" />
                <circle cx="190" cy="240" r="16" fill="#E8221A" opacity="0.2">
                  <animate attributeName="r" from="8" to="24" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="200" y="238" fill="white" fontSize="10" fontWeight="600" opacity="0.9">Nashua</text>

                {/* Manchester */}
                <circle cx="185" cy="180" r="7" fill="#1A3FA8" opacity="0.9" />
                <circle cx="185" cy="180" r="14" fill="#1A3FA8" opacity="0.2">
                  <animate attributeName="r" from="7" to="20" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <text x="196" y="178" fill="white" fontSize="10" fontWeight="600" opacity="0.9">Manchester</text>

                {/* Concord */}
                <circle cx="190" cy="120" r="6" fill="#FF6B00" opacity="0.9" />
                <text x="200" y="118" fill="white" fontSize="10" fontWeight="600" opacity="0.9">Concord</text>

                {/* Other cities */}
                <circle cx="230" cy="250" r="4" fill="rgba(255,255,255,0.4)" />
                <circle cx="160" cy="235" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="215" cy="215" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="155" cy="185" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="240" cy="175" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="255" cy="210" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="130" cy="220" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="210" cy="145" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="165" cy="150" r="3" fill="rgba(255,255,255,0.3)" />
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-red" />
                  <span className="text-white/70 text-xs">Primary Service Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  <span className="text-white/70 text-xs">Also Serving</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div
            className="order-1 lg:order-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
              Where We Work
            </span>
            <h2
              className="text-navy text-4xl lg:text-5xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Serving Southern
              <br />
              <span className="rainbow-text">New Hampshire</span>
            </h2>
            <p className="text-navy/60 text-lg mb-8 leading-relaxed">
              Based in Nashua, we serve homeowners and contractors across
              Southern NH. Not sure if we come to your area? Call Alysha
              directly — we&apos;ll make it work.
            </p>

            {/* City grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {cities.map((city, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${
                    city.primary
                      ? "bg-brand-red/10 border border-brand-red/20"
                      : "bg-light-dark border border-transparent"
                  }`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.3 + i * 0.05}s`,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={city.primary ? "#E8221A" : "#6B8CA8"}
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    className={`text-sm font-medium ${
                      city.primary ? "text-navy" : "text-navy/60"
                    }`}
                  >
                    {city.name}, {city.state}
                  </span>
                </div>
              ))}
            </div>

            {/* Not on the list CTA */}
            <div className="bg-navy rounded-xl p-5 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(232,34,26,0.2)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E8221A"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  Don&apos;t see your town?
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  We may still be able to serve you — call to find out.
                </p>
              </div>
              <a
                href="tel:6035340115"
                className="bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-4 py-2 rounded text-sm transition-all hover:scale-105 whitespace-nowrap"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

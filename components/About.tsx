"use client";

import { useRef, useEffect, useState } from "react";

const highlights = [
  { icon: "⭐", text: "15+ years of hands-on experience" },
  { icon: "🏠", text: "Owner answers the phone directly" },
  { icon: "💪", text: "Female-owned & operated business" },
  { icon: "🔨", text: "Contractor-ready for property flips" },
  { icon: "🎨", text: "Color consultation included" },
  { icon: "✅", text: "Fully licensed & insured in NH" },
];

export default function About() {
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
    <section id="about" className="bg-light py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Photo frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              {/* Placeholder gradient photo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #1C2B3A 0%, #243547 50%, #1A3FA8 100%)",
                }}
              />

              {/* Silhouette / placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 text-center p-8">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mb-4 opacity-30"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <p className="text-sm font-medium opacity-60">
                  Photo of Alysha Pillsbury
                  <br />
                  on a project site
                </p>
                <p className="text-xs opacity-40 mt-2">
                  (Photo coming soon)
                </p>
              </div>

              {/* Rainbow accent border */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: "var(--rainbow)" }}
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-6 bg-white rounded-2xl shadow-xl p-5 border border-light-dark"
              style={{ maxWidth: "200px" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "rgba(232,34,26,0.1)" }}
                >
                  👩‍🎨
                </div>
                <div>
                  <div className="text-navy font-bold text-sm">Female-Owned</div>
                  <div className="text-navy/50 text-xs">& Operated</div>
                </div>
              </div>
              <div className="rainbow-bar rounded-full mt-2" style={{ height: "3px" }} />
            </div>
          </div>

          {/* Text side */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
              About Xpertise Painting
            </span>
            <h2
              className="text-navy text-4xl lg:text-5xl font-black mb-6 leading-[1.15]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Meet Alysha
              <br />
              <span className="rainbow-text">Pillsbury</span>
            </h2>

            <p className="text-navy/70 text-lg leading-relaxed mb-5">
              Alysha Pillsbury founded Xpertise Painting LLC with a simple
              belief: every home deserves expert craftsmanship and a team that
              treats it like their own.
            </p>

            <p className="text-navy/60 leading-relaxed mb-5">
              With over 15 years of experience in painting, drywall, and
              finishing work across Southern New Hampshire, Alysha built her
              reputation on personal accountability. When you call Xpertise
              Painting, <strong className="text-navy">you&apos;re calling Alysha directly.</strong> No
              call centers, no runaround — just a real professional who stands
              behind her work.
            </p>

            <p className="text-navy/60 leading-relaxed mb-8">
              As a female-owned business in the trades, Alysha brings a
              homeowner&apos;s eye to every project — attention to detail,
              respect for your space, and a genuine desire to make you smile
              when the job is done.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(10px)",
                    transition: `opacity 0.4s ease ${0.3 + i * 0.08}s, transform 0.4s ease ${0.3 + i * 0.08}s`,
                  }}
                >
                  <span className="text-lg">{h.icon}</span>
                  <span className="text-navy/70 text-sm font-medium">{h.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:6035340115"
                className="flex items-center justify-center gap-3 bg-navy hover:bg-navy-dark text-white font-semibold px-7 py-3.5 rounded transition-all hover:scale-105"
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
                Call Alysha Directly
              </a>
              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center justify-center gap-2 border-2 border-navy/20 hover:border-brand-red text-navy hover:text-brand-red font-semibold px-7 py-3.5 rounded transition-all"
              >
                Get a Free Estimate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

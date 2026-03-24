"use client";

import { useRef, useEffect, useState } from "react";

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Interior Painting",
    desc: "Transform every room with precision and care. We prep, prime, and paint to perfection — walls, ceilings, trim, and doors.",
    color: "#E8221A",
    href: "#contact",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Exterior Painting",
    desc: "Curb appeal that lasts. We power wash, repair, prime, and apply weather-resistant coatings to protect your home for years.",
    color: "#1A3FA8",
    href: "#contact",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
      </svg>
    ),
    title: "Drywall & Sheetrock",
    desc: "Full drywall cycle — installation, mud, sand, and paint. Sheetrock, wall patching, and flawless finishing for new builds or repairs.",
    color: "#FF6B00",
    href: "#contact",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <line x1="12" y1="12" x2="12" y2="12" />
        <line x1="8" y1="7" x2="8" y2="17" />
        <line x1="16" y1="7" x2="16" y2="17" />
      </svg>
    ),
    title: "Cabinet Refinishing",
    desc: "New cabinets without the expense. We strip, sand, prime, and spray a factory-smooth finish on your existing kitchen or bathroom cabinets.",
    color: "#00A651",
    href: "#contact",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="19" width="20" height="2" rx="1" />
        <path d="M6 19V7l6-4 6 4v12" />
        <path d="M9 19v-6h6v6" />
      </svg>
    ),
    title: "Floor Work",
    desc: "Floor finishing and staining services to complement your freshly painted space. We coordinate with your floors to create a cohesive look.",
    color: "#7B2D8B",
    href: "#contact",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Renovation & Flips",
    desc: "Contractor-ready for the full renovation pipeline. We work with investors and GCs on property flips, tight timelines, and budget-conscious results.",
    color: "#E8221A",
    href: "#contractors",
  },
];

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: (typeof services)[0];
  index: number;
  isVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-xl p-7 transition-all duration-300 cursor-pointer border border-light-dark"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.3s ease, border-color 0.3s ease`,
        boxShadow: hovered
          ? "0 20px 40px -10px rgba(28,43,58,0.15)"
          : "0 2px 8px rgba(28,43,58,0.06)",
        borderBottomColor: hovered ? service.color : undefined,
        borderBottomWidth: hovered ? "3px" : "1px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() =>
        document.querySelector(service.href)?.scrollIntoView({ behavior: "smooth" })
      }
    >
      {/* Icon */}
      <div
        className="mb-5 transition-colors duration-300"
        style={{ color: hovered ? service.color : "#1C2B3A" }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="text-navy font-bold text-xl mb-3 transition-colors duration-300"
        style={{
          fontFamily: "var(--font-display)",
          color: hovered ? service.color : "#1C2B3A",
        }}
      >
        {service.title}
      </h3>

      {/* Desc */}
      <p className="text-navy/60 text-sm leading-relaxed">{service.desc}</p>

      {/* Learn more */}
      <div
        className="flex items-center gap-2 mt-5 text-sm font-semibold transition-all duration-300"
        style={{ color: service.color, opacity: hovered ? 1 : 0.6 }}
      >
        <span>Get a Quote</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  );
}

export default function Services() {
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
    <section id="services" className="bg-light py-24 lg:py-32" ref={ref}>
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
            What We Do
          </span>
          <h2
            className="text-navy text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Full-Scope Finishing Services
          </h2>
          <p className="text-navy/60 max-w-2xl mx-auto text-lg">
            Not just a paint crew — a complete finishing operation. From bare
            drywall to final coat, we handle every step with expert precision.
          </p>
          {/* Rainbow divider */}
          <div className="rainbow-bar mt-8 max-w-xs mx-auto rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              isVisible={visible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-14"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.7s",
          }}
        >
          <p className="text-navy/60 mb-4">
            Not sure which service you need?
          </p>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-navy hover:bg-navy-dark text-white font-semibold px-8 py-3.5 rounded transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Talk to Alysha — Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Jennifer M.",
    location: "Nashua, NH",
    platform: "Google",
    rating: 5,
    project: "Interior Painting",
    date: "February 2026",
    text: "Alysha and her team did an incredible job on our living room and dining room. They were on time, professional, and the finish is absolutely flawless. We couldn't be happier — already planning to book them for the exterior next spring!",
    featured: true,
  },
  {
    name: "Mike R.",
    location: "Manchester, NH",
    platform: "Yelp",
    rating: 5,
    project: "Renovation & Cabinets",
    date: "January 2026",
    text: "Used Xpertise for a full flip renovation — kitchen cabinets, drywall repair, and full interior repaint. Alysha coordinated everything smoothly, hit the timeline, and the results were show-ready. Will use again on my next project.",
    featured: true,
  },
  {
    name: "Sarah K.",
    location: "Concord, NH",
    platform: "Facebook",
    rating: 5,
    project: "Color Consultation + Full Interior",
    date: "January 2026",
    text: "So glad I found a female-owned painting company in NH! Alysha was thorough, communicative, and the color consultation was worth it alone. My home went from builder-grade beige to absolutely stunning. Major transformation!",
    featured: false,
  },
  {
    name: "David L.",
    location: "Bedford, NH",
    platform: "Google",
    rating: 5,
    project: "Drywall Repair",
    date: "December 2025",
    text: "Had some significant drywall damage from a water leak. Xpertise did the sheetrock repair, mud, sand, and matched the existing texture perfectly. You'd never know anything happened. Fast, clean, and quality work.",
    featured: false,
  },
  {
    name: "Amanda T.",
    location: "Nashua, NH",
    platform: "Yelp",
    rating: 5,
    project: "Exterior Painting",
    date: "November 2025",
    text: "Called Alysha on a Tuesday, had an estimate Thursday, and work started the following Monday. That kind of responsiveness is rare in the trades. Exterior came out gorgeous and she stayed within budget the whole way.",
    featured: false,
  },
  {
    name: "Chris & Donna P.",
    location: "Merrimack, NH",
    platform: "Google",
    rating: 5,
    project: "Full Interior + Trim",
    date: "November 2025",
    text: "We hired Xpertise to repaint our entire home before listing it. Alysha's color choices were spot-on, the work was done in 4 days flat, and the house sold in 6 days over asking. I credit the paint job. Worth every penny.",
    featured: false,
  },
  {
    name: "Rachel O.",
    location: "Amherst, NH",
    platform: "Google",
    rating: 5,
    project: "Cabinet Refinishing",
    date: "October 2025",
    text: "My kitchen cabinets were dated oak from 1994. After Alysha refinished them in a warm white with new hardware, it looks like a completely new kitchen — for a fraction of the cost of replacement. Absolute game changer.",
    featured: false,
  },
  {
    name: "Tom W.",
    location: "Nashua, NH",
    platform: "Facebook",
    rating: 5,
    project: "Exterior Painting",
    date: "October 2025",
    text: "Great experience from start to finish. Alysha gave us a detailed estimate, explained what prep work was needed, and her crew was respectful of our landscaping and property. The house looks brand new.",
    featured: false,
  },
  {
    name: "Lindsay H.",
    location: "Manchester, NH",
    platform: "Yelp",
    rating: 5,
    project: "Interior Painting",
    date: "September 2025",
    text: "I was nervous about picking bold colors but Alysha's consultation gave me total confidence. She walked through every room, explained how the light would hit each color, and the result is exactly what I pictured. Couldn't have done it without her.",
    featured: false,
  },
  {
    name: "Brandon F.",
    location: "Londonderry, NH",
    platform: "Google",
    rating: 5,
    project: "Renovation Flip",
    date: "August 2025",
    text: "Third time I've used Alysha on an investment property. She understands investors — fast turnaround, budget-conscious choices, and results that photograph well. My go-to for every flip in Southern NH.",
    featured: false,
  },
  {
    name: "Karen & Steve M.",
    location: "Nashua, NH",
    platform: "Google",
    rating: 5,
    project: "Full Interior",
    date: "July 2025",
    text: "From the initial walkthrough to the final reveal, every step of the process was professional and pleasant. The crew was clean, courteous, and Alysha checked in daily. Our home feels completely refreshed.",
    featured: false,
  },
  {
    name: "Paul D.",
    location: "Hudson, NH",
    platform: "Facebook",
    rating: 5,
    project: "Drywall + Interior",
    date: "June 2025",
    text: "Alysha repaired some serious texture damage from a previous bad contractor and then painted the whole first floor. The repair work was invisible — she is a true craftsperson. Highly recommend.",
    featured: false,
  },
];

const PLATFORMS = ["All", "Google", "Yelp", "Facebook"];
const SERVICES = ["All", "Interior Painting", "Exterior Painting", "Cabinet Refinishing", "Drywall Repair", "Renovation & Cabinets", "Color Consultation"];

const platformColors: Record<string, string> = {
  Google: "#4285F4",
  Yelp: "#D32323",
  Facebook: "#1877F2",
};

const platformReviewLinks: Record<string, string> = {
  Google: "https://www.google.com/maps/search/Xpertise+Painting+LLC+Nashua+NH",
  Yelp: "https://www.yelp.com/search?find_desc=Xpertise+Painting+LLC&find_loc=Nashua%2C+NH",
  Facebook: "https://www.facebook.com/p/Xpertise-Painting-LLC-61574930433297/reviews/",
};

const platformBg: Record<string, string> = {
  Google: "#4285F420",
  Yelp: "#D3232320",
  Facebook: "#1877F220",
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < count ? "#FFD700" : "none"} stroke="#FFD700" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [platform, setPlatform] = useState("All");
  const [service, setService] = useState("All");

  const filtered = testimonials.filter((t) => {
    const matchPlatform = platform === "All" || t.platform === platform;
    const matchService = service === "All" || t.project.includes(service.replace(" Painting", "").replace(" Refinishing", "").replace(" Repair", ""));
    return matchPlatform && matchService;
  });

  const featured = testimonials.filter((t) => t.featured);

  return (
    <>
      <main className="min-h-screen" style={{ background: "#F8F7F5", paddingTop: "83px" }}>

        {/* Header */}
        <section className="bg-navy py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
              Client Stories
            </span>
            <h1
              className="text-white text-4xl lg:text-6xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Smiles,{" "}
              <span className="rainbow-shimmer">Every Time</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Real reviews from real Southern NH homeowners — on Google, Yelp, and Facebook.
            </p>

            {/* Platform rating badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {Object.entries(platformColors).map(([p, color]) => (
                <div
                  key={p}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <span className="text-xs font-black px-2 py-0.5 rounded text-white" style={{ background: color }}>
                    {p}
                  </span>
                  <Stars count={5} />
                  <span className="text-white font-bold text-sm">5.0</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div className="bg-white border-b border-light-dark">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-navy/60 text-sm">
              {[
                { value: "500+", label: "Projects Completed" },
                { value: "5.0", label: "Average Rating" },
                { value: "100%", label: "Satisfaction Guarantee" },
                { value: "15+", label: "Years in Business" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="font-black text-navy text-lg">{s.value}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

          {/* Featured quotes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {featured.map((t) => (
              <div
                key={t.name}
                className="bg-navy rounded-2xl p-8 lg:p-10 relative overflow-hidden"
              >
                <div
                  className="absolute top-5 right-7 text-7xl font-serif leading-none select-none"
                  style={{ color: "rgba(232,34,26,0.15)", fontFamily: "Georgia, serif" }}
                >
                  &ldquo;
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{ background: platformBg[t.platform], border: `2px solid ${platformColors[t.platform]}50` }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.location} · {t.date}</div>
                  </div>
                  <span className="text-[10px] font-black px-2 py-1 rounded text-white flex-shrink-0"
                    style={{ background: platformColors[t.platform] }}>
                    {t.platform}
                  </span>
                </div>
                <Stars count={t.rating} />
                <blockquote
                  className="text-white/80 text-base lg:text-lg leading-relaxed italic mt-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div className="mt-4 text-brand-red text-xs font-semibold tracking-wide uppercase">
                  {t.project}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "var(--rainbow)" }} />
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 mb-10">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-navy/40 text-xs font-semibold tracking-widest uppercase w-16 flex-shrink-0">Platform</span>
              <div className="flex gap-2 flex-wrap">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      background: platform === p
                        ? (p === "All" ? "#1C2B3A" : platformColors[p])
                        : "#EDECEA",
                      color: platform === p ? "#fff" : "#1C2B3A99",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-navy/40 text-xs font-semibold tracking-widest uppercase w-16 flex-shrink-0">Service</span>
              <div className="flex gap-2 flex-wrap">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setService(s)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      background: service === s ? "#1C2B3A" : "#EDECEA",
                      color: service === s ? "#fff" : "#1C2B3A99",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-navy/40 text-sm mb-6">
            Showing {filtered.length} review{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="bg-white rounded-2xl p-6 border border-light-dark hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: platformBg[t.platform], border: `1.5px solid ${platformColors[t.platform]}40` }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-navy font-semibold text-sm">{t.name}</div>
                      <div className="text-navy/40 text-xs">{t.location}</div>
                    </div>
                  </div>
                  <span
                    className="text-[9px] font-black px-2 py-0.5 rounded text-white flex-shrink-0 mt-0.5"
                    style={{ background: platformColors[t.platform] }}
                  >
                    {t.platform}
                  </span>
                </div>

                <Stars count={t.rating} />

                <p className="text-navy/65 text-sm leading-relaxed mt-3 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-light-dark">
                  <span className="text-brand-red text-xs font-semibold">{t.project}</span>
                  <span className="text-navy/30 text-xs">{t.date}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-navy/40">
              No reviews match that filter. <button className="underline" onClick={() => { setPlatform("All"); setService("All"); }}>Clear filters</button>
            </div>
          )}

          {/* Leave a review */}
          <div className="mt-16 bg-white rounded-2xl p-8 border border-light-dark">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-navy text-xl font-black mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  Had a great experience?
                </h3>
                <p className="text-navy/55 text-sm">Leave Alysha a review — it means the world and helps other homeowners find her.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                {Object.entries(platformColors).map(([p, color]) => (
                  <a
                    key={p}
                    href={platformReviewLinks[p]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg text-white text-sm font-bold transition-all hover:scale-105"
                    style={{ background: color, boxShadow: `0 4px 14px ${color}40` }}
                  >
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Book CTA */}
          <div className="mt-8 bg-navy rounded-2xl px-8 py-12 text-center">
            <h3
              className="text-white text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to be our next happy client?
            </h3>
            <p className="text-white/55 mb-8 max-w-md mx-auto">
              Free in-home estimate. Alysha answers personally. No bots, no call centers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#contact"
                className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105"
                style={{ boxShadow: "0 6px 24px rgba(232,34,26,0.35)" }}
              >
                Book Your Free Consultation
              </Link>
              <a
                href="tel:6035340115"
                className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/8 transition-all"
              >
                Call (603) 534-0115
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

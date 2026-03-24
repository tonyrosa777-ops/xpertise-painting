"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// 8 landscape images (1290×~720)
const landscapeImages = [
  { src: "/images/work-06.jpeg",  alt: "Trim and finish work" },
  { src: "/images/work-09.jpeg",  alt: "Interior room repaint" },
  { src: "/images/work-10.jpeg",  alt: "Drywall and texture work" },
  { src: "/images/work-11.jpeg",  alt: "Full interior transformation" },
  { src: "/images/work-12.jpeg",  alt: "Accent wall detail" },
  { src: "/images/work-13.jpeg",  alt: "Renovation project" },
  { src: "/images/work-14.jpeg",  alt: "Ceiling and trim" },
  { src: "/images/work-15.jpeg",  alt: "Completed project" },
];

// 7 portrait images (various tall ratios)
const portraitImages = [
  { src: "/images/work-01.jpeg",  alt: "Exterior — before & after" },
  { src: "/images/work-02.jpeg",  alt: "House exterior repaint" },
  { src: "/images/work-03.jpeg",  alt: "Exterior detail work" },
  { src: "/images/work-04.png",   alt: "Before and after reveal" },
  { src: "/images/work-05.png",   alt: "Color consultation result" },
  { src: "/images/work-07.jpeg",  alt: "Exterior painting" },
  { src: "/images/work-08.jpeg",  alt: "Cabinet refinishing" },
];

// All images in a flat list for the lightbox (landscape first, then portrait)
const allImages = [...landscapeImages, ...portraitImages];

const pages = [
  { label: "Interiors & Rooms", images: landscapeImages },
  { label: "Exteriors & Detail", images: portraitImages },
];

export default function Gallery() {
  const [page, setPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null); // index into allImages

  const goToPage = (p: number) => {
    setPage(p);
    setAnimKey((k) => k + 1);
  };

  const prevLight = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + allImages.length) % allImages.length));
  }, []);
  const nextLight = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % allImages.length));
  }, []);

  const openLightbox = (pageIndex: number, imgIndex: number) => {
    const offset = pageIndex === 0 ? 0 : landscapeImages.length;
    setLightbox(offset + imgIndex);
  };

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prevLight();
      if (e.key === "ArrowRight") nextLight();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, prevLight, nextLight]);

  const currentImages = pages[page].images;
  const isLandscape = page === 0;

  return (
    <section id="gallery" className="bg-navy-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
            Our Work
          </span>
          <h2
            className="text-white text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Every Wall Tells a Story
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Real projects, real homes — Southern NH transformations by Alysha and her team.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {pages.map((p, i) => (
            <button
              key={p.label}
              onClick={() => goToPage(i)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: page === i ? "#E8221A" : "rgba(255,255,255,0.08)",
                color: page === i ? "#fff" : "rgba(255,255,255,0.5)",
                boxShadow: page === i ? "0 4px 16px rgba(232,34,26,0.3)" : "none",
              }}
            >
              {p.label}
              <span
                className="ml-2 text-xs opacity-60"
              >
                {p.images.length}
              </span>
            </button>
          ))}
        </div>

        {/* Landscape grid — 4 cols × 2 rows, all aspect-video */}
        {isLandscape && (
          <div
            key={`ls-${animKey}`}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {currentImages.map((img, i) => (
              <Tile
                key={img.src}
                img={img}
                aspect="aspect-video"
                delay={i * 0.05}
                onClick={() => openLightbox(0, i)}
              />
            ))}
          </div>
        )}

        {/* Portrait grid — 3 cols, aspect-[3/4]; 7th image spans full width */}
        {!isLandscape && (
          <div
            key={`pt-${animKey}`}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {currentImages.slice(0, 6).map((img, i) => (
              <Tile
                key={img.src}
                img={img}
                aspect="aspect-[3/4]"
                delay={i * 0.06}
                onClick={() => openLightbox(1, i)}
              />
            ))}
            {currentImages[6] && (
              <div className="col-span-2 lg:col-span-3">
                <Tile
                  img={currentImages[6]}
                  aspect="aspect-video"
                  delay={0.42}
                  onClick={() => openLightbox(1, 6)}
                />
              </div>
            )}
          </div>
        )}

        {/* Page indicator */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => goToPage(0)}
            disabled={page === 0}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === page ? "24px" : "8px",
                  height: "8px",
                  background: i === page ? "#E8221A" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => goToPage(1)}
            disabled={page === 1}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white/35 text-sm mb-5">
            Like what you see? Let&apos;s make your home the next one.
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95"
            style={{ boxShadow: "0 6px 24px rgba(232,34,26,0.35)" }}
          >
            Book Your Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.93)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-sm font-medium z-10">
            {lightbox + 1} / {allImages.length}
          </div>
          <button
            className="absolute top-4 right-5 text-white/50 hover:text-white transition-colors z-10 p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-3 lg:left-8 text-white/50 hover:text-white transition-colors z-10 p-3 rounded-xl hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); prevLight(); }}
            aria-label="Previous"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="relative mx-16 lg:mx-24" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[lightbox].src}
              alt={allImages[lightbox].alt}
              width={1200}
              height={900}
              className="rounded-xl object-contain max-h-[85vh] w-auto"
              style={{ maxWidth: "min(88vw, 1200px)" }}
              priority
            />
            <p className="text-white/35 text-xs text-center mt-3">{allImages[lightbox].alt}</p>
          </div>
          <button
            className="absolute right-3 lg:right-8 text-white/50 hover:text-white transition-colors z-10 p-3 rounded-xl hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); nextLight(); }}
            aria-label="Next"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

function Tile({
  img,
  aspect,
  delay,
  onClick,
}: {
  img: { src: string; alt: string };
  aspect: string;
  delay: number;
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl cursor-pointer ${aspect}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
      onClick={onClick}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

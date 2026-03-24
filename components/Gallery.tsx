"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const images = [
  { src: "/images/work-01.jpeg", alt: "Interior painting project" },
  { src: "/images/work-02.jpeg", alt: "Room transformation" },
  { src: "/images/work-03.jpeg", alt: "Painting detail work" },
  { src: "/images/work-04.png",  alt: "Before and after reveal" },
  { src: "/images/work-05.png",  alt: "Color consultation result" },
  { src: "/images/work-06.jpeg", alt: "Trim and finish work" },
  { src: "/images/work-07.jpeg", alt: "Exterior painting" },
  { src: "/images/work-08.jpeg", alt: "Cabinet refinishing" },
  { src: "/images/work-09.jpeg", alt: "Interior room repaint" },
  { src: "/images/work-10.jpeg", alt: "Drywall and texture work" },
  { src: "/images/work-11.jpeg", alt: "Full interior transformation" },
  { src: "/images/work-12.jpeg", alt: "Accent wall detail" },
  { src: "/images/work-13.jpeg", alt: "Renovation project" },
  { src: "/images/work-14.jpeg", alt: "Ceiling and trim" },
  { src: "/images/work-15.jpeg", alt: "Completed project" },
];

const PER_PAGE = 6;
const TOTAL_PAGES = Math.ceil(images.length / PER_PAGE);

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const pageImages = images.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  // Split current page into 3 columns
  const cols: typeof images[] = [[], [], []];
  pageImages.forEach((img, i) => cols[i % 3].push(img));

  const goToPage = (p: number) => {
    setPage(p);
    setAnimKey((k) => k + 1);
  };

  // Lightbox nav cycles through ALL images, not just current page
  const prevLight = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, []);
  const nextLight = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));
  }, []);

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

  return (
    <section id="gallery" className="bg-navy-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
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

        {/* Grid — 3 cols desktop */}
        <div key={animKey} className="hidden lg:flex gap-4 min-h-[480px]">
          {cols.map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-4">
              {col.map((img, ii) => {
                const globalIdx = page * PER_PAGE + ci + ii * 3;
                return (
                  <GalleryTile
                    key={img.src}
                    img={img}
                    index={globalIdx}
                    onOpen={setLightbox}
                    delay={ii * 0.07 + ci * 0.04}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* 2-col tablet */}
        <div key={`tab-${animKey}`} className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
          {pageImages.map((img, i) => (
            <GalleryTile
              key={img.src}
              img={img}
              index={page * PER_PAGE + i}
              onOpen={setLightbox}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* 1-col mobile */}
        <div key={`mob-${animKey}`} className="grid sm:hidden grid-cols-1 gap-4">
          {pageImages.map((img, i) => (
            <GalleryTile
              key={img.src}
              img={img}
              index={page * PER_PAGE + i}
              onOpen={setLightbox}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === page ? "28px" : "8px",
                  height: "8px",
                  background: i === page ? "#E8221A" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === TOTAL_PAGES - 1}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <p className="text-center text-white/25 text-xs mt-3">
          {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, images.length)} of {images.length} photos
        </p>

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
            {lightbox + 1} / {images.length}
          </div>
          <button
            className="absolute top-4 right-5 text-white/50 hover:text-white transition-colors z-10 p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-3 lg:left-8 text-white/50 hover:text-white transition-colors z-10 p-3 rounded-xl hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); prevLight(); }}
            aria-label="Previous image"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div
            className="relative mx-16 lg:mx-24"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              width={1200}
              height={900}
              className="rounded-xl object-contain max-h-[85vh] w-auto"
              style={{ maxWidth: "min(90vw, 1200px)" }}
              priority
            />
            <p className="text-white/40 text-xs text-center mt-3">{images[lightbox].alt}</p>
          </div>
          <button
            className="absolute right-3 lg:right-8 text-white/50 hover:text-white transition-colors z-10 p-3 rounded-xl hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); nextLight(); }}
            aria-label="Next image"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

function GalleryTile({
  img,
  index,
  onOpen,
  delay,
}: {
  img: { src: string; alt: string };
  index: number;
  onOpen: (i: number) => void;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
      onClick={() => onOpen(index)}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={600}
        height={450}
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

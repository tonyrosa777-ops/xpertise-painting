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

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, prev, next]);

  // Split into 3 columns for masonry
  const cols: typeof images[] = [[], [], []];
  images.forEach((img, i) => cols[i % 3].push(img));

  return (
    <section id="gallery" className="bg-navy-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center mb-14"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
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

        {/* Masonry grid — 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="hidden lg:flex gap-4">
          {cols.map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-4">
              {col.map((img, ii) => {
                const globalIdx = ci + ii * 3;
                return (
                  <GalleryTile
                    key={img.src}
                    img={img}
                    index={globalIdx}
                    onOpen={setLightbox}
                    loaded={loaded}
                    delay={globalIdx * 0.05}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* 2-column layout for tablet */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
          {images.map((img, i) => (
            <GalleryTile
              key={img.src}
              img={img}
              index={i}
              onOpen={setLightbox}
              loaded={loaded}
              delay={i * 0.04}
            />
          ))}
        </div>

        {/* Single column mobile */}
        <div className="grid sm:hidden grid-cols-1 gap-4">
          {images.map((img, i) => (
            <GalleryTile
              key={img.src}
              img={img}
              index={i}
              onOpen={setLightbox}
              loaded={loaded}
              delay={i * 0.04}
            />
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="text-center mt-14"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
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
          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-sm font-medium z-10">
            {lightbox + 1} / {images.length}
          </div>

          {/* Close */}
          <button
            className="absolute top-4 right-5 text-white/50 hover:text-white transition-colors z-10 p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 lg:left-8 text-white/50 hover:text-white transition-colors z-10 p-3 rounded-xl hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] mx-16 lg:mx-24"
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

          {/* Next */}
          <button
            className="absolute right-3 lg:right-8 text-white/50 hover:text-white transition-colors z-10 p-3 rounded-xl hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); next(); }}
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
  loaded,
  delay,
}: {
  img: { src: string; alt: string };
  index: number;
  onOpen: (i: number) => void;
  loaded: boolean;
  delay: number;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
      onClick={() => onOpen(index)}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={600}
        height={450}
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
        style={{ display: "block" }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-all duration-300 flex items-center justify-center">
        <div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

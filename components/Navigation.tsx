"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "For Contractors", href: "#contractors" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { count, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -70,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.1,
    });
  }, { dependencies: [] });

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) return; // let Link handle it
    if (pathname !== "/") {
      // On non-home pages, navigate to home with the hash
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled
          ? "rgba(17, 30, 41, 0.97)"
          : "rgba(28, 43, 58, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
      }}
    >
      {/* Rainbow accent — always visible, brightens on scroll */}
      <div
        className="h-[3px] w-full rainbow-bar"
        style={{ opacity: scrolled ? 1 : 0.5, transition: "opacity 0.4s ease" }}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none text-left group">
            <span
              className="text-brand-red font-black text-lg lg:text-xl tracking-wide group-hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-display)" }}
            >
              XPERTISE
            </span>
            <span className="text-white font-bold text-[10px] tracking-[0.35em] -mt-0.5">
              PAINTING LLC
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/75 hover:text-white text-sm font-medium tracking-wide hover-underline transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/75 hover:text-white text-sm font-medium tracking-wide hover-underline transition-colors duration-200"
                >
                  {link.label}
                </button>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:6035340115"
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              (603) 534-0115
            </a>
            {/* Snipcart cart opener (services/gift cards) */}
            <button
              className="snipcart-checkout relative text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Open services cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="snipcart-items-count absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none" />
            </button>
            {/* Merch cart opener (Printful items) */}
            <button
              onClick={openCart}
              className="relative text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Open merch cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ boxShadow: "0 4px 14px rgba(232,34,26,0.3)" }}
            >
              Book Your Quote
            </button>
          </div>

          {/* Mobile carts */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              className="snipcart-checkout relative text-white/70 hover:text-white transition-colors p-2"
              aria-label="Open services cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="snipcart-items-count absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none" />
            </button>
            <button
              onClick={openCart}
              className="relative text-white/70 hover:text-white transition-colors p-2"
              aria-label="Open merch cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-[5px] p-2 text-white"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden overflow-hidden h-0 opacity-0"
        style={{ background: "rgba(17,30,41,0.98)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="px-5 py-6 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/75 hover:text-white text-base font-medium py-3 border-b border-white/8 transition-colors flex items-center justify-between"
              >
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            ) : (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/75 hover:text-white text-base font-medium py-3 border-b border-white/8 text-left transition-colors flex items-center justify-between"
              >
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            )
          )}
          <div className="pt-5 flex flex-col gap-3">
            <a
              href="tel:6035340115"
              className="flex items-center justify-center gap-2.5 bg-white/8 border border-white/15 text-white font-semibold px-5 py-3.5 rounded-lg transition-colors hover:bg-white/15"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Alysha: (603) 534-0115
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="bg-brand-red text-white font-bold px-5 py-3.5 rounded-lg transition-all hover:bg-brand-red-dark"
            >
              Book Your Free Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

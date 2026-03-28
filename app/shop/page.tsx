"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";
import MerchSection from "@/components/MerchSection";
import { useCart } from "@/lib/cart";

function MerchSuccessBanner() {
  const searchParams = useSearchParams();
  const success = searchParams.get("merch_success") === "true";
  const { clearCart } = useCart();

  if (!success) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        onAnimationComplete={() => clearCart()}
        className="fixed top-0 left-0 right-0 z-50 bg-navy text-white text-center py-3 px-6 border-b-2 border-brand-red"
        style={{ fontWeight: 600 }}
      >
        Your order is confirmed! Merch is on its way — fulfilled by Printful.
      </motion.div>
    </AnimatePresence>
  );
}

export default function ShopPage() {
  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <>
      <Suspense fallback={null}>
        <MerchSuccessBanner />
      </Suspense>
      <main className="min-h-screen" style={{ background: "#F8F7F5", paddingTop: "83px" }}>
        {/* Header */}
        <section className="bg-navy py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
              Services & Gift Cards
            </span>
            <h1
              className="text-white text-4xl lg:text-6xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              The Xpertise{" "}
              <span className="rainbow-shimmer">Shop</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Book a color consultation, purchase a gift card, or bundle your
              services and save. All purchases confirmed personally by Alysha.
            </p>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-white border-b border-light-dark">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-navy/50 text-sm">
              {["Secure checkout via Snipcart", "Confirmed personally by Alysha", "Same-day digital delivery on gift cards", "Refundable within 7 days"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-light-dark overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
              >
                {/* Product header */}
                <div
                  className="relative px-7 pt-8 pb-6"
                  style={{ background: `linear-gradient(135deg, ${product.color}12 0%, transparent 100%)` }}
                >
                  {product.badge && (
                    <div className="absolute top-4 right-4">
                      <span
                        className="text-[10px] font-black px-2.5 py-1 rounded-full text-white tracking-wide"
                        style={{ background: (product.badgeColor || product.color) }}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-4xl mb-4">{product.icon}</div>

                  <h3
                    className="text-navy text-xl font-black mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2">
                    {product.price === 0 ? (
                      <span className="text-2xl font-black" style={{ color: product.color }}>
                        Custom Pricing
                      </span>
                    ) : (
                      <>
                        <span className="text-3xl font-black" style={{ color: product.color }}>
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-navy/35 text-base line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Color bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
                    style={{
                      background: product.color,
                      opacity: 0.4,
                    }}
                  />
                </div>

                {/* Description */}
                <div className="px-7 py-5 flex-1">
                  <p className="text-navy/60 text-sm leading-relaxed mb-5">
                    {product.description}
                  </p>

                  <ul className="space-y-2">
                    {product.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-navy/70">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={product.color}
                          strokeWidth="2.5"
                          className="flex-shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-7 pb-7 mt-2">
                  {product.ctaHref ? (
                    <a
                      href={product.ctaHref}
                      className="block w-full text-center font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] text-white"
                      style={{
                        background: product.color,
                        boxShadow: `0 4px 16px ${product.color}30`,
                      }}
                    >
                      {product.cta ?? "Book Now"}
                    </a>
                  ) : (
                    /* Snipcart add-to-cart button */
                    <button
                      className="snipcart-add-item block w-full text-center font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] text-white"
                      style={{
                        background: product.color,
                        boxShadow: `0 4px 16px ${product.color}30`,
                      }}
                      data-item-id={product.id}
                      data-item-price={product.price}
                      data-item-url={`/api/products/${product.id}`}
                      data-item-name={product.name}
                      data-item-description={product.description}
                      data-item-shippable="false"
                      data-item-categories={product.name.includes("Gift") ? "Gift Cards" : "Services"}
                    >
                      {product.name.includes("Gift") ? "Buy Gift Card" : "Book Now"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Merch section — Printful print-on-demand */}
        <MerchSection />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-0">
          {/* Custom project section */}
          <div className="mt-16 bg-navy rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
                Custom Project?
              </span>
              <h2
                className="text-white text-3xl font-black mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Not sure what you need?
                <br />
                <span className="rainbow-shimmer">Just call Alysha.</span>
              </h2>
              <p className="text-white/60 leading-relaxed">
                Every home is different. Alysha offers free in-home estimates
                for all painting, drywall, cabinet, and renovation projects.
                No online form required — just call and she&apos;ll come take
                a look.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="tel:6035340115"
                className="flex items-center justify-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 text-center"
                style={{ boxShadow: "0 6px 24px rgba(232,34,26,0.35)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Alysha: (603) 534-0115
              </a>
              <Link
                href="/#contact"
                className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:bg-white/8"
              >
                Get a Free Estimate Online
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-16">
            <h2
              className="text-navy text-3xl font-black mb-8 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Shop FAQs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {[
                {
                  q: "How does checkout work?",
                  a: "You'll pay securely via Snipcart (card or PayPal). After checkout, Alysha will reach out within 24 hours to schedule your appointment.",
                },
                {
                  q: "Can I use a gift card for any service?",
                  a: "Yes — gift cards are valid for all Xpertise Painting services with no restrictions and no expiration date.",
                },
                {
                  q: "What if I need to reschedule my consultation?",
                  a: "No problem. Just call Alysha at (603) 534-0115 and she'll reschedule at no charge up to 24 hours before.",
                },
                {
                  q: "Do you offer payment plans on larger projects?",
                  a: "Yes. For projects over $2,000, Alysha offers flexible payment schedules. Discuss with her during the estimate.",
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl p-6 border border-light-dark">
                  <h4 className="text-navy font-bold mb-2">{faq.q}</h4>
                  <p className="text-navy/60 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

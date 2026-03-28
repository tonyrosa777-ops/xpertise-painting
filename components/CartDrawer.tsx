"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, count, isOpen, closeCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  async function handleCheckout() {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Checkout failed. Please try again.");
      }
    } catch {
      alert("Checkout failed. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeCart}
          />

          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{ background: "rgba(17,30,41,0.99)", backdropFilter: "blur(12px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h2
                  className="text-white text-xl font-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Merch Cart
                </h2>
                {count > 0 && (
                  <p className="text-white/50 text-xs mt-0.5">
                    {count} item{count !== 1 ? "s" : ""} · Fulfilled by Printful
                  </p>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-white/50 hover:text-white transition-colors p-1"
                aria-label="Close cart"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <p className="text-white/40 text-sm">Your merch cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="mt-4 text-brand-red text-sm underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Keep shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10 shrink-0 relative">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                      {item.category && (
                        <p className="text-white/40 text-xs mt-0.5">{item.category}</p>
                      )}
                      <p className="text-brand-red text-sm mt-1 font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-white/60 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-2 bg-white/10 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-white/60 hover:text-white w-4 h-4 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-white text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-white/60 hover:text-white w-4 h-4 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Subtotal</span>
                  <span className="text-white text-lg font-black" style={{ fontFamily: "var(--font-display)" }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-white/30 text-xs text-center">
                  Shipping calculated at checkout · Print-on-demand fulfilled by Printful
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                  style={{ boxShadow: "0 4px 16px rgba(232,34,26,0.35)" }}
                >
                  Checkout with Stripe
                </button>
                <button
                  onClick={closeCart}
                  className="w-full text-white/40 text-sm hover:text-white/60 transition-colors text-center"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

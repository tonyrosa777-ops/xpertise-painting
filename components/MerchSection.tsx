"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import seededProducts from "@/lib/printful-seeded-products.json";

const CATEGORIES = ["All", "Apparel", "Drinkware", "Bags", "Home & Stationery", "Accessories"];

interface MerchProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  image?: string | null;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-light-dark h-full flex flex-col animate-pulse">
      <div className="aspect-square bg-light-dark/30" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-2 bg-light-dark/50 rounded w-1/3" />
        <div className="h-4 bg-light-dark/50 rounded w-3/4" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-5 bg-light-dark/50 rounded w-12" />
          <div className="h-8 bg-light-dark/50 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}

function PlaceholderImage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-light-dark/10 gap-2">
      <svg className="w-10 h-10 text-navy/20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span className="text-navy/25 text-[10px] text-center px-4">
        Image available after Printful store connects
      </span>
    </div>
  );
}

export default function MerchSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<number | string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/api/printful/products")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) throw new Error("empty");

        // Detect format: live SyncProduct vs seeded
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isSeeded = !!(data[0] as any).slug;

        if (isSeeded) {
          // Seeded format
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setProducts(data.map((p: any) => ({
            id: p.printful_id ?? 0,
            slug: p.slug,
            name: p.name,
            price: p.price,
            category: p.category,
            image: p.preview_image_url ?? null,
          })));
        } else {
          // Live Printful SyncProduct format
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setProducts(data.map((p: any) => {
            const name = p.name ?? "";
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            let category = "Accessories";
            const lower = name.toLowerCase();
            if (/hoodie|tee|tank|sleeve|sweatshirt|zip hoodie|raglan/.test(lower)) category = "Apparel";
            else if (/mug|tumbler|water bottle|can cooler/.test(lower)) category = "Drinkware";
            else if (/tote|drawstring|crossbody|duffle|backpack|laptop sleeve/.test(lower)) category = "Bags";
            else if (/pillow|blanket|poster|notebook|canvas|journal|candle|pennant|banner|apron/.test(lower)) category = "Home & Stationery";

            // Pull price from seeded lookup
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const seeded = (seededProducts.products as any[]).find((s) => s.name === name || s.slug === slug);
            return {
              id: p.id,
              slug,
              name,
              price: seeded?.price ?? 0,
              category,
              image: p.thumbnail_url ?? null,
            };
          }));
        }
      })
      .catch(() => {
        // Full fallback to seeded JSON
        setProducts(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (seededProducts.products as any[]).map((p) => ({
            id: p.printful_id,
            slug: p.slug,
            name: p.name,
            price: p.price,
            category: p.category,
            image: p.preview_image_url ?? null,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  function handleAdd(product: MerchProduct) {
    addItem({
      id: String(product.id) + "-" + product.slug,
      name: product.name,
      price: product.price,
      image: product.image ?? undefined,
      category: product.category,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  return (
    <section className="py-16 lg:py-24" style={{ background: "#F0F2F5" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
            Print on Demand
          </span>
          <h2
            className="text-navy text-3xl lg:text-4xl font-black mb-3"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Xpertise{" "}
            <span className="rainbow-shimmer">Merch</span>
          </h2>
          <p className="text-navy/55 text-base max-w-xl mx-auto">
            Rep the brand. Every item printed on demand and shipped directly to you — fulfilled by Printful.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 mb-8 justify-center flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-navy text-white border-navy"
                  : "bg-white border-light-dark text-navy/60 hover:border-navy/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((product) => {
                const isAdded = addedId === product.id;
                const noPrice = !product.price;
                return (
                  <div
                    key={product.id + product.slug}
                    className="bg-white rounded-2xl overflow-hidden border border-light-dark flex flex-col hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="aspect-square relative overflow-hidden bg-light-dark/10">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          unoptimized
                        />
                      ) : (
                        <PlaceholderImage />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-navy/40 mb-1">
                        {product.category}
                      </span>
                      <h3
                        className="text-navy text-sm font-bold mb-3 flex-1 leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-navy font-black text-base" style={{ fontFamily: "var(--font-display)" }}>
                          {noPrice ? "—" : `$${product.price.toFixed(2)}`}
                        </span>
                        <button
                          onClick={() => !noPrice && handleAdd(product)}
                          disabled={noPrice}
                          className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all border ${
                            noPrice
                              ? "border-navy/15 text-navy/30 cursor-not-allowed"
                              : isAdded
                              ? "bg-navy text-white border-navy"
                              : "border-navy/30 text-navy hover:bg-navy hover:text-white hover:border-navy"
                          }`}
                        >
                          {isAdded ? "Added!" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Coming soon note if using placeholder data */}
        {!loading && products.every((p) => !p.image) && (
          <div className="mt-10 bg-navy/5 border border-navy/10 rounded-2xl p-6 text-center">
            <p className="text-navy/50 text-sm">
              Product images will appear once the Printful store is connected. Items and prices shown are confirmed — order fulfillment activates on launch.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

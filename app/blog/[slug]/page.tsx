import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog Post | Xpertise Painting LLC",
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ background: "#F8F7F5", paddingTop: "83px" }}>
        {/* Back */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-navy/50 hover:text-navy text-sm font-medium transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Blog
          </Link>

          {/* Article placeholder */}
          <article className="bg-white rounded-2xl p-8 lg:p-12 border border-light-dark">
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase">Color Trends</span>
            <h1
              className="text-navy text-3xl lg:text-4xl font-black mt-3 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Article: {params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </h1>
            <div className="flex items-center gap-4 text-navy/40 text-sm mb-8 pb-8 border-b border-light-dark">
              <span>By Alysha Pillsbury</span>
              <span>·</span>
              <span>March 2026</span>
              <span>·</span>
              <span>5 min read</span>
            </div>

            <div className="prose prose-navy max-w-none">
              <p className="text-navy/70 text-lg leading-relaxed mb-6">
                This article is coming soon. Check back shortly — Alysha is writing up her expert insights on this topic fresh from the job site.
              </p>
              <p className="text-navy/60 leading-relaxed mb-6">
                In the meantime, have a specific question about your project? The fastest way to get an expert answer is to call Alysha directly at{" "}
                <a href="tel:6035340115" className="text-brand-red font-semibold hover:underline">
                  (603) 534-0115
                </a>
                . She answers personally.
              </p>
            </div>

            {/* CTA block */}
            <div className="mt-10 bg-navy rounded-2xl p-8 text-center">
              <h3
                className="text-white text-2xl font-black mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to Transform Your Space?
              </h3>
              <p className="text-white/60 mb-6">Get a free estimate from Alysha — usually within 24 hours.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/#contact"
                  className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3 rounded-lg transition-all hover:scale-105"
                >
                  Book Your Free Quote
                </Link>
                <a
                  href="tel:6035340115"
                  className="border border-white/20 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-all"
                >
                  Call (603) 534-0115
                </a>
              </div>
            </div>
          </article>
        </div>
        <div className="pb-16" />
      </main>
      <Footer />
    </>
  );
}

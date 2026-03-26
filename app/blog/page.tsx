"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

const articles = [
  {
    slug: "best-paint-colors-2026",
    category: "Color Trends",
    title: "The 10 Best Interior Paint Colors for Southern NH Homes in 2026",
    excerpt:
      "From warm terracottas to moody blues — Alysha's picks for colors that photograph beautifully and live even better in New England light.",
    date: "March 20, 2026",
    readTime: "5 min read",
    color: "#E8221A",
    featured: true,
  },
  {
    slug: "prep-work-why-it-matters",
    category: "Pro Tips",
    title: "Why Prep Work Is 80% of a Perfect Paint Job",
    excerpt:
      "The secret to a flawless finish isn't the paint brand — it's what happens before the first drop goes on the wall. Here's what every homeowner should know.",
    date: "March 14, 2026",
    readTime: "4 min read",
    color: "#FF6B00",
    featured: true,
  },
  {
    slug: "cabinet-refinishing-vs-replacement",
    category: "Cabinet & Kitchen",
    title: "Cabinet Refinishing vs. Replacement: The Honest Cost Breakdown",
    excerpt:
      "New kitchen cabinets can cost $15,000–$40,000. Refinishing them can cost $1,500–$4,000. Here's exactly what you get — and what you give up — with each option.",
    date: "March 7, 2026",
    readTime: "6 min read",
    color: "#00A651",
    featured: false,
  },
  {
    slug: "exterior-paint-before-winter",
    category: "Exterior",
    title: "The Best Time to Exterior Paint in New Hampshire (And What to Avoid)",
    excerpt:
      "NH weather is no joke. Here's the precise temperature and humidity windows that guarantee your exterior paint adheres, cures, and lasts for years.",
    date: "February 28, 2026",
    readTime: "4 min read",
    color: "#1A3FA8",
    featured: false,
  },
  {
    slug: "drywall-damage-repair-guide",
    category: "Drywall",
    title: "How to Know When to Patch vs. Replace Drywall",
    excerpt:
      "Small cracks? Bigger holes? Water damage? Alysha walks you through exactly when a patch is enough — and when the whole panel needs to go.",
    date: "February 20, 2026",
    readTime: "5 min read",
    color: "#7B2D8B",
    featured: false,
  },
  {
    slug: "flip-property-paint-strategy",
    category: "For Investors",
    title: "The Paint Strategy That Sells Flip Properties 30% Faster",
    excerpt:
      "Colors, finishes, timelines, and budget hacks that experienced NH investors use to get show-ready results on tight renovation budgets.",
    date: "February 12, 2026",
    readTime: "7 min read",
    color: "#E8221A",
    featured: false,
  },
  {
    slug: "color-consultation-what-to-expect",
    category: "Color Tips",
    title: "What to Expect From a Professional Color Consultation",
    excerpt:
      "A color consultation isn't just picking swatches — it's about lighting analysis, undertone matching, and creating a flow through your whole home.",
    date: "February 5, 2026",
    readTime: "3 min read",
    color: "#FFD700",
    featured: false,
  },
  {
    slug: "wallpaper-removal-tips",
    category: "Pro Tips",
    title: "Wallpaper Removal: The Tools, Tricks, and Mistakes to Avoid",
    excerpt:
      "Removing old wallpaper is one of the most underestimated jobs in home improvement. Here's how we approach it at Xpertise without damaging the drywall.",
    date: "January 28, 2026",
    readTime: "5 min read",
    color: "#FF6B00",
    featured: false,
  },
];

const categories = ["All", "Color Trends", "Pro Tips", "Cabinet & Kitchen", "Exterior", "Drywall", "For Investors", "Color Tips"];

export default function BlogPage() {
  const featured = articles.filter((a) => a.featured);
  const regular = articles.filter((a) => !a.featured);

  return (
    <>
      <main className="min-h-screen" style={{ background: "#F8F7F5", paddingTop: "83px" }}>
        {/* Header */}
        <section className="bg-navy py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
              Resources & Inspiration
            </span>
            <h1
              className="text-white text-4xl lg:text-6xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              The Xpertise{" "}
              <span className="rainbow-shimmer">Color Blog</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Paint tips, color guides, project inspiration, and honest advice
              from Alysha Pillsbury and the Xpertise team in Southern NH.
            </p>
          </div>
        </section>

        {/* Category pills */}
        <section className="bg-white border-b border-gray-200 sticky top-[83px] z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    cat === "All"
                      ? "bg-navy text-white"
                      : "bg-light text-navy/60 hover:text-navy hover:bg-light-dark"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          {/* Featured grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-light-dark hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient thumbnail */}
                <div
                  className="h-56 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${post.color}30 0%, #1C2B3A 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-8xl font-black opacity-10"
                      style={{ fontFamily: "var(--font-display)", color: post.color }}
                    >
                      {post.category.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: post.color }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "var(--rainbow)" }} />
                </div>
                <div className="p-7">
                  <h2
                    className="text-navy text-xl font-bold mb-3 group-hover:text-brand-red transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-navy/60 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-navy/40 text-xs">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Article list */}
          <h2
            className="text-navy text-2xl font-black mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            All Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-xl overflow-hidden border border-light-dark hover:shadow-lg transition-all duration-300"
              >
                {/* Mini thumbnail */}
                <div
                  className="h-36 relative"
                  style={{
                    background: `linear-gradient(135deg, ${post.color}25 0%, #1C2B3A 100%)`,
                  }}
                >
                  <span
                    className="absolute top-4 left-4 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: post.color }}
                  >
                    {post.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `${post.color}60` }} />
                </div>
                <div className="p-5">
                  <h3
                    className="text-navy font-bold text-base mb-2 leading-snug group-hover:text-brand-red transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-navy/55 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-navy/35 text-xs">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-navy rounded-2xl px-8 py-12 text-center">
            <h3
              className="text-white text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get Painting Tips in Your Inbox
            </h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              New guides, color trend reports, and project inspiration — straight from Alysha.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/8 border border-white/15 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder:text-white/30 outline-none text-sm transition-colors"
              />
              <button
                type="submit"
                className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3 rounded-lg transition-all hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

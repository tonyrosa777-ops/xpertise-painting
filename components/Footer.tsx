"use client";

const footerLinks = {
  Services: [
    "Interior Painting",
    "Exterior Painting",
    "Drywall & Sheetrock",
    "Cabinet Refinishing",
    "Floor Work",
    "Renovation & Flips",
  ],
  "Service Areas": [
    "Nashua, NH",
    "Manchester, NH",
    "Concord, NH",
    "Bedford, NH",
    "Merrimack, NH",
    "Salem, NH",
  ],
  Company: [
    "About Alysha",
    "Our Process",
    "For Contractors",
    "Free Estimate",
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark border-t border-white/10">
      {/* Rainbow top accent */}
      <div className="h-[3px] w-full rainbow-bar" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-5">
              <div
                className="text-brand-red font-black text-2xl tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                XPERTISE
              </div>
              <div className="text-white font-bold text-xs tracking-[0.4em] -mt-1">
                PAINTING LLC
              </div>
              <div className="text-white/30 text-[9px] tracking-[0.25em] mt-1.5 uppercase">
                Infinite Shades, Infinite Smiles
              </div>
              <div className="rainbow-bar mt-3 max-w-[80px] rounded-full" style={{ height: "2px" }} />
            </div>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Southern NH&apos;s female-owned painting, drywall & finishing
              company. Personal accountability on every project — because
              Alysha puts her name on every wall.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="tel:6035340115"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">(603) 534-0115</span>
              </a>
              <a
                href="mailto:Xpertisepainting25@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="text-sm font-medium truncate">
                  Xpertisepainting25@gmail.com
                </span>
              </a>
              <div className="flex items-center gap-3 text-white/50">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="text-sm">Nashua, NH · Manchester · Concord</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/p/Xpertise-Painting-LLC-61574930433297/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all hover:bg-[#1877F2]/20"
                style={{ background: "rgba(255,255,255,0.06)" }}
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="mailto:Xpertisepainting25@gmail.com"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all hover:bg-brand-red/20"
                style={{ background: "rgba(255,255,255,0.06)" }}
                aria-label="Email us"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const map: Record<string, string> = {
                          "About Alysha": "#about",
                          "Our Process": "#process",
                          "For Contractors": "#contractors",
                          "Free Estimate": "#contact",
                        };
                        const href = map[link] || "#contact";
                        document
                          .querySelector(href)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-white/45 hover:text-white/80 text-sm transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {currentYear} Xpertise Painting LLC. All rights reserved. Nashua, NH.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">Licensed & Insured</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/20 text-xs">Female-Owned Business</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/20 text-xs">Southern NH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

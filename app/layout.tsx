import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xpertise Painting LLC | Infinite Shades, Infinite Smiles | Nashua, NH",
  description:
    "Southern NH's premier painting, drywall & finishing company. Female-owned. Interior & exterior painting, cabinets, drywall, floors, and renovation. Serving Nashua, Manchester, Concord, NH. Call Alysha: (603) 534-0115.",
  keywords:
    "painting contractor Nashua NH, interior painting Manchester NH, exterior painting Concord NH, drywall installation NH, cabinet refinishing NH, female owned painting company, Xpertise Painting",
  openGraph: {
    title: "Xpertise Painting LLC | Nashua, NH",
    description: "Infinite Shades, Infinite Smiles. Southern NH's premier painting & finishing service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.7.3/default/snipcart.css"
        />
      </head>
      <body>
        <Navigation />
        <SmoothScroll>{children}</SmoothScroll>
        {/* Snipcart config — hidden div in body */}
        <div
          id="snipcart"
          data-config-modal-style="side"
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY ?? "YOUR_SNIPCART_PUBLIC_KEY"}
          hidden
        />
        <Script
          src="https://cdn.snipcart.com/themes/v3.7.3/default/snipcart.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  badgeColor: string | null;
  icon: string;
  color: string;
  description: string;
  includes: string[];
  cta?: string;
  ctaHref?: string;
};

export const products: Product[] = [
  {
    id: "color-consult-60",
    name: "60-Min Color Consultation",
    price: 149,
    originalPrice: null,
    badge: "Most Popular",
    badgeColor: "#E8221A",
    icon: "🎨",
    color: "#E8221A",
    description:
      "Alysha visits your space, analyzes your lighting, and builds a complete color plan for every room. Includes paint brand recommendations, finish guide, and written summary.",
    includes: [
      "In-home visit (up to 60 min)",
      "Lighting & undertone analysis",
      "Full-home color plan PDF",
      "Product & finish recommendations",
      "Priority scheduling for paint work",
    ],
  },
  {
    id: "color-consult-30",
    name: "30-Min Virtual Consultation",
    price: 79,
    originalPrice: null,
    badge: null,
    badgeColor: null,
    icon: "💻",
    color: "#1A3FA8",
    description:
      "Not ready for an in-home visit? Share photos of your space and get Alysha's color recommendations over a live video call. Great for single rooms or quick decisions.",
    includes: [
      "30-min Zoom/FaceTime call",
      "Photo review before the call",
      "2–3 color option recommendations",
      "Follow-up summary email",
    ],
  },
  {
    id: "gift-card-100",
    name: "$100 Gift Card",
    price: 100,
    originalPrice: null,
    badge: "Gift Idea",
    badgeColor: "#00A651",
    icon: "🎁",
    color: "#00A651",
    description:
      "Give the gift of a freshly painted home. Valid toward any Xpertise Painting service — interior, exterior, cabinets, drywall, and more. No expiration.",
    includes: [
      "Digital delivery within 24 hours",
      "Valid for all services",
      "No expiration date",
      "Transferable",
    ],
  },
  {
    id: "gift-card-250",
    name: "$250 Gift Card",
    price: 250,
    originalPrice: null,
    badge: "Best Value",
    badgeColor: "#FF6B00",
    icon: "🎁",
    color: "#FF6B00",
    description:
      "The perfect housewarming or holiday gift. Covers a full room repaint or a professional color consultation plus most of a single-room project.",
    includes: [
      "Digital delivery within 24 hours",
      "Valid for all services",
      "No expiration date",
      "Transferable",
    ],
  },
  {
    id: "touch-up-kit",
    name: "Touch-Up Maintenance Plan",
    price: 199,
    originalPrice: 299,
    badge: "Seasonal Deal",
    badgeColor: "#7B2D8B",
    icon: "🖌️",
    color: "#7B2D8B",
    description:
      "Annual touch-up service for past Xpertise clients. We revisit your home once a year to fix scuffs, nicks, and small areas that need refreshing — keeping your paint looking perfect.",
    includes: [
      "1 annual visit (up to 2 hours)",
      "Touch-up paint included",
      "Priority scheduling",
      "Available to past clients only",
      "Renews each year",
    ],
  },
  {
    id: "project-package-bedroom",
    name: "Single Room Package",
    price: 0,
    originalPrice: null,
    badge: "Bundle & Save",
    badgeColor: "#E8221A",
    icon: "🏠",
    color: "#E8221A",
    description:
      "Bundle a color consultation + full room paint in one package and save $75 vs. booking separately. Perfect for homeowners redoing a master bedroom, living room, or home office.",
    includes: [
      "30-min color consultation included",
      "Full room prep & paint",
      "Ceilings & trim included",
      "2-coat application",
      "$75 off vs. separate booking",
    ],
    cta: "Call for Pricing",
    ctaHref: "tel:6035340115",
  },
];

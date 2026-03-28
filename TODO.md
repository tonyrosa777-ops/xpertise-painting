# Xpertise Painting LLC — Pre-Launch Checklist

Everything below needs to be done before the site goes live on a real domain. Items marked **BLOCKER** will break the site or checkout if skipped.

---

## 1. Accounts & Credentials

### Snipcart — Service Checkout (Consultations & Gift Cards)
- [ ] **BLOCKER** Create a Snipcart account at snipcart.com
- [ ] **BLOCKER** Add `NEXT_PUBLIC_SNIPCART_API_KEY` to Vercel environment variables
- [ ] Set the allowed domain in Snipcart dashboard to the live domain
- [ ] Test a full consultation checkout end-to-end (book → pay → confirm)

### Stripe — Merch Checkout
- [ ] **BLOCKER** Create a Stripe account at stripe.com
- [ ] **BLOCKER** Add `STRIPE_SECRET_KEY` to Vercel environment variables
- [ ] **BLOCKER** Register the webhook endpoint in the Stripe dashboard:
  - URL: `https://yourdomain.com/api/stripe/webhook`
  - Event: `checkout.session.completed`
- [ ] **BLOCKER** Add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables
- [ ] Test a full merch purchase end-to-end (add to cart → Stripe checkout → confirm)

### Printful — Merch Fulfillment
- [ ] **BLOCKER** Create a Printful account at printful.com
- [ ] Upload the Xpertise Painting logo (high-res PNG, transparent background, min 2000px wide)
- [ ] Create a Printful store and sync the following product types:
  - Unisex Zip Hoodie
  - Crop Hoodie
  - Classic Tee
  - Scented Soy Candle
  - Insulated Tumbler with Straw
  - Hardcover Notebook
  - Can Cooler
  - Black Glossy Mug
  - White Glossy Mug
  - Spiral Bound Journal
  - Strap Apron
  - Stainless Steel Water Bottle
  - Pennant Banner
  - Tote Bag
  - Backpack
  - Teddy Bear with T-Shirt
- [ ] Preview and approve mockups for each product
- [ ] Set retail prices in Printful for each product
- [ ] **BLOCKER** Add `PRINTFUL_API_KEY` to Vercel environment variables
- [ ] Update `lib/printful-seeded-products.json`:
  - Replace `"storeId": 0` with the real Printful store ID
  - Update each `"printful_id": 0` with the real sync product IDs
- [ ] Test that merch images load from Printful on the shop page

### Calendly — Booking Flow
- [ ] **BLOCKER** Create a Calendly account at calendly.com
- [ ] **BLOCKER** Confirm or create the event link at `calendly.com/xpertisepainting/consultation`
  - If the URL is different, update `CALENDLY_URL` in `components/EstimateForm.tsx` line 6
- [ ] Configure the Calendly event: duration, availability, buffer time, confirmation email
- [ ] Test the full booking flow from the estimate form (step 3 → "See Available Times")

---

## 2. Assets Needed from Alysha

- [ ] **BLOCKER** High-res logo file (PNG with transparent background, SVG preferred)
  - Used in: Navigation, Footer, Printful products
- [ ] Photo of Alysha on a job site or in work gear
  - Used in: About section (currently a placeholder gradient)
- [ ] Confirm the 15 gallery photos already uploaded are ones she's happy to use publicly
- [ ] Additional before/after project photos for the drag-to-reveal slider
  - Currently has 3 placeholder presets — ideally 3 real pairs (before + after)
- [ ] Confirmation that all 12 service areas listed are accurate:
  - Nashua, Manchester, Concord, Bedford, Merrimack, Milford, Amherst, Goffstown, Hooksett, Derry, Londonderry, Hudson

---

## 3. Content to Write or Confirm

### Blog Posts
The blog listing page shows 5 article titles, but individual posts show "coming soon." Options:
- [ ] Write full content for each article (ghostwritten from Alysha's knowledge), OR
- [ ] Remove blog from the navigation until content is ready

Article stubs that need content:
- [ ] "The 10 Best Interior Paint Colors for Southern NH Homes in 2026"
- [ ] "Why Prep Work Is 80% of a Perfect Paint Job"
- [ ] "Cabinet Refinishing vs. Replacement: The Honest Cost Breakdown"
- [ ] *(any remaining blog stubs on the listing page)*

### Testimonials
- [ ] Verify all testimonials shown are from real clients and have permission to publish
- [ ] Ideally add 2–3 more recent ones (Google or Facebook reviews → copy in)

### Pricing Page
- [ ] Review the contractor package pricing ($1,500 / $3,000 / $5,500) with Alysha
- [ ] Confirm this page is for the B2B / contractor leads angle, not residential

### Shop Trust Bar
- [ ] The shop page says "Same-day digital delivery on gift cards" — confirm this is Alysha's process

---

## 4. Domain & Hosting

- [ ] Purchase a custom domain (e.g., `xpertisepainting.com` or `xpertisepaintingllc.com`)
- [ ] Connect domain to Vercel project (Vercel → Settings → Domains)
- [ ] Update Snipcart allowed domain to match live domain
- [ ] Update Stripe webhook URL to match live domain
- [ ] Verify SSL is active on the custom domain

---

## 5. SEO & Discoverability

- [ ] Set up Google Business Profile for Xpertise Painting LLC
  - Add address, phone, hours, photos, service area
  - This is one of the highest-ROI things for a local service business
- [ ] Verify the site on Google Search Console (submit sitemap)
- [ ] Add Google Analytics or enable Vercel Analytics (one line in layout.tsx)
- [ ] Update the `openGraph.url` in `app/layout.tsx` once the real domain is known
- [ ] Add real `og:image` (a job site photo or logo card) for social sharing previews

---

## 6. Pre-Launch Testing

- [ ] Test all checkout flows on a real device (mobile + desktop):
  - [ ] Snipcart: Add a gift card → checkout → confirm
  - [ ] Snipcart: Book a consultation → checkout → confirm
  - [ ] Stripe merch: Add to cart → checkout → shipping address → pay → confirm
- [ ] Test the estimate form Calendly booking on mobile
- [ ] Test click-to-call on mobile (`tel:6035340115`)
- [ ] Run Lighthouse audit (Performance / Accessibility / SEO) — target 90+ on all
- [ ] Check all pages on iOS Safari and Chrome Android
- [ ] Verify Printful auto-fulfillment: place a $0 test order in Printful and confirm the webhook creates it

---

## 7. Nice-to-Have (Post-Launch Backlog)

- [ ] Google Reviews widget or embedded star rating on the homepage
- [ ] Local SEO service area pages (e.g., `/painting-nashua-nh`, `/painting-manchester-nh`)
- [ ] Automated follow-up email after Calendly booking (Calendly → email integration)
- [ ] Instagram feed embed (if Alysha is posting job photos there)
- [ ] SMS notification to Alysha when a Snipcart order is placed (Zapier or Snipcart webhook)
- [ ] Write full blog post content (AI-assisted drafts from her expertise)
- [ ] Add FAQ schema markup for SEO

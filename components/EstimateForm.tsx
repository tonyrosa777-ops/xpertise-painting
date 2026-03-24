"use client";

import { useState, useRef, useEffect } from "react";

const serviceTypes = [
  { label: "Interior Painting", icon: "🏠" },
  { label: "Exterior Painting", icon: "🏡" },
  { label: "Cabinet Refinishing", icon: "🪟" },
  { label: "Drywall / Sheetrock", icon: "🔨" },
  { label: "Floor Work", icon: "🪵" },
  { label: "Full Renovation", icon: "⭐" },
];

const timelines = [
  { label: "ASAP", sub: "I need it done quickly" },
  { label: "1–2 Months", sub: "Planning ahead" },
  { label: "3+ Months", sub: "Just exploring options" },
];

export default function EstimateForm() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const toggleService = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call (replace with actual form submission)
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const progress = (step / 3) * 100;

  return (
    <section id="contact" className="bg-navy-dark py-24 lg:py-32" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="text-brand-red font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
            Free Estimate
          </span>
          <h2
            className="text-white text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s Start Your Project
          </h2>
          <p className="text-white/60 text-lg">
            Takes 60 seconds. Alysha will reach out within 24 hours — often same
            day.
          </p>
        </div>

        {/* Form card */}
        <div
          className="bg-navy rounded-2xl border border-white/10 overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          {/* Progress bar */}
          {!submitted && (
            <div className="h-1 w-full bg-white/10">
              <div
                className="h-full rainbow-gradient transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="p-8 lg:p-10">
            {submitted ? (
              /* Success state */
              <div className="text-center py-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(0, 166, 81, 0.15)" }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00A651"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="text-white text-3xl font-black mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  You&apos;re All Set!
                </h3>
                <p className="text-white/60 mb-4 max-w-sm mx-auto">
                  Alysha will reach out to you within 24 hours — usually much
                  sooner. In the meantime, feel free to call directly.
                </p>
                <a
                  href="tel:6035340115"
                  className="inline-flex items-center gap-2 text-brand-red font-semibold hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  (603) 534-0115
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Service type */}
                {step === 1 && (
                  <div>
                    <div className="mb-2">
                      <span className="text-white/40 text-xs tracking-widest uppercase font-medium">
                        Step 1 of 3
                      </span>
                      <h3 className="text-white font-bold text-xl mt-1">
                        What type of work do you need?
                      </h3>
                      <p className="text-white/50 text-sm mt-1">
                        Select all that apply
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                      {serviceTypes.map((service) => {
                        const selected = selectedServices.includes(service.label);
                        return (
                          <button
                            key={service.label}
                            type="button"
                            onClick={() => toggleService(service.label)}
                            className="relative p-4 rounded-xl text-left transition-all duration-200"
                            style={{
                              background: selected
                                ? "rgba(232, 34, 26, 0.15)"
                                : "rgba(255,255,255,0.05)",
                              border: selected
                                ? "1.5px solid rgba(232, 34, 26, 0.6)"
                                : "1.5px solid rgba(255,255,255,0.1)",
                              transform: selected ? "scale(1.02)" : "scale(1)",
                            }}
                          >
                            <span className="text-2xl block mb-2">{service.icon}</span>
                            <span
                              className="text-sm font-medium"
                              style={{ color: selected ? "#E8221A" : "rgba(255,255,255,0.7)" }}
                            >
                              {service.label}
                            </span>
                            {selected && (
                              <div className="absolute top-2 right-2">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#E8221A"
                                  strokeWidth="2.5"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      disabled={selectedServices.length === 0}
                      onClick={() => setStep(2)}
                      className="w-full mt-6 bg-brand-red hover:bg-brand-red-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded transition-all hover:scale-[1.01]"
                    >
                      Continue
                      <svg
                        className="inline ml-2"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Step 2: Timeline */}
                {step === 2 && (
                  <div>
                    <div className="mb-2">
                      <span className="text-white/40 text-xs tracking-widest uppercase font-medium">
                        Step 2 of 3
                      </span>
                      <h3 className="text-white font-bold text-xl mt-1">
                        How soon do you need this done?
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3 mt-6">
                      {timelines.map((t) => {
                        const selected = timeline === t.label;
                        return (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => setTimeline(t.label)}
                            className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
                            style={{
                              background: selected
                                ? "rgba(232, 34, 26, 0.15)"
                                : "rgba(255,255,255,0.05)",
                              border: selected
                                ? "1.5px solid rgba(232, 34, 26, 0.6)"
                                : "1.5px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <div
                              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                              style={{
                                borderColor: selected ? "#E8221A" : "rgba(255,255,255,0.3)",
                              }}
                            >
                              {selected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                              )}
                            </div>
                            <div>
                              <div
                                className="font-semibold"
                                style={{
                                  color: selected ? "white" : "rgba(255,255,255,0.7)",
                                }}
                              >
                                {t.label}
                              </div>
                              <div className="text-white/40 text-sm">{t.sub}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-semibold py-3 rounded transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        disabled={!timeline}
                        onClick={() => setStep(3)}
                        className="flex-[2] bg-brand-red hover:bg-brand-red-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition-all"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact info */}
                {step === 3 && (
                  <div>
                    <div className="mb-2">
                      <span className="text-white/40 text-xs tracking-widest uppercase font-medium">
                        Step 3 of 3
                      </span>
                      <h3 className="text-white font-bold text-xl mt-1">
                        How can Alysha reach you?
                      </h3>
                      <p className="text-white/50 text-sm mt-1">
                        No spam. Just Alysha.
                      </p>
                    </div>

                    {/* Summary of selections */}
                    <div className="bg-white/5 rounded-xl px-4 py-3 mb-6 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-brand-red/20 text-brand-red px-2.5 py-1 rounded-full font-medium"
                          >
                            {s}
                          </span>
                        ))}
                        <span className="text-xs bg-white/10 text-white/50 px-2.5 py-1 rounded-full font-medium">
                          {timeline}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm font-medium block mb-1.5">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Jane"
                          className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm font-medium block mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="(603) 555-0000"
                          className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm font-medium block mb-1.5">
                          Email{" "}
                          <span className="text-white/30 font-normal">(optional)</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm font-medium block mb-1.5">
                          Tell us about your project{" "}
                          <span className="text-white/30 font-normal">(optional)</span>
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                          placeholder="3-bedroom home, need full interior repaint. Moving in 6 weeks..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors text-sm resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-semibold px-5 py-3 rounded transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || !form.name || !form.phone}
                        className="flex-1 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-semibold py-3 rounded transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <svg
                              className="animate-spin"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          "Send My Request"
                        )}
                      </button>
                    </div>

                    <p className="text-center text-white/25 text-xs mt-4">
                      No obligation · Response within 24 hours · Your info stays private
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Alternative contact */}
        <div
          className="text-center mt-8"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <p className="text-white/40 text-sm">
            Prefer to talk directly?
          </p>
          <a
            href="tel:6035340115"
            className="text-white hover:text-brand-red font-semibold text-lg transition-colors mt-1 block"
          >
            Call Alysha: (603) 534-0115
          </a>
          <a
            href="mailto:Xpertisepainting25@gmail.com"
            className="text-white/30 hover:text-white/60 text-sm transition-colors mt-1 block"
          >
            Xpertisepainting25@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

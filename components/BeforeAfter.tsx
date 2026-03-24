"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const projects = [
  {
    label: "Living Room — Nashua, NH",
    before: {
      bg: "linear-gradient(135deg, #8B7355 0%, #A08060 40%, #7A6548 100%)",
      label: "Before: Outdated beige walls, patchy drywall",
    },
    after: {
      bg: "linear-gradient(135deg, #1C2B3A 0%, #243547 50%, #1A3FA8 100%)",
      label: "After: Navy accent walls with crisp white trim",
    },
  },
  {
    label: "Kitchen Cabinets — Manchester, NH",
    before: {
      bg: "linear-gradient(135deg, #C4A882 0%, #B89A6A 100%)",
      label: "Before: Worn oak cabinets, dated hardware",
    },
    after: {
      bg: "linear-gradient(135deg, #2D3748 0%, #1A202C 100%)",
      label: "After: Matte charcoal spray finish, modern look",
    },
  },
  {
    label: "Exterior — Concord, NH",
    before: {
      bg: "linear-gradient(135deg, #9E8B73 0%, #A89478 100%)",
      label: "Before: Peeling paint, weathered siding",
    },
    after: {
      bg: "linear-gradient(135deg, #2C3E50 0%, #3D5A80 100%)",
      label: "After: Fresh coat, sealed trim, curb appeal restored",
    },
  },
];

function BeforeAfterSlider({ project }: { project: (typeof projects)[0] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const getPercent = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging.current) return;
      setPos(getPercent(e.clientX));
    },
    [getPercent]
  );

  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onTouchStart = () => {
    dragging.current = true;
  };

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!dragging.current) return;
      setPos(getPercent(e.touches[0].clientX));
    },
    [getPercent]
  );

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  return (
    <div className="relative">
      {/* Project label */}
      <div className="text-center mb-4">
        <span className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium">
          {project.label}
        </span>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden select-none"
        style={{ height: "320px", cursor: "col-resize" }}
      >
        {/* BEFORE */}
        <div
          className="absolute inset-0"
          style={{ background: project.before.bg }}
        >
          {/* Room mockup elements */}
          <div className="absolute inset-0 flex items-end p-6">
            <div className="bg-black/40 backdrop-blur-sm rounded px-3 py-1.5">
              <span className="text-white/80 text-xs font-medium">BEFORE</span>
            </div>
          </div>
          {/* Fake room silhouette */}
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 w-full h-full opacity-20"
            preserveAspectRatio="none"
          >
            <rect x="20" y="180" width="80" height="120" fill="white" />
            <rect x="120" y="200" width="60" height="100" fill="white" />
            <rect x="0" y="290" width="400" height="10" fill="white" />
            <rect x="280" y="100" width="120" height="80" rx="4" fill="white" />
          </svg>
        </div>

        {/* AFTER (clipped) */}
        <div
          className="absolute inset-0"
          style={{
            background: project.after.bg,
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
          }}
        >
          <div className="absolute inset-0 flex items-end p-6">
            <div
              className="bg-black/40 backdrop-blur-sm rounded px-3 py-1.5"
              style={{ marginLeft: "auto" }}
            >
              <span className="text-white/80 text-xs font-medium">AFTER</span>
            </div>
          </div>
          {/* Painted room silhouette */}
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 w-full h-full opacity-20"
            preserveAspectRatio="none"
          >
            <rect x="20" y="180" width="80" height="120" fill="white" />
            <rect x="120" y="200" width="60" height="100" fill="white" />
            <rect x="0" y="290" width="400" height="10" fill="white" />
            <rect x="280" y="100" width="120" height="80" rx="4" fill="white" />
            {/* Paint sheen effect */}
            <rect x="0" y="0" width="400" height="300" fill="url(#sheen)" opacity="0.15" />
          </svg>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
          style={{ left: `${pos}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <div className="w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center cursor-col-resize border-2 border-white/80">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1C2B3A"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="translate(6,0)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-3 px-1">
        <p className="text-white/40 text-xs">{project.before.label}</p>
        <p className="text-white/40 text-xs text-right">{project.after.label}</p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [activeProject, setActiveProject] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="bg-navy py-24 lg:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
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
            Our Work
          </span>
          <h2
            className="text-white text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            See the Transformation
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            &ldquo;Major transformation — it&apos;s amazing what a little paint
            will do.&rdquo; Drag the slider to reveal the difference.
          </p>
        </div>

        {/* Project selector */}
        <div
          className="flex gap-3 justify-center mb-8 flex-wrap"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {projects.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveProject(i)}
              className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background:
                  activeProject === i
                    ? "linear-gradient(90deg, #E8221A, #7B2D8B)"
                    : "rgba(255,255,255,0.1)",
                color: activeProject === i ? "white" : "rgba(255,255,255,0.5)",
                border:
                  activeProject === i
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {p.label.split(" — ")[0]}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <BeforeAfterSlider project={projects[activeProject]} />
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <p className="text-white/50 text-sm mb-4">
            Ready to transform your space?
          </p>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-8 py-3.5 rounded transition-all hover:scale-105 active:scale-95"
          >
            Get My Free Estimate
          </button>
        </div>
      </div>
    </section>
  );
}

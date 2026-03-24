"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const COLORS = [
  "#E8221A",
  "#FF6B00",
  "#FFD700",
  "#00A651",
  "#1A3FA8",
  "#7B2D8B",
];

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  initialRotation: number;
};

function generateSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 96 + 2,
    y: Math.random() * 92 + 2,
    size: Math.random() * 16 + 5, // 5–21px — more small ones for density
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 5,            // tighter stagger window
    duration: Math.random() * 1.2 + 1.2, // 1.2–2.4s per cycle (faster)
    initialRotation: Math.random() * 60 - 30,
  }));
}

export default function SparkleField({ count = 32 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Populate only on client to avoid hydration mismatch
  useEffect(() => {
    setSparkles(generateSparkles(count));
  }, [count]);

  useGSAP(
    () => {
      if (!sparkles.length || !containerRef.current) return;

      const elements =
        containerRef.current.querySelectorAll<SVGSVGElement>(".xp-sparkle");

      elements.forEach((el, i) => {
        const sp = sparkles[i];
        if (!sp) return;

        // Start invisible
        gsap.set(el, { opacity: 0, scale: 0, transformOrigin: "center" });

        // Infinite loop: burst in → twinkle → fade out → long pause
        gsap.timeline({ repeat: -1, delay: sp.delay })
          .to(el, {
            opacity: 1,
            scale: 1,
            rotation: sp.initialRotation,
            duration: sp.duration * 0.25,
            ease: "back.out(3)",
          })
          .to(el, {
            opacity: 0.5,
            scale: 0.85,
            duration: sp.duration * 0.2,
            ease: "sine.inOut",
          })
          .to(el, {
            opacity: 1,
            scale: 1.15,
            duration: sp.duration * 0.2,
            ease: "sine.inOut",
          })
          .to(el, {
            opacity: 0,
            scale: 0,
            rotation: sp.initialRotation + 45,
            duration: sp.duration * 0.25,
            ease: "power2.in",
          })
          // Short rest before repeating
          .to(el, {
            duration: sp.duration * (0.3 + Math.random() * 0.5),
            opacity: 0,
          });
      });
    },
    { dependencies: [sparkles], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {sparkles.map((sp) => (
        <svg
          key={sp.id}
          className="xp-sparkle absolute"
          width={sp.size}
          height={sp.size}
          viewBox="-12 -12 24 24"
          style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
        >
          {/* Classic 4-pointed sparkle star */}
          <path
            d="M0,-11 L1.8,-1.8 L11,0 L1.8,1.8 L0,11 L-1.8,1.8 L-11,0 L-1.8,-1.8 Z"
            fill={sp.color}
            opacity={0.85}
          />
          {/* Tiny center dot for depth */}
          <circle r="1.5" fill="white" opacity={0.6} />
        </svg>
      ))}
    </div>
  );
}

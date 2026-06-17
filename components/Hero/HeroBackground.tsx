"use client";

/* ────────────────────────────────────────────────────────────────────
   HeroBackground — four layered depth passes:

   1  Warm ivory base         (body background-color)
   2  Faint editorial grid    (repeating linear-gradient, 2% opacity)
   3  Soft radial glow        (top-right, #DCC7B1 at 8%)
   4  Hidden story fragments  (scattered labels, 5% opacity)
   5  Paper grain             (SVG fractalNoise, 2.5% opacity)
──────────────────────────────────────────────────────────────────── */

const FRAGMENTS = [
  { label: "Auckland · NZ",      style: { top: "16%",    left: "66%" } },
  { label: "Portraits",          style: { top: "38%",    right: "9%" } },
  { label: "Quiet Moments",      style: { top: "58%",    left: "72%" } },
  { label: "Community Stories",  style: { bottom: "28%", right: "14%" } },
  { label: "Everyday Life",      style: { bottom: "18%", left: "58%" } },
  { label: "2025",               style: { top: "12%",    right: "28%" } },
  { label: "Real People",        style: { top: "72%",    left: "62%" } },
  { label: "Real Stories",       style: { top: "46%",    right: "32%" } },
] as const;

export default function HeroBackground() {
  return (
    <>
      {/* Layer 2 grid lines removed to match clean template background */}

      {/* Layer 3 — top-right warm golden radial glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          top: "-30%",
          right: "-20%",
          width: "80%",
          height: "90%",
          background:
            "radial-gradient(ellipse at center, rgba(169, 142, 100, 0.22) 0%, rgba(169, 142, 100, 0.04) 45%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      {/* Layer 4 placeholder fragments removed to prevent overlap with HeroSection layouts */}

      {/* Layer 5 — paper grain (softened opacity) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />
    </>
  );
}

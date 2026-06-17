"use client";

import { motion } from "framer-motion";
import HeroNavbar from "./HeroNavbar";
import HeroContent from "./HeroContent";
import HeroBackground from "./HeroBackground";

interface FragmentItem {
  lines: string[];
  style: React.CSSProperties;
  delay: number;
}

const FRAGMENTS: FragmentItem[] = [
  {
    lines: ["Auckland, NZ", "2024"],
    style: { top: "20dvh", left: "48vw" },
    delay: 0.75,
  },
  {
    lines: ["Quiet", "Moments"],
    style: { top: "28dvh", left: "76vw" },
    delay: 0.85,
  },
  {
    lines: ["Community", "Stories"],
    style: { top: "45dvh", left: "72vw" },
    delay: 0.95,
  },
  {
    lines: ["Everyday", "Life"],
    style: { top: "68dvh", left: "76vw" },
    delay: 1.05,
  },
  {
    lines: ["Portraits"],
    style: { top: "74dvh", left: "57vw" },
    delay: 1.15,
  },
  {
    lines: ["Real People.", "Real Stories."],
    style: { top: "88dvh", left: "48vw" },
    delay: 1.25,
  },
];

export default function HeroSection() {
  return (
    <div className="relative min-h-fit lg:min-h-screen flex flex-col justify-between overflow-x-hidden bg-[var(--color-bg)] selection:bg-[var(--color-accent)] selection:text-[var(--color-text)]">
      {/* ── Background Layered Depth System ── */}
      <HeroBackground />

      {/* ── Top Navigation (Horizontal Inline) ── */}
      <HeroNavbar />

      {/* ── Center: Main Content & Left Column ── */}
      <main className="flex-1 flex flex-col justify-center hero-px py-6 md:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Side Content Column (takes ~60% width on desktop) */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center">
            
            {/* Headline + Description */}
            <HeroContent />
            
            {/* Metadata & Underlined CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(32px, 6vw, 4rem)",
                marginTop: "clamp(24px, 5vw, 3.5rem)",
              }}
            >
              {/* Based in NZ & Portraits List with tighter, clean gap */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }} className="select-none">
                <div className="flex items-center gap-2" style={{ color: "var(--color-gold)" }}>
                  {/* Pin SVG */}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--color-gold)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.24em]" style={{ color: "var(--color-gold)" }}>
                    Based in New Zealand
                  </span>
                </div>
                
                <div className="font-sans text-[0.62rem] uppercase tracking-[0.26em] flex flex-wrap gap-x-3 gap-y-1" style={{ color: "var(--color-sub)" }}>
                  <span>Portraits</span>
                  <span>&bull;</span>
                  <span>Events</span>
                  <span>&bull;</span>
                  <span>Lifestyle</span>
                  <span>&bull;</span>
                  <span>Community</span>
                </div>
              </div>

              {/* Explore stories CTA link (with prominent solid gold underline and optimized vertical spacing) */}
              <div>
                <a
                  href="#stories"
                  id="explore-stories-cta"
                  className="group inline-flex flex-col w-full max-w-[280px] sm:max-w-[320px] focus-visible:outline-2 focus-visible:outline-[var(--color-neutral)] focus-visible:outline-offset-4"
                  aria-label="Explore Jose Vincent's stories"
                >
                  <div className="flex items-center justify-between pb-3">
                    <span className="font-sans font-medium text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-text)]">
                      Explore the stories
                    </span>
                    <span className="text-base text-[var(--color-text)] transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                      &rarr;
                    </span>
                  </div>
                  <div className="w-full" style={{ height: "1.5px", backgroundColor: "var(--color-gold)" }} />
                </a>
              </div>

            </motion.div>
          </div>

          {/* Right Side Column (empty spacer for desktop positioning of fragments) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4" />

        </div>
      </main>

      {/* ── Middle/Right Panel: Scattered Note Fragments (Desktop Only) ── */}
      {FRAGMENTS.map((frag, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: frag.delay, duration: 1.5 }}
          className="absolute hidden lg:flex flex-col items-start select-none font-sans z-10 pointer-events-none"
          style={frag.style}
        >
          {frag.lines.map((line, lIdx) => (
            <span
              key={lIdx}
              className="text-[0.62rem] font-light tracking-[0.18em] text-[var(--color-neutral)] uppercase leading-[1.6]"
            >
              {line}
            </span>
          ))}
          <span className="text-[0.62rem] font-light text-[var(--color-neutral)] opacity-50 mt-1">
            —
          </span>
        </motion.div>
      ))}

      {/* ── Far Right Column: Star & Vertical Scroll Text ── */}
      <div className="absolute right-12 top-0 bottom-0 hidden lg:flex flex-col items-center justify-center pointer-events-none select-none z-10" style={{ width: "24px" }}>
        
        {/* Elegant 4-point star icon in gold (kept as a minimal accent) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.2 }}
          style={{ color: "var(--color-gold)", fontSize: "1.1rem" }}
        >
          ✦
        </motion.div>
        
        {/* Scroll text aligned at the bottom right in bold black */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="absolute bottom-16 flex flex-col items-center"
        >
          <span
            className="font-sans font-bold uppercase"
            style={{
              color: "var(--color-text)",
              fontSize: "0.62rem",
              letterSpacing: "0.34em",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            Scroll to begin
          </span>
        </motion.div>
      </div>

    </div>
  );
}

"use client";

import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────
   Framer Motion variants
   ─────────────────────────────────────────────────────────────────── */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.55 },
  },
};

const lineReveal = {
  hidden:  { y: "108%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.35,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

/* ────────────────────────────────────────────────────────────────────
   Headline — three lines revealed independently
   ─────────────────────────────────────────────────────────────────── */
const HEADLINE = [
  "Capturing stories",
  "through people,",
  "places and moments.",
] as const;

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ maxWidth: "860px" }}
    >
      {/* ── Label ──────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col items-start gap-2.5"
        style={{ marginBottom: "clamp(20px, 4vw, 36px)" }}
      >
        <span
          className="font-sans font-bold uppercase"
          style={{
            fontSize: "0.66rem",
            letterSpacing: "0.28em",
            color: "var(--color-gold)",
            display: "inline-block",
          }}
        >
          Photographer &bull; Storyteller
        </span>
        {/* Short underline (approx 25–35% of label width) in subtle warm gold */}
        <div
          aria-hidden="true"
          style={{
            height: "1.5px",
            width: "38px",
            backgroundColor: "var(--color-gold)",
            opacity: 0.75,
          }}
        />
      </motion.div>

      {/* ── Headline ───────────────────────────────────────────────── */}
      <h1
        aria-label="Capturing stories through people, places and moments."
        style={{ marginBottom: "clamp(28px, 3vw, 44px)" }}
      >
        {HEADLINE.map((line, i) => (
          <span
            key={i}
            className="line-clip"
            aria-hidden="true"
          >
            <motion.span
              variants={lineReveal}
              className="block font-serif font-normal text-[var(--color-text)]"
              style={{
                fontSize: "clamp(2.0rem, 5.2vw, 4.8rem)",
                lineHeight: "0.95",
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      
    </motion.div>
  );
}

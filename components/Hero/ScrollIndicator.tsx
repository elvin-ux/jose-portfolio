"use client";

import { motion } from "framer-motion";

/**
 * ScrollIndicator — desktop only, pinned bottom-left of the left panel.
 * Infinite animated terracotta fill on a sand track.
 */
export default function ScrollIndicator() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-10 left-12 xl:left-16 flex flex-col items-center gap-3 pointer-events-none"
    >
      {/* "Scroll" — vertical text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.9 }}
        className="font-sans font-light uppercase text-[var(--color-sand)]"
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.22em",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
      >
        Scroll
      </motion.span>

      {/* Animated line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 0.8 }}
        className="relative overflow-hidden"
        style={{ width: "1px", height: "44px" }}
      >
        {/* Track */}
        <div className="absolute inset-0 bg-[var(--color-sand)] opacity-25" />

        {/* Fill — infinite loop */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-[var(--color-terracotta)]"
          animate={{
            top:    ["0%",   "100%"],
            height: ["0%", "100%", "0%"],
          }}
          transition={{
            duration:   1.9,
            repeat:     Infinity,
            ease:       "easeInOut",
            times:      [0, 0.55, 1],
          }}
        />
      </motion.div>
    </div>
  );
}

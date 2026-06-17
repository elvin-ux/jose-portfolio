"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

type CursorState = "default" | "view-story" | "drag";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const isTouch = useRef(false);

  // GSAP quickTo setters — created once, reused on every mousemove
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const dotQuickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const dotQuickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    // Detect touch — disable cursor entirely on touch devices
    isTouch.current =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      "ontouchstart" in window;

    if (isTouch.current) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Initialize GSAP quickTo for buttery smooth cursor movement
    quickX.current = gsap.quickTo(cursor, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(cursor, "y", {
      duration: 0.55,
      ease: "power3.out",
    });
    dotQuickX.current = gsap.quickTo(dot, "x", {
      duration: 0.15,
      ease: "power3.out",
    });
    dotQuickY.current = gsap.quickTo(dot, "y", {
      duration: 0.15,
      ease: "power3.out",
    });

    function onMouseMove(e: MouseEvent) {
      quickX.current?.(e.clientX);
      quickY.current?.(e.clientY);
      dotQuickX.current?.(e.clientX);
      dotQuickY.current?.(e.clientY);

      if (!visible) setVisible(true);
    }

    function onMouseLeave() {
      setVisible(false);
    }
    function onMouseEnter() {
      setVisible(true);
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [visible]);

  const enterStory = useCallback(() => setCursorState("view-story"), []);
  const leaveStory = useCallback(() => setCursorState("default"), []);

  // Expose enter/leave handlers for other components via data attributes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: CustomEvent) => {
      if (e.detail === "view-story") enterStory();
      else leaveStory();
    };
    window.addEventListener("cursor-state" as any, handler as EventListener);
    return () =>
      window.removeEventListener(
        "cursor-state" as any,
        handler as EventListener
      );
  }, [enterStory, leaveStory]);

  const isExpanded = cursorState === "view-story";

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          mixBlendMode: "multiply",
        }}
      >
        <motion.div
          animate={{
            width: isExpanded ? 90 : 32,
            height: isExpanded ? 90 : 32,
            borderColor: isExpanded
              ? "rgba(215,192,168,0.8)"
              : "rgba(63,54,47,0.4)",
            backgroundColor: isExpanded
              ? "rgba(245,238,229,0.12)"
              : "rgba(245,238,229,0)",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-full border flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                key="view-story"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="
                  font-sans font-light uppercase tracking-[0.12em]
                  text-[var(--color-espresso)]
                  text-center leading-tight
                "
                style={{ fontSize: "0.5rem" }}
              >
                View<br />Story
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Precise dot — follows cursor more tightly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          opacity: visible && !isExpanded ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <div
          className="w-[5px] h-[5px] rounded-full bg-[var(--color-terracotta)]"
        />
      </div>
    </>
  );
}

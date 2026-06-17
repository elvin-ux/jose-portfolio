"use client";

import { useEffect, useRef } from "react";
import { runScrollReveal } from "@/animations/heroReveal";

/**
 * useScrollReveal — registers GSAP ScrollTrigger on provided elements.
 * Animates opacity 0→1 + translateY 40px→0 as elements enter viewport.
 */
export function useScrollReveal(
  refs: React.RefObject<HTMLElement | null>[],
  enabled = true
) {
  const triggered = useRef(false);

  useEffect(() => {
    if (!enabled || triggered.current) return;

    const elements = refs
      .map((r) => r.current)
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    triggered.current = true;
    runScrollReveal(elements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

"use client";

import { useEffect, useRef } from "react";
import { initHeroParallax, type ParallaxTarget } from "@/animations/heroParallax";

/**
 * useMouseParallax — attaches GSAP mouse-driven parallax to provided refs.
 *
 * Uses requestAnimationFrame internally via GSAP quickTo.
 * No React state updates → zero re-renders → 60fps guaranteed.
 *
 * @param targets — array of { ref, strengthX, strengthY }
 * @param enabled — disable on mobile/touch automatically
 */
export function useMouseParallax(
  targets: { ref: React.RefObject<HTMLElement | null>; strengthX: number; strengthY: number }[],
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    // Disable on touch devices
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const resolved: ParallaxTarget[] = targets
      .filter(({ ref }) => ref.current !== null)
      .map(({ ref, strengthX, strengthY }) => ({
        element: ref.current as HTMLElement,
        strengthX,
        strengthY,
      }));

    if (resolved.length === 0) return;

    const cleanup = initHeroParallax(resolved);
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

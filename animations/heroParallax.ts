import { gsap } from "gsap";

export interface ParallaxTarget {
  element: HTMLElement;
  strengthX: number;
  strengthY: number;
}

/**
 * Mouse-driven parallax using GSAP quickTo for buttery smooth movement.
 * Uses requestAnimationFrame internally via GSAP ticker.
 * Zero React re-renders — purely imperative DOM manipulation.
 */
export function initHeroParallax(targets: ParallaxTarget[]): () => void {
  const setters = targets.map(({ element, strengthX, strengthY }) => ({
    x: gsap.quickTo(element, "x", { duration: 1.2, ease: "power2.out" }),
    y: gsap.quickTo(element, "y", { duration: 1.2, ease: "power2.out" }),
    strengthX,
    strengthY,
  }));

  let halfW = window.innerWidth / 2;
  let halfH = window.innerHeight / 2;

  function handleMouseMove(e: MouseEvent) {
    const dx = (e.clientX - halfW) / halfW; // –1 to 1
    const dy = (e.clientY - halfH) / halfH; // –1 to 1

    setters.forEach(({ x, y, strengthX, strengthY }) => {
      x(dx * strengthX);
      y(dy * strengthY);
    });
  }

  function handleResize() {
    halfW = window.innerWidth / 2;
    halfH = window.innerHeight / 2;
  }

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", handleResize);

    // Reset positions
    targets.forEach(({ element }) => {
      gsap.set(element, { x: 0, y: 0 });
    });
  };
}

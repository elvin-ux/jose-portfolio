import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface HeroRevealOptions {
  imageWrapper: HTMLElement;
  duration?: number;
  ease?: string;
}

/**
 * Cinematic hero image reveal.
 * Scales the image from 1.08 → 1.0 over 2.5 seconds.
 * No opacity change — image is always visible, just slightly zoomed.
 */
export function runHeroReveal({
  imageWrapper,
  duration = 2.5,
  ease = "power3.out",
}: HeroRevealOptions): gsap.core.Tween {
  gsap.set(imageWrapper, { scale: 1.08, transformOrigin: "center center" });

  return gsap.to(imageWrapper, {
    scale: 1,
    duration,
    ease,
    clearProps: "scale",
  });
}

/**
 * Navigation fade-in — stagger each nav item sequentially.
 */
export function runNavReveal(
  items: (HTMLElement | null)[],
  delay = 0.6
): gsap.core.Tween {
  const valid = items.filter(Boolean) as HTMLElement[];
  gsap.set(valid, { opacity: 0, y: -8 });

  return gsap.to(valid, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.08,
    delay,
  });
}

/**
 * Scroll-triggered section reveal.
 * Elements animate from opacity 0, translateY 40px → visible.
 */
export function runScrollReveal(elements: HTMLElement[]): void {
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

/**
 * Image hover scale effect — 1 → 1.03 over 0.5s.
 */
export function applyImageHoverEffect(imageEl: HTMLElement): void {
  const enter = () =>
    gsap.to(imageEl, { scale: 1.03, duration: 0.5, ease: "power2.out" });
  const leave = () =>
    gsap.to(imageEl, { scale: 1, duration: 0.6, ease: "power2.inOut" });

  imageEl.addEventListener("mouseenter", enter);
  imageEl.addEventListener("mouseleave", leave);
}

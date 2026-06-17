"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { runHeroReveal, applyImageHoverEffect } from "@/animations/heroReveal";
import { useMouseParallax } from "@/hooks/useMouseParallax";

interface HeroImageProps {
  src: string;
  alt: string;
  variant: "mobile" | "desktop";
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

export default function HeroImage({
  src,
  alt,
  variant,
  onCursorEnter,
  onCursorLeave,
}: HeroImageProps) {
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  /* ── Cinematic reveal: scale 1.08 → 1.00, 2.5s ──────────────────── */
  useEffect(() => {
    if (!imageInnerRef.current) return;
    const tween = runHeroReveal({ imageWrapper: imageInnerRef.current });

    if (variant === "desktop" && imageInnerRef.current) {
      applyImageHoverEffect(imageInnerRef.current);
    }

    return () => { tween.kill(); };
  }, [variant]);

  /* ── Wrapper opacity reveal ──────────────────────────────────────── */
  useEffect(() => {
    if (!wrapperRef.current) return;
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  /* ── Mouse parallax — desktop only, 4px max ──────────────────────── */
  useMouseParallax(
    [{ ref: imageInnerRef, strengthX: 4, strengthY: 4 }],
    variant === "desktop"
  );

  /*
   * objectPosition — critical for this specific portrait photograph:
   *
   * The photo shows a child from above, looking slightly down,
   * with bubbles floating at upper-right and the child's hands
   * outstretched in the lower portion.
   *
   * Desktop (full height panel, ~60% width):
   *   Aim for the face to be in the upper-center of the frame.
   *   "center 15%" anchors face near top-third, preserving bubbles.
   *
   * Mobile (60svh clip, full width):
   *   Slightly lower to keep face + hands + bubbles all visible.
   *   "center 20%" gives a good portrait composition.
   */
  const objectPosition =
    variant === "desktop" ? "center 12%" : "center 20%";

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full opacity-0"
      style={{ willChange: "transform" }}
    >
      <div
        ref={imageInnerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ willChange: "transform" }}
        onMouseEnter={onCursorEnter}
        onMouseLeave={onCursorLeave}
        role="img"
        aria-label={alt}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          quality={92}
          sizes={
            variant === "mobile"
              ? "100vw"
              : "(min-width: 1280px) 62vw, 60vw"
          }
          style={{
            objectFit: "cover",
            objectPosition,
          }}
        />

        {/*
         * Minimal warm vignette — barely visible, just adds depth.
         * Does NOT darken the child or bubbles.
         * Radial gradient anchored top-left (where background is bright).
         */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, transparent 50%, rgba(63,54,47,0.05) 100%)",
          }}
        />
      </div>

      {/* Photo credit — desktop only */}
      {variant === "desktop" && (
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-6 font-sans text-[var(--color-ivory)] uppercase tracking-[0.18em] opacity-35 mix-blend-overlay pointer-events-none"
          style={{ fontSize: "0.55rem" }}
        >
          © Jose Vincent
        </div>
      )}
    </div>
  );
}

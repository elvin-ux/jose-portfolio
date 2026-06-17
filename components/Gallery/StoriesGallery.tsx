"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { STORIES } from "@/data/stories";
import StoryCard from "./StoryCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/**
 * StoriesGallery — "Stories Collected Along The Way"
 * ─────────────────────────────────────────────────────────────────────
 * Phase 2: Cinematic storytelling reveal system.
 *
 * Architecture:
 * 1. Each card (except Card 1) has an independent ScrollTrigger.
 * 2. On enter: 3-step staggered reveal — card body → metadata → caption.
 * 3. On leave-back (scroll up): smooth reverse to hidden state.
 * 4. Trajectory dot system is preserved and wired to drive reveals
 *    as a parallel trigger (dot arrival calls revealCard).
 * 5. No hover lifts, no active jump effects — calm and editorial.
 */
// Path segment data — includes computed endpoint geometry for the arrowhead
interface PathData {
  d: string;       // full cubic bezier string
  endX: number;   // destination x (card 2 center)
  endY: number;   // destination y
  angle: number;  // tangent angle at endpoint, in degrees (from cp2 → end)
}

export default function StoriesGallery() {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRef = useRef<SVGCircleElement | null>(null);

  // Refs for trajectory SVG elements
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const maskPathRefs = useRef<(SVGPathElement | null)[]>([]);

  // Safety fallback: calculate paths after 3 seconds even if images fail to load
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setLoadedCount((prev) => {
      const next = prev + 1;
      if (next >= STORIES.length) {
        setImagesLoaded(true);
      }
      return next;
    });
  };

  // ─── Path calculation ──────────────────────────────────────────────────────
  const calculatePaths = () => {
    if (!sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const newPaths: PathData[] = [];
    const isMobile = window.innerWidth <= 640;

    for (let i = 0; i < STORIES.length - 1; i++) {
      const row1 = cardRefs.current[i];
      const row2 = cardRefs.current[i + 1];
      if (!row1 || !row2) continue;

      const card1 = row1.querySelector(".story-card");
      const card2 = row2.querySelector(".story-card");
      if (!card1 || !card2) continue;

      const rect1 = card1.getBoundingClientRect();
      const rect2 = card2.getBoundingClientRect();

      const x1 = rect1.left - sectionRect.left + rect1.width / 2;
      const y1 = rect1.top - sectionRect.top + rect1.height / 2;
      const x2 = rect2.left - sectionRect.left + rect2.width / 2;
      const y2 = rect2.top - sectionRect.top + rect2.height / 2;

      const dx = x2 - x1;
      const dy = y2 - y1;

      let cp1x, cp1y, cp2x, cp2y;

      if (isMobile) {
        // Alternating wide swing for drama on mobile stacked layout
        const swing = (i % 2 === 0 ? 1 : -1) * 220;
        cp1x = x1 + swing;
        cp1y = y1 + dy * 0.3;
        cp2x = x2 + swing;
        cp2y = y2 - dy * 0.3;
      } else {
        // Deep S-curve between left/right lanes
        const pullX = dx * 1.1;
        const pullY = dy * 0.45;
        cp1x = x1 + pullX;
        cp1y = y1 + pullY;
        cp2x = x2 - pullX;
        cp2y = y2 - pullY;
      }

      // Tangent at end of cubic bezier = direction from cp2 to endpoint
      const angle = Math.atan2(y2 - cp2y, x2 - cp2x) * (180 / Math.PI);

      newPaths.push({
        d: `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`,
        endX: x2,
        endY: y2,
        angle,
      });
    }
    setPaths(newPaths);
  };

  useEffect(() => {
    if (!imagesLoaded) return;
    calculatePaths();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        calculatePaths();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [imagesLoaded]);

  // ─── Animation system ──────────────────────────────────────────────────────
  useEffect(() => {
    if (paths.length === 0) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 640;
      const isTablet = window.innerWidth > 640 && window.innerWidth <= 1024;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Responsive translateY distances
      const revealY = isMobile ? 40 : isTablet ? 60 : 80;
      const reverseY = isMobile ? 30 : isTablet ? 45 : 60;

      // ── Reduced motion: show everything immediately ──────────────────────
      if (prefersReducedMotion) {
        STORIES.forEach((story, idx) => {
          const row = cardRefs.current[idx];
          const card = row?.querySelector(".story-card");
          const metaTop = row?.querySelector(".story-card__meta-top");
          const caption = row?.querySelector(".story-card__caption");
          if (card) {
            gsap.set(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              rotation: story.rotate,
              pointerEvents: "auto",
            });
            card.classList.add("visible");
          }
          if (metaTop) gsap.set(metaTop, { opacity: 1, y: 0 });
          if (caption) gsap.set(caption, { opacity: 1, y: 0 });
        });
        // Show trajectory paths immediately
        maskPathRefs.current.forEach((mp) => {
          if (mp) gsap.set(mp, { strokeDashoffset: 0 });
        });
        if (dotRef.current) gsap.set(dotRef.current, { opacity: 0 });
        return;
      }

      // ── Set Card 1 as fully visible from mount ───────────────────────────
      const firstRow = cardRefs.current[0];
      const firstCard = firstRow?.querySelector(".story-card");
      const firstMetaTop = firstRow?.querySelector(".story-card__meta-top");
      const firstCaption = firstRow?.querySelector(".story-card__caption");
      if (firstCard) {
        gsap.set(firstCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotation: STORIES[0].rotate,
          pointerEvents: "auto",
        });
        firstCard.classList.add("visible");
      }
      if (firstMetaTop) gsap.set(firstMetaTop, { opacity: 1, y: 0 });
      if (firstCaption) gsap.set(firstCaption, { opacity: 1, y: 0 });

      // ── Hide all other cards in their cinematic initial state ─────────────
      STORIES.forEach((story, idx) => {
        if (idx === 0) return;
        const row = cardRefs.current[idx];
        const card = row?.querySelector(".story-card");
        const metaTop = row?.querySelector(".story-card__meta-top");
        const caption = row?.querySelector(".story-card__caption");

        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: revealY,
            scale: 0.94,
            filter: "blur(10px)",
            rotation: story.rotate,
            pointerEvents: "none",
          });
          card.classList.remove("visible");
        }
        if (metaTop) gsap.set(metaTop, { opacity: 0, y: 10 });
        if (caption) gsap.set(caption, { opacity: 0, y: 12 });
      });

      // ── Trajectory SVG initial state ─────────────────────────────────────
      paths.forEach((_, i) => {
        const mp = maskPathRefs.current[i];
        if (!mp) return;
        const len = mp.getTotalLength();
        gsap.set(mp, { strokeDasharray: len, strokeDashoffset: len });
      });
      if (dotRef.current) gsap.set(dotRef.current, { opacity: 0 });

      // ─────────────────────────────────────────────────────────────────────
      // REVEAL FUNCTION
      // Called by both ScrollTrigger (onEnter) and trajectory dot (onComplete)
      // ─────────────────────────────────────────────────────────────────────
      const revealCard = (
        card: Element,
        metaTop: Element | null,
        caption: Element | null,
        story: (typeof STORIES)[number]
      ) => {
        const tl = gsap.timeline();

        // Step 1 — Card body emerges from the page (cinematic, 1.2s)
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            rotation: story.rotate,
            duration: 1.2,
            ease: "power3.out",
            pointerEvents: "auto",
            onStart: () => card.classList.add("visible"),
          },
          0
        );

        // Step 2 — Location + date metadata drifts in (0.15s delay)
        if (metaTop) {
          tl.to(
            metaTop,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            0.15
          );
        }

        // Step 3 — Caption reads itself in last (0.3s delay)
        if (caption) {
          tl.to(
            caption,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            0.3
          );
        }

        return tl;
      };

      // ─────────────────────────────────────────────────────────────────────
      // HIDE FUNCTION (scroll-up reverse)
      // ─────────────────────────────────────────────────────────────────────
      const hideCard = (
        card: Element,
        metaTop: Element | null,
        caption: Element | null,
        story: (typeof STORIES)[number]
      ) => {
        const tl = gsap.timeline();

        // Inner content hides first
        if (caption) {
          tl.to(caption, { opacity: 0, y: 12, duration: 0.3, ease: "power2.in" }, 0);
        }
        if (metaTop) {
          tl.to(metaTop, { opacity: 0, y: 10, duration: 0.35, ease: "power2.in" }, 0);
        }

        // Card retreats
        tl.to(
          card,
          {
            opacity: 0,
            y: reverseY,
            filter: "blur(8px)",
            rotation: story.rotate,
            duration: 0.8,
            ease: "power2.inOut",
            pointerEvents: "none",
            onComplete: () => card.classList.remove("visible"),
          },
          0.05
        );

        return tl;
      };

      // ─────────────────────────────────────────────────────────────────────
      // PER-CARD SCROLL TRIGGERS (independent, play+reverse)
      // ─────────────────────────────────────────────────────────────────────
      STORIES.forEach((story, idx) => {
        if (idx === 0) return; // Card 1 is always visible

        const row = cardRefs.current[idx];
        const card = row?.querySelector(".story-card");
        const metaTop = row?.querySelector(".story-card__meta-top");
        const caption = row?.querySelector(".story-card__caption");

        if (!card) return;

        let revealTl: gsap.core.Timeline | null = null;
        let hideTl: gsap.core.Timeline | null = null;

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          end: "top 60%",
          onEnter: () => {
            if (hideTl) hideTl.kill();
            revealTl = revealCard(card, metaTop ?? null, caption ?? null, story);
          },
          onLeaveBack: () => {
            if (revealTl) revealTl.kill();
            hideTl = hideCard(card, metaTop ?? null, caption ?? null, story);
          },
        });
      });

      // ─────────────────────────────────────────────────────────────────────
      // TRAJECTORY SCRUB SYSTEM
      // Path drawing + dot travel → wired to also call revealCard
      // on dot arrival, providing a dual-trigger architecture.
      // ─────────────────────────────────────────────────────────────────────
      for (let i = 0; i < paths.length; i++) {
        const row2 = cardRefs.current[i + 1];
        const maskPathEl = maskPathRefs.current[i];
        const pathEl = pathRefs.current[i];
        const card2 = row2?.querySelector(".story-card");
        const story = STORIES[i + 1];

        if (!maskPathEl || !pathEl || !card2) continue;

        const mp = maskPathEl;
        const len = mp.getTotalLength();
        const startPt = pathEl.getPointAtLength(0);

        gsap.set(mp, { strokeDasharray: len, strokeDashoffset: len });

        const triggerStart = isMobile ? "top 95%" : isTablet ? "top 90%" : "top 90%";
        const triggerEnd = isMobile ? "top 45%" : isTablet ? "top 35%" : "top 30%";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row2,
            start: triggerStart,
            end: triggerEnd,
            scrub: 1,
          },
        });

        // Position dot at segment start
        tl.set(dotRef.current, { x: startPt.x, y: startPt.y, opacity: 0 }, 0);

        // Dot fades in
        tl.to(dotRef.current, { opacity: 1, duration: 0.2 }, 0);

        // Path reveals slowly
        tl.to(mp, { strokeDashoffset: 0, duration: 3.2, ease: "power1.inOut" }, 0);

        // Dot travels the path
        if (dotRef.current) {
          tl.to(
            dotRef.current,
            {
              motionPath: {
                path: pathEl,
                align: pathEl,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
              },
              duration: 3.0,
              ease: "none",
            },
            0.2
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [paths]);

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="stories"
      aria-labelledby="stories-heading"
      className="stories-section"
    >
      {/* Trajectory SVG Overlay */}
      {paths.length > 0 && (
        <svg className="stories-trajectory" aria-hidden="true">
          <defs>
            {paths.map((seg, index) => (
              <mask key={`mask-${index}`} id={`trajectory-mask-${index}`}>
                <path
                  ref={(el) => { maskPathRefs.current[index] = el; }}
                  id={`trajectory-mask-path-${index + 1}`}
                  className="trajectory-mask-path"
                  d={seg.d}
                  fill="none"
                  stroke="white"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
              </mask>
            ))}
          </defs>

          {/* Dotted trajectory paths — always visible */}
          {paths.map((seg, index) => (
            <path
              key={index}
              ref={(el) => { pathRefs.current[index] = el; }}
              id={`trajectory-${index + 1}`}
              className="story-path"
              d={seg.d}
              fill="none"
              stroke="rgba(184, 142, 68, 0.85)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="3 12"
            />
          ))}

          {/* Arrowhead chevron at each segment endpoint — always visible */}
          {paths.map((seg, index) => (
            <path
              key={`arrowhead-${index}`}
              d="M -9 -5 L 0 0 L -9 5"
              transform={`translate(${seg.endX}, ${seg.endY}) rotate(${seg.angle})`}
              fill="none"
              stroke="rgba(184, 142, 68, 0.85)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          <circle
            ref={dotRef}
            id="traveller-dot"
            className="story-dot"
            r="5"
            cx="0"
            cy="0"
            fill="#b88e44"
            filter="drop-shadow(0 0 8px rgba(184, 142, 68, 0.6))"
          />
        </svg>
      )}

      {/* Section header */}
      <div className="stories-header">
        <span className="stories-header__eyebrow" aria-hidden="true">✦</span>
        <h2 id="stories-heading" className="stories-header__title">
          Stories Collected Along The Way
        </h2>
      </div>

      {/* Card stream — zigzag editorial layout */}
      <div className="stories-stream">
        {STORIES.map((story, index) => (
          <div
            key={story.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            className={`stories-stream__row stories-stream__row--${story.align} stories-stream__row--${story.size}`}
          >
            <StoryCard
              story={story}
              onLoad={handleImageLoad}
              isActiveByDefault={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Footer flourish */}
      <div className="stories-footer" aria-hidden="true">
        <span className="stories-footer__rule" />
        <span className="stories-footer__mark">✦</span>
        <span className="stories-footer__rule" />
      </div>
    </section>
  );
}

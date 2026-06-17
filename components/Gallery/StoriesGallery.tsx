"use client";

import { STORIES } from "@/data/stories";
import StoryCard from "./StoryCard";

/**
 * StoriesGallery — "Stories Collected Along The Way"
 * ─────────────────────────────────────────────────────────────────────
 * Editorial postcard gallery. Placed immediately after the hero section
 * on the same continuous warm-ivory canvas — no section dividers.
 *
 * Layout:
 * · Cards alternate left / right lanes via CSS margin-left positioning.
 * · Each card has a subtle unique rotation (from story.rotate) creating
 *   a hand-placed, curated exhibition feel.
 * · Vertical gaps are sized to leave room for future dashed-path SVG arrows.
 * · No grid — purely positional, curated per card.
 */
export default function StoriesGallery() {
  return (
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className="stories-section"
    >
      {/* Section header — eyebrow + title only; subtitle removed for elegance */}
      <div className="stories-header">
        <span className="stories-header__eyebrow" aria-hidden="true">
          ✦
        </span>
        <h2 id="stories-heading" className="stories-header__title">
          Stories Collected Along The Way
        </h2>
      </div>

      {/* Card stream — zigzag left/right editorial layout */}
      <div className="stories-stream">
        {STORIES.map((story) => (
          <div
            key={story.id}
            className={`stories-stream__row stories-stream__row--${story.align} stories-stream__row--${story.size}`}
          >
            <StoryCard story={story} />
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

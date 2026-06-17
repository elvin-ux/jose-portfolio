"use client";

import Image from "next/image";
import type { StoryItem } from "@/data/stories";

interface StoryCardProps {
  story: StoryItem;
}

/**
 * StoryCard — editorial postcard card for the stories gallery.
 *
 * Design decisions:
 * · Subtle rotation applied via inline style (from story.rotate in degrees).
 *   Left cards tilt counter-clockwise, right cards tilt clockwise.
 *   Creates a hand-placed, curated exhibition feel.
 * · Metadata lives INSIDE the postcard surface below the image:
 *     LOCATION, NZ          DATE
 *     ──────────────────────────  (hairline rule)
 *     Short story caption text.
 * · Image fills postcard at native aspect ratio — no cropping ever.
 * · On hover: card lifts and shadow deepens; rotation eases slightly toward 0.
 */
export default function StoryCard({ story }: StoryCardProps) {
  return (
    <article
      id={story.id}
      className={`story-card story-card--${story.orientation}`}
      style={{ transform: `rotate(${story.rotate}deg)` }}
      aria-label={`Story: ${story.caption}`}
    >
      <div className="story-card__postcard">
        {/* Image — fills card width, height follows native aspect ratio */}
        <div className="story-card__image-wrapper">
          <Image
            src={story.src}
            alt={story.alt}
            width={story.orientation === "portrait" ? 900 : 1400}
            height={story.orientation === "portrait" ? 1200 : 940}
            quality={90}
            className="story-card__image"
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 400px, 840px"
          />
        </div>

        {/* Metadata — integrated into postcard surface */}
        <div className="story-card__meta">
          <div className="story-card__meta-top">
            <span className="story-card__location">{story.location}</span>
            <span className="story-card__date">{story.date}</span>
          </div>
          <div className="story-card__rule" aria-hidden="true" />
          <p className="story-card__caption">{story.caption}</p>
        </div>
      </div>
    </article>
  );
}

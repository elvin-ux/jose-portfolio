/**
 * Stories Gallery Data
 * ─────────────────────────────────────────────────────────────────────
 * Each entry maps directly to a photograph in public/images/.
 *
 * orientation: "portrait"  → taller card, native portrait aspect
 *              "landscape" → wider card, native landscape aspect
 *
 * size: "hero"   → receives the most visual space
 *       "large"  → prominent card
 *       "medium" → standard card
 *
 * align: "left" | "right" → editorial lane placement
 *
 * rotate: subtle tilt in degrees — negative = counter-clockwise (left cards),
 *         positive = clockwise (right cards). Creates a hand-placed, curated feel.
 *         Range: –3.5° to +3.5°. Applied as CSS transform on the article element.
 */

export interface StoryItem {
  id: string;
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
  size: "hero" | "large" | "medium";
  align: "left" | "right";
  location: string;
  date: string;
  caption: string;
  rotate: number; // degrees — applied via inline style transform
}

export const STORIES: StoryItem[] = [
  {
    id: "story-dancer",
    src: "/images/dancer.jpeg",
    alt: "Belly dancer performing on stage with flowing silk veil scarves under stage lights",
    orientation: "portrait",
    size: "large",
    align: "left",
    location: "Auckland, NZ",
    date: "November 2024",
    caption: "A moment of pure freedom—silk and light, and the crowd holding its breath.",
    rotate: -2.2,
  },
  {
    id: "story-singapore",
    src: "/images/singapore-airport.jpeg",
    alt: "The Rain Vortex waterfall inside Jewel Changi Airport, Singapore",
    orientation: "portrait",
    size: "hero",
    align: "right",
    location: "Singapore",
    date: "March 2024",
    caption: "Stories in motion. Even architecture learns to flow.",
    rotate: 2.4,
  },
  {
    id: "story-festival",
    src: "/images/festival-diwali.jpg",
    alt: "Classical Indian dancers performing on stage in ornate gold costumes at Diwali festival",
    orientation: "landscape",
    size: "hero",
    align: "left",
    location: "Auckland, NZ",
    date: "October 2024",
    caption: "Five women, one stage, ten thousand years of tradition alive in their hands.",
    rotate: -1.8,
  },
  {
    id: "story-police",
    src: "/images/police-officer.jpeg",
    alt: "Smiling New Zealand police officer at a community festival event",
    orientation: "portrait",
    size: "medium",
    align: "right",
    location: "Wellington, NZ",
    date: "January 2024",
    caption: "Unguarded. A laugh that needed no introduction.",
    rotate: 2.0,
  },
  {
    id: "story-kid",
    src: "/images/kidsportrait.jpeg",
    alt: "Young child in a green dress reaching toward floating soap bubbles",
    orientation: "portrait",
    size: "large",
    align: "left",
    location: "Auckland, NZ",
    date: "June 2024",
    caption: "A quiet moment before the celebration. Bubbles, wonder, and nothing else.",
    rotate: -2.5,
  },
  {
    id: "story-portrait",
    src: "/images/portrait-02.JPEG",
    alt: "Woman in a green sweater holding a cup of tea on a deck with hills in the background",
    orientation: "portrait",
    size: "hero",
    align: "right",
    location: "Auckland, NZ",
    date: "August 2024",
    caption: "She said nothing. The tea said everything.",
    rotate: 1.5,
  },
  {
    id: "story-sunflowers",
    src: "/images/Screenshot_20260616_184353_Instagram.jpg.jpeg",
    alt: "Three young people smiling and holding large sunflower bouquets in an open field",
    orientation: "landscape",
    size: "large",
    align: "left",
    location: "Waikato, NZ",
    date: "February 2024",
    caption: "Something about sunflowers makes strangers feel like old friends.",
    rotate: -2.0,
  },
];

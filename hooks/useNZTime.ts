"use client";

import { useState, useEffect } from "react";

/**
 * useNZTime — returns the current New Zealand local time as a formatted string.
 * Updates every 60 seconds. Returns empty string during SSR.
 */
export function useNZTime(): string {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();

      const time = now.toLocaleTimeString("en-NZ", {
        timeZone: "Pacific/Auckland",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Get timezone abbreviation (NZST / NZDT)
      const parts = now
        .toLocaleDateString("en-NZ", {
          timeZone: "Pacific/Auckland",
          timeZoneName: "short",
        })
        .split(" ");
      const tz = parts[parts.length - 1] ?? "NZST";

      setDisplay(`${time} ${tz}`);
    }

    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return display;
}

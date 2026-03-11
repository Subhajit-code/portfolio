"use client";

import { useEffect } from "react";

// Proactively fetch heavy Three.js chunks to warm up the cache
const preloadThreeComponents = () => {
    // We don't need to do anything with the results, just triggering the fetch
    import("./ParticleField");
    import("./WaveGrid");
    import("./ParticleRing");
};

export default function ThreePreloader() {
  useEffect(() => {
    // Delay slightly to prioritize the main Hero image and above-the-fold content
    const timer = setTimeout(preloadThreeComponents, 1500);
    return () => clearTimeout(timer);
  }, []);

  return null; // No UI needed for this optimization
}

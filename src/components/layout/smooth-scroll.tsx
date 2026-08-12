"use client";

import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

/**
 * Momentum scrolling for the whole document. The instance is published on
 * `window.__lenis` so `lib/scroll.ts` can drive it from anywhere without
 * threading a ref through the tree.
 */
export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 0.95,
      autoRaf: true,
      // Native scrolling inside overlays (palette list, project modal).
      prevent: (node) => node.hasAttribute?.("data-lenis-prevent") ?? false,
    });

    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduce]);

  return null;
}

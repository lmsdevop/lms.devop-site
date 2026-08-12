"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useI18n } from "@/i18n/provider";

/** Thin accent bar pinned under the header showing how far down the page you are. */
export function ScrollProgress() {
  const { dict } = useI18n();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      role="progressbar"
      aria-label={dict.a11y.scrollProgress}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

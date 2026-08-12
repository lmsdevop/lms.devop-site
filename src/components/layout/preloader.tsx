"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/profile";
import { useSessionFlag } from "@/hooks/use-session-flag";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useI18n } from "@/i18n/provider";

const SESSION_KEY = "lms-intro-played";

/**
 * Opening curtain with a loading counter. Plays once per browser session so it
 * feels like an entrance rather than an obstacle, and is skipped entirely for
 * reduced-motion visitors.
 */
export function Preloader() {
  const { dict } = useI18n();
  const reduce = useReducedMotion();
  const alreadyPlayed = useSessionFlag(SESSION_KEY);
  const [finished, setFinished] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  const playing = !alreadyPlayed && !reduce && !finished;

  useScrollLock(playing);

  useEffect(() => {
    if (!playing) return;

    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        if (progressRef.current) {
          progressRef.current.textContent = String(rounded).padStart(3, "0");
        }
        if (barRef.current) {
          barRef.current.style.width = `${rounded}%`;
        }
      },
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setFinished(true);
      },
    });

    return () => controls.stop();
  }, [playing]);

  return (
    <AnimatePresence>
      {playing ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-bg-sunken px-6 py-8 sm:px-10 sm:py-12"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="flex items-baseline justify-between font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">
            <span>{site.brand}</span>
            <span>{dict.preloader.loading}</span>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <motion.span
              ref={progressRef}
              className="font-display text-[clamp(4rem,18vw,14rem)] leading-none font-semibold text-fg tabular-nums"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              000
            </motion.span>
          </div>

          <div className="space-y-4">
            <div className="h-px w-full overflow-hidden bg-line">
              <span ref={barRef} className="block h-full w-0 bg-accent" />
            </div>
            <p className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">
              {dict.preloader.greeting}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

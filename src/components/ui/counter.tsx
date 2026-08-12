"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Counts from zero to `value` the first time it scrolls into view. The digits
 * are written straight to the DOM instead of through state, which keeps the
 * animation off React's render path. The final value is in the server HTML, so
 * crawlers and reduced-motion visitors always see the real number.
 */
export function Counter({
  value,
  suffix,
  prefix,
  duration = 1.8,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = digitsRef.current;
    if (!node) return;

    if (reduce) {
      node.textContent = String(value);
      return;
    }

    if (!inView) {
      node.textContent = "0";
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <span ref={digitsRef}>{value}</span>
      {suffix}
    </span>
  );
}

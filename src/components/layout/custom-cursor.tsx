"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Two-part cursor: a small dot that follows the pointer exactly and a ring
 * that lags behind and grows over interactive elements. Only mounts for
 * fine-pointer devices, so touch users keep the native behaviour.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.35 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || reduce) return;

    const interactive =
      'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]';

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest(interactive)));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden lg:block">
      <motion.span
        className="absolute size-1.5 rounded-full bg-accent-ink"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute rounded-full border border-accent-ink"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 52 : 28,
          height: hovering ? 52 : 28,
          // Both ends must be concrete colours: motion cannot tween the
          // `transparent` keyword.
          backgroundColor: hovering
            ? "rgba(214, 255, 62, 0.18)"
            : "rgba(214, 255, 62, 0)",
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

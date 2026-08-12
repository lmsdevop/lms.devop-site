"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D tilt plus a spotlight that tracks the pointer. Both effects are pure
 * transforms on the wrapper, so the card contents stay crisp.
 */
export function TiltCard({
  children,
  className,
  intensity = 7,
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  intensity?: number;
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 20 });

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${pointerX}% ${pointerY}%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 65%)`;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateYRaw.set((px - 0.5) * intensity * 2);
    rotateXRaw.set((0.5 - py) * intensity * 2);
    pointerX.set(px * 100);
    pointerY.set(py * 100);
  };

  const reset = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      className={cn("relative isolate transform-3d", className)}
    >
      {spotlight && !reduce ? (
        <motion.span
          aria-hidden
          style={{ background: spotlightBackground }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      ) : null}
      {children}
    </motion.div>
  );
}

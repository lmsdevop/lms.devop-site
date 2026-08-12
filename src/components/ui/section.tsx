"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealWords } from "./reveal";

/** Small monospace label that opens every section. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.22em] text-fg-subtle uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      {children}
    </span>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  action,
}: {
  /** Should match the `labelledBy` passed to the wrapping `<Section>`. */
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal direction="up">
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <div
        className={cn(
          "flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
          align === "center" && "lg:flex-col lg:items-center",
        )}
      >
        <h2 id={id} className="max-w-3xl text-headline font-semibold uppercase">
          <RevealWords text={title} />
        </h2>
        {action ? <Reveal delay={0.15}>{action}</Reveal> : null}
      </div>

      {lead ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Consistent vertical rhythm plus the id used by the scroll spy. */
export function Section({
  id,
  labelledBy,
  children,
  className,
  bleed = false,
}: {
  id: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-24 py-24 sm:py-32 lg:py-40", className)}
    >
      <div className={cn(!bleed && "container-page")}>{children}</div>
    </section>
  );
}

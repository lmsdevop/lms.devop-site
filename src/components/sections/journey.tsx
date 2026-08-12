"use client";

import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { timeline, type TimelineType } from "@/data/timeline";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const typeIcons: Record<TimelineType, typeof Briefcase> = {
  education: GraduationCap,
  milestone: Sparkles,
  work: Briefcase,
};

export function Journey() {
  const { dict, locale } = useI18n();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const lineScale = useTransform(progress, (value) => Math.max(value, 0.02));

  return (
    <Section id="journey" labelledBy="journey-heading">
      <SectionHeading
        id="journey-heading"
        eyebrow={dict.journey.eyebrow}
        title={dict.journey.title}
        lead={dict.journey.lead}
      />

      <div className="relative mt-16 lg:mt-24">
        <ol ref={trackRef} className="relative space-y-10 sm:space-y-14">
          {/* Rail: a static track with an accent line that fills on scroll. */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.4375rem] w-px bg-line sm:left-[1.9375rem]"
          />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.4375rem] w-px origin-top bg-accent sm:left-[1.9375rem]"
            style={reduce ? { scaleY: 1 } : { scaleY: lineScale }}
          />

          {timeline.map((entry, index) => {
            const Icon = typeIcons[entry.type];
            return (
              <Reveal
                as="li"
                key={entry.id}
                delay={0.04}
                className="relative pl-16 sm:pl-24"
              >
                <span
                  className={cn(
                    "absolute top-0 left-0 grid size-12 place-items-center rounded-full border bg-bg transition-colors sm:size-16",
                    entry.present
                      ? "border-accent text-accent-ink"
                      : "border-line text-fg-muted",
                  )}
                >
                  <Icon className="size-5 sm:size-6" aria-hidden />
                </span>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
                    {entry.period[locale]}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-6 bg-line-strong"
                  />
                  <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] tracking-wider text-fg-subtle uppercase">
                    {dict.journey.types[entry.type]}
                  </span>
                  {entry.present ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.65rem] tracking-wider text-accent-contrast uppercase">
                      <span className="size-1.5 animate-pulse rounded-full bg-accent-contrast" />
                      {dict.journey.present}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {entry.title[locale]}
                </h3>
                <p className="mt-1 text-sm text-accent-ink">
                  {entry.org[locale]}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">
                  {entry.description[locale]}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-bg-elevated/60 px-3 py-1 font-mono text-[0.7rem] text-fg-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {index < timeline.length - 1 ? (
                  <span aria-hidden className="mt-10 block h-px bg-line/60 sm:mt-14" />
                ) : null}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

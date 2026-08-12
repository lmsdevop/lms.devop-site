"use client";

import { ArrowLeft, ArrowRight, Info, Quote } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  hasPlaceholderTestimonials,
  testimonials,
} from "@/data/testimonials";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { dict, locale } = useI18n();
  const reduce = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const current = testimonials[index];

  const move = useCallback((step: number) => {
    setState(([currentIndex]) => [
      (currentIndex + step + testimonials.length) % testimonials.length,
      step,
    ]);
  }, []);

  const initials = current.author[locale]
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");

  return (
    <Section
      id="testimonials"
      labelledBy="testimonials-heading"
      className="bg-bg-sunken/40"
    >
      <SectionHeading
        id="testimonials-heading"
        eyebrow={dict.testimonials.eyebrow}
        title={dict.testimonials.title}
        align="center"
      />

      {hasPlaceholderTestimonials ? (
        <Reveal className="mx-auto mt-8 w-fit">
          <p className="flex items-start gap-2.5 rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-center text-xs text-fg-subtle">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            {dict.testimonials.placeholderNotice}
          </p>
        </Reveal>
      ) : null}

      <Reveal className="mt-14">
        <div className="relative mx-auto max-w-3xl">
          <Quote
            aria-hidden
            className="mx-auto mb-8 size-10 text-accent-ink"
            strokeWidth={1.5}
          />

          <div
            aria-live="polite"
            className="grid min-h-[16rem] place-items-start sm:min-h-[14rem]"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={current.id}
                custom={direction}
                initial={
                  reduce ? undefined : { opacity: 0, x: direction >= 0 ? 40 : -40 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduce ? undefined : { opacity: 0, x: direction >= 0 ? -40 : 40 }
                }
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="w-full text-center"
              >
                <p className="text-balance text-xl leading-relaxed font-light text-fg sm:text-2xl">
                  “{current.quote[locale]}”
                </p>

                <footer className="mt-8 flex items-center justify-center gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-bg-elevated font-mono text-xs text-fg-muted">
                    {initials}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-fg">
                      {current.author[locale]}
                    </p>
                    <p className="font-mono text-xs text-fg-subtle">
                      {current.role[locale]}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={dict.testimonials.previous}
              className="grid size-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setState([dotIndex, dotIndex > index ? 1 : -1])}
                  aria-label={`${dict.testimonials.goTo} ${dotIndex + 1}`}
                  aria-current={dotIndex === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-400",
                    dotIndex === index
                      ? "w-8 bg-accent"
                      : "w-1.5 bg-line-strong hover:bg-fg-subtle",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label={dict.testimonials.next}
              className="grid size-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

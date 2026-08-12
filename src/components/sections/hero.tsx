"use client";

import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { profile, resumePath } from "@/data/profile";
import { useNow } from "@/hooks/use-now";
import { useI18n } from "@/i18n/provider";
import { scrollToSection } from "@/lib/scroll";

const secondaryCtaClass =
  "inline-flex h-14 items-center gap-2 rounded-full border border-line-strong px-7 text-base text-fg transition-colors duration-300 hover:bg-fg hover:text-bg";

function LocalClock() {
  const { dict, tag } = useI18n();
  const now = useNow();

  const time =
    now === null
      ? null
      : new Intl.DateTimeFormat(tag, {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: profile.timeZone,
        }).format(now);

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
      <span className="tracking-[0.16em] uppercase">
        {dict.hero.localTime}
      </span>
      {/* Rendered client-side only so the server and client agree on markup. */}
      <span className="text-fg tabular-nums">{time ?? "--:--"}</span>
    </div>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [reduce, words.length]);

  // Reserve the width of the longest option so the headline never reflows.
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span className="relative inline-grid align-bottom">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 overflow-hidden pb-[0.06em] text-accent-ink">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            className="inline-block"
            initial={reduce ? undefined : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export function Hero() {
  const { dict } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const facts = [
    { label: dict.hero.quickFacts.based, value: dict.hero.quickFacts.basedValue },
    { label: dict.hero.quickFacts.focus, value: dict.hero.quickFacts.focusValue },
    {
      label: dict.hero.quickFacts.languages,
      value: dict.hero.quickFacts.languagesValue,
    },
  ];

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: gridY }}
        className="absolute inset-x-0 -top-1/4 h-[150%] bg-blueprint [mask-image:radial-gradient(75%_60%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute top-[-18rem] left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        className="container-page relative"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elevated/60 py-1.5 pr-4 pl-2.5 backdrop-blur-sm">
            <span className="relative grid size-4 place-items-center">
              <span className="absolute size-2 rounded-full bg-accent" />
              <span className="absolute size-4 animate-ping rounded-full bg-accent/40" />
            </span>
            <span className="font-mono text-xs tracking-wide text-fg-muted">
              {dict.hero.availability}
            </span>
          </span>
          <LocalClock />
        </motion.div>

        <h1
          id="hero-heading"
          className="mt-8 max-w-5xl text-display font-semibold uppercase"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {dict.hero.titleTop}{" "}
            <RotatingWord words={dict.hero.titleRotating} />
          </motion.span>
          <motion.span
            className="block text-fg-muted"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {dict.hero.titleBottom}
          </motion.span>
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <p className="max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {dict.hero.intro}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.22}>
                <button
                  type="button"
                  onClick={() => scrollToSection("work")}
                  className="group inline-flex h-14 items-center gap-2 rounded-full bg-accent px-7 text-base font-medium text-accent-contrast transition-transform duration-300 hover:scale-[1.03]"
                >
                  {dict.hero.ctaPrimary}
                  <ArrowUpRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>

              {resumePath ? (
                <a
                  href={resumePath}
                  download
                  className={secondaryCtaClass}
                >
                  <Download className="size-4.5" aria-hidden />
                  {dict.hero.ctaSecondary}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className={secondaryCtaClass}
                >
                  <Mail className="size-4.5" aria-hidden />
                  {dict.hero.ctaSecondaryFallback}
                </button>
              )}
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3"
          >
            {facts.map((fact) => (
              <div key={fact.label} className="bg-bg px-5 py-4">
                <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-fg-subtle uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm text-fg">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-fg-subtle uppercase transition-colors hover:text-fg"
      >
        {dict.hero.scrollCue}
        <ArrowDown className="size-3.5 animate-bounce" aria-hidden />
      </motion.button>
    </section>
  );
}

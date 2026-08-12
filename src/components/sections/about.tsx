"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/provider";

export function About({ avatarUrl }: { avatarUrl: string }) {
  const { dict } = useI18n();
  const reduce = useReducedMotion();
  const imageWrapper = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrapper,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeading
        id="about-heading"
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        lead={dict.about.lead}
      />

      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <Reveal direction="right" className="lg:sticky lg:top-28 lg:self-start">
          <div
            ref={imageWrapper}
            className="relative aspect-4/5 overflow-hidden rounded-2xl border border-line bg-bg-elevated"
          >
            <motion.div
              className="absolute inset-x-0 -top-[6%] h-[112%]"
              style={reduce ? undefined : { y: imageY }}
            >
              <Image
                src={avatarUrl}
                alt={dict.about.portraitAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                priority={false}
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <div>
                <p className="font-display text-xl font-semibold">
                  {profile.name}
                </p>
                <p className="font-mono text-xs text-fg-muted">
                  @{profile.githubUsername}
                </p>
              </div>
              <span className="rounded-full border border-line-strong bg-bg/80 px-3 py-1 font-mono text-[0.65rem] tracking-wider text-fg-muted uppercase backdrop-blur-sm">
                {profile.initials}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="space-y-12">
          <div className="space-y-6">
            {dict.about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="text-base leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="rounded-2xl border border-line bg-bg-elevated/60 p-6 sm:p-7">
              <h3 className="flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.2em] text-fg-subtle uppercase">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                {dict.about.nowTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {dict.about.now.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-fg-muted">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent-ink"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="font-mono text-[0.7rem] tracking-[0.2em] text-fg-subtle uppercase">
                {dict.about.valuesTitle}
              </h3>
            </Reveal>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {dict.about.values.map((value, index) => (
                <Reveal
                  key={value.title}
                  delay={index * 0.08}
                  className="bg-bg p-5"
                >
                  <dt className="font-display text-base font-semibold">
                    {value.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {value.text}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}

"use client";

import { Gauge, LayoutTemplate, Server, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { useI18n } from "@/i18n/provider";

const icons = [Sparkles, LayoutTemplate, Server, Gauge];

export function Services() {
  const { dict } = useI18n();

  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        lead={dict.services.lead}
      />

      <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20">
        {dict.services.items.map((item, index) => {
          const Icon = icons[index] ?? Sparkles;
          return (
            <Reveal as="li" key={item.title} delay={index * 0.08}>
              <TiltCard className="group h-full">
                <article className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-bg-elevated/60 p-7 transition-colors duration-500 group-hover:border-line-strong sm:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-xl border border-line bg-bg text-accent-ink transition-colors duration-500 group-hover:border-accent-ink/40">
                      <Icon className="size-5.5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-fg-muted">
                    {item.text}
                  </p>

                  <ul className="flex flex-wrap gap-2 pt-1">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-fg-muted"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

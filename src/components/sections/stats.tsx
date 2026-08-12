"use client";

import { Counter } from "@/components/ui/counter";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/i18n/provider";
import type { PortfolioStats } from "@/lib/github";

export function Stats({ stats }: { stats: PortfolioStats }) {
  const { dict } = useI18n();

  const items = [
    { key: "repos", value: stats.repos, label: dict.stats.items.repos },
    { key: "languages", value: stats.languages, label: dict.stats.items.languages },
    { key: "years", value: stats.years, label: dict.stats.items.years, suffix: "+" },
    { key: "courses", value: stats.courses, label: dict.stats.items.courses },
  ];

  return (
    <section aria-labelledby="stats-heading" className="border-y border-line">
      <div className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4">
            <Reveal>
              <Eyebrow>{dict.stats.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="stats-heading"
                className="max-w-md text-3xl font-semibold uppercase sm:text-4xl"
              >
                {dict.stats.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xs font-mono text-xs leading-relaxed text-fg-subtle">
              {dict.stats.note}
            </p>
          </Reveal>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              key={item.key}
              delay={index * 0.08}
              className="group bg-bg p-6 transition-colors duration-500 hover:bg-bg-elevated sm:p-8"
            >
              <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-fg-subtle uppercase">
                {item.label}
              </dt>
              <dd className="mt-3 font-display text-5xl leading-none font-semibold sm:text-6xl">
                <Counter value={item.value} suffix={item.suffix} />
              </dd>
              <span
                aria-hidden
                className="mt-5 block h-0.5 w-8 bg-line-strong transition-all duration-500 group-hover:w-16 group-hover:bg-accent"
              />
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

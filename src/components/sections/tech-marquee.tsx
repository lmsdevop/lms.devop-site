"use client";

import { Marquee } from "@/components/ui/marquee";
import { techMarquee } from "@/data/profile";
import { useI18n } from "@/i18n/provider";

export function TechMarquee() {
  const { dict } = useI18n();

  return (
    <div className="relative border-y border-line bg-bg-elevated/40 py-6">
      <h2 className="sr-only">{dict.marquee.label}</h2>
      <Marquee speed={48}>
        {techMarquee.map((tech) => (
          <span key={tech} className="flex items-center gap-8 pr-8">
            <span className="font-display text-2xl font-medium tracking-tight whitespace-nowrap text-fg-muted uppercase sm:text-3xl">
              {tech}
            </span>
            <span
              aria-hidden
              className="size-1.5 rotate-45 bg-accent-ink/50"
            />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

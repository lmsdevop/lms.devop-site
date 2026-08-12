"use client";

import { Database, LayoutTemplate, Server, Wrench } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { skillCategories, type SkillCategory } from "@/data/skills";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const categoryIcons: Record<SkillCategory["icon"], typeof Database> = {
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  wrench: Wrench,
};

const levelStyles = {
  learning: "text-fg-subtle",
  comfortable: "text-fg-muted",
  strong: "text-accent-ink",
} as const;

export function Skills() {
  const { dict } = useI18n();
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const active = skillCategories[activeIndex];

  const moveFocus = (direction: 1 | -1) => {
    const next =
      (activeIndex + direction + skillCategories.length) %
      skillCategories.length;
    setActiveIndex(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <Section id="skills" labelledBy="skills-heading" className="bg-bg-sunken/40">
      <SectionHeading
        id="skills-heading"
        eyebrow={dict.skills.eyebrow}
        title={dict.skills.title}
        lead={dict.skills.lead}
      />

      <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12">
        <div
          role="tablist"
          aria-label={dict.skills.eyebrow}
          aria-orientation="vertical"
          className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
              event.preventDefault();
              moveFocus(1);
            } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
              event.preventDefault();
              moveFocus(-1);
            }
          }}
        >
          {skillCategories.map((category, index) => {
            const Icon = categoryIcons[category.icon];
            const isActive = index === activeIndex;
            return (
              <button
                key={category.id}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                role="tab"
                id={`skills-tab-${category.id}`}
                aria-selected={isActive}
                aria-controls={`skills-panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors duration-300",
                  isActive
                    ? "border-line-strong bg-bg text-fg"
                    : "border-line text-fg-subtle hover:text-fg-muted",
                )}
              >
                <Icon className="size-4.5 shrink-0" aria-hidden />
                <span className="flex-1 whitespace-nowrap">
                  {dict.skills.categories[category.id]}
                </span>
                <span className="font-mono text-xs text-fg-subtle">
                  {category.skills.length}
                </span>
                {isActive ? (
                  <motion.span
                    layoutId="skills-indicator"
                    className="absolute inset-y-2 -left-px w-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`skills-panel-${active.id}`}
            aria-labelledby={`skills-tab-${active.id}`}
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-x-10 gap-y-6 rounded-2xl border border-line bg-bg-elevated/60 p-6 sm:grid-cols-2 sm:p-8"
          >
            {active.skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm text-fg">{skill.name}</span>
                  <span
                    className={cn(
                      "font-mono text-[0.65rem] tracking-wider uppercase",
                      levelStyles[skill.level],
                    )}
                  >
                    {dict.skills.levels[skill.level]}
                  </span>
                </div>
                <div
                  role="meter"
                  aria-valuenow={skill.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={skill.name}
                  className="h-1 overflow-hidden rounded-full bg-line"
                >
                  <motion.span
                    className="block h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.score}%` }}
                    transition={{
                      duration: reduce ? 0 : 0.9,
                      delay: reduce ? 0 : 0.06 + index * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

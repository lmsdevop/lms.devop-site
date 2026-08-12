"use client";

import { ArrowUpRight, GitFork, Info, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { GithubIcon } from "@/components/icons/brand";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { profile } from "@/data/profile";
import type { ProjectCategory } from "@/data/projects";
import { useI18n } from "@/i18n/provider";
import type { Project } from "@/lib/github";
import { cn, formatMonthYear } from "@/lib/utils";
import { ProjectArtwork } from "./project-artwork";
import { ProjectModal } from "./project-modal";

type Filter = "all" | ProjectCategory;
type SortKey = "recent" | "stars" | "name";

const filterOrder: Filter[] = ["all", "app", "frontend", "api", "study"];
const sortOrder: SortKey[] = ["recent", "stars", "name"];

export function Projects({
  projects,
  usedFallback,
}: {
  projects: Project[];
  usedFallback: boolean;
}) {
  const { dict, locale, tag } = useI18n();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [selected, setSelected] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", projects.length]]);
    for (const project of projects) {
      map.set(project.category, (map.get(project.category) ?? 0) + 1);
    }
    return map;
  }, [projects]);

  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? [...projects]
        : projects.filter((project) => project.category === filter);

    if (sort === "stars") {
      list.sort((a, b) => b.stars - a.stars || a.order - b.order);
    } else if (sort === "name") {
      list.sort((a, b) => a.title[locale].localeCompare(b.title[locale], tag));
    } else {
      list.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.order - b.order ||
          b.updatedAt.localeCompare(a.updatedAt),
      );
    }

    return list;
  }, [filter, locale, projects, sort, tag]);

  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.title}
        lead={dict.projects.lead}
        action={
          <a
            href={`https://github.com/${profile.githubUsername}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
          >
            <GithubIcon className="size-4" />
            {dict.projects.viewAll}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        }
      />

      {usedFallback ? (
        <Reveal className="mt-10">
          <p className="flex items-start gap-2.5 rounded-xl border border-line bg-bg-elevated/60 p-4 text-sm text-fg-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden />
            {dict.projects.fallbackNotice}
          </p>
        </Reveal>
      ) : null}

      <Reveal className="mt-12">
        <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label={dict.projects.eyebrow}
            className="flex flex-wrap gap-2"
          >
            {filterOrder.map((option) => {
              const count = counts.get(option) ?? 0;
              if (option !== "all" && count === 0) return null;
              const isActive = filter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                    isActive
                      ? "border-transparent text-accent-contrast"
                      : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {dict.projects.filters[option]}
                  <span className="font-mono text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="project-sort"
              className="font-mono text-[0.7rem] tracking-[0.18em] text-fg-subtle uppercase"
            >
              {dict.projects.sort.label}
            </label>
            <select
              id="project-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-10 rounded-full border border-line bg-bg px-4 text-sm text-fg transition-colors hover:border-line-strong"
            >
              {sortOrder.map((option) => (
                <option key={option} value={option}>
                  {dict.projects.sort[option]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Reveal>

      {visible.length === 0 ? (
        <p className="py-24 text-center text-fg-subtle">
          {dict.projects.empty}
        </p>
      ) : (
        <motion.ul
          layout={!reduce}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.li
                key={project.name}
                layout={!reduce}
                initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  project.featured && "sm:col-span-2 lg:col-span-2",
                )}
              >
                <TiltCard className="group h-full" intensity={5}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-elevated/60 transition-colors duration-500 group-hover:border-line-strong">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      aria-label={`${dict.projects.openDetails}: ${project.title[locale]}`}
                      className="relative block h-40 w-full overflow-hidden sm:h-44"
                    >
                      <ProjectArtwork
                        hue={project.hue}
                        label={project.name}
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      />
                      {project.featured ? (
                        <span className="absolute top-4 left-4 rounded-full bg-accent px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-accent-contrast uppercase">
                          {dict.projects.featured}
                        </span>
                      ) : null}
                    </button>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">
                          <button
                            type="button"
                            onClick={() => setSelected(project)}
                            className="text-left transition-colors hover:text-accent-ink"
                          >
                            {project.title[locale]}
                          </button>
                        </h3>
                        <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] text-fg-subtle">
                          {dict.projects.filters[project.category]}
                        </span>
                      </div>

                      <p
                        className={cn(
                          "flex-1 text-sm leading-relaxed text-fg-muted",
                          !project.featured && "line-clamp-4",
                        )}
                      >
                        {project.summary[locale]}
                      </p>

                      <ul className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] text-fg-muted"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between gap-3 border-t border-line pt-4 font-mono text-xs text-fg-subtle">
                        <span className="flex items-center gap-3">
                          {project.stars > 0 ? (
                            <span className="flex items-center gap-1">
                              <Star className="size-3.5" aria-hidden />
                              {project.stars}
                            </span>
                          ) : null}
                          {project.forks > 0 ? (
                            <span className="flex items-center gap-1">
                              <GitFork className="size-3.5" aria-hidden />
                              {project.forks}
                            </span>
                          ) : null}
                          <span>{formatMonthYear(project.updatedAt, tag)}</span>
                        </span>

                        <span className="flex items-center gap-2">
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${dict.projects.liveDemo}: ${project.title[locale]}`}
                              className="grid size-8 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-accent-ink hover:text-accent-ink"
                            >
                              <ArrowUpRight className="size-3.5" />
                            </a>
                          ) : null}
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${dict.projects.sourceCode}: ${project.title[locale]}`}
                            className="grid size-8 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-fg hover:text-fg"
                          >
                            <GithubIcon className="size-3.5" />
                          </a>
                        </span>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

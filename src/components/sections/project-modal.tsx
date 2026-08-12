"use client";

import { ArrowUpRight, GitFork, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { GithubIcon } from "@/components/icons/brand";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useI18n } from "@/i18n/provider";
import type { Project } from "@/lib/github";
import { formatMonthYear } from "@/lib/utils";
import { ProjectArtwork } from "./project-artwork";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { dict, locale, tag } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(Boolean(project));

  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label={dict.projects.closeDetails}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-bg-sunken/85 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line-strong bg-bg-elevated sm:rounded-3xl"
          >
            <div className="relative h-40 shrink-0 sm:h-52">
              <ProjectArtwork
                hue={project.hue}
                label={project.name}
                className="absolute inset-0"
              />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={dict.projects.closeDetails}
                className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-line-strong bg-bg/80 text-fg backdrop-blur-sm transition-colors hover:bg-bg"
              >
                <X className="size-4.5" aria-hidden />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-6 py-7 sm:px-9 sm:py-9"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-fg-subtle">
                <span className="rounded-full border border-line px-2.5 py-0.5">
                  {dict.projects.filters[project.category]}
                </span>
                <span>
                  {dict.projects.updatedAt}{" "}
                  {formatMonthYear(project.updatedAt, tag)}
                </span>
                {project.stars > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <Star className="size-3.5" aria-hidden />
                    {project.stars} {dict.projects.stars}
                  </span>
                ) : null}
                {project.forks > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <GitFork className="size-3.5" aria-hidden />
                    {project.forks} {dict.projects.forks}
                  </span>
                ) : null}
              </div>

              <h3
                id="project-modal-title"
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {project.title[locale]}
              </h3>

              <p className="mt-4 leading-relaxed text-fg-muted">
                {project.summary[locale]}
              </p>

              {project.role ? (
                <div className="mt-7">
                  <h4 className="font-mono text-[0.7rem] tracking-[0.2em] text-fg-subtle uppercase">
                    {dict.projects.role}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                    {project.role[locale]}
                  </p>
                </div>
              ) : null}

              {project.highlights ? (
                <div className="mt-7">
                  <h4 className="font-mono text-[0.7rem] tracking-[0.2em] text-fg-subtle uppercase">
                    {dict.projects.highlights}
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.highlights[locale].map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.stack.length > 0 ? (
                <div className="mt-7">
                  <h4 className="font-mono text-[0.7rem] tracking-[0.2em] text-fg-subtle uppercase">
                    {dict.projects.stack}
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-[0.7rem] text-fg-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="flex shrink-0 flex-col gap-3 border-t border-line px-6 py-5 sm:flex-row sm:px-9">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-transform duration-300 hover:scale-[1.02]"
                >
                  {dict.projects.liveDemo}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ) : null}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-sm text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
              >
                <GithubIcon className="size-4" />
                {dict.projects.sourceCode}
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import {
  ArrowRight,
  CornerDownLeft,
  Download,
  Languages,
  Mail,
  MoonStar,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { socialIcons } from "@/components/icons/brand";
import { profile, resumePath, sections, socials } from "@/data/profile";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useI18n } from "@/i18n/provider";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const OPEN_EVENT = "lms:open-command-palette";

/** Lets any component (e.g. the header button) open the palette. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Item = {
  id: string;
  group: "sections" | "actions" | "social";
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

export function CommandPalette() {
  const { dict, locale, setLocale } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const sectionItems: Item[] = sections.map((section) => ({
      id: `section-${section.id}`,
      group: "sections",
      label: dict.nav.items[section.key],
      icon: ArrowRight,
      run: () => scrollToSection(section.id),
    }));

    const actionItems: Item[] = [
      {
        id: "action-theme",
        group: "actions",
        label: dict.palette.actions.toggleTheme,
        icon: MoonStar,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "action-language",
        group: "actions",
        label: dict.palette.actions.switchLanguage,
        icon: Languages,
        run: () => setLocale(locale === "pt" ? "en" : "pt"),
      },
      {
        id: "action-copy-email",
        group: "actions",
        label: dict.palette.actions.copyEmail,
        hint: profile.email,
        icon: Mail,
        run: () => {
          void navigator.clipboard
            .writeText(profile.email)
            .then(() => toast.success(dict.contact.emailCopied));
        },
      },
    ];

    const resume = resumePath;
    if (resume) {
      actionItems.push({
        id: "action-resume",
        group: "actions",
        label: dict.palette.actions.downloadResume,
        icon: Download,
        run: () => window.open(resume, "_blank"),
      });
    }

    const socialItems: Item[] = socials.map((social) => ({
      id: `social-${social.id}`,
      group: "social",
      label: social.label,
      hint: social.handle,
      icon: socialIcons[social.icon],
      run: () => window.open(social.href, "_blank", "noopener,noreferrer"),
    }));

    return [...sectionItems, ...actionItems, ...socialItems];
  }, [dict, locale, resolvedTheme, setLocale, setTheme]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      `${item.label} ${item.hint ?? ""}`.toLowerCase().includes(needle),
    );
  }, [items, query]);

  const groups = useMemo(() => {
    const order: Item["group"][] = ["sections", "actions", "social"];
    return order
      .map((group) => ({
        group,
        items: filtered.filter((item) => item.group === group),
      }))
      .filter((entry) => entry.items.length > 0);
  }, [filtered]);

  const select = useCallback(
    (item: Item | undefined) => {
      if (!item) return;
      close();
      // Let the overlay finish unmounting before scrolling or navigating.
      requestAnimationFrame(item.run);
    },
    [close],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        setOpen((previous) => !previous);
        return;
      }

      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setCursor((index) => (index + 1) % Math.max(filtered.length, 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setCursor(
          (index) =>
            (index - 1 + Math.max(filtered.length, 1)) %
            Math.max(filtered.length, 1),
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        select(filtered[cursor]);
      }
    };

    const onOpenRequest = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onOpenRequest);
    };
  }, [close, cursor, filtered, open, select]);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    // Autofocus has to wait for the entrance animation to mount the input.
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[75] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label={dict.palette.hint.close}
            onClick={close}
            className="absolute inset-0 cursor-default bg-bg-sunken/80 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.a11y.openCommandPalette}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-bg-elevated shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-fg-subtle" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCursor(0);
                }}
                placeholder={dict.palette.placeholder}
                aria-label={dict.palette.placeholder}
                className="h-14 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
              />
              <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-fg-subtle sm:block">
                ESC
              </kbd>
            </div>

            <div
              ref={listRef}
              data-lenis-prevent
              className="max-h-[52vh] overflow-y-auto p-2"
            >
              {groups.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-fg-subtle">
                  {dict.palette.empty}
                </p>
              ) : (
                groups.map((entry) => (
                  <div key={entry.group} className="mb-1">
                    <p className="px-3 pt-3 pb-1.5 font-mono text-[0.65rem] tracking-[0.18em] text-fg-subtle uppercase">
                      {dict.palette.groups[entry.group]}
                    </p>
                    {entry.items.map((item) => {
                      flatIndex += 1;
                      const active = flatIndex === cursor;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-active={active}
                          onMouseEnter={() => setCursor(flatIndex)}
                          onClick={() => select(item)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                            active
                              ? "bg-fg/8 text-fg"
                              : "text-fg-muted hover:text-fg",
                          )}
                        >
                          <Icon className="size-4 shrink-0" />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.hint ? (
                            <span className="hidden truncate font-mono text-xs text-fg-subtle sm:block">
                              {item.hint}
                            </span>
                          ) : null}
                          {active ? (
                            <CornerDownLeft
                              className="size-3.5 shrink-0 text-fg-subtle"
                              aria-hidden
                            />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.65rem] text-fg-subtle">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1">↑</kbd>
                <kbd className="rounded border border-line px-1">↓</kbd>
                {dict.palette.hint.navigate}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1">↵</kbd>
                {dict.palette.hint.select}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

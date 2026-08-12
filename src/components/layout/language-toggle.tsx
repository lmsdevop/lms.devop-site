"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { locales, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = { pt: "PT", en: "EN" };

/** Segmented control with a sliding pill marking the active language. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, dict } = useI18n();
  // The header and the mobile menu both render a toggle; a shared layoutId
  // would make the pill fly between them.
  const pillId = useId();

  return (
    <div
      role="group"
      aria-label={dict.a11y.changeLanguage}
      className={cn(
        "relative flex h-10 items-center rounded-full border border-line p-1",
        className,
      )}
    >
      {locales.map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={active}
            className={cn(
              "relative z-10 h-8 rounded-full px-3 font-mono text-xs font-medium tracking-wider transition-colors duration-300",
              active ? "text-accent-contrast" : "text-fg-subtle hover:text-fg",
            )}
          >
            {active ? (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            {labels[option]}
          </button>
        );
      })}
    </div>
  );
}

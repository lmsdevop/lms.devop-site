"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useI18n } from "@/i18n/provider";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { dict } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={dict.a11y.toggleTheme}
      // `resolvedTheme` is unknown until mounted, so the icon waits for it.
      aria-pressed={mounted ? isDark : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative grid size-10 place-items-center rounded-full border border-line text-fg-muted transition-colors duration-300 hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? (isDark ? "dark" : "light") : "pending"}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="absolute grid place-items-center"
        >
          {mounted && !isDark ? (
            <Sun className="size-4.5" aria-hidden />
          ) : (
            <Moon className="size-4.5" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

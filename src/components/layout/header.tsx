"use client";

import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { socialIcons } from "@/components/icons/brand";
import { openCommandPalette } from "@/components/layout/command-palette";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { sections, site, socials } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useI18n } from "@/i18n/provider";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const sectionIds = sections.map((section) => section.id);

export function Header() {
  const { dict } = useI18n();
  const active = useActiveSection(sectionIds);
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 24);
  });

  useScrollLock(menuOpen);

  const go = (id: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-[var(--ease-out-expo)]",
          condensed
            ? "border-b border-line bg-bg/75 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between gap-6 transition-[height] duration-500",
            condensed ? "h-16" : "h-20",
          )}
        >
          <button
            type="button"
            onClick={() => go("home")}
            className="group font-display text-lg font-semibold tracking-tight lowercase"
          >
            {site.brandParts.prefix}
            <span className="text-accent-ink">.</span>
            <span className="text-fg-muted transition-colors group-hover:text-fg">
              {site.brandParts.suffix}
            </span>
          </button>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {sections.map((section) => {
                const isActive = active === section.id;
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => go(section.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                        isActive
                          ? "text-fg"
                          : "text-fg-subtle hover:text-fg-muted",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-fg/8"
                          transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 30,
                          }}
                        />
                      ) : null}
                      {dict.nav.items[section.key]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label={dict.a11y.openCommandPalette}
              className="hidden h-10 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-fg-subtle transition-colors hover:border-line-strong hover:text-fg md:flex"
            >
              <Search className="size-4" aria-hidden />
              <span className="hidden xl:inline">{dict.palette.trigger}</span>
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem]">
                ⌘K
              </kbd>
            </button>

            <LanguageToggle className="hidden sm:flex" />
            <ThemeToggle />

            <button
              type="button"
              onClick={() => go("contact")}
              className="hidden h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-accent-contrast transition-transform duration-300 hover:scale-[1.03] lg:flex"
            >
              {dict.nav.cta}
              <ArrowUpRight className="size-4" aria-hidden />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={dict.a11y.openMenu}
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-line-strong lg:hidden"
            >
              <Menu className="size-4.5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-page flex h-20 items-center justify-between">
              <span className="font-display text-lg font-semibold lowercase">
                {site.brand}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={dict.a11y.closeMenu}
                className="grid size-10 place-items-center rounded-full border border-line text-fg"
              >
                <X className="size-4.5" aria-hidden />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="container-page flex flex-1 flex-col justify-center"
            >
              <ul className="space-y-1">
                {sections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + index * 0.045,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => go(section.id)}
                      className="flex w-full items-baseline gap-4 border-b border-line py-4 text-left"
                    >
                      <span className="font-mono text-xs text-fg-subtle">
                        0{index + 1}
                      </span>
                      <span className="font-display text-3xl font-semibold uppercase sm:text-4xl">
                        {dict.nav.items[section.key]}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="container-page flex items-center justify-between gap-4 pb-10">
              <LanguageToggle />
              <ul className="flex items-center gap-2">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="grid size-10 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

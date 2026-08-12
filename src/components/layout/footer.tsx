"use client";

import { ArrowUp } from "lucide-react";
import { socialIcons } from "@/components/icons/brand";
import { Marquee } from "@/components/ui/marquee";
import { profile, sections, site, socials } from "@/data/profile";
import { useI18n } from "@/i18n/provider";
import { scrollToSection, scrollToTop } from "@/lib/scroll";

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-sunken">
      <div className="border-b border-line py-5">
        <Marquee speed={38} fade={false}>
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className="flex items-center gap-6 pr-6 font-display text-xl font-semibold tracking-tight uppercase sm:text-2xl"
            >
              <span className="size-2 rounded-full bg-accent" aria-hidden />
              {dict.footer.cta}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="font-display text-3xl font-semibold tracking-tight lowercase"
            >
              {site.brandParts.prefix}
              <span className="text-accent-ink">.</span>
              <span className="text-fg-muted">{site.brandParts.suffix}</span>
            </button>
            <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
              {dict.footer.tagline}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block border-b border-line-strong pb-0.5 font-mono text-sm text-fg transition-colors hover:border-accent-ink hover:text-accent-ink"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-label={dict.footer.sections.navigate}>
            <h2 className="mb-5 font-mono text-[0.7rem] tracking-[0.2em] text-fg-subtle uppercase">
              {dict.footer.sections.navigate}
            </h2>
            <ul className="space-y-2.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {dict.nav.items[section.key]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 font-mono text-[0.7rem] tracking-[0.2em] text-fg-subtle uppercase">
              {dict.footer.sections.social}
            </h2>
            <ul className="space-y-2.5">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      <Icon className="size-4 shrink-0" />
                      {social.label}
                      <span className="font-mono text-xs text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-fg-subtle">
            © {year} {profile.name} — {dict.footer.rights}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="font-mono text-xs text-fg-subtle">
              {dict.footer.sections.legal} {dict.footer.builtWith}
            </p>
            <a
              href={profile.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
            >
              {dict.footer.sourceCode}
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
            >
              {dict.footer.backToTop}
              <span className="grid size-8 place-items-center rounded-full border border-line transition-colors group-hover:border-line-strong">
                <ArrowUp className="size-3.5" aria-hidden />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge. */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.18em] select-none px-4 text-center font-display text-[clamp(4rem,18vw,16rem)] leading-none font-semibold tracking-tighter uppercase outline-text"
      >
        {site.brand}
      </p>
    </footer>
  );
}

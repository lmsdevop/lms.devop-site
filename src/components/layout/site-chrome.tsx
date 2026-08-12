"use client";

import { CommandPalette } from "@/components/layout/command-palette";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Preloader } from "@/components/layout/preloader";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { useI18n } from "@/i18n/provider";
import type { ReactNode } from "react";

/**
 * Everything that wraps the page content and needs the i18n context.
 * Keeping it in one client component lets the root layout stay a Server
 * Component that only resolves the locale.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const { dict } = useI18n();

  return (
    <>
      <SmoothScroll />
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <CommandPalette />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-contrast"
      >
        {dict.a11y.skipToContent}
      </a>

      <Header />
      <main id="main">{children}</main>
      <Footer />

      <span aria-hidden className="grain-overlay" />
    </>
  );
}

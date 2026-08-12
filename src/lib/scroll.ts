/**
 * Section navigation shared by the header, hero CTAs, footer and command
 * palette. Lenis exposes itself on `window` so every entry point animates
 * identically; without it we fall back to the native API.
 */

type LenisLike = {
  scrollTo: (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number },
  ) => void;
  stop: () => void;
  start: () => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

const HEADER_OFFSET = -84;

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(element, { offset: HEADER_OFFSET });
  } else {
    const top =
      element.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }

  // Keep keyboard focus in sync with the visual jump.
  element.setAttribute("tabindex", "-1");
  element.focus({ preventScroll: true });
}

export function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Freezes page scrolling while an overlay (modal, palette, mobile menu) is
 * open. Lenis owns the scroll position, so it needs an explicit stop.
 *
 * Overlays can stack, so locks are counted: scrolling only resumes once every
 * holder has released its lock. Prefer the `useScrollLock` hook over calling
 * these directly.
 */
let lockCount = 0;

export function acquireScrollLock() {
  lockCount += 1;
  if (lockCount === 1) {
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
  }
}

export function releaseScrollLock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    window.__lenis?.start();
    document.body.style.overflow = "";
  }
}

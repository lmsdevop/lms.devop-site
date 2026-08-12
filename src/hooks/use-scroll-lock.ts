"use client";

import { useEffect } from "react";
import { acquireScrollLock, releaseScrollLock } from "@/lib/scroll";

/**
 * Holds a scroll lock for as long as `active` is true. Because each holder
 * only ever acquires and releases its own lock, stacked overlays cannot
 * unlock the page from under each other.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    acquireScrollLock();
    return releaseScrollLock;
  }, [active]);
}

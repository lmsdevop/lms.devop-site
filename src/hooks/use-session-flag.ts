"use client";

import { useSyncExternalStore } from "react";

/** The flag is only written by this app, so there is nothing to subscribe to. */
const subscribe = () => () => {};

/**
 * Reads a `sessionStorage` boolean during render. The server snapshot is
 * always `false`, so markup stays consistent and the real value is picked up
 * right after hydration.
 */
export function useSessionFlag(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(key) === "1",
    () => false,
  );
}

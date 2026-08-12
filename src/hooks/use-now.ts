"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 15_000;

let listeners: Array<() => void> = [];
let intervalId: number | null = null;
let snapshot = Date.now();

function subscribe(listener: () => void) {
  listeners.push(listener);

  if (intervalId === null) {
    // React re-reads the snapshot right after subscribing, so refreshing it
    // here is enough to correct any drift since module evaluation.
    snapshot = Date.now();
    intervalId = window.setInterval(() => {
      snapshot = Date.now();
      for (const notify of listeners) notify();
    }, TICK_MS);
  }

  return () => {
    listeners = listeners.filter((entry) => entry !== listener);
    if (listeners.length === 0 && intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => null;

/**
 * Current time in milliseconds, refreshed every 15 seconds and shared by every
 * consumer through a single interval. `null` while rendering on the server.
 */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

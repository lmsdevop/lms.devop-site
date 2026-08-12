"use client";

import { useSyncExternalStore } from "react";

/** No external source to watch: the value flips once, at hydration. */
const subscribe = () => () => {};

/**
 * Guards against rendering client-only values during hydration.
 * `useSyncExternalStore` gives the server and the client different snapshots
 * without a state update in an effect.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

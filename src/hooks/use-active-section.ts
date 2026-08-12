"use client";

import { useEffect, useState } from "react";

/**
 * Scroll spy for the header nav and command palette. Picks the section whose
 * top edge is closest to (but still above) a line one third down the viewport,
 * which matches what a reader perceives as "the current section".
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    let frame = 0;

    const update = () => {
      const line = window.innerHeight / 3;
      let current = elements[0].id;

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= line) {
          current = element.id;
        }
      }

      // The last section rarely reaches the line, so pin it at the page end.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = elements[elements.length - 1].id;

      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

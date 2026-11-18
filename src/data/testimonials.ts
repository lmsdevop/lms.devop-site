import type { Locale } from "@/i18n/config";

export type Testimonial = {
  id: string;
  quote: Record<Locale, string>;
  author: Record<Locale, string>;
  role: Record<Locale, string>;
  /** Optional avatar in `public/`. Falls back to the author's initials. */
  avatar?: string;
  /**
   * Marks the entry as sample copy so the UI can flag it. Set to `false`
   * once you replace it with a real, attributable quote.
   */
  placeholder: boolean;
};

/**
 * These are samples, not real quotes. Replace the text, author and role with
 * genuine recommendations and set `placeholder: false` — the notice above the
 * carousel disappears once no placeholder entries remain.
 */
/** Hide endorsements until real, attributable quotes have been collected. */
export const testimonials: Testimonial[] = [];

export const hasPlaceholderTestimonials = false;

export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const LOCALE_COOKIE = "lms-locale";

/** BCP 47 tags for `<html lang>` and `Intl` formatting. */
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

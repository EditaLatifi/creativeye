export const locales = ["en", "de", "fr", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// "de" content is written in Swiss German (Schwiizerdütsch) per request.
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  fr: "FR",
  it: "IT",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};

// The <html lang> / hreflang code. German content uses a Swiss accent,
// so it is tagged as Swiss Standard German (de-CH).
export const htmlLang: Record<Locale, string> = {
  en: "en",
  de: "de-CH",
  fr: "fr",
  it: "it",
};

export const COOKIE_NAME = "NEXT_LOCALE";

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}

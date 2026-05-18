import { en } from "./en";
import { es } from "./es";
import type { LanguageConfig, Locale, PublicLocale, SiteCopy } from "./types";

export const publicLocales = ["es", "en"] as const satisfies readonly PublicLocale[];
export const futureLocales = ["fr", "de", "ar"] as const satisfies readonly Locale[];

export const languageConfig = {
  es: {
    name: "Español",
    shortLabel: "ES",
    route: "/",
    direction: "ltr",
    status: "live"
  },
  en: {
    name: "English",
    shortLabel: "EN",
    route: "/en",
    direction: "ltr",
    status: "live"
  },
  fr: {
    name: "Français",
    shortLabel: "FR",
    route: "/fr",
    direction: "ltr",
    status: "planned"
  },
  de: {
    name: "Deutsch",
    shortLabel: "DE",
    route: "/de",
    direction: "ltr",
    status: "planned"
  },
  ar: {
    name: "العربية",
    shortLabel: "AR",
    route: "/ar",
    direction: "rtl",
    status: "planned"
  }
} satisfies Record<Locale, LanguageConfig>;

export const translations = {
  es,
  en
} satisfies Record<PublicLocale, SiteCopy>;

export function getCopy(locale: PublicLocale) {
  return translations[locale];
}

export type { Locale, PublicLocale, SiteCopy };

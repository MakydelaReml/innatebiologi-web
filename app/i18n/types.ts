export type Locale = "es" | "en" | "fr" | "de" | "ar";
export type PublicLocale = "es" | "en";
export type TextDirection = "ltr" | "rtl";
export type TranslationStatus = "live" | "planned";

export type LanguageConfig = {
  name: string;
  shortLabel: string;
  route: string;
  direction: TextDirection;
  status: TranslationStatus;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SiteCopy = {
  locale: PublicLocale;
  languageName: string;
  direction: TextDirection;
  metadata: {
    title: string;
    description: string;
  };
  header: {
    nav: NavItem[];
    contact: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    lema: string[];
    title: string;
    copy: string;
    whisper: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
  };
  queEs: {
    eyebrow: string;
    copy: string;
  };
  deDondeViene: {
    eyebrow: string;
    copy: string;
  };
  deLaMano: {
    eyebrow: string;
    copy: string;
  };
  queNoEs: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  recorrido: {
    eyebrow: string;
    copy: string;
  };
  cierre: {
    eyebrow: string;
    copy: string;
    cta: string;
    email: string;
  };
  footer: string;
};

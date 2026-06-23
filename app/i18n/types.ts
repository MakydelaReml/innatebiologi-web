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

// Copia 100% verbatim de Claude (Mensajes 21 + 24). GLM no escribe copy (Mensaje 23).
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
  };
  hero: {
    headline: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  inteligencia: {
    copy: string;
  };
  deLaMano: {
    lead: string;
    copy: string;
  };
  recorrido: {
    lead: string;
    copy: string;
  };
  piesEnElSuelo: {
    lead: string;
    copy: string;
  };
  cierre: {
    lead: string;
    copy: string;
    email: string;
  };
  footer: string;
};

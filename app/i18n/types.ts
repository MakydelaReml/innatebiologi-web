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

export type MethodItem = {
  title: string;
  copy: string;
  image: string;
};

export type ProgramItem = {
  id: string;
  name: string;
  detail: string;
  tone: string;
  image: string;
};

export type ContentItem = {
  title: string;
  image: string;
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
    apply: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
    cardLabel: string;
    cardCopy: string;
    rootLine: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    signals: string[];
  };
  solution: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  method: {
    eyebrow: string;
    items: MethodItem[];
  };
  programs: {
    eyebrow: string;
    title: string;
    copy: string;
    items: ProgramItem[];
    requestAccess: string;
  };
  about: {
    eyebrow: string;
    title: string;
    copy: string;
    pillars: string[];
  };
  content: {
    eyebrow: string;
    items: ContentItem[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    copy: string;
    cta: string;
  };
  footer: string;
};

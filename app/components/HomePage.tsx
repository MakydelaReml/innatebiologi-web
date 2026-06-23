import Image from "next/image";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { getCopy, languageConfig, publicLocales, type PublicLocale } from "../i18n";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-aureate/20 bg-aureate/10 px-3 py-2 text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-aureate sm:px-4 sm:text-[0.68rem] sm:tracking-[0.2em]">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

export default function HomePage({ locale }: { locale: PublicLocale }) {
  const t = getCopy(locale);

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-stone-50">
      <div className="bio-grid pointer-events-none fixed inset-0 opacity-60" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/72 backdrop-blur-2xl sm:bg-ink/62">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-6 py-3 sm:flex-nowrap sm:px-8 sm:py-4">
          <a href="#hero" className="font-display text-[0.88rem] tracking-[0.13em] text-lymph sm:text-xl sm:tracking-[0.22em]">
            <span className="inline-flex items-center gap-2.5 sm:gap-3">
              <Image src="/innate-biologi-mark.svg" alt="" width={32} height={32} className="h-7 w-7 sm:h-8 sm:w-8" priority />
              INNATEBIOLOGI
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-stone-300 lg:flex">
            {t.header.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-aureate">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div
              aria-label={t.header.languageLabel}
              className="hidden rounded-full border border-white/10 bg-white/[0.035] p-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-stone-400 sm:flex"
            >
              {publicLocales.map((itemLocale) => {
                const language = languageConfig[itemLocale];
                const active = itemLocale === locale;
                return (
                  <a
                    key={itemLocale}
                    href={language.route}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3 py-1.5 transition ${
                      active ? "bg-aureate/15 text-aureate" : "hover:text-lymph"
                    }`}
                  >
                    {language.shortLabel}
                  </a>
                );
              })}
            </div>
            <a
              href={`mailto:${t.cierre.email}`}
              className="ml-auto inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-aureate bg-aureate px-4 py-2 text-xs font-bold text-ink shadow-gold transition hover:border-lymph hover:bg-lymph focus:outline-none focus-visible:ring-2 focus-visible:ring-aureate/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:min-h-0 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            >
              {t.header.contact} <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO — sin animación de entrada: el contenido carga visible (cortina fuera) */}
      <section id="hero" className="relative flex min-h-[100svh] items-center px-6 pb-28 pt-32 sm:min-h-screen sm:px-8">
        <div className="absolute -inset-x-10 -inset-y-16">
          <Image src="/images/cinematic-biology-hero.png" alt="" fill sizes="100vw" className="scale-[1.1] object-cover opacity-56 sm:opacity-62" priority />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#030504_0%,rgba(3,5,4,0.86)_36%,rgba(3,5,4,0.3)_76%,rgba(3,5,4,0.66)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.26)_0%,rgba(3,5,4,0.03)_38%,#030504_98%)]" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,#030504_78%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <h1 className="max-w-4xl font-display text-[clamp(2.2rem,9.7vw,3.85rem)] leading-[1.07] text-stone-50 [text-shadow:0_2px_26px_rgba(0,0,0,0.78)] sm:text-6xl sm:leading-[0.96] sm:[text-wrap:balance] lg:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-8 text-stone-200 sm:max-w-2xl sm:text-lg sm:leading-8 sm:text-stone-300">
            {t.hero.copy}
          </p>
          <p className="mt-5 max-w-xl text-sm italic leading-7 text-stone-400 sm:max-w-2xl sm:text-base">
            {t.hero.whisper}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#recorrido"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-lymph/70 bg-lymph px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition hover:border-aureate hover:bg-aureate sm:min-h-0 sm:py-4 sm:text-sm sm:tracking-[0.18em]"
            >
              {t.hero.primaryCta} <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${t.cierre.email}`}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-xs font-semibold text-stone-100 transition hover:border-aureate/50 hover:text-aureate sm:min-h-0 sm:gap-3 sm:py-4 sm:text-sm"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* QUÉ ES */}
      <section id="que-es" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>{t.queEs.eyebrow}</SectionLabel>
          <p className="text-lg leading-9 text-stone-300 sm:text-xl sm:leading-9">{t.queEs.copy}</p>
        </div>
      </section>

      {/* DE DÓNDE VIENE */}
      <section id="de-donde-viene" className="relative border-y border-white/10 px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>{t.deDondeViene.eyebrow}</SectionLabel>
          <p className="text-lg leading-9 text-stone-300 sm:text-xl sm:leading-9">{t.deDondeViene.copy}</p>
        </div>
      </section>

      {/* DE LA MANO */}
      <section id="de-la-mano" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>{t.deLaMano.eyebrow}</SectionLabel>
          <p className="text-lg leading-9 text-stone-300 sm:text-xl sm:leading-9">{t.deLaMano.copy}</p>
        </div>
      </section>

      {/* QUÉ NO ES */}
      <section id="que-no-es" className="relative border-y border-white/10 px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>{t.queNoEs.eyebrow}</SectionLabel>
          <h2 className="font-display text-[2rem] leading-tight text-stone-50 sm:text-4xl sm:leading-tight sm:[text-wrap:balance]">
            {t.queNoEs.title}
          </h2>
          <ul className="mt-9 grid gap-4">
            {t.queNoEs.items.map((item) => (
              <li key={item} className="luxury-border rounded-[1.25rem] p-5 text-base leading-7 text-stone-300 sm:rounded-[1.5rem] sm:p-6 sm:text-lg sm:leading-8">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EL RECORRIDO */}
      <section id="recorrido" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>{t.recorrido.eyebrow}</SectionLabel>
          <p className="text-lg leading-9 text-stone-300 sm:text-xl sm:leading-9">{t.recorrido.copy}</p>
        </div>
      </section>

      {/* CIERRE + CONTACTO */}
      <section id="cierre" className="relative px-6 pb-12 pt-20 sm:px-8 sm:pb-12">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-aureate/20 p-7 shadow-gold sm:rounded-[2.5rem] sm:p-12 lg:p-16">
          <Image src="/images/cinematic-biology-hero.png" alt="" fill sizes="100vw" className="object-cover opacity-38" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#030504_0%,rgba(3,5,4,0.82)_56%,rgba(3,5,4,0.52)_100%)]" />
          <div className="relative z-10">
            <SectionLabel>{t.cierre.eyebrow}</SectionLabel>
            <p className="max-w-2xl text-lg leading-9 text-stone-200 sm:text-xl sm:leading-9">{t.cierre.copy}</p>
            <a
              href={`mailto:${t.cierre.email}`}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-aureate bg-aureate px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-gold transition hover:border-lymph hover:bg-lymph sm:text-sm sm:tracking-[0.18em]"
            >
              {t.cierre.cta} {t.cierre.email} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-2 py-8 text-sm text-stone-500 sm:flex-row">
          <span>INNATEBIOLOGI</span>
          <span>{t.footer}</span>
        </footer>
      </section>
    </main>
  );
}

"use client";

import {
  ArrowRight,
  ChevronRight,
  Orbit,
  Play,
  Sparkles
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { useRef } from "react";
import { getCopy, languageConfig, publicLocales, type PublicLocale } from "../i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 }
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aureate/20 bg-aureate/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-aureate">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function CinematicImage({
  src,
  alt,
  className = "",
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`premium-image-shell ${className}`}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority={priority} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.04),rgba(3,5,4,0.42))]" />
      <div className="absolute inset-0 ring-1 ring-inset ring-aureate/15" />
    </div>
  );
}

export default function HomePage({ locale }: { locale: PublicLocale }) {
  const t = getCopy(locale);
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-ink text-stone-50">
      <div className="bio-grid pointer-events-none fixed inset-0 opacity-60" />
      <motion.div
        style={{ y }}
        className="pointer-events-none fixed left-1/2 top-[-18rem] h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-radial-biology blur-3xl"
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/62 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#hero" className="font-display text-xl tracking-[0.22em] text-lymph">
            <span className="inline-flex items-center gap-3">
              <Image src="/innate-biologi-mark.svg" alt="" width={32} height={32} priority />
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
              href="#final-cta"
              className="inline-flex items-center gap-2 rounded-full border border-aureate/40 bg-aureate/10 px-4 py-2 text-sm font-semibold text-aureate transition hover:bg-aureate hover:text-ink"
            >
              {t.header.apply} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section id="hero" className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/cinematic-biology-hero.png" alt="" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#030504_0%,rgba(3,5,4,0.9)_34%,rgba(3,5,4,0.36)_72%,#030504_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.15),#030504_96%)]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel>{t.hero.eyebrow}</SectionLabel>
            <h1 className="max-w-5xl font-display text-5xl leading-[0.94] text-balance text-stone-50 sm:text-6xl lg:text-7xl xl:text-8xl">
              {t.hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              {t.hero.copy}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lymph px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-aureate"
              >
                {t.hero.primaryCta} <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#method"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-stone-100 transition hover:border-aureate/50 hover:text-aureate"
              >
                <Play className="h-4 w-4 fill-current" /> {t.hero.secondaryCta}
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <CinematicImage
              src="/images/cinematic-biology-hero.png"
              alt={t.hero.imageAlt}
              className="aspect-[0.9] max-h-[680px] min-h-[420px] rounded-[2rem]"
              priority
            />
            <div className="absolute -bottom-6 left-8 right-8 hidden border border-aureate/20 bg-ink/72 px-6 py-4 shadow-gold backdrop-blur-xl sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aureate">{t.hero.cardLabel}</p>
              <p className="mt-2 text-sm leading-6 text-stone-300">{t.hero.cardCopy}</p>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-4 text-xs uppercase tracking-[0.32em] text-stone-500 md:flex">
          <span className="h-px w-16 bg-stone-700" />
          {t.hero.rootLine}
          <span className="h-px w-16 bg-stone-700" />
        </div>
      </section>

      <section id="problem" className="relative px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={fadeUp} transition={{ duration: 0.7 }}>
              <SectionLabel>{t.problem.eyebrow}</SectionLabel>
              <h2 className="font-display text-5xl leading-none text-balance sm:text-6xl">
                {t.problem.title}
              </h2>
            </motion.div>
            <div className="grid gap-4">
              {t.problem.signals.map((signal, index) => (
                <motion.div
                  key={signal}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="luxury-border rounded-[2rem] p-6"
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-moss/30 bg-moss/10 text-aureate">
                      0{index + 1}
                    </span>
                    <p className="text-xl leading-8 text-stone-200">{signal}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="relative overflow-hidden border-y border-white/10 px-5 py-24 sm:px-8 lg:py-32">
        <div className="absolute inset-0">
          <Image src="/images/nature-cellular-intelligence.png" alt="" fill sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#030504_0%,rgba(3,5,4,0.68)_50%,#030504_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#030504_0%,rgba(3,5,4,0.18)_46%,#030504_100%)]" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <SectionLabel>{t.solution.eyebrow}</SectionLabel>
          <h2 className="font-display text-5xl leading-none text-balance sm:text-7xl">
            {t.solution.title}
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-stone-300">
            {t.solution.copy}
          </p>
        </motion.div>
      </section>

      <section id="method" className="relative px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t.method.eyebrow}</SectionLabel>
          <div className="grid gap-5 md:grid-cols-3">
            {t.method.items.map((item, index) => {
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="luxury-border group min-h-[420px] overflow-hidden rounded-[2rem]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={item.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.02),#050c0a)]" />
                  </div>
                  <div className="p-7">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-aureate">0{index + 1}</span>
                    <h3 className="mt-5 font-display text-3xl text-stone-50">{item.title}</h3>
                    <p className="mt-5 leading-7 text-stone-300">{item.copy}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="programs" className="relative px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <SectionLabel>{t.programs.eyebrow}</SectionLabel>
              <h2 className="max-w-3xl font-display text-5xl leading-none text-balance sm:text-6xl">
                {t.programs.title}
              </h2>
            </div>
            <p className="max-w-md leading-7 text-stone-300">
              {t.programs.copy}
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {t.programs.items.map((program, index) => (
              <motion.article
                key={program.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="group relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/12 bg-stone-950/70 p-7 transition hover:border-aureate/40"
              >
                <Image src={program.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.18),rgba(3,5,4,0.84)_54%,#030504_100%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aureate/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10 flex min-h-[444px] flex-col justify-end">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-aureate">{program.tone}</span>
                  <h3 className="mt-8 font-display text-4xl text-stone-50">{program.name}</h3>
                  <p className="mt-5 min-h-28 leading-7 text-stone-300">{program.detail}</p>
                </div>
                <a href="#final-cta" className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-aureate">
                  {t.programs.requestAccess} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative border-y border-white/10 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="luxury-border relative min-h-[520px] overflow-hidden rounded-[2rem] p-8">
            <Image src="/images/human-ecosystem-biology.png" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover opacity-75" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.08),rgba(3,5,4,0.58)_56%,#030504_100%)]" />
            <div className="relative z-10 mt-64 grid grid-cols-2 gap-4">
              {t.about.pillars.map((word) => (
                <div key={word} className="border border-white/10 bg-ink/45 p-5 font-display text-3xl text-stone-100 backdrop-blur-xl">
                  {word}
                </div>
              ))}
            </div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.75 }}>
            <SectionLabel>{t.about.eyebrow}</SectionLabel>
            <h2 className="font-display text-5xl leading-none text-balance sm:text-6xl">
              {t.about.title}
            </h2>
            <p className="mt-7 text-lg leading-8 text-stone-300">
              {t.about.copy}
            </p>
          </motion.div>
        </div>
      </section>

      <section id="content" className="relative px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t.content.eyebrow}</SectionLabel>
          <div className="grid gap-5 md:grid-cols-2">
            {t.content.items.map((item, index) => (
              <motion.a
                key={item.title}
                href="#final-cta"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.06 }}
                className="group relative flex min-h-72 items-end justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-aureate/40"
              >
                <Image src={item.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.08),rgba(3,5,4,0.82)_78%)]" />
                <span className="relative z-10 max-w-sm font-display text-3xl leading-tight text-stone-100">{item.title}</span>
                <Orbit className="relative z-10 h-6 w-6 text-aureate transition group-hover:rotate-45" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" className="relative px-5 pb-12 pt-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-aureate/20 p-8 shadow-gold sm:p-12 lg:p-16"
        >
          <Image src="/images/cinematic-biology-hero.png" alt="" fill sizes="100vw" className="object-cover opacity-38" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#030504_0%,rgba(3,5,4,0.82)_56%,rgba(3,5,4,0.52)_100%)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <SectionLabel>{t.finalCta.eyebrow}</SectionLabel>
              <h2 className="max-w-4xl font-display text-5xl leading-none text-balance sm:text-7xl">
                {t.finalCta.title}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-stone-200">
                {t.finalCta.copy}
              </p>
              <a
                href="mailto:hello@innatebiologi.com"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aureate px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-lymph sm:w-auto"
              >
                {t.finalCta.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
        <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-2 py-8 text-sm text-stone-500 sm:flex-row">
          <span>INNATEBIOLOGI</span>
          <span>{t.footer}</span>
        </footer>
      </section>
    </main>
  );
}

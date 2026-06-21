"use client";

import {
  ArrowRight,
  ChevronRight,
  Orbit,
  Play,
  Sparkles
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import { getCopy, languageConfig, publicLocales, type PublicLocale } from "../i18n";

import { BioSporeCanvas } from "./BioSporeCanvas";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-aureate/15 bg-aureate/5 px-3 py-2 text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-aureate/90 sm:px-4 sm:text-[0.68rem] sm:tracking-[0.22em]">
      <Sparkles className="h-3.5 w-3.5 opacity-70" />
      {children}
    </div>
  );
}

export default function HomePage({ locale }: { locale: PublicLocale }) {
  const t = getCopy(locale);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -76]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.42], [0, -14]);

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-ink text-stone-50">
      <div className="bio-grid pointer-events-none fixed inset-0 opacity-40" />
      <div className="bio-conductive-field" />
      <div className="osmotic-veil" />
      <div className="mineral-points" />
      <BioSporeCanvas heroHeight={heroRef.current?.offsetHeight} />
      <motion.div
        style={{ y }}
        className="pointer-events-none fixed left-1/2 top-[-22rem] h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-radial-biology blur-[120px] opacity-60"
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-ink/40 backdrop-blur-3xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-6 py-4 sm:flex-nowrap sm:px-8 sm:py-5">
          <a href="#hero" className="font-display text-[0.88rem] tracking-[0.16em] text-lymph/90 max-[360px]:text-[0.8rem] max-[360px]:tracking-[0.11em] sm:text-xl sm:tracking-[0.25em]">
            <span className="inline-flex items-center gap-3 sm:gap-4">
              <Image src="/innate-biologi-mark.svg" alt="" width={32} height={32} className="h-6 w-6 opacity-80 sm:h-7 sm:w-7" priority />
              INNATEBIOLOGI
            </span>
          </a>
          <nav className="hidden items-center gap-9 text-[0.82rem] tracking-widest text-stone-400 lg:flex">
            {t.header.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-aureate">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 max-[360px]:w-full">
            <div
              aria-label={t.header.languageLabel}
              className="hidden rounded-full border border-white/5 bg-white/[0.02] p-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-stone-500 sm:flex"
            >
              {publicLocales.map((itemLocale) => {
                const language = languageConfig[itemLocale];
                const active = itemLocale === locale;

                return (
                  <a
                    key={itemLocale}
                    href={language.route}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-1.5 transition ${
                      active ? "bg-aureate/10 text-aureate" : "hover:text-lymph"
                    }`}
                  >
                    {language.shortLabel}
                  </a>
                );
              })}
            </div>
            <a
              href="/apply"
              className="ml-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] border border-aureate/60 bg-aureate/90 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-lymph hover:bg-lymph focus:outline-none max-[360px]:w-full sm:min-h-0 sm:px-5 sm:py-2.5"
            >
              {t.header.apply} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <section id="hero" ref={heroRef} className="relative flex min-h-[100svh] items-start px-6 pb-32 pt-44 sm:min-h-screen sm:items-center sm:px-8 sm:pb-32 sm:pt-40">
        <motion.div style={{ y: heroImageY }} className="absolute -inset-x-10 -inset-y-20">
          <Image src="/images/human-ecosystem-biology.png" alt="" fill sizes="100vw" className="scale-[1.06] object-cover object-[82%_42%] opacity-[0.65] mix-blend-lighten" priority />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(217,255,240,0.12),transparent_40%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#030504_0%,rgba(3,5,4,0.95)_25%,rgba(3,5,4,0.1)_65%,rgba(3,5,4,0.8)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.4)_0%,transparent_30%,#030504_95%)]" />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 sm:gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex items-center gap-3 text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.25em] text-aureate/80 sm:text-[0.68rem] sm:tracking-[0.3em]">
              <div className="h-px w-6 bg-aureate/30" />
              <span>{t.hero.eyebrow}</span>
            </div>
            <h1 className="max-w-4xl font-display text-[clamp(2.4rem,10vw,4.2rem)] leading-[1.12] tracking-tight text-stone-50 [text-shadow:0_4px_34px_rgba(0,0,0,0.5)] sm:text-7xl sm:leading-[1.05] lg:text-[5.5rem] xl:text-[6.5rem]">
              {t.hero.title}
            </h1>
            <p className="mt-9 max-w-md text-[1.05rem] leading-9 tracking-wide text-stone-300/90 sm:mt-10 sm:max-w-lg sm:text-xl sm:leading-10">
              {t.hero.copy}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:gap-6">
              <a
                href="#programs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] border border-lymph/40 bg-lymph/90 px-7 py-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink shadow-[0_20px_50px_rgba(217,255,240,0.1)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-aureate hover:bg-aureate sm:min-h-0 sm:px-8 sm:py-5 sm:text-[0.75rem]"
              >
                {t.hero.primaryCta} <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#method"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] border border-white/10 bg-white/[0.02] px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-stone-200 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-aureate/40 hover:bg-white/[0.05] hover:text-aureate sm:min-h-0 sm:px-8 sm:py-5 sm:text-[0.75rem]"
              >
                <Play className="h-3.5 w-3.5 fill-current opacity-80" /> {t.hero.secondaryCta}
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 items-center gap-6 text-[0.6rem] font-bold uppercase tracking-[0.4em] text-stone-600 md:flex">
          <span className="h-px w-20 bg-stone-800/60" />
          {t.hero.rootLine}
          <span className="h-px w-20 bg-stone-800/60" />
        </div>
      </section>

      <section id="problem" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={fadeUp} transition={{ duration: 0.7 }}>
              <SectionLabel>{t.problem.eyebrow}</SectionLabel>
              <h2 className="font-display text-[2.6rem] leading-[1.04] sm:text-6xl sm:leading-none sm:[text-wrap:balance]">
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
                  className="luxury-border rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6"
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-moss/30 bg-moss/10 text-aureate">
                      0{index + 1}
                    </span>
                    <p className="text-lg leading-8 text-stone-200 sm:text-xl sm:leading-8">{signal}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="relative overflow-hidden px-6 py-24 sm:px-8 lg:py-32">
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
          <h2 className="font-display text-[2.6rem] leading-[1.04] sm:text-7xl sm:leading-none sm:[text-wrap:balance]">
            {t.solution.title}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:max-w-3xl sm:text-lg sm:leading-8">
            {t.solution.copy}
          </p>
        </motion.div>
      </section>

      <section id="method" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionLabel>{t.method.eyebrow}</SectionLabel>
          <div className="grid gap-6 md:grid-cols-3">
            {t.method.items.map((item, index) => {
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="luxury-border group min-h-[380px] overflow-hidden rounded-[1.5rem] sm:min-h-[420px] sm:rounded-[2rem]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={item.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.02),#050c0a)]" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-aureate">0{index + 1}</span>
                    <h3 className="mt-5 font-display text-2xl leading-tight text-stone-50 sm:text-3xl">{item.title}</h3>
                    <p className="mt-5 max-w-sm leading-8 text-stone-300">{item.copy}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="programs" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <SectionLabel>{t.programs.eyebrow}</SectionLabel>
              <h2 className="max-w-3xl font-display text-[2.6rem] leading-[1.04] sm:text-6xl sm:leading-none sm:[text-wrap:balance]">
                {t.programs.title}
              </h2>
            </div>
            <p className="max-w-md leading-8 text-stone-300">
              {t.programs.copy}
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {t.programs.items.map((program, index) => (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="group relative min-h-[440px] overflow-hidden rounded-[1.5rem] border border-white/12 bg-stone-950/70 p-6 transition hover:border-aureate/40 sm:min-h-[500px] sm:rounded-[2rem] sm:p-7"
              >
                <Image src={program.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.18),rgba(3,5,4,0.84)_54%,#030504_100%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aureate/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10 flex min-h-[380px] flex-col justify-end sm:min-h-[444px]">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-aureate">{program.tone}</span>
                  <h3 className="mt-7 font-display text-3xl leading-tight text-stone-50 sm:mt-8 sm:text-4xl">{program.name}</h3>
                  <p className="mt-5 min-h-28 max-w-sm leading-8 text-stone-300">{program.detail}</p>
                </div>
                <a href={`/programs/${program.id}`} className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-aureate">
                  {t.programs.requestAccess} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="luxury-border relative min-h-[440px] overflow-hidden rounded-[1.5rem] p-6 sm:min-h-[520px] sm:rounded-[2rem] sm:p-8">
            <Image src="/images/human-ecosystem-biology.png" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover opacity-75" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.08),rgba(3,5,4,0.58)_56%,#030504_100%)]" />
            <div className="relative z-10 mt-56 grid grid-cols-2 gap-3 sm:mt-64 sm:gap-4">
              {t.about.pillars.map((word) => (
                <div key={word} className="border border-white/10 bg-ink/45 p-4 font-display text-2xl leading-tight text-stone-100 backdrop-blur-xl sm:p-5 sm:text-3xl">
                  {word}
                </div>
              ))}
            </div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.75 }}>
            <SectionLabel>{t.about.eyebrow}</SectionLabel>
            <h2 className="font-display text-[2.6rem] leading-[1.04] sm:text-6xl sm:leading-none sm:[text-wrap:balance]">
              {t.about.title}
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg sm:leading-8">
              {t.about.copy}
            </p>
          </motion.div>
        </div>
      </section>

      <section id="content" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{t.content.eyebrow}</SectionLabel>
          <div className="grid gap-6 md:grid-cols-2">
            {t.content.items.map((item, index) => (
              <motion.a
                key={item.title}
                href="#final-cta"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.06 }}
                className="group relative flex min-h-64 items-end justify-between gap-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-aureate/40 sm:min-h-72 sm:rounded-[2rem] sm:p-6"
              >
                <Image src={item.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.08),rgba(3,5,4,0.82)_78%)]" />
                <span className="relative z-10 max-w-sm font-display text-2xl leading-tight text-stone-100 sm:text-3xl">{item.title}</span>
                <Orbit className="relative z-10 h-6 w-6 text-aureate transition group-hover:rotate-45" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" className="relative px-6 pb-12 pt-20 sm:px-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-aureate/20 p-6 shadow-gold sm:rounded-[2.5rem] sm:p-12 lg:p-16"
        >
          <Image src="/images/cinematic-biology-hero.png" alt="" fill sizes="100vw" className="object-cover opacity-38" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#030504_0%,rgba(3,5,4,0.82)_56%,rgba(3,5,4,0.52)_100%)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <SectionLabel>{t.finalCta.eyebrow}</SectionLabel>
              <h2 className="max-w-4xl font-display text-[2.6rem] leading-[1.04] sm:text-7xl sm:leading-none sm:[text-wrap:balance]">
                {t.finalCta.title}
              </h2>
            </div>
            <div>
              <p className="max-w-xl text-base leading-8 text-stone-200 sm:text-lg sm:leading-8">
                {t.finalCta.copy}
              </p>
              <a
                href="/apply"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] border border-aureate/90 bg-aureate px-5 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink shadow-[0_18px_42px_rgba(215,196,143,0.14)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-lymph hover:bg-lymph focus:outline-none focus-visible:ring-2 focus-visible:ring-aureate/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:mt-8 sm:min-h-0 sm:w-auto sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
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

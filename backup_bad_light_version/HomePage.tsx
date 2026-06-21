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
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 }
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-biogold/20 bg-softgold/25 px-3.5 py-2 text-[0.62rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-biogold sm:px-4 sm:text-[0.68rem] sm:tracking-[0.2em] shadow-sm">
      <Sparkles className="h-3.5 w-3.5 fill-current" />
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
  const heroImageY = useTransform(scrollYProgress, [0, 0.42], [0, -22]);

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-bonewhite text-graphite">
      <div className="bio-grid pointer-events-none fixed inset-0 opacity-40" />
      <div className="bio-conductive-field" />
      <div className="osmotic-veil" />
      <div className="mineral-points" />
      <BioSporeCanvas heroHeight={heroRef.current?.offsetHeight} />
      <motion.div
        style={{ y }}
        className="pointer-events-none fixed left-1/2 top-[-18rem] h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-radial-biology blur-3xl"
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-biogold/10 bg-bonewhite/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-6 py-3 sm:flex-nowrap sm:px-8 sm:py-4">
          <a href="#hero" className="font-display text-[0.88rem] tracking-[0.13em] text-graphite max-[360px]:text-[0.8rem] max-[360px]:tracking-[0.11em] sm:text-xl sm:tracking-[0.22em]">
            <span className="inline-flex items-center gap-2.5 sm:gap-3">
              <Image src="/innate-biologi-mark.svg" alt="" width={32} height={32} className="h-7 w-7 max-[360px]:h-6 max-[360px]:w-6 sm:h-8 sm:w-8" priority />
              INNATEBIOLOGI
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-graphite/70 lg:flex">
            {t.header.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-biogold">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 max-[360px]:w-full">
            <div
              aria-label={t.header.languageLabel}
              className="hidden rounded-full border border-biogold/15 bg-softmineral/50 p-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-graphite/60 sm:flex"
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
                      active ? "bg-biogold/10 text-biogold" : "text-graphite/50 hover:text-biogold"
                    }`}
                  >
                    {language.shortLabel}
                  </a>
                );
              })}
            </div>
            <a
              href="/apply"
              className="ml-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-biogold bg-biogold px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-bonewhite transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-graphite hover:bg-graphite focus:outline-none focus-visible:ring-2 focus-visible:ring-biogold focus-visible:ring-offset-2 max-[360px]:w-full sm:min-h-0 sm:px-4 sm:py-2 sm:text-[0.78rem] sm:tracking-[0.14em]"
            >
              {t.header.apply} <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>
      </header>

      <section id="hero" ref={heroRef} className="relative flex min-h-[100svh] items-center px-6 pb-24 pt-36 sm:min-h-screen sm:px-8 sm:pb-24 sm:pt-36 bg-bonewhite overflow-hidden">
        {/* Subtle background radial glows for breathing bio-glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Breathing halo glow behind the medallion (pulses) */}
          <motion.div
            animate={{
              opacity: [0.12, 0.22, 0.12],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity
            }}
            className="absolute right-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(231,216,193,0.6),transparent_70%)] blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.08, 0.15, 0.08],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 14,
              ease: "easeInOut",
              repeat: Infinity
            }}
            className="absolute left-[-15%] top-[-10%] h-[35rem] w-[35rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(120,99,79,0.15),transparent_65%)] blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column: Premium Editorial Typography */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start text-left"
            >
              <div className="mb-6 flex items-center gap-3 text-[0.62rem] font-bold uppercase leading-relaxed tracking-[0.24em] text-biogold sm:text-[0.68rem]">
                <Sparkles className="h-3.5 w-3.5 fill-current" />
                <span>{t.hero.eyebrow}</span>
              </div>
              <h1 className="font-display text-[clamp(2.5rem,7.5vw,4.5rem)] font-light leading-[1.08] text-graphite sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight max-w-2xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-md font-display text-xl italic sm:text-2xl leading-relaxed text-deepbiology sm:max-w-lg">
                {t.hero.copy}
              </p>
              <div className="mt-10 flex flex-col gap-4 w-full sm:w-auto sm:flex-row">
                <a
                  href="#programs"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-biogold bg-biogold px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-bonewhite transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-graphite hover:bg-graphite shadow-sm sm:min-h-0 sm:px-7 sm:py-4.5 sm:text-[0.8rem]"
                >
                  {t.hero.primaryCta} <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="#method"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] border border-graphite/15 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-graphite transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-biogold hover:text-biogold sm:min-h-0 sm:gap-3 sm:px-7 sm:py-4.5 sm:text-[0.8rem]"
                >
                  <Play className="h-4 w-4 fill-current" /> {t.hero.secondaryCta}
                </a>
              </div>
            </motion.div>

            {/* Right Column: Floating Master Symbol Medallion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Soft bioelectric glow backdrop */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                  animate={{
                    opacity: [0.35, 0.55, 0.35],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  className="w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(231,216,193,0.5),transparent_65%)] blur-2xl"
                />
              </div>

              {/* Medallion frame with slow rotation & floating animation */}
              <motion.div
                animate={{
                  y: [-10, 10, -10]
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[24rem] lg:h-[24rem] rounded-full p-2 bg-[#1C1C1C] border border-biogold/10 shadow-[0_24px_70px_rgba(120,99,79,0.14)]"
              >
                {/* Slow infinite rotation of the symbol */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 100, ease: "linear", repeat: Infinity }}
                  className="w-full h-full"
                >
                  <Image
                    src="/innate-biologi-mark.svg"
                    alt=""
                    fill
                    className="object-contain p-1 select-none pointer-events-none"
                    priority
                  />
                </motion.div>
                {/* Ring highlight inside medallion */}
                <div className="absolute inset-2 rounded-full border border-softgold/5 pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Ambient bottom line */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-4 text-[0.68rem] uppercase tracking-[0.32em] text-deepbiology/60 md:flex">
          <span className="h-px w-16 bg-biogold/20" />
          {t.hero.rootLine}
          <span className="h-px w-16 bg-biogold/20" />
        </div>
      </section>

      <section id="problem" className="relative px-6 py-24 sm:px-8 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={fadeUp} transition={{ duration: 0.7 }}>
              <SectionLabel>{t.problem.eyebrow}</SectionLabel>
              <h2 className="font-display text-[2.6rem] font-light leading-[1.04] text-graphite sm:text-5xl lg:text-6xl sm:[text-wrap:balance]">
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
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-biogold/20 bg-biogold/10 text-biogold font-semibold">
                      0{index + 1}
                    </span>
                    <p className="text-lg font-light leading-8 text-graphite/90 sm:text-xl sm:leading-8">{signal}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="relative overflow-hidden px-6 py-24 sm:px-8 lg:py-32">
        <div className="absolute inset-0">
          <Image src="/images/nature-cellular-intelligence.png" alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#FAFAF9_0%,rgba(250,250,249,0.72)_50%,#FAFAF9_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FAFAF9_0%,rgba(250,250,249,0.22)_46%,#FAFAF9_100%)]" />
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
          <h2 className="font-display text-[2.6rem] font-light leading-[1.04] text-graphite sm:text-5xl lg:text-7xl sm:[text-wrap:balance]">
            {t.solution.title}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-8 text-deepbiology sm:max-w-3xl sm:text-lg sm:leading-8">
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
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,249,0.05),rgba(243,238,231,0.95))]" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-biogold">0{index + 1}</span>
                    <h3 className="mt-5 font-display text-2xl font-light leading-tight text-graphite sm:text-3xl">{item.title}</h3>
                    <p className="mt-5 max-w-sm font-light leading-8 text-deepbiology">{item.copy}</p>
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
              <h2 className="max-w-3xl font-display text-[2.6rem] font-light leading-[1.04] text-graphite sm:text-5xl lg:text-6xl sm:[text-wrap:balance]">
                {t.programs.title}
              </h2>
            </div>
            <p className="max-w-md font-light leading-8 text-deepbiology">
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
                className="group relative min-h-[440px] overflow-hidden rounded-[1.5rem] border border-biogold/10 bg-white/45 p-6 shadow-sm transition hover:border-biogold/30 hover:bg-white/70 backdrop-blur-md sm:min-h-[500px] sm:rounded-[2rem] sm:p-7"
              >
                <Image src={program.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-45" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,249,0.1),rgba(243,238,231,0.9))]"/>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-biogold/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10 flex min-h-[380px] flex-col justify-end sm:min-h-[444px]">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-biogold">{program.tone}</span>
                  <h3 className="mt-7 font-display text-3xl font-light leading-tight text-graphite sm:mt-8 sm:text-4xl">{program.name}</h3>
                  <p className="mt-5 min-h-28 max-w-sm font-light leading-8 text-deepbiology">{program.detail}</p>
                </div>
                <a href={`/programs/${program.id}`} className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-biogold">
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
            <Image src="/images/human-ecosystem-biology.png" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover opacity-50" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,249,0.1),#F3EEE7)]" />
            <div className="relative z-10 mt-56 grid grid-cols-2 gap-3 sm:mt-64 sm:gap-4">
              {t.about.pillars.map((word) => (
                <div key={word} className="border border-biogold/12 bg-white/60 p-4 font-display text-2xl leading-tight text-graphite backdrop-blur-xl shadow-sm sm:p-5 sm:text-3xl">
                  {word}
                </div>
              ))}
            </div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.75 }}>
            <SectionLabel>{t.about.eyebrow}</SectionLabel>
            <h2 className="font-display text-[2.6rem] font-light leading-[1.04] text-graphite sm:text-5xl lg:text-6xl sm:[text-wrap:balance]">
              {t.about.title}
            </h2>
            <p className="mt-7 max-w-2xl text-base font-light leading-8 text-deepbiology sm:text-lg sm:leading-8">
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
                className="group relative flex min-h-64 items-end justify-between gap-5 overflow-hidden rounded-[1.5rem] border border-biogold/10 bg-white/45 p-5 shadow-sm transition hover:border-biogold/30 hover:bg-white/70 backdrop-blur-md sm:min-h-72 sm:rounded-[2rem] sm:p-6"
              >
                <Image src={item.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-45" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,249,0.1),#F3EEE7)]" />
                <span className="relative z-10 max-w-sm font-display text-2xl font-light leading-tight text-graphite sm:text-3xl">{item.title}</span>
                <Orbit className="relative z-10 h-6 w-6 text-biogold transition group-hover:rotate-45" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Cinematic Contrast Anchor Block */}
      <section id="final-cta" className="relative px-6 pb-12 pt-20 sm:px-8 sm:pb-12 bg-bonewhite">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-biogold/25 p-6 bg-gradient-to-br from-[#333333] to-[#2B2B2B] shadow-lg sm:rounded-[2.5rem] sm:p-12 lg:p-16"
        >
          <Image src="/images/cinematic-biology-hero.png" alt="" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,99,79,0.15),transparent_70%)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-biogold/30 bg-biogold/15 px-3.5 py-2 text-[0.62rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-softgold sm:px-4 sm:text-[0.68rem] sm:tracking-[0.2em] shadow-inner">
                <Sparkles className="h-3.5 w-3.5 fill-current" />
                {t.finalCta.eyebrow}
              </div>
              <h2 className="max-w-4xl font-display text-[2.6rem] font-light leading-[1.04] text-bonewhite sm:text-5xl lg:text-7xl sm:[text-wrap:balance]">
                {t.finalCta.title}
              </h2>
            </div>
            <div>
              <p className="max-w-xl text-base font-light leading-8 text-softgold/90 sm:text-lg sm:leading-8">
                {t.finalCta.copy}
              </p>
              <a
                href="/apply"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] border border-biogold bg-biogold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-bonewhite shadow-md transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-bonewhite hover:bg-bonewhite hover:text-graphite sm:mt-8 sm:min-h-0 sm:w-auto sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
              >
                {t.finalCta.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
        <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-2 py-8 text-sm text-graphite/50 sm:flex-row">
          <span className="font-semibold text-graphite/60">INNATEBIOLOGI</span>
          <span>{t.footer}</span>
        </footer>
      </section>
    </main>
  );
}

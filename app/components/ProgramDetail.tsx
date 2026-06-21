"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, Clock, Users, Zap } from "lucide-react";
import { ProgramDetail as ProgramDetailType } from "../i18n/program-types";
import { BioSporeCanvas } from "./BioSporeCanvas";

export default function ProgramDetail({ program }: { program: ProgramDetailType }) {
  return (
    <main className="relative min-h-screen bg-ink text-stone-50 overflow-x-hidden">
      <BioSporeCanvas />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-stone-400 hover:text-aureate transition mb-12"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al archivo
        </a>

        <div className="grid gap-16 lg:grid-cols-[1fr_0.6fr] items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aureate/20 bg-aureate/10 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-aureate">
              <Zap className="h-3.5 w-3.5" />
              {program.tone}
            </div>
            <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] mb-8">
              {program.name}
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed mb-12 max-w-2xl">
              {program.fullDescription}
            </p>

            <div className="grid gap-8 mb-16">
              <h2 className="font-display text-3xl">Arquitectura del Ciclo</h2>
              <div className="grid gap-4">
                {program.modules.map((module) => (
                  <div key={module.id} className="luxury-border rounded-[1.5rem] p-6 bg-white/[0.02]">
                    <span className="text-xs font-bold text-aureate uppercase tracking-widest">Módulo {module.order}</span>
                    <h3 className="text-2xl font-display mt-2 mb-3">{module.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">{module.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8">
              <h2 className="font-display text-3xl">Resultados Esperados</h2>
              <ul className="grid gap-4">
                {program.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-300">
                    <CheckCircle2 className="h-5 w-5 text-lymph shrink-0 mt-1" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sticky top-32 luxury-border rounded-[2rem] p-8 bg-ink/40 backdrop-blur-xl border-aureate/30"
          >
            <div className="relative h-64 rounded-xl overflow-hidden mb-8 border border-white/10">
              <Image src={program.image} alt={program.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            </div>

            <div className="grid gap-6 mb-8">
              <div className="flex items-center gap-4 text-stone-300">
                <Clock className="h-5 w-5 text-aureate" />
                <div>
                  <div className="text-[0.65rem] uppercase tracking-widest text-stone-500">Duración</div>
                  <div className="text-sm font-medium">{program.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-stone-300">
                <Users className="h-5 w-5 text-aureate" />
                <div>
                  <div className="text-[0.65rem] uppercase tracking-widest text-stone-500">Formato</div>
                  <div className="text-sm font-medium">{program.format}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 mb-8">
              <div className="text-[0.65rem] uppercase tracking-widest text-stone-500 mb-1">Inversión</div>
              <div className="text-3xl font-display text-aureate">
                {program.investment.price} {program.investment.currency}
              </div>
              <p className="text-xs text-stone-500 mt-2">{program.investment.description}</p>
            </div>

            <button className="w-full bg-aureate text-ink py-4 rounded-[3px] font-bold uppercase tracking-widest text-xs hover:bg-lymph transition-colors duration-500 shadow-gold">
              Solicitar Admisión
            </button>
            <p className="text-[0.6rem] text-center text-stone-500 mt-4 uppercase tracking-[0.1em]">
              Sujeto a evaluación biológica y disponibilidad.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

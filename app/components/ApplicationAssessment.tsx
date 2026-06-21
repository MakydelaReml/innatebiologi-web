"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, Zap, Waves, Activity } from "lucide-react";
import { BioSporeCanvas } from "./BioSporeCanvas";

const steps = [
  {
    id: "identity",
    title: "Identidad Biológica",
    questions: [
      { id: "name", label: "Nombre Completo", type: "text" },
      { id: "focus", label: "¿En qué área de tu biología buscas soberanía?", type: "select", options: ["Energía y Vitalidad", "Regulación Nerviosa", "Claridad Cognitiva", "Reparación Profunda"] }
    ]
  },
  {
    id: "conductivity",
    title: "Estado de Conductividad",
    questions: [
      { id: "minerals", label: "¿Cómo describirías tu relación con los minerales y la hidratación?", type: "textarea" },
      { id: "fatigue", label: "¿Sientes fatiga que no desaparece con el descanso?", type: "select", options: ["Nunca", "Ocasionalmente", "Frecuentemente", "Crónicamente"] }
    ]
  },
  {
    id: "commitment",
    title: "Resonancia y Compromiso",
    questions: [
      { id: "why", label: "¿Por qué INNATEBIOLOGI y por qué ahora?", type: "textarea" }
    ]
  }
];

export default function ApplicationAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <main className="relative min-h-screen bg-ink text-stone-50 flex items-center justify-center p-6 overflow-hidden">
      <BioSporeCanvas />
      
      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="luxury-border rounded-[2.5rem] bg-ink/60 backdrop-blur-2xl p-8 sm:p-12 shadow-gold"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex gap-2">
                  {steps.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 w-8 rounded-full transition-colors duration-500 ${i <= currentStep ? "bg-aureate" : "bg-white/10"}`} 
                    />
                  ))}
                </div>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-stone-500 font-bold">
                  Paso {currentStep + 1} de {steps.length}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl mb-8 flex items-center gap-3">
                {currentStep === 0 && <Sparkles className="text-aureate h-6 w-6" />}
                {currentStep === 1 && <Waves className="text-lymph h-6 w-6" />}
                {currentStep === 2 && <Zap className="text-aureate h-6 w-6" />}
                {steps[currentStep].title}
              </h1>

              <div className="grid gap-8 mb-12">
                {steps[currentStep].questions.map((q) => (
                  <div key={q.id} className="grid gap-3">
                    <label className="text-xs uppercase tracking-[0.15em] text-stone-400 font-medium">{q.label}</label>
                    {q.type === "text" && (
                      <input type="text" className="bg-white/[0.03] border border-white/10 rounded-[3px] px-4 py-3 focus:border-aureate/50 outline-none transition" />
                    )}
                    {q.type === "textarea" && (
                      <textarea rows={3} className="bg-white/[0.03] border border-white/10 rounded-[3px] px-4 py-3 focus:border-aureate/50 outline-none transition resize-none" />
                    )}
                    {q.type === "select" && (
                      <select className="bg-white/[0.03] border border-white/10 rounded-[3px] px-4 py-3 focus:border-aureate/50 outline-none transition appearance-none">
                        {q.options?.map(opt => <option key={opt} value={opt} className="bg-ink">{opt}</option>)}
                      </select>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="w-full bg-aureate text-ink py-4 rounded-[3px] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-lymph transition-colors duration-500"
              >
                {currentStep === steps.length - 1 ? "Enviar Evaluación" : "Siguiente Fase"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-lymph/20 border border-lymph/30 mb-8">
                <Check className="h-10 w-10 text-lymph" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl mb-6">Recibido.</h1>
              <p className="text-stone-400 leading-relaxed max-w-md mx-auto mb-10">
                Tu señal biológica ha sido registrada. Analizaremos tu resonancia con el protocolo y te contactaremos en las próximas 48 horas.
              </p>
              <a href="/" className="text-xs uppercase tracking-widest text-aureate border-b border-aureate/30 pb-1 hover:border-aureate transition">
                Volver al archivo
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

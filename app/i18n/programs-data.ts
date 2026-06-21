import { ProgramDetail } from "./program-types";

export const resetDeOrigen: ProgramDetail = {
  id: "reset-de-origen",
  name: "Reset de Origen",
  tone: "Fundamento",
  image: "/images/nature-cellular-intelligence.png",
  detail: "Una recalibración de 6 semanas para mujeres y fundadores que reconstruyen su energía desde la raíz.",
  fullDescription: "Reset de Origen es el primer paso en la custodia biológica de INNATEBIOLOGI. Un protocolo de 42 días diseñado para restaurar la conductividad mineral, el equilibrio hidroelectrolítico y la calma del sistema nervioso.",
  duration: "6 Semanas",
  format: "Híbrido (Contenido grabado + Acompañamiento en vivo)",
  targetAudience: "Mujeres y fundadores con fatiga crónica, estrés desregulado o desequilibrio mineral.",
  outcomes: [
    "Restauración de la señal bioeléctrica celular",
    "Optimización del intercambio osmótico",
    "Claridad mitocondrial y energía estable",
    "Regulación profunda del sistema nervioso autónomo"
  ],
  investment: {
    price: 1200,
    currency: "EUR",
    description: "Inversión única para el ciclo de 6 semanas."
  },
  modules: [
    {
      id: "mod-1",
      title: "Arquitectura Mineral",
      description: "Entendiendo la electricidad del cuerpo a través de los minerales conductores.",
      order: 1,
      lessons: [
        { id: "l1-1", title: "El cuerpo como batería", slug: "cuerpo-bateria", order: 1 },
        { id: "l1-2", title: "Sodio, Potasio y Magnesio: El Triángulo Sagrado", slug: "triangulo-sagrado", order: 2 }
      ]
    },
    {
      id: "mod-2",
      title: "La Inteligencia del Agua",
      description: "Osmosis y equilibrio hidroelectrolítico más allá de la hidratación básica.",
      order: 2,
      lessons: [
        { id: "l2-1", title: "Estructuración del agua biológica", slug: "agua-estructurada", order: 1 },
        { id: "l2-2", title: "Barrera osmótica y vitalidad celular", slug: "barrera-osmotica", order: 2 }
      ]
    }
  ]
};

export const programsData = [resetDeOrigen];

import type { SiteCopy } from "./types";

export const es = {
  locale: "es",
  languageName: "Español",
  direction: "ltr",
  metadata: {
    title: "INNATEBIOLOGI | Biología sagrada para bienestar de lujo",
    description:
      "Una plataforma premium de bienestar biológico que integra inteligencia celular, restauración del sistema nervioso y rendimiento alineado con la naturaleza."
  },
  header: {
    nav: [
      { label: "Problema", href: "#problem" },
      { label: "Solución", href: "#solution" },
      { label: "Método", href: "#method" },
      { label: "Programas", href: "#programs" },
      { label: "Sobre", href: "#about" }
    ],
    apply: "Solicitar",
    languageLabel: "Cambiar idioma"
  },
  hero: {
    eyebrow: "Biología sagrada y bienestar de precisión",
    title: "Inteligencia biológica de lujo para un cuerpo que recuerda cómo sanar.",
    copy:
      "Protocolos elegantes para reparación celular, sistema nervioso profundo y vitalidad regenerativa.",
    primaryCta: "Programas",
    secondaryCta: "Método",
    imageAlt: "Biología humana regenerativa con inteligencia bioeléctrica y vitalidad celular luminosa",
    cardLabel: "Inteligencia celular",
    cardCopy: "Sistemas orgánicos, reparación medible y vitalidad serena en un único protocolo vivo.",
    rootLine: "volver a la raíz"
  },
  problem: {
    eyebrow: "El problema",
    title: "El bienestar moderno suele tratar los síntomas como fragmentos aislados.",
    signals: [
      "Fatiga crónica oculta tras el alto rendimiento",
      "Sistemas nerviosos entrenados para la urgencia, no para reparar",
      "Planes de bienestar que ignoran la secuencia natural de la biología"
    ]
  },
  solution: {
    eyebrow: "La solución",
    title: "Una arquitectura viva del bienestar que escucha antes de dirigir.",
    copy:
      "INNATEBIOLOGI reúne la inteligencia del bosque, la precisión de la ciencia celular y la fuerza silenciosa del ritual en un sistema biológico premium."
  },
  method: {
    eyebrow: "El método",
    items: [
      {
        title: "Mapa del sistema nervioso",
        copy: "Leemos la arquitectura del estrés, la capacidad de recuperación y el ritmo autonómico antes de prescribir el cambio.",
        image: "/images/human-ecosystem-biology.png"
      },
      {
        title: "Inteligencia celular",
        copy: "Los protocolos sostienen la claridad mitocondrial, la reparación circadiana, el estado mineral y la resiliencia adaptativa.",
        image: "/images/nature-cellular-intelligence.png"
      },
      {
        title: "Integración ecológica",
        copy: "Nutrición, movimiento, luz, respiración y ritual se secuencian como un único sistema vivo.",
        image: "/images/regenerative-program-still-life.png"
      }
    ]
  },
  programs: {
    eyebrow: "Programas",
    title: "Itinerarios de alta precisión para la restauración biológica.",
    copy:
      "Cada acompañamiento es deliberadamente limitado, profundamente personalizado y construido en torno a una coherencia interna medible.",
    requestAccess: "Solicitar acceso",
    items: [
      {
        name: "Reset de Origen",
        detail: "Una recalibración de 6 semanas para mujeres y fundadores que reconstruyen su energía desde la raíz.",
        tone: "Fundamento",
        image: "/images/nature-cellular-intelligence.png"
      },
      {
        name: "Soberanía Celular",
        detail: "Un intensivo privado de 12 semanas para reparación metabólica, autoridad nerviosa y longevidad encarnada.",
        tone: "Insignia",
        image: "/images/regenerative-program-still-life.png"
      },
      {
        name: "El Protocolo Vivo",
        detail: "Asesoría anual para familias, líderes y retiros que buscan una custodia biológica de alta atención.",
        tone: "Privado",
        image: "/images/human-ecosystem-biology.png"
      }
    ]
  },
  about: {
    eyebrow: "Sobre",
    title: "Para quienes intuyen que el cuerpo no es una máquina. Es un ecosistema.",
    copy:
      "La práctica integra estrategia de salud funcional, alfabetización del sistema nervioso, nutrición ancestral, inteligencia somática y reverencia por las señales biológicas sutiles que la vida moderna nos enseña a ignorar.",
    pillars: ["Raíz", "Ritmo", "Reparación", "Resplandor"]
  },
  content: {
    eyebrow: "Archivo editorial",
    items: [
      {
        title: "La biología de la quietud",
        image: "/images/human-ecosystem-biology.png"
      },
      {
        title: "La mitocondria como infraestructura sagrada",
        image: "/images/nature-cellular-intelligence.png"
      },
      {
        title: "Por qué el alto rendimiento necesita reparación profunda",
        image: "/images/regenerative-program-still-life.png"
      },
      {
        title: "El árbol de la vida como arquitectura del bienestar",
        image: "/images/cinematic-biology-hero.png"
      }
    ]
  },
  finalCta: {
    eyebrow: "Comenzar",
    title: "Volver a la inteligencia que sostiene el rendimiento.",
    copy:
      "Las solicitudes privadas se revisan según preparación, resonancia y la profundidad biológica necesaria para una transformación real.",
    cta: "Solicitar consulta privada"
  },
  footer: "Tecnología de bienestar de lujo arraigada en la biología sagrada."
} satisfies SiteCopy;

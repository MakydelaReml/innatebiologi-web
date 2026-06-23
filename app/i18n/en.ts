import type { SiteCopy } from "./types";

// NOTE: EN is a placeholder pending careful human translation.
// For now it mirrors the canonical ES copy (Mensaje 21, claim-free). The ES voice is canonical.
export const en = {
  locale: "en",
  languageName: "English",
  direction: "ltr",
  metadata: {
    title: "INNATEBIOLOGI — Learn to read your own body",
    description:
      "A school with a single subject: learning to read your own body. By the hand, without haste, at your own pace."
  },
  header: {
    nav: [
      { label: "Qué es", href: "#que-es" },
      { label: "De la mano", href: "#de-la-mano" },
      { label: "El recorrido", href: "#recorrido" },
      { label: "Escríbenos", href: "#cierre" }
    ]
  },
  hero: {
    headline: "Tu cuerpo te habla.",
    copy:
      "Ese pálpito que te ha traído hasta aquí ya es tu cuerpo hablándote. INNATEBIOLOGI es una escuela para volver a escucharlo. De la mano, sin prisa, a tu ritmo.",
    primaryCta: "Conoce el recorrido",
    secondaryCta: "Escríbenos"
  },
  inteligencia: {
    copy:
      "Dentro de ti hay una inteligencia que nadie te enseñó: la misma que hace que una semilla sepa ser árbol, la que tiene tu corazón latiendo desde antes de que tuvieras nombre, sin pedirte permiso, ni una sola noche. Somos casi por entero agua, y esa agua es salada: llevas el mar por dentro. Aquí no se aprende nada nuevo: se recuerda algo que el cuerpo nunca olvidó."
  },
  deLaMano: {
    lead: "De la mano.",
    copy:
      "No caminas solo. Te sostienen tres: la escuela, los asesores que están en tu caso, y tú, que observas y decides. A tu ritmo."
  },
  recorrido: {
    lead: "El recorrido.",
    copy:
      "Ocho paradas, una por semana, en orden. Empiezas a recordar, parada a parada, lo que tu cuerpo ya sabía. No hace falta entenderlo todo hoy: el camino se entiende caminándolo."
  },
  piesEnElSuelo: {
    lead: "Con los pies en el suelo.",
    copy:
      "El que cura, si cura, es el propio cuerpo. Y siempre, tu médico a tu lado."
  },
  cierre: {
    lead: "Escríbenos.",
    copy:
      "Si algo de esto te resuena, escríbenos. Seguimos de la mano.",
    email: "hello@innatebiologi.com"
  },
  footer: "Seguimos de la mano."
} satisfies SiteCopy;

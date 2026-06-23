import type { SiteCopy } from "./types";

export const es = {
  locale: "es",
  languageName: "Español",
  direction: "ltr",
  metadata: {
    title: "INNATEBIOLOGI — Aprende a leer tu propio cuerpo",
    description:
      "Una escuela con una sola materia: aprender a leer tu propio cuerpo. De la mano, sin prisa, a tu ritmo."
  },
  header: {
    nav: [
      { label: "Qué es", href: "#que-es" },
      { label: "De la mano", href: "#de-la-mano" },
      { label: "Qué no es", href: "#que-no-es" },
      { label: "Recorrido", href: "#recorrido" }
    ],
    contact: "Escríbenos",
    languageLabel: "Cambiar idioma"
  },
  hero: {
    eyebrow: "",
    lema: ["Primero el cuerpo conduce.", "Después el cuerpo vive."],
    title: "Aprende a leer tu propio cuerpo.",
    copy:
      "Una escuela con una sola materia: entender la lengua en la que tu cuerpo te habla —desde siempre, aunque casi nadie nos la enseñó—. De la mano, sin prisa, a tu ritmo.",
    whisper:
      "No vienes a aprender algo nuevo. Vienes a recordar algo que tu cuerpo nunca olvidó.",
    primaryCta: "Conoce el recorrido",
    secondaryCta: "Escríbenos",
    imageAlt: "El cuerpo como sistema vivo"
  },
  queEs: {
    eyebrow: "Qué es",
    copy:
      "Esto no es una consulta, ni una clínica, ni un sitio donde alguien te arregle. Es una escuela. Te enseñamos a mirar: a ver el porqué que hay debajo de lo que sientes, en lugar de ponerle un nombre y cerrar la puerta. Y es honesto desde el primer minuto: el que cura, si cura, es tu cuerpo —ese médico que llevas dentro—. Nosotros, como mucho, jardineros: te ayudamos a quitar de en medio lo que le estorba, y la vida hace el resto."
  },
  deDondeViene: {
    eyebrow: "De dónde viene",
    copy:
      "No nos lo inventamos esta mañana. Viene de una línea seria, que se puede rastrear: René Quinton → Ángel Gracia → nosotros. Más de un siglo entendiendo el agua, la sal y el medio en el que la vida, dentro de ti, se enciende y circula. Lo recogemos, lo ordenamos y lo enseñamos despacio y por escrito."
  },
  deLaMano: {
    eyebrow: "Cómo se camina: De la mano",
    copy:
      "El recorrido se llama De la mano, y se vive así: de la mano. Te sostienen tres: la escuela, que te enseña a mirar; los asesores, que están en tu caso —el tuyo, no el del vecino—; y tú, que observas y, al final, decides. A tu ritmo. Sin diagnósticos, sin prisas fingidas. Cada semana, una mirada nueva. Empieza por su suelo, el Estado Conductivo —ese fondo de agua y sal donde la vida late y circula—. Lo demás llega después, cada cosa en su orden."
  },
  queNoEs: {
    eyebrow: "Qué no es",
    title: "Decirlo de frente protege.",
    items: [
      "No es una consulta ni una clínica. Aquí nadie te diagnostica ni te receta.",
      "No es una promesa de curación. No te prometemos curarte nada —y quien te lo prometa, desconfía—.",
      "No es un método de moda ni un atajo. El cuerpo va en procesos, con su tempo.",
      "No vende pastillas ni fórmulas. No es wellness ni biohacking.",
      "No sustituye a tu médico ni a tu tratamiento. Suma, no resta. Ante una urgencia, el médico, sin dudarlo."
    ]
  },
  recorrido: {
    eyebrow: "El recorrido",
    copy:
      "La primera etapa son ocho paradas, una por semana, en orden —cada una abre la puerta de la siguiente—. Aprenderás a volver a mirar tu cuerpo, a distinguir una etiqueta que tranquiliza de una causa que explica, y a leer el agua, los minerales y los procesos que sostienen lo que sientes. No hace falta entenderlo todo hoy: el mapa se entiende caminándolo."
  },
  cierre: {
    eyebrow: "Escríbenos",
    copy:
      "Esto no se construye con prisa ni con ruido, sino despacio y de la mano. Si algo de esto te ha resonado, escríbenos: te contamos cómo entrar cuando se abra. Seguimos de la mano.",
    cta: "Escríbenos",
    email: "hello@innatebiologi.com"
  },
  footer: "INNATEBIOLOGI · Vivo desde la naturaleza."
} satisfies SiteCopy;

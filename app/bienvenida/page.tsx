import type { Metadata } from "next";
import styles from "./bienvenida.module.css";

export const metadata: Metadata = {
  title: "Bienvenido. Bienvenida.",
  description: "Una escuela para aprender a leer tu propio cuerpo.",
};

/**
 * Carta de bienvenida — canon del primer encargo (bienvenida.html), texto VERBATIM.
 * No se redacta texto: es la carta original. La plataforma la porta a Next.js
 * con su atmósfera propia (cacao/terracota/crema), aislada de la landing V4_CANON.
 * Botón «Entrar de la mano» lleva a la landing (/) donde continúa la experiencia.
 */
export default function BienvenidaPage() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <main className={styles.content}>
        <div className={styles.mark} aria-hidden="true">
          <svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 54 C 24 45 24 36 24 25"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M24 28 C 15 27 7 20 6 10 C 15 11 23 18 24 28 Z"
              fill="currentColor"
              fillOpacity="0.92"
            />
            <path
              d="M24 21 C 33 20 41 13 42 3 C 33 4 25 11 24 21 Z"
              fill="currentColor"
              fillOpacity="0.72"
            />
          </svg>
        </div>

        <h1>Bienvenido. Bienvenida. De verdad.</h1>

        <p>
          Si has llegado hasta aquí, es porque algo te ha traído. Un pálpito, una
          intuición, esa vocecita de dentro que te dijo «esto que cuentan… me suena,
          quiero saber más». Y ese pálpito, escúchalo, ya es tu cuerpo hablándote.
          Así que, antes de nada, gracias por escucharlo.
        </p>

        <p>
          Esto no es una consulta ni una clínica. Es una escuela. Una escuela con
          una sola materia, y es la más bonita del mundo: aprender a leer tu propio
          cuerpo.
        </p>

        <p>
          Aquí no te prometemos curarte nada. El que cura, si cura, es tu cuerpo
          —ese médico que llevas dentro—. Nosotros, como mucho, somos jardineros:
          te ayudamos a quitar de en medio lo que le estorba, y la vida hace el
          resto.
        </p>

        <p className={styles.closing}>
          No vienes a aprender cosas nuevas. Vienes a recordar algo que tu cuerpo
          nunca olvidó.
        </p>

        <a className={styles.button} href="/">
          Entrar de la mano
        </a>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import HomePage from "../components/HomePage";
import { es } from "../i18n/es";

// /en se conserva como ruta para cuando exista traducción canónica al inglés
// (eso es canon/voz, no carril de plataforma). Mientras tanto sirve el cuerpo
// en español con metadata en español: coherente, sin fingir ser inglés.
export const metadata: Metadata = es.metadata;

export default function EnglishPage() {
  return <HomePage />;
}

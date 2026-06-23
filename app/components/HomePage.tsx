import ReunionBody from "./reunionBody";
import SiteAtmosphere from "./SiteAtmosphere";

/**
 * Home pública = `web_para_reunion_2026-06-18` (hero-02 / V4_CANON), VERBATIM,
 * por orden explícito de Nael («la web exactamente como la última que te di»).
 * GLM no redacta texto: es el de reunion. Sin cortina (animación descartada).
 */
export default function HomePage() {
  return (
    <>
      <SiteAtmosphere />
      <ReunionBody />
    </>
  );
}

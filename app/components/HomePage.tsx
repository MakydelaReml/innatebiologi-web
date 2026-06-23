import { getCopy } from "../i18n";
import type { PublicLocale } from "../i18n";
import SiteAtmosphere from "./SiteAtmosphere";

/**
 * Home pública — diseño hero-02 (Mensajes 19-20) + copia «del corazón» verbatim
 * de Claude (Mensajes 21 + 24). GLM no escribe copy (Mensaje 23): TODO el texto
 * viene de i18n (Claude). Paleta + 4 imágenes de la demo de colaboradores (Mensaje 22).
 */
export default function HomePage({ locale }: { locale: PublicLocale }) {
  const t = getCopy(locale);

  return (
    <>
      <SiteAtmosphere />
      <div className="conductive-veil" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#hero">
          <img
            className="brand-isotipo"
            src="/ISOTIPO_favicon_256.png"
            alt=""
            aria-hidden="true"
          />
          <span className="brand-name">INNATEBIOLOGI</span>
        </a>
        <nav>
          {t.header.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="hero">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-focus" aria-hidden="true" />
          <canvas className="bio-particles" aria-hidden="true" />

          <div className="hero-content">
            <h1 className="hero-title">{t.hero.headline}</h1>
            <p className="hero-copy">{t.hero.copy}</p>
            <div className="actions">
              <a className="button primary" href="#recorrido">
                {t.hero.primaryCta}
              </a>
              <a className="button secondary" href={`mailto:${t.cierre.email}`}>
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        {/* QUÉ ES — intro «del corazón» (memoria primero) */}
        <section id="que-es" className="section definition">
          <div className="inner split">
            <div className="copy reveal">
              <p>{t.inteligencia.copy}</p>
            </div>
            <figure className="visual-card reveal">
              <img
                src="/images/cinematic-biology-hero.png"
                alt=""
                aria-hidden="true"
              />
            </figure>
          </div>
        </section>

        {/* DE LA MANO */}
        <section id="de-la-mano" className="section system">
          <div className="section-orb" aria-hidden="true" />
          <div className="inner narrow reveal">
            <h2>{t.deLaMano.lead}</h2>
            <p>{t.deLaMano.copy}</p>
          </div>
        </section>

        {/* EL RECORRIDO */}
        <section id="recorrido" className="section path">
          <div className="path-bg" aria-hidden="true" />
          <div className="inner reveal">
            <h2>{t.recorrido.lead}</h2>
            <p className="lead">{t.recorrido.copy}</p>
          </div>
        </section>

        {/* CON LOS PIES EN EL SUELO */}
        <section id="pies-en-el-suelo" className="section memory">
          <div className="inner split reverse">
            <figure className="visual-card reveal">
              <img
                src="/images/regenerative-program-still-life.png"
                alt=""
                aria-hidden="true"
              />
            </figure>
            <div className="copy reveal">
              <h2>{t.piesEnElSuelo.lead}</h2>
              <p>{t.piesEnElSuelo.copy}</p>
            </div>
          </div>
        </section>

        {/* ESCRÍBENOS — cierre + contacto */}
        <section id="cierre" className="section collaborate">
          <div className="collaborate-glow" aria-hidden="true" />
          <div className="inner narrow reveal private-vision">
            <h2>{t.cierre.lead}</h2>
            <p>{t.cierre.copy}</p>
            <a className="button primary" href={`mailto:${t.cierre.email}`}>
              {t.cierre.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>INNATEBIOLOGI</span>
        <span>{t.footer}</span>
        <span>{t.cierre.email}</span>
      </footer>
    </>
  );
}

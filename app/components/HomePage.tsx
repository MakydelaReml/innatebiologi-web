import { getCopy } from "../i18n";
import type { PublicLocale } from "../i18n";
import SiteAtmosphere from "./SiteAtmosphere";

/**
 * Home pública — lenguaje visual portado de `hero-02` (dreamcore dandelion,
 * cálido tierra). Copia de canon (Mensaje 14) en las secciones; lema de hero-02
 * como titular (Mensaje 19). Sin cortina, CTA de contacto, isotipo definitivo.
 */
export default function HomePage({ locale }: { locale: PublicLocale }) {
  const t = getCopy(locale);

  return (
    <>
      <SiteAtmosphere />
      <div className="conductive-veil" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#hero" aria-label="INNATEBIOLOGI · inicio">
          <img
            className="brand-isotipo"
            src="/ISOTIPO_favicon_256.png"
            alt=""
            aria-hidden="true"
          />
          <span className="brand-name">INNATEBIOLOGI</span>
        </a>
        <nav aria-label="Navegación principal">
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
            <p className="kicker">Inteligencia Biológica Innata</p>
            <h1 className="hero-title">
              {t.hero.lema.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-copy">{t.hero.copy}</p>
            <p className="hero-whisper">{t.hero.whisper}</p>
            <div className="actions">
              <a className="button primary" href="#recorrido">
                {t.hero.primaryCta}
              </a>
              <a className="button secondary" href={`mailto:${t.cierre.email}`}>
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>

          <p className="root-line">VIVO DESDE LA NATURALEZA</p>
        </section>

        {/* QUÉ ES */}
        <section id="que-es" className="section system">
          <div className="section-orb" aria-hidden="true" />
          <div className="inner narrow reveal">
            <p className="kicker">{t.queEs.eyebrow}</p>
            <p>{t.queEs.copy}</p>
          </div>
        </section>

        {/* DE DÓNDE VIENE */}
        <section id="de-donde-viene" className="section memory">
          <div className="inner narrow reveal">
            <p className="kicker">{t.deDondeViene.eyebrow}</p>
            <p>{t.deDondeViene.copy}</p>
          </div>
        </section>

        {/* DE LA MANO */}
        <section id="de-la-mano" className="section definition">
          <div className="inner narrow reveal">
            <p className="kicker">{t.deLaMano.eyebrow}</p>
            <p>{t.deLaMano.copy}</p>
          </div>
        </section>

        {/* QUÉ NO ES */}
        <section id="que-no-es" className="section manifesto no-es">
          <div className="inner manifesto-grid">
            <div className="manifesto-copy reveal">
              <p className="kicker">{t.queNoEs.eyebrow}</p>
              <h2>{t.queNoEs.title}</h2>
            </div>
            <div className="manifesto-lines reveal">
              {t.queNoEs.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        {/* EL RECORRIDO */}
        <section id="recorrido" className="section path">
          <div className="path-bg" aria-hidden="true" />
          <div className="inner reveal">
            <p className="kicker">{t.recorrido.eyebrow}</p>
            <p className="lead">{t.recorrido.copy}</p>
          </div>
        </section>

        {/* CIERRE + CONTACTO */}
        <section id="cierre" className="section collaborate">
          <div className="collaborate-glow" aria-hidden="true" />
          <div className="inner narrow reveal private-vision">
            <p className="kicker">{t.cierre.eyebrow}</p>
            <p>{t.cierre.copy}</p>
            <a className="button primary" href={`mailto:${t.cierre.email}`}>
              {t.cierre.cta} · {t.cierre.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>INNATEBIOLOGI</span>
        <span>{t.footer}</span>
      </footer>
    </>
  );
}

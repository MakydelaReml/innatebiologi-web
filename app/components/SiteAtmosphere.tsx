"use client";

import { useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
  pulse: number;
};

type Filament = {
  x: number;
  y: number;
  length: number;
  drift: number;
  alpha: number;
  speed: number;
};

/**
 * SiteAtmosphere — porte fiel de `hero-02/script.js`.
 * Canvas dandelion (partículas + filamentos bezier), parallax suave del hero,
 * comportamiento del header al scroll y reveal-on-scroll.
 * Sin cortina de entrada (Mensaje 15). Respeta prefers-reduced-motion.
 *
 * Añade la clase `js` al <html>: así los `.reveal` solo se ocultan si hay JS,
 * y agentes/crawlers/clientes sin JS ven todo el contenido (legibilidad).
 */
export default function SiteAtmosphere() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const header = document.querySelector<HTMLElement>(".site-header");
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );
    const heroImage = document.querySelector<HTMLElement>(".hero-image");
    const heroFocus = document.querySelector<HTMLElement>(".hero-focus");
    const particleCanvas = document.querySelector<HTMLCanvasElement>(
      ".bio-particles"
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lastScrollY = window.scrollY;

    const syncHeader = () => {
      const currentScroll = window.scrollY;

      if (header) {
        const scrollingDown = currentScroll > lastScrollY + 6;
        const scrollingUp = currentScroll < lastScrollY - 6;
        const pastHeroBreath = currentScroll > 120;

        header.classList.toggle("is-scrolled", currentScroll > 48);

        if (pastHeroBreath && scrollingDown) {
          header.classList.add("is-hidden");
        } else if (scrollingUp || currentScroll < 80) {
          header.classList.remove("is-hidden");
        }
      }

      lastScrollY = Math.max(currentScroll, 0);

      if (heroImage && !reducedMotion) {
        const offset = Math.min(currentScroll * 0.035, 30);
        heroImage.style.translate = `0 ${offset}px`;
      }

      if (heroFocus && !reducedMotion) {
        const focusOffset = Math.min(currentScroll * 0.018, 16);
        heroFocus.style.translate = `0 ${focusOffset}px`;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
      observer.observe(item);
    });

    let cleanupCanvas: (() => void) | null = null;

    if (particleCanvas && !reducedMotion) {
      const context = particleCanvas.getContext("2d");
      if (context) {
        const canvas = particleCanvas;
        const ctx = context;
        const particles: Particle[] = [];
        const filaments: Filament[] = [];
        const particleCount = 46;
        const filamentCount = 9;
        let width = 0;
        let height = 0;
        let pixelRatio = 1;
        let rafId = 0;

        const resize = () => {
          pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
          width = canvas.offsetWidth;
          height = canvas.offsetHeight;
          canvas.width = width * pixelRatio;
          canvas.height = height * pixelRatio;
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        };

        const createParticle = (): Particle => ({
          x: width * (0.46 + Math.random() * 0.52),
          y: height * (0.1 + Math.random() * 0.76),
          radius: 0.7 + Math.random() * 2.9,
          speedX: -0.035 - Math.random() * 0.13,
          speedY: -0.028 + Math.random() * 0.07,
          alpha: 0.1 + Math.random() * 0.3,
          pulse: Math.random() * Math.PI * 2
        });

        const createFilament = (): Filament => ({
          x: width * (0.52 + Math.random() * 0.38),
          y: height * (0.18 + Math.random() * 0.58),
          length: 82 + Math.random() * 190,
          drift: Math.random() * Math.PI * 2,
          alpha: 0.035 + Math.random() * 0.095,
          speed: 0.004 + Math.random() * 0.006
        });

        const seed = () => {
          particles.length = 0;
          filaments.length = 0;
          for (let i = 0; i < particleCount; i += 1) particles.push(createParticle());
          for (let i = 0; i < filamentCount; i += 1) filaments.push(createFilament());
        };

        const drawFilament = (filament: Filament) => {
          filament.drift += filament.speed;
          const wave = Math.sin(filament.drift) * 22;
          const gradient = ctx.createLinearGradient(
            filament.x,
            filament.y,
            filament.x + filament.length,
            filament.y + wave
          );
          gradient.addColorStop(0, "rgba(246, 239, 227, 0)");
          gradient.addColorStop(0.5, `rgba(246, 239, 227, ${filament.alpha})`);
          gradient.addColorStop(1, "rgba(167, 147, 124, 0)");
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(filament.x, filament.y);
          ctx.bezierCurveTo(
            filament.x + filament.length * 0.3,
            filament.y - wave,
            filament.x + filament.length * 0.7,
            filament.y + wave,
            filament.x + filament.length,
            filament.y
          );
          ctx.stroke();
        };

        const drawConnections = () => {
          for (let a = 0; a < particles.length; a += 1) {
            const first = particles[a];
            for (let b = a + 1; b < particles.length; b += 1) {
              const second = particles[b];
              const dx = first.x - second.x;
              const dy = first.y - second.y;
              const distance = Math.hypot(dx, dy);
              if (distance < 96) {
                const strength = (1 - distance / 96) * 0.105;
                const gradient = ctx.createLinearGradient(
                  first.x,
                  first.y,
                  second.x,
                  second.y
                );
                gradient.addColorStop(0, `rgba(246, 239, 227, ${strength * 0.7})`);
                gradient.addColorStop(0.5, `rgba(167, 147, 124, ${strength})`);
                gradient.addColorStop(1, `rgba(246, 239, 227, ${strength * 0.45})`);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.65;
                ctx.beginPath();
                ctx.moveTo(first.x, first.y);
                ctx.lineTo(second.x, second.y);
                ctx.stroke();
              }
            }
          }
        };

        const drawParticle = (particle: Particle, index: number) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          particle.pulse += 0.018;

          if (
            particle.x < width * 0.4 ||
            particle.y < -24 ||
            particle.y > height + 24
          ) {
            particles[index] = createParticle();
            particles[index].x = width * (0.82 + Math.random() * 0.16);
            return;
          }

          const glow = particle.alpha + Math.sin(particle.pulse) * 0.08;
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius * 10
          );
          gradient.addColorStop(0, `rgba(246, 239, 227, ${glow})`);
          gradient.addColorStop(0.38, `rgba(167, 147, 124, ${glow * 0.34})`);
          gradient.addColorStop(1, "rgba(167, 147, 124, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 10, 0, Math.PI * 2);
          ctx.fill();
        };

        const render = () => {
          ctx.clearRect(0, 0, width, height);
          filaments.forEach(drawFilament);
          drawConnections();
          particles.forEach(drawParticle);
          rafId = requestAnimationFrame(render);
        };

        const onResize = () => {
          resize();
          seed();
        };

        resize();
        seed();
        render();
        window.addEventListener("resize", onResize);

        cleanupCanvas = () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("resize", onResize);
        };
      }
    }

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncHeader);
      observer.disconnect();
      if (cleanupCanvas) cleanupCanvas();
    };
  }, []);

  return null;
}

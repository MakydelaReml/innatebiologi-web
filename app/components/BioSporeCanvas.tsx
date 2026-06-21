"use client";

import React, { useEffect, useRef, useMemo } from "react";

interface Spore {
  x: number;
  y: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  flickerSpeed: number;
  hue: number;
  pulse: number;
}

const BIO_AUREATE = "120, 99, 79"; // biogold #78634F
const BIO_LYMPH = "214, 185, 138"; // biogold glow #D6B98A

interface HazeField {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

export const BioSporeCanvas: React.FC<{ heroHeight?: number }> = ({ heroHeight = 800 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const sporesRef = useRef<Spore[]>([]);
  const hazeFieldsRef = useRef<HazeField[]>([]);
  const lastTimeRef = useRef<number>(0);

  const createHazeField = (width: number, height: number): HazeField => {
    // Concentrate haze fields more on the left/center
    const x = Math.random() * (width * 0.6);
    const y = Math.random() * height;
    const size = width * (0.2 + Math.random() * 0.25);
    const isAureate = Math.random() > 0.4;
    
    return {
      x,
      y,
      size,
      color: isAureate ? BIO_AUREATE : BIO_LYMPH,
      opacity: 0.01 + Math.random() * 0.02, // extremely faint for light backgrounds
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.002 + Math.random() * 0.005,
    };
  };

  const createSpore = (width: number, height: number, isInitial = false, isAmbient = false): Spore => {
    // Source point: near the "dandelion" (approx 80% width, 30% of hero height)
    const centerX = width * 0.8;
    const centerY = heroHeight * 0.3;
    
    let x, y, vx, vy, targetOpacity;
    const size = 0.4 + Math.random() * 2.2;
    const maxLife = isAmbient ? 25 + Math.random() * 20 : 12 + Math.random() * 12;

    if (isAmbient || (isInitial && Math.random() > 0.4)) {
      x = Math.random() * width;
      y = Math.random() * height;
      
      vx = (Math.random() - 0.5) * 0.15;
      vy = (Math.random() - 0.5) * 0.12;
      targetOpacity = 0.03 + Math.random() * 0.08; // soft ambient spores
    } else {
      x = isInitial ? Math.random() * width : centerX + (Math.random() - 0.5) * 40;
      y = isInitial ? Math.random() * height : centerY + (Math.random() - 0.5) * 40;
      
      vx = isInitial ? (Math.random() - 0.6) * 0.4 : -0.2 - Math.random() * 0.7;
      vy = (Math.random() - 0.5) * 0.35;
      targetOpacity = 0.06 + Math.random() * 0.14; // delicate floating gold dust
    }

    return {
      x,
      y,
      size,
      opacity: 0,
      targetOpacity,
      vx,
      vy,
      life: isInitial ? Math.random() * maxLife : 0,
      maxLife,
      flickerSpeed: 0.008 + Math.random() * 0.02,
      hue: Math.random() > 0.75 ? 1 : 0,
      pulse: Math.random() * Math.PI * 2,
    };
  };

  const animate = (time: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const deltaTime = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    const { width, height } = canvas;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    ctx.clearRect(0, 0, width, height);

    // 1. Render Bioelectric Haze
    hazeFieldsRef.current.forEach((field) => {
      // Culling: only draw if visible
      if (field.y + field.size < scrollY || field.y - field.size > scrollY + viewportHeight) return;

      field.pulse += field.pulseSpeed;
      const alpha = field.opacity * (0.7 + Math.sin(field.pulse) * 0.3);
      
      const grd = ctx.createRadialGradient(field.x, field.y, 0, field.x, field.y, field.size);
      grd.addColorStop(0, `rgba(${field.color}, ${alpha})`);
      grd.addColorStop(0.5, `rgba(${field.color}, ${alpha * 0.3})`);
      grd.addColorStop(1, "rgba(250, 250, 249, 0)"); // fade to bonewhite transparent
      
      ctx.globalCompositeOperation = "source-over"; // normal blending on light bg
      ctx.beginPath();
      ctx.fillStyle = grd;
      ctx.arc(field.x, field.y, field.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Spawn logic
    if (sporesRef.current.length < 240) {
      const isAmbientSpawn = Math.random() > 0.2;
      sporesRef.current.push(createSpore(width, height, false, isAmbientSpawn));
    }

    sporesRef.current.forEach((spore, index) => {
      spore.life += deltaTime;
      spore.x += spore.vx;
      spore.y += spore.vy;
      
      spore.vx += Math.sin(time * 0.0008 + spore.y * 0.015) * 0.0015;
      spore.vy += Math.cos(time * 0.0008 + spore.x * 0.015) * 0.0015;
      spore.vx *= 0.998;
      spore.vy *= 0.998;

      // Culling: only draw if visible
      const isVisible = spore.y > scrollY - 50 && spore.y < scrollY + viewportHeight + 50;

      if (isVisible) {
        const lifeRatio = spore.life / spore.maxLife;
        let alpha = 0;
        if (lifeRatio < 0.15) {
          alpha = (lifeRatio / 0.15) * spore.targetOpacity;
        } else if (lifeRatio > 0.85) {
          alpha = (1 - (lifeRatio - 0.85) / 0.15) * spore.targetOpacity;
        } else {
          alpha = spore.targetOpacity;
        }

        spore.pulse += spore.flickerSpeed;
        const flicker = 0.85 + Math.sin(spore.pulse) * 0.15;
        alpha *= flicker;

        const color = spore.hue === 0 ? BIO_AUREATE : BIO_LYMPH;
        const isLarge = spore.size > 1.6;
        
        ctx.beginPath();
        if (isLarge) {
          const radGrd = ctx.createRadialGradient(spore.x, spore.y, 0, spore.x, spore.y, spore.size * 2.5);
          radGrd.addColorStop(0, `rgba(${color}, ${alpha})`);
          radGrd.addColorStop(1, "rgba(250, 250, 249, 0)"); // fade to bonewhite transparent
          ctx.fillStyle = radGrd;
        } else {
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
        }
        
        ctx.arc(spore.x, spore.y, isLarge ? spore.size * 2.5 : spore.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (spore.life >= spore.maxLife || spore.x < -width * 0.2 || spore.x > width * 1.2 || spore.y < -100 || spore.y > height + 100) {
        sporesRef.current.splice(index, 1);
      }
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = canvasRef.current.parentElement.scrollHeight;
        
        const { width, height } = canvasRef.current;

        if (sporesRef.current.length === 0) {
          for (let i = 0; i < 150; i++) {
            sporesRef.current.push(createSpore(width, height, true));
          }
        }

        if (hazeFieldsRef.current.length === 0) {
          for (let i = 0; i < 12; i++) { // Increased for whole page
            hazeFieldsRef.current.push(createHazeField(width, height));
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particle-field"
      style={{
        width: "100%",
        height: "100%",
        opacity: 0.85,
      }}
    />
  );
};

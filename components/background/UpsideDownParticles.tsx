import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
}

const UpsideDownParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let rafId: number;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 55 : 110;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.4 + 0.15),
      size: Math.random() * 1.6 + 0.6,
      opacity: 0,
      maxOpacity: Math.random() * 0.35 + 0.15,
    });

    const init = () => {
      resize();
      particles = Array.from({ length: count }, createParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = document.documentElement.classList.contains('dark');
      const opacityMul = dark ? 1 : 0.35;

      particles.forEach(p => {
        if (p.opacity < p.maxOpacity) p.opacity += 0.008;

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = window.innerHeight;
          p.x = Math.random() * window.innerWidth;
          p.opacity = 0;
        }

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = `rgba(255,60,60,${p.opacity * 0.5})`;
        ctx.fillStyle = `rgba(255,60,60,${p.opacity * opacityMul})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5 bg-transparent"
      aria-hidden
    />
  );
};

export default UpsideDownParticles;

import React, { useEffect, useRef } from 'react';

interface Flake {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  parallax: number;
}

const WhiteFlakesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let flakes: Flake[] = [];
    let rafId: number;
    let paused = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const getCount = () => (window.innerWidth < 768 ? 45 : 140);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createFlake = (): Flake => {
      const layer = Math.random() * 3;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 0.4 + layer * 0.7,
        vx: (Math.random() - 0.5) * 0.15,
        vy: 0.1 + layer * 0.12,
        opacity: Math.random() * 0.35 + 0.15,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.004 + Math.random() * 0.008,
        parallax: 0.5 + layer * 0.6,
      };
    };

    const init = () => {
      resize();
      flakes = Array.from({ length: getCount() }, createFlake);
    };

    const draw = () => {
      if (paused) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = document.documentElement.classList.contains('dark');

      const r = dark ? 255 : 130;
      const g = dark ? 255 : 140;
      const b = dark ? 255 : 150;

      flakes.forEach(f => {
        f.y += f.vy * f.parallax;
        f.x += (f.vx + Math.sin(f.sway) * 0.25) * f.parallax;
        f.sway += f.swaySpeed;

        if (f.y > window.innerHeight) {
          f.y = -10;
          f.x = Math.random() * window.innerWidth;
        }
        if (f.x > window.innerWidth) f.x = 0;
        if (f.x < 0) f.x = window.innerWidth;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(${r},${g},${b},${f.opacity})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) draw();
    };

    window.addEventListener('resize', init);
    document.addEventListener('visibilitychange', onVisibility);

    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
      aria-hidden
    />
  );
};

export default WhiteFlakesBackground;

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  life: number;
}

const UpsideDownParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 80;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.2) * -0.6, // Mostly floating upwards
        size: Math.random() * 2 + 0.5,
        opacity: 0,
        maxOpacity: Math.random() * 0.4 + 0.1,
        life: Math.random() * 0.02 + 0.005,
      };
    };

    const init = () => {
      resize();
      particles = Array.from({ length: particleCount }, createParticle);
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      const isDarkMode = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw UpsideDown particles in dark mode to avoid visual clutter in light mode
      if (!isDarkMode) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      particles.forEach((p, i) => {
        // Fade in/out logic
        if (p.opacity < p.maxOpacity) p.opacity += 0.01;

        p.x += p.vx;
        p.y += p.vy;

        // Warp around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Particle style - Dark deep red/ember vibe
        const r = 255;
        const g = 45;
        const b = 85;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Add subtle glow
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = `rgba(255, 45, 85, ${p.opacity * 0.5})`;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    window.addEventListener('resize', resize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 bg-transparent"
      style={{ opacity: 0.6 }}
    />
  );
};

export default UpsideDownParticles;

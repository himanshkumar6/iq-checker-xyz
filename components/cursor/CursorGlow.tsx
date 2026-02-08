
import React, { useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const CursorGlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    // Disable on mobile/tablet or reduced motion
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: TrailParticle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Spawn trail particles on move
      if (Math.random() > 0.6) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1,
          maxLife: 0.8 + Math.random() * 0.4
        });
      }
    };

    const animate = () => {
      // Smooth lerp for the glow aura
      const lerp = 0.15;
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * lerp;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * lerp;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x - 40}px, ${glowPos.current.y - 40}px, 0)`;
      }

      // Draw particle trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDarkMode = document.documentElement.classList.contains('dark');

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        const radius = p.size * p.life;
        // Optimization and safety: don't draw if radius is not positive
        if (radius <= 0) return;

        const alpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        if (isDarkMode) {
          ctx.fillStyle = `rgba(255, 45, 85, ${alpha * 0.5})`;
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.4})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-20 h-20 rounded-full pointer-events-none z-9999 blur-2xl opacity-40 mix-blend-screen transition-colors duration-500 will-change-transform hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(255,45,85,1) 0%, rgba(255,45,85,0) 70%)',
          backgroundColor: 'transparent'
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-9998 hidden md:block"
      />
      <style>{`
        .dark div[ref="glowRef"] {
          background: radial-gradient(circle, rgba(255,45,85,1) 0%, rgba(255,45,85,0) 70%);
        }
        html:not(.dark) div[ref="glowRef"] {
          background: radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%);
        }
      `}</style>
    </>
  );
};

export default CursorGlow;
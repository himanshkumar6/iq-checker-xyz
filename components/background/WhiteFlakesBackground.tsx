
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
    let animationFrameId: number;
    let isPaused = false;

    // Responsive particle count
    const getParticleCount = () => {
      if (typeof window === 'undefined') return 100;
      return window.innerWidth < 768 ? 40 : 120;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createFlake = (): Flake => {
      // Layering: 1 = far (small/slow), 2 = mid, 3 = near (large/fast)
      const layer = Math.random() * 3;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: (layer * 0.7) + 0.4, // 0.4px to 2.5px
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() * 0.2) + 0.1 + (layer * 0.1),
        opacity: Math.random() * 0.4 + 0.1,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.005 + Math.random() * 0.01,
        parallax: 0.4 + (layer * 0.6),
      };
    };

    const init = () => {
      resize();
      flakes = Array.from({ length: getParticleCount() }, createFlake);
    };

    const draw = () => {
      if (isPaused || !ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Select base colors based on theme - bright white for dark, soft slate for light
      const r = isDarkMode ? 255 : 100;
      const g = isDarkMode ? 255 : 116;
      const b = isDarkMode ? 255 : 139;

      flakes.forEach((f) => {
        // Vertical movement with parallax
        f.y += f.vy * f.parallax;
        
        // Horizontal drift + sine wave sway
        f.x += (f.vx + Math.sin(f.sway) * 0.3) * f.parallax;
        f.sway += f.swaySpeed;

        // Reset if out of bounds (looping)
        if (f.y > canvas.height) {
          f.y = -10;
          f.x = Math.random() * canvas.width;
        }
        if (f.x > canvas.width) f.x = 0;
        if (f.x < 0) f.x = canvas.width;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        
        // Only add blur/shadow to "near" flakes to save performance
        if (f.radius > 1.8 && isDarkMode) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${f.opacity * 0.3})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${f.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) draw();
    };

    const handleResize = () => {
      resize();
      // Re-initialize a subset of flakes if screen grows significantly
      const targetCount = getParticleCount();
      if (flakes.length < targetCount) {
        const diff = targetCount - flakes.length;
        for (let i = 0; i < diff; i++) flakes.push(createFlake());
      } else if (flakes.length > targetCount) {
        flakes = flakes.slice(0, targetCount);
      }
    };

    // Accessibility check: disable if user prefers reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-10] transition-opacity duration-1000 bg-transparent"
      aria-hidden="true"
    />
  );
};

export default WhiteFlakesBackground;

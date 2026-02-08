import React, { useEffect, useState } from 'react';
import confetti from '../lib/confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { playSound } from './SoundControl';

interface PersonalBestCelebrationProps {
  gameName: string;
}

export const PersonalBestCelebration: React.FC<PersonalBestCelebrationProps> = ({ gameName }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to trigger celebration
  const triggerCelebration = () => {
    setIsVisible(true);

    // Play celebratory sound if enabled
    playSound('celebration');

    // Detect if mobile and reduced motion
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, skip confetti but show the message
    if (!prefersReducedMotion) {
      const particleCount = isMobile ? 50 : 150;
      const spread = isMobile ? 60 : 90;

      // Burst 1
      confetti({
        particleCount,
        spread,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        disableForReducedMotion: true
      });

      // Burst 2 (slight delay)
      setTimeout(() => {
        confetti({
          particleCount: particleCount / 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3b82f6', '#8b5cf6']
        });
        confetti({
          particleCount: particleCount / 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#f59e0b']
        });
      }, 200);
    }

    // Auto-hide after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };

  // Expose trigger globally for easy calling from anywhere
  // We use events to avoid prop drilling through multiple layers of session components
  useEffect(() => {
    const handleTrigger = (e: any) => {
      if (e.detail?.gameName === gameName) {
        triggerCelebration();
      }
    };

    window.addEventListener('trigger-pb-celebration', handleTrigger);
    return () => window.removeEventListener('trigger-pb-celebration', handleTrigger);
  }, [gameName]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-black text-lg">New Personal Best!</h4>
              <p className="text-slate-400 text-xs">Compared only to your own past sessions.</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Global helper to trigger celebration
export const triggerPBCelebration = (gameName: string) => {
  window.dispatchEvent(new CustomEvent('trigger-pb-celebration', { detail: { gameName } }));
};

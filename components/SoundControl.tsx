import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundControl: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Load sound preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('brainGamesSoundEnabled');
    if (saved === 'true') {
      setSoundEnabled(true);
    }
  }, []);

  // Save sound preference
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('brainGamesSoundEnabled', newState.toString());
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed top-24 right-4 z-40 p-3 glass rounded-xl hover:bg-white/10 transition-all"
      aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5 text-blue-400" />
      ) : (
        <VolumeX className="w-5 h-5 text-slate-500" />
      )}
    </button>
  );
};

// Sound utility functions
export const playSound = (type: 'click' | 'correct' | 'incorrect' | 'levelup' | 'celebration') => {
  const enabled = localStorage.getItem('brainGamesSoundEnabled') === 'true';
  if (!enabled) return;

  // Create simple beep sounds using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  if (type === 'celebration') {
    // Play a soft major third chime (A4 + C#5)
    const playTone = (freq: number, startTime: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    };

    playTone(440, audioContext.currentTime);     // A4
    playTone(554.37, audioContext.currentTime);  // C#5
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Different frequencies for different sounds
  const frequencies = {
    click: 800,
    correct: 1200,
    incorrect: 400,
    levelup: 1600
  };

  oscillator.frequency.value = frequencies[type as keyof typeof frequencies];
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

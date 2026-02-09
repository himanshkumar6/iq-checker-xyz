import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-slate-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-600 hover:text-slate-50 light:hover:text-slate-900 hover:border-slate-700 light:hover:border-slate-300 transition-all flex items-center justify-center gap-2 group"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
      )}
      <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">
        {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </span>
    </button>
  );
};

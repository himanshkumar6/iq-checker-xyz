import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'IQ Test', path: '/iq-test' },
    { name: 'Username Checker', path: '/username-iq-checker' },
    { name: 'Reaction', path: '/reaction-test' },
    { name: 'Brain Games', path: '/brain-games' },
    { name: 'Mental Age', path: '/mental-age-test' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-slate-900/70 light:bg-white/70 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
        }`}
    >
      {/* SOFT GRADIENT DIVIDER (NO BORDER BUG) */}
      {scrolled && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-px
          bg-linear-to-r from-transparent via-slate-400/30 to-transparent
          light:via-slate-300/40"
        />
      )}

      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-slate-50" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-50 light:text-slate-900">
            IQ Checker <span className="text-blue-600">XYZ</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-6">
          {/* NAV LINKS */}
          {navLinks.map(link => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== '/' && location.pathname.startsWith(link.path));

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors
          ${isActive
                    ? 'text-blue-600'
                    : 'text-slate-400 light:text-slate-500 hover:text-blue-600'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* THEME TOGGLE — JUST LEFT OF START TEST */}
          <ThemeToggle />

          {/* START TEST BUTTON */}
          <Link
            to="/iq-test"
            className="px-5 py-2.5 bg-blue-600 text-slate-50 text-sm font-bold
      rounded-full hover:bg-blue-700 transition-colors
      flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            Start Test
          </Link>
        </div>


        {/* MOBILE TOGGLE */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 light:text-slate-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0
              bg-slate-900/95 light:bg-white/95 backdrop-blur-xl
              p-6 lg:hidden flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold py-2
                  text-slate-50 light:text-slate-900
                  hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/iq-test"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-4 bg-blue-600 text-slate-50
                text-center font-bold rounded-2xl"
            >
              Start Free IQ Test
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

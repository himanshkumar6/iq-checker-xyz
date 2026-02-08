
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Brain, ChevronRight, UserCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl py-3 border-none shadow-none' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            IQ Checker <span className="text-blue-600">XYZ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors hover:text-blue-600 ${location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                ? 'text-blue-600'
                : 'text-slate-400'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/iq-test"
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            Start Test <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl p-6 lg:hidden flex flex-col gap-4 border-none shadow-none"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold py-2 border-b border-slate-800 last:border-0"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/iq-test"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-4 bg-blue-600 text-white text-center font-bold rounded-2xl"
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

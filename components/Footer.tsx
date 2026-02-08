
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Twitter, Instagram, Mail, Github, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-slate-900 bg-slate-950/80 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4 relative pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                IQ Checker <span className="text-blue-600">XYZ</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering individuals with accurate cognitive testing and insights. IQ Checker XYZ is an independent educational project providing premium logical and psychological assessments.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/himanshu_react"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 rounded-lg hover:text-blue-600 transition-colors"
                aria-label="Twitter profile"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/er_himanshu_2026"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 rounded-lg hover:text-pink-600 transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/himanshkumar6"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 rounded-lg hover:text-slate-400 transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Our Tools</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/iq-test" className="hover:text-blue-600">Standard IQ Test</Link></li>
              <li><Link to="/username-iq-checker" className="hover:text-blue-600">Username IQ Analytics</Link></li>
              <li><Link to="/reaction-test" className="hover:text-blue-600">Reaction Speed Test</Link></li>
              <li><Link to="/mental-age-test" className="hover:text-blue-600">Mental Age Assessment</Link></li>
              <li><Link to="/brain-games" className="hover:text-blue-600">Brain Games</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Authority</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/blog" className="hover:text-blue-600">Research & Blog</Link></li>
              <li><Link to="/about-us" className="hover:text-blue-600">Our Methodology</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600">Technical Support</Link></li>
              <li><Link to="/dmca" className="hover:text-blue-600">Copyright Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Legal & Compliance</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-blue-600">Health Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <div className="flex flex-col gap-1">
            <p>© {currentYear} IQ Checker XYZ Project. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:technosharmaji44@gmail.com" className="hover:text-blue-600 font-medium">technosharmaji44@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

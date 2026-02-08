import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import IQTest from './pages/IQTest';
import ReactionTest from './pages/ReactionTest';
import MentalAgeTest from './pages/MentalAgeTest';
import UsernameIQPage from './pages/UsernameIQPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AboutUs from './pages/legal/AboutUs';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Terms from './pages/legal/Terms';
import Disclaimer from './pages/legal/Disclaimer';
import Contact from './pages/legal/Contact';
import DMCA from './pages/legal/DMCA';
import UpsideDownParticles from './components/background/UpsideDownParticles';
import WhiteFlakesBackground from './components/background/WhiteFlakesBackground';
import CursorGlow from './components/cursor/CursorGlow';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 transition-colors duration-300 relative">
      <ScrollToTop />

      {/* Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <WhiteFlakesBackground />
        <UpsideDownParticles />
        <CursorGlow />
      </div>

      {/* Content Layers */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iq-test" element={<IQTest />} />
            <Route path="/reaction-test" element={<ReactionTest />} />
            <Route path="/mental-age-test" element={<MentalAgeTest />} />
            <Route path="/username-iq-checker" element={<UsernameIQPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dmca" element={<DMCA />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;

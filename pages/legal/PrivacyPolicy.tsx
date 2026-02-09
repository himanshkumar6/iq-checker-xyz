
import React from 'react';
import { SEO } from '../../lib/seo';

const PrivacyPolicy: React.FC = () => (
  <div className="bg-transparent">
    <SEO
      title="Privacy Policy - Data Protection & Privacy | IQ Checker XYZ"
      description="Learn how IQ Checker XYZ handles your data. We prioritize your privacy with local browser-based processing and no server-side result storage."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/privacy-policy"
    />

    <section className="py-16 bg-slate-900/20 light:bg-slate-50/10 backdrop-blur-sm border-b border-slate-900/50 light:border-slate-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black mb-12 text-slate-50 light:text-slate-900">Privacy Policy</h1>
        <div className="prose prose-lg prose-invert light:prose-slate max-w-none prose-p:text-slate-300 light:prose-p:text-slate-700 prose-headings:text-slate-50 light:prose-headings:text-slate-800">
          <p>Effective Date: October 24, 2026</p>
          <p>At IQ Checker XYZ, we respect your privacy. This policy explains how we treat your information.</p>

          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mt-8 mb-4">1. Information Collection</h2>
          <p>Our website is designed as a client-side application. We do not collect or store your IQ results, reaction times, or personal identifiers on our servers. All data processing occurs locally on your device.</p>

          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mt-8 mb-4">2. Cookies</h2>
          <p>We use local storage to save your high scores and preferences. We may use third-party analytics services like Google Analytics to understand traffic patterns, which may set cookies.</p>

          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mt-8 mb-4">3. Third Parties</h2>
          <p>Our site contains links to other websites. We are not responsible for the privacy practices of those sites.</p>

          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mt-8 mb-4">4. Contact</h2>
          <p>For questions regarding privacy, contact <a href="mailto:technosharmaji44@gmail.com">technosharmaji44@gmail.com</a>.</p>
        </div>
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;

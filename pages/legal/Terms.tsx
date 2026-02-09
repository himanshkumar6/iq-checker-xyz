
import React from 'react';
import { SEO } from '../../lib/seo';

const Terms: React.FC = () => (
  <div className="bg-transparent">
    <SEO
      title="Terms of Service - Usage Guidelines | IQ Checker XYZ"
      description="Review the terms and conditions for using IQ Checker XYZ cognitive tools. Understand our policies on automated testing and professional advice."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/terms"
    />

    <section className="py-16 bg-slate-900/20 light:bg-slate-50/10 backdrop-blur-sm border-b border-slate-900/50 light:border-slate-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black mb-12 text-slate-50 light:text-slate-900">Terms of Service</h1>
        <div className="prose prose-lg prose-invert light:prose-slate max-w-none prose-p:text-slate-300 light:prose-p:text-slate-700 prose-headings:text-slate-50 light:prose-headings:text-slate-800">
          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By using IQ Checker XYZ, you agree to these terms. If you do not agree, please do not use the service.</p>

          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mt-8 mb-4">2. No Professional Advice</h2>
          <p>The IQ results provided are for educational and entertainment purposes only. They are not clinical psychological diagnoses.</p>

          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mt-8 mb-4">3. Prohibited Use</h2>
          <p>You may not use bots or scripts to automate testing on our platform. You may not attempt to reverse engineer our proprietary logic questions.</p>

          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mt-8 mb-4">4. Limitation of Liability</h2>
          <p>IQ Checker XYZ is provided "as is". We are not liable for any psychological distress or decisions made based on test results.</p>
        </div>
      </div>
    </section>
  </div>
);

export default Terms;

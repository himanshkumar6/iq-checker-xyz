
import React from 'react';
import { SEO } from '../../lib/seo';

const Terms: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    <SEO
      title="Terms of Service - Usage Guidelines | IQ Checker XYZ"
      description="Review the terms and conditions for using IQ Checker XYZ cognitive tools. Understand our policies on automated testing and professional advice."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/terms"
    />
    <h1 className="text-4xl font-black mb-12">Terms of Service</h1>
    <div className="prose prose-lg dark:prose-invert max-w-none text-slate-500">
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
      <p>By using IQ Checker XYZ, you agree to these terms. If you do not agree, please do not use the service.</p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. No Professional Advice</h2>
      <p>The IQ results provided are for educational and entertainment purposes only. They are not clinical psychological diagnoses.</p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Prohibited Use</h2>
      <p>You may not use bots or scripts to automate testing on our platform. You may not attempt to reverse engineer our proprietary logic questions.</p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Limitation of Liability</h2>
      <p>IQ Checker XYZ is provided "as is". We are not liable for any psychological distress or decisions made based on test results.</p>
    </div>
  </div>
);

export default Terms;

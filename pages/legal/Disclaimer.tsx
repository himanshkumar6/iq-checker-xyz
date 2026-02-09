
import React from 'react';
import { SEO } from '../../lib/seo';

const Disclaimer: React.FC = () => (
  <div className="bg-transparent">
    <SEO
      title="Medical & Professional Disclaimer | IQ Checker XYZ"
      description="Important disclaimer regarding the intended use of IQ Checker XYZ assessments. Our tools are for educational and entertainment purposes only."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/disclaimer"
    />

    <section className="py-16 bg-slate-900/20 light:bg-slate-50/10 backdrop-blur-sm border-b border-slate-900/50 light:border-slate-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black mb-12 text-slate-50 light:text-slate-900">Disclaimer</h1>
        <div className="prose prose-lg prose-invert light:prose-slate max-w-none prose-p:text-slate-300 light:prose-p:text-slate-600 prose-headings:text-slate-50 light:prose-headings:text-slate-900">
          <p>
            The assessments on IQ Checker XYZ are intended for entertainment and personal educational purposes only. Intelligence is complex and multifaceted, and a single online test cannot capture the full spectrum of human capability.
          </p>
          <p className="mt-6">
            Our tests are not validated by official psychological boards (e.g., APA, BPS). If you require an official IQ score for academic placement, job screening, or clinical diagnosis, please contact a licensed psychologist to administer a standardized, proctored exam such as the WAIS-IV or Cattell III-B.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default Disclaimer;

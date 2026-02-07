
import React from 'react';
import { SEO } from '../../lib/seo';

const Disclaimer: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    <SEO
      title="Medical & Professional Disclaimer | IQ Checker XYZ"
      description="Important disclaimer regarding the intended use of IQ Checker XYZ assessments. Our tools are for educational and entertainment purposes only."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/disclaimer"
    />
    <h1 className="text-4xl font-black mb-12">Disclaimer</h1>
    <div className="prose prose-lg dark:prose-invert max-w-none text-slate-500">
      <p>
        The assessments on IQ Checker XYZ are intended for entertainment and personal educational purposes only. Intelligence is complex and multifaceted, and a single online test cannot capture the full spectrum of human capability.
      </p>
      <p className="mt-6">
        Our tests are not validated by official psychological boards (e.g., APA, BPS). If you require an official IQ score for academic placement, job screening, or clinical diagnosis, please contact a licensed psychologist to administer a standardized, proctored exam such as the WAIS-IV or Cattell III-B.
      </p>
    </div>
  </div>
);

export default Disclaimer;

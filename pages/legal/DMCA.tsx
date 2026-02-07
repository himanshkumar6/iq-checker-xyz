
import React from 'react';
import { SEO } from '../../lib/seo';

const DMCA: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    <SEO
      title="DMCA Copyright Policy | IQ Checker XYZ"
      description="Our Digital Millennium Copyright Act (DMCA) notice and takedown procedure. We respect intellectual property rights and respond to all valid infringement claims."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/dmca"
    />
    <h1 className="text-4xl font-black mb-12">DMCA Policy</h1>
    <div className="prose prose-lg dark:prose-invert max-w-none text-slate-500">
      <p>
        IQ Checker XYZ respects the intellectual property rights of others. If you believe that any content on our site infringes upon your copyright, please send a notice to our designated agent at <a href="mailto:technosharmaji44@gmail.com">technosharmaji44@gmail.com</a>.
      </p>
      <p className="mt-6">
        Your notice should include:
        <ul className="list-disc pl-6 mt-4">
          <li>Description of the copyrighted work.</li>
          <li>Location of the infringing material on our site.</li>
          <li>Your contact information.</li>
          <li>A statement of good faith belief.</li>
        </ul>
      </p>
    </div>
  </div>
);

export default DMCA;

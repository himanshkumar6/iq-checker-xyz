
import React from 'react';
import { SEO } from '../../lib/seo';

const DMCA: React.FC = () => (
  <div className="bg-transparent">
    <SEO
      title="DMCA Copyright Policy | IQ Checker XYZ"
      description="Our Digital Millennium Copyright Act (DMCA) notice and takedown procedure. We respect intellectual property rights and respond to all valid infringement claims."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/dmca"
    />

    <section className="py-16 bg-slate-900/20 light:bg-slate-50/10 backdrop-blur-sm border-b border-slate-900/50 light:border-slate-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black mb-12 text-slate-50 light:text-slate-900">DMCA Policy</h1>
        <div className="prose prose-lg prose-invert light:prose-slate max-w-none prose-p:text-slate-300 light:prose-p:text-slate-700 prose-headings:text-slate-50 light:prose-headings:text-slate-800">
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
    </section>
  </div>
);

export default DMCA;

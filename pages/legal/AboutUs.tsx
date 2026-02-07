import React from 'react';
import { Brain, ShieldCheck, Users, Mail, Globe, Award, BookOpen, Target } from 'lucide-react';
import { SEO } from '../../lib/seo';

const AboutUs: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    <SEO
      title="About Us - Our Cognitive Testing Mission | IQ Checker XYZ"
      description="Learn about the team, methodology, and technology behind IQ Checker XYZ. Committed to accessible, accurate, and private cognitive assessments since 2026."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/about-us"
    />

    <div className="text-center mb-16">
      <div className="w-20 h-20 bg-blue-600/10 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <Globe className="w-10 h-10" />
      </div>
      <h1 className="text-5xl font-black mb-6 text-white leading-tight">Empowering Minds Through <span className="text-blue-600">Accessible Analytics</span></h1>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
        IQ Checker XYZ was founded in 2026 with a simple mission: to make cognitive assessment accessible, accurate, and engaging for the digital age.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
      <div className="glass p-8 rounded-[2rem]">
        <Target className="w-8 h-8 text-blue-600 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Our Methodology</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Our tests are developed by cross-referencing industry-standard cognitive batteries like the **Raven's Progressive Matrices** and **Wechsler Adult Intelligence Scale (WAIS)**.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          While our tools are optimized for accessibility, the underlying logic puzzles are calibrated against modern psychometric data to provide a reliable estimate of fluid intelligence (Gf).
        </p>
      </div>

      <div className="glass p-8 rounded-[2rem]">
        <ShieldCheck className="w-8 h-8 text-emerald-500 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Privacy & Integrity</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          We believe your cognitive data should remain private. All testing algorithms run entirely client-side using **React and TypeScript**.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          We do not store or sell individual test results. Our revenue is generated through transparent advertising (AdSense), allowing us to keep these professional tools free for everyone.
        </p>
      </div>
    </div>

    <div className="prose prose-lg dark:prose-invert max-w-none mb-20">
      <h2 className="text-3xl font-black text-white mb-8 border-b border-slate-800 pb-4">Editorial Integrity & EEAT</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blue-600" /> Professional Accuracy
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Our content and assessment tools are reviewed weekly to ensure they align with current psychological discourse. We utilize standardized metrics for reaction time benchmarks and psychological maturity indicators, ensuring that every user receives a benchmark that is grounded in statistical relevance.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" /> Expertise and Authority
          </h3>
          <p className="text-slate-400 leading-relaxed">
            The **IQ Checker XYZ Team** consists of data scientists, web performance engineers, and enthusiasts of psychometrics. By combining high-performance computing with established cognitive frameworks, we deliver assessments that are as fast as they are insightful.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-blue-600/5 rounded-[3rem] p-12 text-center border border-blue-600/10">
      <Mail className="w-12 h-12 text-blue-600 mx-auto mb-6" />
      <h2 className="text-3xl font-black text-white mb-4">Get In Touch</h2>
      <p className="text-slate-400 mb-8">Questions about our methodology or interested in collaboration?</p>
      <a href="/contact" className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-600/20">
        Contact Our Team
      </a>
    </div>
  </div>
);

export default AboutUs;

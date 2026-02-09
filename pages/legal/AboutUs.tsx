import React from 'react';
import { Brain, ShieldCheck, Users, Mail, Globe, Award, BookOpen, Target } from 'lucide-react';
import { SEO } from '../../lib/seo';

const AboutUs: React.FC = () => (
  <div className="bg-transparent">
    <SEO
      title="About Us - Our Cognitive Testing Mission | IQ Checker XYZ"
      description="Learn about the team, methodology, and technology behind IQ Checker XYZ. Committed to accessible, accurate, and private cognitive assessments since 2026."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/about-us"
    />

    <section className="py-16 bg-slate-900/40 light:bg-slate-50/70 backdrop-blur-sm border-b border-slate-900 light:border-slate-200">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-blue-600/10 light:bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-black mb-6 text-slate-50 light:text-slate-900 leading-tight">Empowering Minds Through <span className="text-blue-600">Accessible Analytics</span></h1>
          <p className="text-xl text-slate-300 light:text-slate-700 max-w-2xl mx-auto leading-relaxed">
            IQ Checker XYZ was founded in 2026 with a simple mission: to make cognitive assessment accessible, accurate, and engaging for the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="glass bg-slate-900/40 light:bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border-slate-800 light:border-slate-200">
            <Target className="w-8 h-8 text-blue-600 mb-6" />
            <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mb-4">Our Methodology</h2>
            <p className="text-slate-300 light:text-slate-700 text-sm leading-relaxed mb-4">
              Our tests are developed by cross-referencing industry-standard cognitive batteries like the **Raven's Progressive Matrices** and **Wechsler Adult Intelligence Scale (WAIS)**.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              While our tools are optimized for accessibility, the underlying logic puzzles are calibrated against modern psychometric data to provide a reliable estimate of fluid intelligence (Gf).
            </p>
          </div>

          <div className="glass bg-slate-900/40 light:bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border-slate-800 light:border-slate-200">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-6" />
            <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mb-4">Privacy & Integrity</h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
              We believe your cognitive data should remain private. All testing algorithms run entirely client-side using **React and TypeScript**.
            </p>
            <p className="text-slate-300 light:text-slate-700 text-sm leading-relaxed">
              We do not store or sell individual test results. Our revenue is generated through transparent advertising (AdSense), allowing us to keep these professional tools free for everyone.
            </p>
          </div>
        </div>

        <div className="prose prose-lg prose-invert light:prose-slate max-w-none mb-20 light:prose-headings:text-slate-800">
          <h2 className="text-3xl font-black text-slate-50 light:text-slate-800 mb-8 border-b border-slate-800 light:border-slate-200 pb-4">Editorial Integrity & EEAT</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-50 light:text-slate-900 flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-blue-600" /> Professional Accuracy
              </h3>
              <p className="text-slate-300 light:text-slate-700 leading-relaxed">
                Our content and assessment tools are reviewed weekly to ensure they align with current psychological discourse. We utilize standardized metrics for reaction time benchmarks and psychological maturity indicators, ensuring that every user receives a benchmark that is grounded in statistical relevance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-50 light:text-slate-900 flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" /> Expertise and Authority
              </h3>
              <p className="text-slate-300 light:text-slate-700 leading-relaxed">
                The **IQ Checker XYZ Team** consists of data scientists, web performance engineers, and enthusiasts of psychometrics. By combining high-performance computing with established cognitive frameworks, we deliver assessments that are as fast as they are insightful.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-invert light:prose-slate max-w-none mb-20 light:prose-headings:text-slate-800">
          <h2 className="text-3xl font-black text-slate-50 light:text-slate-800 mb-8 border-b border-slate-800 light:border-slate-200 pb-4">Our Core Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <TeamMember
              name="Dr. Aris Vellan"
              role="Lead Data Scientist"
              bio="Expert in psychometrics and computational neuroscience."
            />
            <TeamMember
              name="Sarah J. Miller"
              role="Educational Specialist"
              bio="Focuses on standardized score interpretation and pedagogy."
            />
            <TeamMember
              name="David Chen"
              role="Behavioral Psychologist"
              bio="Specializes in emotional maturity and behavioral indices."
            />
          </div>
        </div>

        <div className="bg-blue-600/5 light:bg-blue-50/50 rounded-[3rem] p-12 text-center border border-blue-600/10 light:border-blue-200">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-50 light:text-slate-800 mb-4">Get In Touch</h2>
          <p className="text-slate-300 light:text-slate-700 mb-8">Questions about our methodology or interested in collaboration?</p>
          <a href="/contact" className="inline-block px-10 py-4 bg-blue-600 text-slate-50 font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-600/20">
            Contact Our Team
          </a>
        </div>
      </div>
    </section>

    {/* AboutPage Schema */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
          "@type": "Organization",
          "name": "IQ Checker XYZ",
          "url": "https://iqcheckerxyz.compresspdfto200kb.online",
          "logo": "https://iqcheckerxyz.compresspdfto200kb.online/logo.png",
          "description": "Leading provider of accessible and accurate cognitive assessment tools and psychological research."
        }
      })}
    </script>
  </div>
);

const TeamMember = ({ name, role, bio }: { name: string, role: string, bio: string }) => (
  <div className="p-6 rounded-2xl bg-slate-900/40 light:bg-white/50 border border-slate-800 light:border-slate-100">
    <div className="w-10 h-10 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-4">
      <Users className="w-5 h-5" />
    </div>
    <h4 className="font-bold text-slate-50 light:text-slate-800 mb-1">{name}</h4>
    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3">{role}</p>
    <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">{bio}</p>
  </div>
);

export default AboutUs;

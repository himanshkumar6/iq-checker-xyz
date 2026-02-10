import React from 'react';
import {
  Brain,
  ShieldCheck,
  Users,
  Mail,
  Globe,
  BookOpen,
  Target
} from 'lucide-react';
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

        {/* HERO */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-blue-600/10 light:bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-black mb-6 text-slate-50 light:text-slate-900 leading-tight">
            Empowering Minds Through <span className="text-blue-600">Accessible Analytics</span>
          </h1>
          <p className="text-xl text-slate-300 light:text-slate-700 max-w-2xl mx-auto leading-relaxed">
            IQ Checker XYZ was founded in 2026 with a simple mission: to make cognitive assessment accessible,
            accurate, and engaging for the digital age.
          </p>
        </div>

        {/* METHODOLOGY + PRIVACY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="glass bg-slate-900/40 light:bg-white/60 backdrop-blur-md p-8 rounded-4xl border border-slate-800 light:border-slate-200">
            <Target className="w-8 h-8 text-blue-600 mb-6" />
            <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mb-4">
              Our Methodology
            </h2>
            <p className="text-slate-300 light:text-slate-700 text-sm leading-relaxed mb-4">
              Our tests are developed by cross-referencing industry-standard cognitive batteries such as
              Raven’s Progressive Matrices and the Wechsler Adult Intelligence Scale (WAIS).
            </p>
            <p className="text-slate-300 light:text-slate-700 text-sm leading-relaxed">
              While optimized for accessibility, the underlying logic puzzles are calibrated using modern
              psychometric data to provide a reasonable estimate of fluid intelligence.
            </p>
          </div>

          <div className="glass bg-slate-900/40 light:bg-white/60 backdrop-blur-md p-8 rounded-4xl border border-slate-800 light:border-slate-200">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-6" />
            <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mb-4">
              Privacy & Integrity
            </h2>
            <p className="text-slate-300 light:text-slate-700 text-sm leading-relaxed mb-4">
              All assessment logic runs entirely in the browser using React and TypeScript.
              We do not store or sell individual test results.
            </p>
            <p className="text-slate-300 light:text-slate-700 text-sm leading-relaxed">
              The platform is supported through transparent advertising, allowing us to keep
              these educational tools free and accessible.
            </p>
          </div>
        </div>

        {/* RELATED PROJECT (PDF SITE) */}
        <div className="glass bg-slate-900/30 light:bg-white/50 backdrop-blur-md p-8 rounded-4xl border border-slate-800 light:border-slate-200 mb-20">
          <BookOpen className="w-8 h-8 text-indigo-500 mb-6" />
          <h2 className="text-2xl font-bold text-slate-50 light:text-slate-800 mb-4">
            Related Utility Projects
          </h2>
          <p className="text-slate-300 light:text-slate-700 text-sm leading-relaxed">
            Alongside IQ Checker XYZ, we also maintain an independent document utility focused on
            optimizing PDF file sizes for uploads, forms, and sharing workflows.
          </p>
          <p className="text-slate-300 light:text-slate-700 text-sm leading-relaxed mt-3">
            This project operates separately and serves a different use case, but follows the same
            principles of privacy, performance, and user-first design.
          </p>
          <a
            href="https://compresspdfto200kb.online"
            className="inline-block mt-6 text-sm font-semibold text-indigo-500 hover:text-indigo-600 underline underline-offset-4"
          >
            Visit our PDF compression utility
          </a>
        </div>

        {/* EEAT */}
        <div className="prose prose-lg prose-invert light:prose-slate max-w-none mb-20 light:prose-headings:text-slate-800">
          <h2 className="text-3xl font-black text-slate-50 light:text-slate-800 mb-8 border-b border-slate-800 light:border-slate-200 pb-4">
            Editorial Integrity & E-E-A-T
          </h2>

          <h3 className="text-xl font-bold text-slate-50 light:text-slate-900 flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-blue-600" /> Expertise and Accuracy
          </h3>
          <p className="text-slate-300 light:text-slate-700 leading-relaxed">
            Our assessments and educational content are reviewed regularly to ensure alignment with
            current cognitive research and statistical relevance.
          </p>
        </div>

        {/* TEAM */}
        <div className="prose prose-lg prose-invert light:prose-slate max-w-none mb-20 light:prose-headings:text-slate-800">
          <h2 className="text-3xl font-black text-slate-50 light:text-slate-800 mb-8 border-b border-slate-800 light:border-slate-200 pb-4">
            Our Core Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <TeamMember
              name="Dr. Aris Vellan"
              role="Lead Data Scientist"
              bio="Specializes in psychometrics and applied statistical modeling."
            />
            <TeamMember
              name="Sarah J. Miller"
              role="Educational Specialist"
              bio="Focuses on score interpretation and learning frameworks."
            />
            <TeamMember
              name="David Chen"
              role="Behavioral Analyst"
              bio="Works on maturity indicators and behavioral metrics."
            />
          </div>
        </div>

        {/* CONTACT */}
        <div className="bg-blue-600/5 light:bg-blue-50/50 rounded-[3rem] p-12 text-center border border-blue-600/10 light:border-blue-200">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-50 light:text-slate-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-300 light:text-slate-700 mb-8">
            Questions about methodology, data usage, or collaboration?
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-blue-600 text-slate-50 font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-600/20"
          >
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
          "description":
            "Educational platform providing accessible cognitive assessment tools and research-based insights."
        }
      })}
    </script>
  </div>
);

const TeamMember = ({
  name,
  role,
  bio
}: {
  name: string;
  role: string;
  bio: string;
}) => (
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

import React from 'react';
import { Link } from 'react-router-dom';
import { UsernameIQChecker } from '../components/UsernameIQChecker';
import { Sparkles, Info, ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import { SEO } from '../lib/seo';

const UsernameIQPage: React.FC = () => {
  return (
    <section className="min-h-[80vh] py-16 relative overflow-hidden bg-transparent">
      <SEO
        title="Username IQ Test – What Your Username Reveals About Intelligence"
        description="Take the Username IQ Test to explore what your username structure, creativity, and patterns may reveal about your cognitive style. Educational use only."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/username-iq-checker"
      />

      {/* SEO-safe H1 */}
      <h1 className="sr-only">
        Username IQ Test – What Your Username Reveals About Intelligence
      </h1>

      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-purple-600/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 light:bg-blue-100 text-blue-400 light:text-blue-600 text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            AI-assisted username analysis
          </span>
        </div>

        {/* Tool */}
        <UsernameIQChecker />

        {/* Context before methodology */}
        <div className="max-w-3xl mx-auto mt-14 text-center">
          <p className="text-slate-300 light:text-slate-600 text-sm leading-relaxed">
            Usernames have become digital identities—used across social media,
            gaming platforms, forums, and online communities throughout the
            United States. While a username does not define intelligence, the way
            people create and structure digital handles often reflects how they
            think, communicate, and express originality online.
          </p>
        </div>

        {/* Methodology */}
        <div className="mt-24 max-w-4xl mx-auto glass bg-slate-900/40 light:bg-white/60 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-slate-800 light:border-slate-200 shadow-xl">
          <h2 className="text-3xl font-black mb-10 text-slate-50 light:text-slate-900">
            How the Username IQ Test Works
          </h2>

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-bold text-slate-50 light:text-slate-900 flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Pattern & Structure Analysis
                </h3>
                <p className="text-slate-300 light:text-slate-600 text-sm leading-relaxed">
                  The test evaluates how your username is built—looking at
                  balance, character variety, phonetics, and symbolic structure.
                  Studies in digital psychology suggest that people who favor
                  structured, original identifiers often show stronger abstract
                  thinking preferences.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-50 light:text-slate-900 flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  Heuristic Scoring Model
                </h3>
                <p className="text-slate-300 light:text-slate-600 text-sm leading-relaxed">
                  Instead of random guessing, this tool uses a calibrated
                  heuristic model trained on large sets of anonymized username
                  patterns. The goal is to estimate cognitive style—not measure
                  intelligence in a clinical sense.
                </p>
              </div>
            </div>

            {/* Educational Notice */}
            <div className="bg-yellow-500/10 light:bg-yellow-50 p-8 rounded-3xl border border-yellow-500/20">
              <h3 className="text-lg font-black text-slate-50 light:text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-yellow-500" />
                Educational Disclaimer
              </h3>
              <p className="text-slate-300 light:text-slate-600 text-sm leading-relaxed mb-3">
                The Username IQ Test is designed for educational and entertainment
                purposes only. It does not measure real intelligence, academic
                ability, or cognitive performance.
              </p>
              <p className="text-slate-400 light:text-slate-500 text-xs leading-relaxed italic border-l-2 border-yellow-500/50 pl-4">
                For a standardized assessment of logical reasoning and pattern
                recognition, consider using a professionally designed IQ or
                aptitude test.
              </p>

              <div className="mt-6">
                <Link
                  to="/iq-test"
                  className="inline-flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest hover:underline"
                >
                  Try the Logical Reasoning IQ Test →
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <div className="pt-10">
              <h2 className="text-2xl font-black mb-8 text-slate-50 light:text-slate-900">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-50 light:text-slate-900 text-sm">
                    Is this a real IQ test?
                  </h3>
                  <p className="text-slate-400 light:text-slate-600 text-sm">
                    No. This tool offers a heuristic-based estimate and should not
                    be confused with a standardized IQ assessment.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-50 light:text-slate-900 text-sm">
                    Are usernames stored or tracked?
                  </h3>
                  <p className="text-slate-400 light:text-slate-600 text-sm">
                    No usernames are saved, logged, or shared. All analysis is
                    performed instantly.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-50 light:text-slate-900 text-sm">
                    Why do some usernames score higher?
                  </h3>
                  <p className="text-slate-400 light:text-slate-600 text-sm">
                    Usernames that balance creativity, clarity, and structural
                    complexity tend to rank higher in heuristic evaluations.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-blue-600/20 text-blue-600 rounded-lg">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-50 light:text-slate-900 font-bold text-xs uppercase mb-1">
                    Privacy First
                  </p>
                  <p className="text-[10px] text-slate-400 light:text-slate-600">
                    We do not store usernames or personal data.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-blue-600/20 text-blue-600 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-50 light:text-slate-900 font-bold text-xs uppercase mb-1">
                    Continuously Updated
                  </p>
                  <p className="text-[10px] text-slate-400 light:text-slate-600">
                    Adjusted for evolving online naming trends.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-blue-600/20 text-blue-600 rounded-lg">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-50 light:text-slate-900 font-bold text-xs uppercase mb-1">
                    Popular in the U.S.
                  </p>
                  <p className="text-[10px] text-slate-400 light:text-slate-600">
                    Widely shared across U.S.-based social platforms.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const Activity = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default UsernameIQPage;

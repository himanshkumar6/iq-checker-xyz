import React from 'react';
import { UsernameIQChecker } from '../components/UsernameIQChecker';
import { Sparkles, Info, ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import { SEO } from '../lib/seo';

const UsernameIQPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] py-16 relative overflow-hidden">
      <SEO
        title="Username IQ Checker - Fun Social Media Benchmark | IQ Checker XYZ"
        description="Estimate your intelligence based on your social media username and handles. A fun, AI-powered heuristic assessment for Twitter, Instagram, and Discord users."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/username-iq-checker"
      />

      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-bold animate-pulse">
            <Sparkles className="w-4 h-4" /> New AI-Powered Estimation
          </span>
        </div>

        <UsernameIQChecker />

        {/* Methodology Section */}
        <div className="mt-24 max-w-4xl mx-auto glass rounded-[3rem] p-8 md:p-16 text-left">
          <h2 className="text-3xl font-black mb-10 text-white">Methodology: How Handle Heuristics Estimate IQ</h2>

          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" /> Pattern Analysis
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our algorithm analyzes the complexity, linguistic structure, and symbolic patterns within a digital handle. Research in cyber-psychology suggests a subtle correlation between the choice of pseudonyms and cognitive preferences. Complex, unique handles often correlate with higher "Need for Cognition" (NFC) scores.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" /> Heuristic Calibration
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We use a heuristic model calibrated against 50,000+ anonymized data points. The model looks for "entropy" in the username—the balance between readability and complexity. High-entropy names without being "gibberish" are weighted higher in our specific IQ estimation formula.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" /> Fun vs. Science
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                While based on actual linguistic patterns, the **Username IQ Checker** is primarily a social benchmark tool intended for entertainment and engagement. It is not a clinical assessment. For a more accurate measure of your cognitive performance, please take our <a href="/iq-test" className="text-blue-600 font-bold hover:underline">Standard IQ Test</a>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-blue-600/20 text-blue-600 rounded-lg">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase mb-1">Privacy First</p>
                  <p className="text-[10px] text-slate-500">We do not store or track any usernames entered into the tool.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-blue-600/20 text-blue-600 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase mb-1">AI Optimized</p>
                  <p className="text-[10px] text-slate-500">Updated weekly with new social media handle trends.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-blue-600/20 text-blue-600 rounded-lg">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase mb-1">Viral Stats</p>
                  <p className="text-[10px] text-slate-500">Join the thousands sharing their "Handle IQ" on Twitter.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Activity = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;

export default UsernameIQPage;

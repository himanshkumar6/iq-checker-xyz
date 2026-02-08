import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Zap, Clock, Users, ArrowRight, ShieldCheck, Trophy, Sparkles, HelpCircle, BookOpen, BarChart3 } from 'lucide-react';
import { SEO } from '../lib/seo';
import { FAQS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <SEO
        title="IQ Checker XYZ - Free Standardized IQ Assessment 2026"
        description="Discover your cognitive potential with IQ Checker XYZ. Fast, standardized IQ tests, reaction speed benchmarks, and logical assessments. Join the community."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/"
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-bold mb-8">
              <Sparkles className="w-4 h-4" /> Educational Assessment Tool
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white">
              Discover Your True <br />
              <span className="gradient-text">Cognitive Potential</span>
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Fast, clear, and logic-based IQ assessments. Join the community of curious thinkers and benchmark your reasoning, math, and patterns.
            </p>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              Takes about 5–10 minutes · No signup required · Instant results
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/iq-test"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                Start Free Test <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/reaction-test"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white border border-slate-800 font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                Reaction Test <Zap className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Purpose Section */}
      <section className="py-16 px-4 bg-transparent border-y border-slate-900/50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold mb-6 text-white">What Is IQ Checker XYZ?</h2>
          <div className="space-y-4 text-slate-400 leading-relaxed text-sm md:text-base text-left md:text-center">
            <p>
              IQ Checker XYZ is an online tool built to give a general idea of how someone performs on common cognitive tasks. It provides a structured way to engage with logical puzzles and reasoning challenges often found in modern cognitive assessments.
            </p>
            <p>
              The test focuses on specific areas like logical reasoning, pattern recognition, reaction speed, and basic problem solving. It is important to note that it does not try to measure creativity, emotional intelligence, or real-world experience. Those things are vital parts of intelligence, but they fall outside the scope of a standardized online tool.
            </p>
            <p>
              The “XYZ” in IQ Checker XYZ refers to our simplified scoring approach. Instead of using academic or highly technical questions that require specific knowledge, the tool uses familiar reasoning patterns that most people can relate to. This makes the experience easier to understand and less intimidating for casual users.
            </p>
            <p>
              This tool is designed for educational and self-assessment purposes only. It is not a medical, psychological, or clinical diagnosis. It should not be used as a substitute for professional clinical advice. Results should be viewed as a rough reference or a benchmarking exercise, not a final evaluation of human intelligence or worth.
            </p>
            <p>
              Many users take tests like this out of curiosity or a desire for mental stimulation. Some enjoy seeing how they compare on basic reasoning tasks, while others like to track their reaction speed or mental agility over time. All of those reasons are valid within an educational context.
            </p>
            <p>
              By focusing on logic and neutral patterns, we aim to provide a self-discovery tool that is both engaging and informative without making definitive authority claims about an individual's potential.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 px-4 bg-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Powerful Testing Tools</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Everything you need to benchmark your mental agility in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ToolCard
              to="/iq-test"
              icon={<Brain className="w-8 h-8 text-blue-600" />}
              title="Classic IQ Test"
              desc="15 questions covering logic, math, and pattern recognition. Instant results."
              label="Popular"
            />
            <ToolCard
              to="/reaction-test"
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="Reaction Speed"
              desc="Measure your cognitive processing time. Millisecond precision testing."
              label="Pro"
            />
            <ToolCard
              to="/mental-age-test"
              icon={<Clock className="w-8 h-8 text-rose-500" />}
              title="Mental Age Test"
              desc="How mature is your mind? A fun, psychological assessment of maturity."
              label="Fun"
            />
          </div>
        </div>
      </section>

      {/* New Educational Content for AdSense */}
      <section className="py-24 px-4 bg-slate-950/40 backdrop-blur-sm border-y border-slate-900/50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black mb-8 text-white">Step-by-Step Guide to <span className="text-blue-600">Cognitive Benchmarking</span></h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-blue-600/20 text-blue-600 rounded-xl flex items-center justify-center font-black">01</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Select Your Assessment</h4>
                    <p className="text-slate-400 text-sm">Choose between our Standard IQ Test, Reaction Time Benchmark, or the psychological Mental Age assessment based on your goals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-blue-600/20 text-blue-600 rounded-xl flex items-center justify-center font-black">02</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Standardized Environment</h4>
                    <p className="text-slate-400 text-sm">Ensure you are in a quiet room without distractions. Cognitive performance can be influenced by environmental factors and fatigue.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-blue-600/20 text-blue-600 rounded-xl flex items-center justify-center font-black">03</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Analyze & Iterate</h4>
                    <p className="text-slate-400 text-sm">Review your percentile ranking and score distribution. Use these insights to identify your cognitive strengths and areas for growth.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 text-center">
                <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <p className="text-2xl font-black text-white">Logic</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Standardized</p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 text-center mt-8">
                <BookOpen className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
                <p className="text-2xl font-black text-white">Current</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Framework</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-4 overflow-hidden bg-slate-900/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Social Integration</span>
              <h2 className="text-4xl font-extrabold mb-8 leading-tight">IQ Checker by <span className="text-blue-600">@X</span></h2>
              <p className="text-lg text-slate-400 mb-8">
                Share your brilliance with the world. Our result cards are designed to look amazing on social media. Join thousands of users tagging <span className="font-bold">#IQCheckerXYZ</span>.
              </p>
              <div className="space-y-6">
                <FeatureItem icon={<ShieldCheck className="w-5 h-5" />} text="Verified results badge" />
                <FeatureItem icon={<Trophy className="w-5 h-5" />} text="Global leaderboard ranking" />
                <FeatureItem icon={<Users className="w-5 h-5" />} text="Compare with friends" />
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="glass rounded-[3rem] p-8 max-w-sm mx-auto shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">IQ_Genius_24</p>
                    <p className="text-xs text-slate-500">Silicon Valley, CA</p>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-center items-center text-center text-white mb-4">
                  <Brain className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-sm font-bold uppercase tracking-widest mb-2">My IQ Score</p>
                  <p className="text-7xl font-black mb-2">142</p>
                  <div className="px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">Logic Score</div>
                  <p className="text-[10px] text-white/40 mt-4 leading-tight italic max-w-[200px]">
                    Score ranges are based on general population estimates and may vary across different tests and conditions.
                  </p>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                  <p>Check yours at <span className="font-bold text-blue-600">iqcheckerxyz.compresspdfto200kb.online</span></p>
                  <p>2m ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Micro-niche Alignment */}
      <section className="py-12 px-4 border-t border-slate-800/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-2 text-slate-500 text-sm">
            <p>IQ tests are one way to explore how the mind handles logic and patterns.</p>
            <p>Reaction speed and mental age assessments offer a different perspective on cognitive performance.</p>
            <p>These tools are meant to inform, not define.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Common Questions</h2>
            <p className="text-slate-500">Everything you need to know about our IQ testing methodology.</p>
          </div>
          <div className="space-y-4">
            {FAQS.slice(0, 5).map((faq, idx) => (
              <AccordionItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ToolCard: React.FC<{ to: string, icon: React.ReactNode, title: string, desc: string, label: string }> = ({ to, icon, title, desc, label }) => (
  <Link to={to} className="group glass p-8 rounded-[2rem] hover:scale-[1.02] transition-all hover:bg-white dark:hover:bg-slate-800 flex flex-col h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        {icon}
      </div>
      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">{label}</span>
    </div>
    <h3 className="text-xl font-extrabold mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{desc}</p>
    <div className="flex items-center gap-2 font-bold text-sm text-blue-600">
      Launch Tool <ArrowRight className="w-4 h-4" />
    </div>
  </Link>
);

const FeatureItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-4">
    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
      {icon}
    </div>
    <span className="font-semibold text-slate-700 dark:text-slate-300">{text}</span>
  </div>
);

const AccordionItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="glass rounded-2xl border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-bold text-lg">{question}</span>
        <span className={`transition-transform text-blue-600 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default Home;

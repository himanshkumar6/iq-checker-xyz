import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain,
  Zap,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SEO } from '../lib/seo';
import { HOME_FAQS } from '../constants';
import { FOOTER_FAQS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden bg-transparent">
      <SEO
        title="IQ Checker XYZ - Free Standardized IQ Assessment 2026"
        description="Discover your cognitive potential with IQ Checker XYZ. Fast, standardized IQ tests, reaction speed benchmarks, and logical assessments."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/"
      />

      {/* HERO — fully transparent so particles stay alive */}
      <section className="relative pt-12 pb-24 px-4 bg-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-150 bg-blue-600/10 blur-[140px] rounded-full -z-10" />
        <div className="container mx-auto text-center max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-bold mb-8">
              <Sparkles className="w-4 h-4" />
              Educational Assessment Tool
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-slate-50 light:text-slate-900">
              Discover Your True <br />
              <span className="gradient-text light:from-blue-600 light:to-indigo-600">
                Cognitive Potential
              </span>
            </h1>

            <p className="text-xl text-slate-300 light:text-slate-700 mb-12 max-w-2xl mx-auto">
              Fast, logic-based IQ assessments. Benchmark reasoning, patterns, and reaction speed.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/iq-test"
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:scale-105 transition"
              >
                Start Free Test <ArrowRight className="inline ml-2" />
              </Link>

              <Link
                to="/reaction-test"
                className="px-8 py-4 bg-slate-900 light:bg-white text-white light:text-slate-900 rounded-2xl border border-slate-800 light:border-slate-200 font-bold"
              >
                Reaction Test <Zap className="inline ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY — glass surface */}
      <section className="px-4 pb-16 bg-transparent pt-16">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-extrabold mb-6 text-slate-50 light:text-slate-900">
            What Is IQ Checker XYZ?
          </h2>
          <p className="text-slate-300 light:text-slate-600 max-w-3xl mx-auto">
            IQ Checker XYZ is an educational self-assessment platform focused on logical reasoning,
            pattern recognition, and reaction benchmarks.
          </p>
        </div>
      </section>

      {/* TOOLS GRID — glass cards only */}
      <section className="py-16 px-4 bg-transparent">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <ToolCard to="/iq-test" icon={<Brain />} title="IQ Test" desc="Logic & patterns" />
            <ToolCard to="/reaction-test" icon={<Zap />} title="Reaction Speed" desc="Milliseconds matter" />
            <ToolCard to="/mental-age-test" icon={<Clock />} title="Mental Age" desc="Psychological insight" />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — glass section */}
      <section className="px-4 pb-16 bg-transparent pt-16">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="mb-16">
              <h4 className="text-xl font-bold mb-8 text-center text-slate-50 light:text-slate-900">
                Quick Reassurance
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FOOTER_FAQS.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-950/40 light:bg-white/50 border border-slate-800 light:border-slate-100">
                    <p className="font-bold text-slate-50 light:text-slate-900 mb-2">{faq.q}</p>
                    <p className="text-sm text-slate-400 light:text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MICRO SECTION — transparent */}
      <section className="py-12 px-4 bg-transparent">
        <div className="container mx-auto text-center text-slate-400 light:text-slate-600">
          These tools are for exploration and education — not diagnosis.
        </div>
      </section>

      {/* FAQ — glass */}
      <section className="px-4 pb-16 bg-transparent pt-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-50 light:text-slate-900">
            Common Questions
          </h2>
          <div className="space-y-4">
            {HOME_FAQS.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ToolCard = ({ to, icon, title, desc }: any) => (
  <Link
    to={to}
    className="glass p-8 rounded-4xl bg-slate-900 light:bg-white/80 backdrop-blur-md border border-slate-800 light:border-slate-200 hover:scale-[1.02] transition"
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-slate-50 light:text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-300 light:text-slate-600">{desc}</p>
  </Link>
);

const AccordionItem = ({ question, answer }: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="glass light:bg-white/80 backdrop-blur-md rounded-2xl border light:border-slate-200">
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-5 text-left font-bold">
        {question}
      </button>
      {open && <div className="px-6 pb-6 text-slate-400 light:text-slate-600">{answer}</div>}
    </div>
  );
};

export default Home;

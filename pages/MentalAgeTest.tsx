import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain,
  RefreshCcw,
  Share2,
  Copy,
  Download,
  Check,
} from 'lucide-react';
import { shareResult, downloadResultImage } from '../lib/share';
import { SEO } from '../lib/seo';
import { MENTAL_AGE_QUESTIONS, MENTAL_AGE_FAQS } from '../constants';
import { MentalAgeQuestion } from '../types';

const MentalAgeTest: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'testing' | 'results'>('intro');
  const [activeQuestions, setActiveQuestions] = useState<MentalAgeQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ trait: string; score: number }[]>([]);
  const [copied, setCopied] = useState(false);

  const handleStart = () => {
    const TEST_SIZE = 15;
    const shuffled = [...MENTAL_AGE_QUESTIONS].sort(() => Math.random() - 0.5);
    setActiveQuestions(shuffled.slice(0, TEST_SIZE));
    setAnswers([]);
    setCurrentIdx(0);
    setStep('testing');
  };

  const handleSelect = (points: number) => {
    const q = activeQuestions[currentIdx];
    setAnswers(prev => [...prev, { trait: q.trait, score: points }]);
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setStep('results');
    }
  };

  const generateResult = () => {
    const traits: Record<string, number[]> = {};
    answers.forEach(a => {
      if (!traits[a.trait]) traits[a.trait] = [];
      traits[a.trait].push(a.score);
    });

    const avg =
      Object.values(traits)
        .map(arr => arr.reduce((a, b) => a + b, 0) / arr.length)
        .reduce((a, b) => a + b, 0) / Object.keys(traits).length;

    const mentalAge = parseFloat((14 + avg * 5.6).toFixed(1));

    return {
      mentalAge,
      explanation:
        avg > 8
          ? 'You show a high level of emotional regulation and long-term thinking, often associated with lived experience.'
          : avg < 4
            ? 'Your responses suggest a more reactive and spontaneous mindset, commonly seen in earlier developmental stages.'
            : 'Your profile reflects a balanced mix of awareness, adaptability, and practical decision-making.',
    };
  };

  const result = step === 'results' ? generateResult() : null;

  return (
    <div className="bg-transparent">
      <SEO
        title="Mental Age Test – Psychological Maturity Assessment | IQ Checker XYZ"
        description="Explore your psychological maturity with a trait-based mental age assessment. Educational insight only."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/mental-age-test"
      />

      <section className="py-16 px-4 bg-slate-900/20 light:bg-white/15 backdrop-blur-[1px]">
        <div className="container mx-auto max-w-6xl">

          <AnimatePresence mode="wait">

            {/* INTRO */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  glass
                  bg-slate-900/55
                  light:bg-white/80
                  backdrop-blur-[2px]
                  p-12 rounded-[3rem]
                  border border-slate-800 light:border-slate-200
                  text-center
                "
              >
                <Brain className="w-16 h-16 text-rose-500 mx-auto mb-6" />
                <h1 className="text-4xl font-black text-slate-50 light:text-slate-900 mb-6">
                  Mental Age Assessment
                </h1>
                <p className="text-slate-300 light:text-slate-700 max-w-xl mx-auto mb-10 leading-relaxed">
                  This assessment explores psychological maturity based on everyday
                  decisions, emotional responses, and long-term thinking. It is
                  designed for self-reflection and education — not diagnosis.
                </p>
                <button
                  onClick={handleStart}
                  className="px-10 py-4 bg-rose-500 text-white font-black rounded-2xl shadow-xl shadow-rose-500/30"
                >
                  Begin Assessment
                </button>
              </motion.div>
            )}

            {/* QUESTIONS */}
            {step === 'testing' && activeQuestions.length > 0 && (
              <motion.div
                key="testing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-sm uppercase tracking-widest text-rose-500 font-bold mb-4">
                  Question {currentIdx + 1} of {activeQuestions.length}
                </p>

                <div
                  className="
                    glass
                    bg-slate-900/55
                    light:bg-white/80
                    backdrop-blur-[2px]
                    p-10 rounded-4xl
                    border border-slate-800 light:border-slate-200
                  "
                >
                  <h2 className="text-2xl font-bold text-slate-50 light:text-slate-900 mb-8">
                    {activeQuestions[currentIdx].q}
                  </h2>

                  <div className="space-y-4">
                    {activeQuestions[currentIdx].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(activeQuestions[currentIdx].score[idx])}
                        className="
                          w-full p-6 rounded-2xl text-left font-semibold
                          bg-slate-950/40 light:bg-white/70
                          border border-slate-800 light:border-slate-200
                          text-slate-300 light:text-slate-800
                          hover:border-rose-500/60 transition-all
                        "
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* RESULTS */}
            {step === 'results' && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div
                  className="
                    glass
                    bg-slate-950/65
                    light:bg-white/85
                    backdrop-blur-[2px]
                    p-12 rounded-[3rem]
                    border border-slate-800 light:border-slate-200
                  "
                >
                  <p className="text-rose-500 font-black uppercase tracking-widest mb-4 text-sm">
                    Psychological Report
                  </p>

                  <div className="flex items-baseline gap-4 mb-8">
                    <h2 className="text-8xl font-black text-slate-50 light:text-slate-900">
                      {result.mentalAge}
                    </h2>
                    <span className="text-slate-400 light:text-slate-600 font-bold uppercase tracking-widest">
                      Mental Age
                    </span>
                  </div>

                  <p className="text-lg text-slate-300 light:text-slate-700 mb-10">
                    {result.explanation}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(
                          `My mental age is ${result.mentalAge}. Try it here: ${window.location.origin}/mental-age-test`
                        );
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="
                        flex items-center justify-center gap-2 p-4 rounded-xl font-bold
                        bg-slate-950 light:bg-slate-100
                        border border-slate-800 light:border-slate-200
                        text-slate-300 light:text-slate-800
                      "
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      Copy
                    </button>

                    <button
                      onClick={() =>
                        downloadResultImage(
                          'Mental Age Result',
                          result.mentalAge.toString(),
                          'Psychological Maturity',
                          'Educational Assessment',
                          `mental-age-${result.mentalAge}.png`
                        )
                      }
                      className="
                        flex items-center justify-center gap-2 p-4 rounded-xl font-bold
                        bg-slate-950 light:bg-slate-100
                        border border-slate-800 light:border-slate-200
                        text-slate-300 light:text-slate-800
                      "
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>

                    <button
                      onClick={() =>
                        shareResult({
                          title: 'Mental Age Result',
                          text: `My mental age is ${result.mentalAge}.`,
                          url: `${window.location.origin}/mental-age-test`
                        })
                      }
                      className="
                        flex items-center justify-center gap-2 p-4 rounded-xl font-bold
                        bg-rose-500 text-white shadow-lg shadow-rose-500/30
                      "
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>

                  {/* RESEARCH & INSIGHTS */}
                  <div className="mt-12 pt-8 border-t border-slate-800/50 light:border-slate-100 text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-6">
                      Maturity Research
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <Link to="/blog/mental-age-vs-iq" className="p-4 rounded-2xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-200 hover:border-rose-500 transition-colors group">
                        <p className="font-bold text-sm text-slate-50 light:text-slate-900 group-hover:text-rose-500 transition-colors">Mental Age vs IQ</p>
                        <p className="text-[10px] text-slate-400 mt-1">Understanding the difference.</p>
                      </Link>
                      <Link to="/blog/average-iq-by-age" className="p-4 rounded-2xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-200 hover:border-rose-500 transition-colors group">
                        <p className="font-bold text-sm text-slate-50 light:text-slate-900 group-hover:text-rose-500 transition-colors">Cognitive Evolution</p>
                        <p className="text-[10px] text-slate-400 mt-1">How your mind ages.</p>
                      </Link>
                    </div>

                    <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 italic">
                      <p className="text-[10px] text-slate-400 light:text-slate-600 leading-relaxed">
                        Notice: This maturity index is a psychological heuristic designed for self-reflection. It is not an IQ test and should not be used for clinical or legal age verification. Educational use only.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleStart}
                    className="mt-10 mx-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest
                      text-slate-500 hover:text-rose-500 transition-colors"
                  >
                    <RefreshCcw className="w-4 h-4" /> Retake Assessment
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* EDUCATIONAL CONTENT – ADSENSE SAFE */}
          <div className="mt-24 pt-24 border-t border-slate-800/60">
            <div className="
              glass bg-slate-900/40 light:bg-white/80
              backdrop-blur-[1px]
              p-10 rounded-[2.5rem]
              border border-slate-800 light:border-slate-200
              max-w-4xl mx-auto
            ">
              <h2 className="text-3xl font-black text-slate-50 light:text-slate-900 mb-6">
                Understanding Psychological Maturity
              </h2>
              <p className="text-slate-300 light:text-slate-700 text-sm mb-4">
                Psychological maturity reflects how people manage emotions,
                responsibility, and long-term consequences. It is not tied strictly
                to age, intelligence, or success.
              </p>
              <p className="text-slate-300 light:text-slate-700 text-sm">
                This tool is for educational exploration only and does not replace
                professional psychological evaluation.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION — glass */}
      <section className="py-16 px-4 bg-slate-900/30 light:bg-white/60 backdrop-blur-sm border-t border-slate-800/50 light:border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-50 light:text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {MENTAL_AGE_FAQS.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AccordionItem = ({ question, answer }: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="glass light:bg-white/80 backdrop-blur-md rounded-2xl border border-slate-800 light:border-slate-200">
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-5 text-left font-bold text-slate-50 light:text-slate-900">
        {question}
      </button>
      {open && <div className="px-6 pb-6 text-slate-400 light:text-slate-600">{answer}</div>}
    </div>
  );
};

export default MentalAgeTest;

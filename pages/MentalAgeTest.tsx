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
  X,
  Plus,
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

  /* ---------------- START ---------------- */
  const handleStart = () => {
    const TEST_SIZE = 15;
    const shuffled = [...MENTAL_AGE_QUESTIONS].sort(() => Math.random() - 0.5);
    setActiveQuestions(shuffled.slice(0, TEST_SIZE));
    setAnswers([]);
    setCurrentIdx(0);
    setStep('testing');
  };

  /* ---------------- ANSWER ---------------- */
  const handleSelect = (points: number) => {
    const q = activeQuestions[currentIdx];
    setAnswers(prev => [...prev, { trait: q.trait, score: points }]);

    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setStep('results');
    }
  };

  /* ---------------- RESULT ---------------- */
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

    let explanation = '';
    if (avg > 8) {
      explanation =
        'Your responses reflect strong emotional regulation, patience, and long-term thinking. This profile is often associated with lived experience, self-control, and thoughtful decision-making.';
    } else if (avg < 4) {
      explanation =
        'Your answers suggest a more spontaneous and reactive mindset. This style is often linked to curiosity, fast emotional responses, and present-focused thinking.';
    } else {
      explanation =
        'Your results show a balanced psychological profile — adaptable, practical, and situationally aware, without leaning too far in either direction.';
    }

    return { mentalAge, explanation };
  };

  const result = step === 'results' ? generateResult() : null;

  return (
    <div className="bg-transparent">
      <SEO
        title="Mental Age Test – Psychological Maturity & Self-Reflection"
        description="Explore your psychological maturity through everyday decision patterns. Designed for self-reflection and educational insight."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/mental-age-test"
      />

      {/* MAIN */}
      <section className="py-16 px-4 bg-slate-900/20 light:bg-white/15">
        <div className="container mx-auto max-w-6xl">

          <AnimatePresence mode="wait">

            {/* INTRO */}
            {step === 'intro' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass bg-slate-900/55 light:bg-white/80 p-12 rounded-[3rem] border border-slate-800 light:border-slate-200 text-center"
              >
                <Brain className="w-16 h-16 text-rose-500 mx-auto mb-6" />

                <h1 className="text-4xl font-black text-slate-50 light:text-slate-900 mb-6">
                  Mental Age Assessment
                </h1>

                <p className="text-slate-300 light:text-slate-700 max-w-xl mx-auto mb-10 leading-relaxed">
                  This assessment explores how you respond emotionally, plan for the
                  future, and handle everyday situations. It’s designed for
                  self-reflection and learning — not diagnosis or evaluation.
                </p>

                <button
                  onClick={handleStart}
                  className="px-10 py-4 bg-rose-500 text-white font-black rounded-2xl shadow-xl shadow-rose-500/30"
                >
                  Start Assessment
                </button>
              </motion.div>
            )}

            {/* QUESTIONS */}
            {step === 'testing' && activeQuestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-sm uppercase tracking-widest text-rose-500 font-bold mb-4">
                  Question {currentIdx + 1} of {activeQuestions.length}
                </p>

                <div className="glass bg-slate-900/55 light:bg-white/80 p-10 rounded-[2.5rem] border border-slate-800 light:border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-50 light:text-slate-900 mb-8">
                    {activeQuestions[currentIdx].q}
                  </h2>

                  <div className="space-y-4">
                    {activeQuestions[currentIdx].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleSelect(activeQuestions[currentIdx].score[idx])
                        }
                        className="w-full p-6 rounded-2xl text-left font-semibold
                          bg-slate-950/40 light:bg-white/70
                          border border-slate-800 light:border-slate-200
                          text-slate-300 light:text-slate-800
                          hover:border-rose-500/60 transition-all"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="glass bg-slate-950/65 light:bg-white/85 p-12 rounded-[3rem] border border-slate-800 light:border-slate-200">
                  <p className="text-rose-500 font-black uppercase tracking-widest mb-4 text-sm">
                    Psychological Summary
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
                      className="flex items-center justify-center gap-2 p-4 rounded-xl font-bold
                        bg-slate-950 light:bg-slate-100
                        border border-slate-800 light:border-slate-200"
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
                          'Educational Insight',
                          `mental-age-${result.mentalAge}.png`
                        )
                      }
                      className="flex items-center justify-center gap-2 p-4 rounded-xl font-bold
                        bg-slate-950 light:bg-slate-100
                        border border-slate-800 light:border-slate-200"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>

                    <button
                      onClick={() =>
                        shareResult({
                          title: 'Mental Age Result',
                          text: `My mental age is ${result.mentalAge}.`,
                          url: `${window.location.origin}/mental-age-test`,
                        })
                      }
                      className="flex items-center justify-center gap-2 p-4 rounded-xl font-bold
                        bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-800/50 light:border-slate-100">
                    <p className="text-[10px] text-slate-400 light:text-slate-600 italic leading-relaxed">
                      This mental age estimate is a psychological heuristic designed
                      for self-reflection. It does not measure intelligence, clinical
                      maturity, or legal age. Educational use only.
                    </p>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-900/30 light:bg-white/60 border-t border-slate-800/50 light:border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-50 light:text-slate-900">
            Mental Age FAQs
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
    <div className="glass light:bg-white/80 rounded-2xl border border-slate-800 light:border-slate-200 overflow-hidden">
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full px-6 py-5
          flex items-center justify-between
          text-left font-bold
          text-slate-50 light:text-slate-900
        "
      >
        <span className="pr-6">{question}</span>

        {/* ICON */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="
            w-8 h-8
            flex items-center justify-center
            rounded-full
            border border-slate-700
            light:border-slate-300
            text-slate-400 light:text-slate-500
            shrink-0
          "
        >
          {open ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.span>
      </button>

      {/* CONTENT — Netflix slide */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1], // Netflix / iOS easing
            }}
          >
            <div className="px-6 pb-6 text-slate-400 light:text-slate-600 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default MentalAgeTest;

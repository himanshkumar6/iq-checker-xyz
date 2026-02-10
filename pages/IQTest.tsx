import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { SEO } from '../lib/seo';
import { IQ_QUESTIONS, IQ_TEST_FAQS } from '../constants';
import { useStore } from '../store/useStore';

const IQTest: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'testing' | 'results'>('intro');
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const questions = IQ_QUESTIONS.slice(0, 15);
  const q = questions[idx];

  const setIqResult = useStore(s => s.setIqResult);
  const lastResult = useStore(s => s.lastIqResult);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (step !== 'testing') return;
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  /* ---------------- FLOW ---------------- */
  const start = () => {
    setIdx(0);
    setAnswers({});
    setSelected(null);
    setShowFeedback(false);
    setSeconds(0);
    setStep('testing');
  };

  const select = (i: number) => {
    if (showFeedback) return;
    setAnswers(a => ({ ...a, [q.id]: i }));
    setSelected(i);
    setShowFeedback(true);
  };

  const next = () => {
    if (idx < questions.length - 1) {
      setIdx(v => v + 1);
      setSelected(null);
      setShowFeedback(false);
    } else finish();
  };

  const finish = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    const score = Math.round((correct / questions.length) * 100);

    setIqResult({
      score,
      correct,
      wrong: questions.length - correct,
      level:
        score >= 90
          ? 'High Logical Accuracy'
          : score >= 70
            ? 'Strong Analytical Reasoning'
            : score >= 50
              ? 'Developing Logical Skills'
              : 'Foundational Reasoning Ability'
    });

    setStep('results');
  };

  return (
    <>
      <SEO
        title="Logical Reasoning Test – Pattern Recognition & Problem Solving"
        description="Evaluate your logical reasoning skills through structured pattern-based questions. Designed for learning and self-assessment."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/iq-test"
      />

      <section className="py-16 bg-transparent">
        <div className="container mx-auto max-w-4xl px-4">

          {/* HERO */}
          <section className="mb-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black text-slate-50 light:text-slate-900 mb-6 leading-tight">
                Logical Reasoning Assessment
              </h1>

              <p className="text-lg text-slate-300 light:text-slate-600 leading-relaxed mb-8">
                This assessment evaluates how you recognize patterns, interpret
                relationships, and apply structured logic to unfamiliar problems.
                It’s commonly used to benchmark reasoning accuracy and analytical
                thinking — not general intelligence.
              </p>

              {/* TRUST STRIP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-10">
                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
                  <p className="font-bold text-slate-50 light:text-slate-900">
                    Educational Assessment
                  </p>
                  <p className="text-slate-400 light:text-slate-500">
                    Not a clinical IQ exam
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
                  <p className="font-bold text-slate-50 light:text-slate-900">
                    Answer Explanations
                  </p>
                  <p className="text-slate-400 light:text-slate-500">
                    Understand the logic behind each solution
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
                  <p className="font-bold text-slate-50 light:text-slate-900">
                    Accuracy Breakdown
                  </p>
                  <p className="text-slate-400 light:text-slate-500">
                    Correct vs incorrect insights
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AnimatePresence mode="wait">

            {/* INTRO */}
            {step === 'intro' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2.5rem] p-12 bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 text-center"
              >
                <Brain className="w-14 h-14 text-blue-500 mx-auto mb-6" />
                <h2 className="text-3xl font-black mb-4 text-slate-50 light:text-slate-900">
                  Start the Reasoning Test
                </h2>
                <p className="text-slate-300 light:text-slate-600 mb-8">
                  You’ll be presented with a series of logic-based problems.
                  Each question focuses on pattern recognition and structured thinking.
                </p>
                <button
                  onClick={start}
                  className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold"
                >
                  Begin Assessment <ArrowRight className="inline ml-1" />
                </button>
              </motion.div>
            )}

            {/* TESTING */}
            /* ONLY UI IMPROVED — LOGIC UNCHANGED */

            {step === 'testing' && q && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="
      rounded-[2.75rem]
      p-10
      bg-slate-900/85 light:bg-white
      border border-slate-800 light:border-slate-200
      shadow-xl
    "
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                  <div className="text-xs font-black uppercase tracking-widest text-blue-500">
                    Question {idx + 1} of {questions.length}
                  </div>
                  <div className="font-mono text-sm text-slate-400">
                    {formatTime(seconds)}
                  </div>
                </div>

                {/* QUESTION */}
                <h2 className="
      text-2xl md:text-3xl
      font-extrabold
      leading-snug
      mb-10
      text-slate-50 light:text-slate-900
    ">
                  {q.text}
                </h2>

                {/* OPTIONS */}
                <div className="space-y-4">
                  {q.options.map((opt, i) => {
                    const correct = i === q.correctAnswer;
                    const chosen = i === selected;

                    let stateCls =
                      'border-slate-700 light:border-slate-200';

                    if (showFeedback) {
                      if (correct)
                        stateCls =
                          'border-emerald-500 bg-emerald-500/10';
                      else if (chosen)
                        stateCls =
                          'border-red-500 bg-red-500/10';
                      else
                        stateCls += ' opacity-60';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => select(i)}
                        className={`
              w-full
              p-6
              rounded-2xl
              border
              text-left
              transition-all
              duration-200
              bg-slate-950/40 light:bg-slate-50
              hover:border-blue-500/60
              hover:bg-slate-900/60 light:hover:bg-white
              text-slate-300 light:text-slate-800
              ${stateCls}
            `}
                      >
                        <div className="flex gap-4 items-start">
                          {/* OPTION LABEL */}
                          <span className="
                mt-1
                w-6 h-6
                flex items-center justify-center
                rounded-full
                border
                border-slate-600
                text-xs font-black
                text-slate-400
              ">
                            {String.fromCharCode(65 + i)}
                          </span>

                          {/* OPTION TEXT */}
                          <span className="text-base leading-relaxed">
                            {opt}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* EXPLANATION */}
                {showFeedback && (
                  <div className="
        mt-8
        p-6
        rounded-2xl
        bg-slate-800/40 light:bg-slate-100
        border border-slate-700 light:border-slate-200
      ">
                    {selected === q.correctAnswer ? (
                      <div className="flex gap-3 items-start text-emerald-400">
                        <CheckCircle className="w-5 h-5 mt-0.5" />
                        <div>
                          <p className="font-bold mb-1">
                            Correct Answer
                          </p>
                          <p className="text-sm text-slate-300 light:text-slate-700">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 items-start text-red-400">
                        <XCircle className="w-5 h-5 mt-0.5" />
                        <div>
                          <p className="font-bold mb-1">
                            Incorrect Selection
                          </p>
                          <p className="text-sm text-slate-300 light:text-slate-700">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* NEXT BUTTON */}
                {showFeedback && (
                  <button
                    onClick={next}
                    className="
          mt-10
          w-full
          py-4
          rounded-2xl
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-black
          tracking-wide
        "
                  >
                    {idx === questions.length - 1
                      ? 'View Final Results'
                      : 'Next Question'}
                  </button>
                )}
              </motion.div>
            )}


            {/* RESULTS */}
            {/* RESULTS */}
            {step === 'results' && lastResult && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="
      relative
      rounded-[3rem]
      p-12
      bg-slate-900/90 light:bg-white
      border border-slate-800 light:border-slate-200
      shadow-2xl
      overflow-hidden
      text-center
    "
              >
                {/* soft glow */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />

                <p className="relative text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                  Assessment Result
                </p>

                <h2 className="relative text-4xl md:text-5xl font-black mb-12 text-slate-50 light:text-slate-900">
                  Reasoning Performance
                </h2>

                {/* SCORE RING */}
                <div className="relative w-48 h-48 mx-auto mb-10">
                  <motion.div
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 270 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(
            #22c55e ${lastResult.score}%,
            #ef4444 0
          )`
                    }}
                  />
                  <div className="absolute inset-6 rounded-full bg-slate-950 light:bg-white flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-blue-500">
                      {lastResult.score}%
                    </span>
                    <span className="text-xs uppercase tracking-widest text-slate-400 mt-1">
                      Accuracy
                    </span>
                  </div>
                </div>

                {/* LEVEL */}
                <p className="text-lg font-bold text-slate-300 light:text-slate-600 mb-8">
                  {lastResult.level}
                </p>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-10">
                  <div className="rounded-2xl p-4 bg-emerald-500/10 border border-emerald-500/30">
                    <p className="text-2xl font-black text-emerald-400">
                      {lastResult.correct}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      Correct
                    </p>
                  </div>

                  <div className="rounded-2xl p-4 bg-red-500/10 border border-red-500/30">
                    <p className="text-2xl font-black text-red-400">
                      {lastResult.wrong}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      Incorrect
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setStep('intro')}
                  className="
        inline-flex items-center gap-2
        px-8 py-3
        rounded-xl
        bg-blue-600 hover:bg-blue-700
        text-white font-black
        tracking-wide
        shadow-lg shadow-blue-600/30
        transition
      "
                >
                  <RefreshCw size={16} />
                  Retake Assessment
                </button>
              </motion.div>
            )}


            {/* EDUCATIONAL CONTENT */}
            <section className="mt-32 max-w-4xl mx-auto text-sm leading-relaxed">
              <h2 className="text-3xl font-black text-slate-50 light:text-slate-900 mb-6">
                How Logical Reasoning Is Used in Real Life
              </h2>

              <p className="text-slate-300 light:text-slate-600 mb-4">
                Logical reasoning plays a key role in problem-solving,
                technical roles, standardized testing, and everyday decisions.
                It reflects how efficiently you process relationships between ideas
                rather than how much information you know.
              </p>

              <p className="text-slate-300 light:text-slate-600 mb-4">
                Results on reasoning assessments can vary based on focus,
                familiarity with question formats, and mental fatigue.
                Scores should be viewed as a snapshot of reasoning accuracy,
                not a permanent indicator of intelligence.
              </p>

              <div className="mt-8 p-6 rounded-4xl bg-blue-900/10 light:bg-blue-50 border border-blue-900/20 light:border-blue-100">
                <p className="text-xs text-slate-300 light:text-slate-600 italic leading-relaxed">
                  This assessment is intended for educational and self-development
                  purposes only. It does not diagnose cognitive conditions or
                  replace professional psychological evaluation.
                </p>
              </div>
            </section>

          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-900/30 light:bg-white/60 border-t border-slate-800/50 light:border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-50 light:text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {IQ_TEST_FAQS.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SCHEMA */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": IQ_TEST_FAQS.slice(0, 8).map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        })}
      </script>
    </>
  );
};

import { Plus, Minus } from "lucide-react";

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
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="
            w-9 h-9 flex items-center justify-center
            rounded-full
            border border-slate-700 light:border-slate-300
            text-slate-400 light:text-slate-500
            shrink-0
          "
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.span>
      </button>

      {/* CONTENT */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1], // Netflix-style easing
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


export default IQTest;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            ? 'Strong Reasoning Skills'
            : score >= 50
              ? 'Developing Logic'
              : 'Foundational Reasoning'
    });

    setStep('results');
  };

  return (
    <>
      <SEO
        title="Logical Reasoning Test | IQ Checker XYZ"
        description="Test your logical reasoning with instant feedback, explanations, and accuracy breakdown. Educational use only."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/iq-test"
      />

      <section className="py-16 bg-transparent">
        <div className="container mx-auto max-w-4xl px-4">
          {/* PREMIUM HERO */}
          <section className="mb-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black text-slate-50 light:text-slate-900 mb-6 leading-tight">
                Logical Reasoning Assessment
              </h1>

              <p className="text-lg text-slate-300 light:text-slate-600 leading-relaxed mb-8">
                Measure how effectively you recognize patterns, process information,
                and apply structured logic to real-world problems.
                This assessment is designed for educational insight and skill awareness.
              </p>

              {/* TRUST STRIP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-10">
                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
                  <p className="font-bold text-slate-50 light:text-slate-900">
                    Educational Use Only
                  </p>
                  <p className="text-slate-400 light:text-slate-500">
                    Not a clinical IQ test
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
                  <p className="font-bold text-slate-50 light:text-slate-900">
                    Instant Explanations
                  </p>
                  <p className="text-slate-400 light:text-slate-500">
                    Learn why answers work
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200">
                  <p className="font-bold text-slate-50 light:text-slate-900">
                    Accuracy Breakdown
                  </p>
                  <p className="text-slate-400 light:text-slate-500">
                    Correct vs incorrect analysis
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
                <h1 className="text-3xl font-black mb-4 text-slate-50 light:text-slate-900">
                  Logical Reasoning Assessment
                </h1>
                <p className="text-slate-300 light:text-slate-600 mb-8">
                  Solve logic-based questions with instant explanations to
                  understand how each answer works.
                </p>
                <button
                  onClick={start}
                  className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold"
                >
                  Start Assessment <ArrowRight className="inline ml-1" />
                </button>
              </motion.div>
            )}

            {/* TESTING */}
            {step === 'testing' && q && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-4xl p-8 bg-slate-900/85 light:bg-white border border-slate-800 light:border-slate-200"
              >
                <div className="flex justify-between mb-4 text-sm text-slate-400">
                  <span>Question {idx + 1} / {questions.length}</span>
                  <span className="font-mono">{formatTime(seconds)}</span>
                </div>

                <h2 className="text-xl font-bold mb-6 text-slate-50 light:text-slate-900">
                  {q.text}
                </h2>

                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const correct = i === q.correctAnswer;
                    const chosen = i === selected;

                    let cls = 'border-slate-700';
                    if (showFeedback) {
                      if (correct) cls = 'border-emerald-500 bg-emerald-500/10';
                      else if (chosen) cls = 'border-red-500 bg-red-500/10';
                      else cls += ' opacity-50';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => select(i)}
                        className={`w-full p-4 rounded-xl border text-left transition
                          bg-slate-950/40 light:bg-slate-50
                          text-slate-300 light:text-slate-800 ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <div className="mt-5 p-4 rounded-xl bg-slate-800/40 light:bg-slate-100 text-sm">
                    {selected === q.correctAnswer ? (
                      <div className="flex gap-2 text-emerald-400">
                        <CheckCircle size={16} />
                        Correct. {q.explanation}
                      </div>
                    ) : (
                      <div className="flex gap-2 text-red-400">
                        <XCircle size={16} />
                        Incorrect. {q.explanation}
                      </div>
                    )}
                  </div>
                )}

                {showFeedback && (
                  <button
                    onClick={next}
                    className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
                  >
                    {idx === questions.length - 1 ? 'View Results' : 'Next Question'}
                  </button>
                )}
              </motion.div>
            )}

            {/* RESULTS */}
            {step === 'results' && lastResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[2.5rem] p-10 bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 text-center"
              >
                <h2 className="text-3xl font-black mb-4 text-slate-50 light:text-slate-900">
                  Assessment Summary
                </h2>

                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(#22c55e ${lastResult.score}%, #ef4444 0)`
                    }}
                  />
                  <div className="absolute inset-5 bg-slate-900 light:bg-white rounded-full flex items-center justify-center">
                    <span className="text-3xl font-black text-blue-600">
                      {lastResult.score}%
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 light:text-slate-600 font-bold">
                  {lastResult.level}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Correct: {lastResult.correct} · Wrong: {lastResult.wrong}
                </p>

                <button
                  onClick={() => setStep('intro')}
                  className="mt-6 text-sm text-slate-400 hover:text-slate-200"
                >
                  <RefreshCw size={14} className="inline mr-1" />
                  Retake Assessment
                </button>
              </motion.div>
            )}

            {/* EDUCATIONAL CONTENT */}
            <section className="mt-32 max-w-4xl mx-auto text-sm leading-relaxed">
              <h2 className="text-3xl font-black text-slate-50 light:text-slate-900 mb-6">
                Understanding Logical Reasoning Skills
              </h2>

              <p className="text-slate-300 light:text-slate-600 mb-4">
                Logical reasoning refers to the ability to analyze information,
                identify patterns, and draw structured conclusions.
                These skills are commonly used in problem-solving,
                technical roles, academic assessments, and everyday decision-making.
              </p>

              <p className="text-slate-300 light:text-slate-600 mb-4">
                Unlike traditional intelligence tests, this assessment focuses
                on reasoning accuracy rather than raw intelligence.
                Each question is designed to test how effectively you process
                logical relationships under minimal time pressure.
              </p>

              <p className="text-slate-300 light:text-slate-600 mb-4">
                Performance on logical reasoning tests can vary based on
                familiarity with problem types, current focus level,
                and environmental conditions.
                Scores should be interpreted as a general skill snapshot,
                not a definitive measure of intelligence or cognitive ability.
              </p>

              {/* NEXT STEPS & RESEARCH */}
              <div className="mt-10 py-8 border-t border-slate-800/50 light:border-slate-100 text-left">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-6">
                  Recommended Research
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/blog/what-is-iq" className="p-4 rounded-2xl bg-slate-950/40 light:bg-slate-50 border border-slate-900 light:border-slate-200 hover:border-blue-500 transition-colors group">
                    <p className="font-bold text-sm text-slate-50 light:text-slate-900 group-hover:text-blue-500 transition-colors">What Exactly is IQ?</p>
                    <p className="text-[10px] text-slate-400 mt-1">Deep dive into intelligence quotients.</p>
                  </Link>
                  <Link to="/blog/increase-iq" className="p-4 rounded-2xl bg-slate-950/40 light:bg-slate-50 border border-slate-900 light:border-slate-200 hover:border-blue-500 transition-colors group">
                    <p className="font-bold text-sm text-slate-50 light:text-slate-900 group-hover:text-blue-500 transition-colors">Improve Your Score</p>
                    <p className="text-[10px] text-slate-400 mt-1">5 proven ways to sharpen your mind.</p>
                  </Link>
                </div>
              </div>

              {/* DISCLAIMER */}
              <div className="mt-8 p-6 rounded-[2rem] bg-blue-900/10 light:bg-blue-50 border border-blue-900/20 light:border-blue-100 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 light:text-blue-600">
                    Educational Policy Disclosure
                  </h3>
                </div>
                <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed italic">
                  This assessment is provided for educational and self-reflection purposes only.
                  It does not diagnose cognitive conditions, measure clinical intelligence,
                  or replace professional psychological evaluation. For a medical or official
                  diagnosis, please consult a licensed psychologist.
                </p>
              </div>
            </section>


          </AnimatePresence>
        </div>
      </section>

      {/* FAQ SECTION — glass */}
      <section className="py-16 px-4 bg-slate-900/30 light:bg-white/60 backdrop-blur-sm border-t border-slate-800/50 light:border-slate-200">
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

      {/* FAQ SCHEMA ONLY ON THIS PAGE */}
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

export default IQTest;

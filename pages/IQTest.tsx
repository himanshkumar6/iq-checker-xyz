
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowRight, ArrowLeft, RefreshCw, Share2, Trophy, Medal, Star, Zap, Copy, Download, Check, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { SEO } from '../lib/seo';
import { IQ_QUESTIONS } from '../constants';
import { useStore } from '../store/useStore';
import { IQResult } from '../types';
import { shareResult, downloadResultImage } from '../lib/share';

const IQTest: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'testing' | 'results'>('intro');
  const [activeQuestions, setActiveQuestions] = useState<typeof IQ_QUESTIONS>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [copied, setCopied] = useState(false);
  const setIqResult = useStore((state) => state.setIqResult);
  const lastResult = useStore((state) => state.lastIqResult);

  useEffect(() => {
    let interval: any;
    if (step === 'testing') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleStart = () => {
    const STORAGE_KEY = 'usedQuestions_iq_test';
    const TEST_SIZE = 15;

    let usedIds: string[] = [];
    try {
      usedIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      usedIds = [];
    }

    let available = IQ_QUESTIONS.filter(q => !usedIds.includes(q.id));

    if (available.length < TEST_SIZE) {
      usedIds = [];
      available = [...IQ_QUESTIONS];
    }

    const shuffled = [...available].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, TEST_SIZE);

    // Update tracking
    const newUsedIds = [...usedIds, ...selected.map(q => q.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsedIds));

    setActiveQuestions(selected);
    setStep('testing');
    setCurrentIdx(0);
    setAnswers({});
    setShowFeedback(false);
    setSelectedOption(null);
    setTimer(0);
  };

  const handleSelect = (optionIdx: number) => {
    if (showFeedback) return;
    const question = activeQuestions[currentIdx];
    setAnswers({ ...answers, [question.id]: optionIdx });
    setSelectedOption(optionIdx);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let correct = 0;
    activeQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    const score = Math.round((correct / activeQuestions.length) * 100);

    const result: IQResult = {
      score,
      level: score >= 90 ? 'Excellent' : score >= 70 ? 'Strong' : score >= 50 ? 'Balanced' : 'Needs Practice',
      percentile: correct // Using correct count instead of percentile for internal logic
    };
    setIqResult(result);
    setStep('results');
  };

  const handleCopy = async () => {
    if (!lastResult) return;
    const text = `I achieved ${lastResult.score}% logical accuracy on IQ Checker XYZ. Test your reasoning here: ${window.location.origin}/iq-test`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!lastResult) return;
    downloadResultImage(
      'Logical Reasoning Assessment',
      `${lastResult.score}%`,
      'ACCURACY',
      `CORRECT: ${lastResult.percentile} / ${activeQuestions.length || 15} • IQCHECKERXYZ.COMPRESSPDFTO200KB.ONLINE`,
      `reasoning-result-${lastResult.score}.png`
    );
  };

  const handleShare = async () => {
    if (!lastResult) return;
    const status = await shareResult({
      title: 'Logical Accuracy Assessment - IQ Checker XYZ',
      text: `I achieved ${lastResult.score}% logical accuracy on IQ Checker XYZ.`,
      url: `${window.location.origin}/iq-test`
    });
    if (status === 'copied') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is IQ Checker XYZ?", "acceptedAnswer": { "@type": "Answer", "text": "IQ Checker XYZ is a comprehensive cognitive testing platform designed to evaluate logical reasoning, math skills, and pattern recognition in a fast-paced digital format." } },
      { "@type": "Question", "name": "What does accuracy measure?", "acceptedAnswer": { "@type": "Answer", "text": "Our accuracy score reflects your ability to identify rules and patterns within logical matrices and mathematical sequences." } },
      { "@type": "Question", "name": "How long does the test take?", "acceptedAnswer": { "@type": "Answer", "text": "The test features 15 questions and usually takes about 10-15 minutes, as each item now includes an educational explanation." } }
    ]
  };

  const currentQuestion = activeQuestions[currentIdx] || IQ_QUESTIONS[0];

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SEO
        title="Reasoning Accuracy Assessment 2026 - Instant Feedback | IQ Checker XYZ"
        description="Benchmark your logical reasoning with our enhanced 15-item assessment. Get immediate feedback, detailed explanations, and accuracy charts. 100% free and AdSense safe."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/iq-test"
      />
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-[3rem] p-8 md:p-16 text-center"
          >
            <div className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/30">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black mb-6">Logical Reasoning Assessment</h1>
            <p className="text-lg text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
              Measure your accuracy in pattern recognition, logical deduction, and math. Every question now includes immediate feedback to help you understand the underlying logic.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <ShieldCheck className="w-6 h-6 text-blue-600 mx-auto mb-3" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</p>
                <p className="font-bold text-sm">Educational Only</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <Brain className="w-6 h-6 text-blue-600 mx-auto mb-3" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Items</p>
                <p className="font-bold text-sm">15 Logical Tasks</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <Zap className="w-6 h-6 text-blue-600 mx-auto mb-3" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Feedback</p>
                <p className="font-bold text-sm">Real-time Explanations</p>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              Start Assessment <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        {step === 'testing' && (
          <motion.div
            key="testing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-blue-600 uppercase">Step</span>
                <span className="text-2xl font-black">{currentIdx + 1} / {activeQuestions.length || 15}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-slate-400 uppercase">Timer</span>
                <span className="text-2xl font-mono font-bold">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full mb-12 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / (activeQuestions.length || 15)) * 100}%` }}
                className="h-full bg-blue-600"
              />
            </div>

            <div className="glass rounded-[2rem] p-8 md:p-12 mb-8 relative overflow-hidden">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest mb-4 inline-block">
                {currentQuestion.type}
              </span>
              <h2 className="text-2xl font-bold mb-8 leading-tight">{currentQuestion.text}</h2>

              <div className="grid grid-cols-1 gap-4 mb-8">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctAnswer;

                  let btnClass = "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-600";
                  if (showFeedback) {
                    if (isCorrect) btnClass = "bg-emerald-500/10 border-emerald-500 text-emerald-600";
                    else if (isSelected) btnClass = "bg-red-500/10 border-red-500 text-red-600";
                    else btnClass = "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-50";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showFeedback}
                      onClick={() => handleSelect(idx)}
                      className={`w-full p-6 text-left rounded-2xl border-2 transition-all font-bold flex items-center justify-between group ${btnClass}`}
                    >
                      <span>{opt}</span>
                      {showFeedback && isCorrect && <Check className="w-5 h-5" />}
                      {showFeedback && isSelected && !isCorrect && <HelpCircle className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-6 border-t border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
                      <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${selectedOption === currentQuestion.correctAnswer ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'}`}>
                        {selectedOption === currentQuestion.correctAnswer ? <Check className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest mb-1 text-slate-400">
                          {selectedOption === currentQuestion.correctAnswer ? 'Logic Verified' : 'Explanation'}
                        </p>
                        <p className="text-sm font-bold leading-relaxed">
                          {selectedOption === currentQuestion.correctAnswer ? 'Correct — good logical reasoning.' : currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full mt-8 p-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      {currentIdx === IQ_QUESTIONS.length - 1 ? 'Go to Results' : 'Next Question'} <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {step === 'results' && lastResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto mb-12 glass rounded-[3rem] p-8 md:p-12">
              <h2 className="text-3xl font-black mb-12">Assessment Summary</h2>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
                {/* Circular Performance Chart */}
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="transparent"
                      className="text-slate-100 dark:text-slate-800"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="16"
                      strokeDasharray={552.92}
                      initial={{ strokeDashoffset: 552.92 }}
                      animate={{ strokeDashoffset: 552.92 - (552.92 * (lastResult.score / 100)) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      fill="transparent"
                      strokeLinecap="round"
                      className="text-blue-600"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black">{lastResult.score}%</span>
                    <span className="text-[10px] font-black uppercase text-slate-400">Accuracy</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6 text-left">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Logic Accuracy</span>
                    <span className="font-black text-xl text-blue-600">{lastResult.level}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 text-center">
                      <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Correct</p>
                      <p className="text-2xl font-black text-emerald-600">{lastResult.percentile}</p>
                    </div>
                    <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/20 text-center">
                      <p className="text-[10px] font-black text-red-600 uppercase mb-1">Incorrect</p>
                      <p className="text-2xl font-black text-red-600">{(activeQuestions.length || 15) - lastResult.percentile}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-900/10 rounded-2xl border border-blue-900/20 mb-12">
                <p className="text-xs text-slate-500 leading-relaxed font-bold">
                  Results are based on this quiz only. This is a self-assessment for educational and entertainment purposes.
                  Not an IQ test or diagnostic evaluation.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <ResultCard icon={<Brain className="w-6 h-6" />} title="Reasoning" val="High Rank" />
              <ResultCard icon={<Zap className="w-6 h-6" />} title="Efficiency" val={`${timer}s`} />
              <ResultCard icon={<ShieldCheck className="w-6 h-6" />} title="Status" val="Verified" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-slate-900 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-100 dark:border-slate-800"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-slate-900 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-100 dark:border-slate-800"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-all"
              >
                <Share2 className="w-4 h-4" /> Share Result
              </button>
            </div>

            <button
              onClick={() => setStep('intro')}
              className="px-8 py-3 bg-slate-200 dark:bg-slate-800 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all mx-auto"
            >
              <RefreshCw className="w-5 h-5" /> Retake Test
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEO & EDUCATIONAL CONTENT SECTION */}
      <div className="mt-24 pt-24 border-t border-slate-200 dark:border-slate-800">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">Understanding Your Logical Reasoning Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 dark:text-slate-400">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-blue-600" /> Assessment Methodology
              </h3>
              <p className="mt-4 leading-relaxed">
                The reasoning assessment at **IQ Checker XYZ** evaluates your capability to solve novel problems through pattern recognition and logical deduction. Unlike knowledge-based tests, this focus on "fluid intelligence" measures how you process new information and identify underlying rules in complex scenarios.
              </p>
              <p className="mt-4">
                We use culturally neutral logic matrices, ensuring that the results reflect your processing accuracy regardless of your educational background or native language.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="text-blue-600" /> How Accuracy is Measured
              </h3>
              <p className="mt-4 leading-relaxed">
                Logical accuracy follows a distribution across the population. While most individuals fall within a standard range, high accuracy indicates a strong ability to manipulate mental constructs and recognize shifts in sequential patterns.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Educational Disclaimer</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              IQ Checker XYZ provides these assessments for educational and entertainment purposes. This tool is designed to provide an accuracy-based estimate of your logical processing speed and pattern recognition. It is not a clinical IQ test and should not be used for medical or psychological diagnosis.
            </p>
          </div>

          <h2 className="text-3xl font-black mt-24 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FAQItem q="Is this assessment free?" a="Yes, the standard 15-item logical reasoning assessment on IQ Checker XYZ is completely free. We aim to provide accessible cognitive tools for self-improvement." />
            <FAQItem q="What is a good accuracy score?" a="An accuracy score above 70% indicates strong logical reasoning skills, while 90%+ reflects highly efficient pattern recognition and attention to detail." />
            <FAQItem q="How is the accuracy calculated?" a="We calculate your score based on the number of correct answers vs total items, weighted by the complexity of the logical matrices presented." />
            <FAQItem q="Can I improve my logical reasoning?" a="Yes! Cognitive flexibility can be improved through deliberate practice with logic puzzles, strategic gaming, and consistent mental challenges." />
            <FAQItem q="Is this an official IQ score?" a="No. This is an educational accuracy assessment. Official IQ scores require a supervised clinical evaluation by a licensed professional." />
            <FAQItem q="Do I see the correct answers?" a="Yes, we provide real-time explanations for every question so you can learn the logic behind each correct answer immediately." />
          </div>

        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ icon, title, val }: { icon: React.ReactNode, title: string, val: string }) => (
  <div className="glass p-6 rounded-3xl">
    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl inline-block mb-4">
      {icon}
    </div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
    <p className="text-xl font-bold">{val}</p>
  </div>
);

const FAQItem = ({ q, a }: { q: string, a: string }) => (
  <div className="glass p-8 rounded-2xl border-none">
    <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-blue-600" /> {q}</h4>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
  </div>
);

const Clock = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const Users = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;

export default IQTest;

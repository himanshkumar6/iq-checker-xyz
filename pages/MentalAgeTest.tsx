import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, RefreshCcw, Share2, Star, Copy, Download, Check, Brain, ShieldCheck, HelpCircle, BookOpen } from 'lucide-react';
import { shareResult, downloadResultImage } from '../lib/share';
import { SEO } from '../lib/seo';

import { MENTAL_AGE_QUESTIONS } from '../constants';
import { MentalAgeQuestion } from '../types';

const MentalAgeTest: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'testing' | 'results'>('intro');
  const [activeQuestions, setActiveQuestions] = useState<MentalAgeQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ trait: string; score: number }[]>([]);
  const [copied, setCopied] = useState(false);

  const handleStart = () => {
    const STORAGE_KEY = 'usedQuestions_mental_age';
    const TEST_SIZE = 15;

    let usedIds: string[] = [];
    try {
      usedIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      usedIds = [];
    }

    let available = MENTAL_AGE_QUESTIONS.filter(q => !usedIds.includes(q.id));

    if (available.length < TEST_SIZE) {
      usedIds = [];
      available = [...MENTAL_AGE_QUESTIONS];
    }

    const shuffled = [...available].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, TEST_SIZE);

    const newUsedIds = [...usedIds, ...selected.map(q => q.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsedIds));

    setActiveQuestions(selected);
    setStep('testing');
    setCurrentIdx(0);
    setAnswers([]);
  };

  const handleSelect = (points: number) => {
    const currentQ = activeQuestions[currentIdx];
    const newAnswers = [...answers, { trait: currentQ.trait, score: points }];
    setAnswers(newAnswers);

    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('results');
    }
  };

  const generateDetailedResult = () => {
    const traits: Record<string, number[]> = {};
    answers.forEach(a => {
      if (!traits[a.trait]) traits[a.trait] = [];
      traits[a.trait].push(a.score);
    });

    const traitScores: any = {};
    Object.keys(traits).forEach(t => {
      const avg = traits[t].reduce((a, b) => a + b, 0) / traits[t].length;
      traitScores[t] = avg;
    });

    const allScores = Object.values(traitScores) as number[];
    const avgMaturity = allScores.reduce((a, b) => a + b, 0) / allScores.length;

    // Non-round mental age calculation
    const mentalAge = parseFloat((14 + (avgMaturity * 5.6)).toFixed(1));

    // Explanation generation
    let explanation = "Your personality profile shows a balanced level of maturity.";
    if (avgMaturity > 8) explanation = "You demonstrate a level of psychological depth and self-governance typically associated with significant life experience.";
    else if (avgMaturity < 4) explanation = "Your responses indicate a highly reactive and spontaneous profile, common in early developmental stages.";

    // Conflict detection
    if (traitScores.responsibility > 8 && traitScores.impulsivity < 4) {
      explanation += " However, your choices show internal conflict between rigid responsibility and sudden impulsivity.";
    }

    // Strengths & Weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    Object.keys(traitScores).forEach(t => {
      const score = traitScores[t];
      const traitName = t.replace('_', ' ');
      if (score >= 7.5) strengths.push(traitName.charAt(0).toUpperCase() + traitName.slice(1));
      if (score <= 4) weaknesses.push(traitName.charAt(0).toUpperCase() + traitName.slice(1));
    });

    // Insight
    let insight = "Consider how your immediate emotional reactions might be clouding your long-term goals.";
    if (traitScores.long_term_thinking > 8) insight = "Your focus on the future is a shield, but don't let it become a cage that prevents present joy.";
    if (traitScores.pressure_reaction < 3) insight = "You thrive in stability, but your mental resilience fluctuates significantly under sudden pressure.";
    if (traitScores.self_awareness > 9) insight = "Self-awareness is a tool, but over-analysis can lead to paralysis. Trust your instincts more.";

    return {
      mentalAge,
      explanation,
      strengths: strengths.slice(0, 3),
      weaknesses: weaknesses.slice(0, 3),
      insight,
      traitScores
    };
  };

  const result = step === 'results' ? generateDetailedResult() : null;

  const handleCopy = async () => {
    if (!result) return;
    const text = `My Mental Age is ${result.mentalAge}. Psychologically grounded assessment: ${window.location.origin}/mental-age-test`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    downloadResultImage(
      'Psychological Maturity Report',
      result.mentalAge.toString(),
      'Maturity Level',
      `TRAIT-BASED ASSESSMENT • IQCHECKERXYZ.ONLINE`,
      `mental-age-${result.mentalAge}.png`
    );
  };

  const handleShare = async () => {
    if (!result) return;
    const status = await shareResult({
      title: 'Psychological Maturity Result',
      text: `My mental age is ${result.mentalAge}. Get your trait-based report here:`,
      url: `${window.location.origin}/mental-age-test`
    });
    if (status === 'copied') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
      <SEO
        title="Mental Age Test Online - Psychological Maturity Assessment | IQ Checker XYZ"
        description="Discover your mental age vs your chronological age. Our fun psychological assessment evaluates your habits, choices, and personality traits. Instant results."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/mental-age-test"
      />

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-12 rounded-[3rem]">
            <Brain className="w-16 h-16 text-rose-500 mx-auto mb-6" />
            <h1 className="text-4xl font-black mb-6 text-white">Psychological Maturity Assessment</h1>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto">An evidence-based evaluation of cognitive and behavioral indicators. This is not a game; expect an honest reflection of your psychological traits.</p>
            <button
              onClick={handleStart}
              className="px-10 py-4 bg-rose-500 text-white font-black rounded-2xl shadow-xl shadow-rose-500/20"
            >
              Begin Assessment
            </button>
          </motion.div>
        )}

        {step === 'testing' && activeQuestions.length > 0 && (
          <motion.div key="testing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-left">
            <p className="text-sm font-bold text-rose-500 uppercase mb-4 tracking-widest">Indicator {currentIdx + 1} / {activeQuestions.length}</p>
            <div className="glass p-10 rounded-[2rem] border-l-4 border-rose-500">
              <h2 className="text-2xl font-bold mb-8 text-white leading-relaxed">{activeQuestions[currentIdx].q}</h2>
              <div className="space-y-4">
                {activeQuestions[currentIdx].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(activeQuestions[currentIdx].score[idx])}
                    className="w-full p-6 text-left bg-slate-900/50 border border-slate-800 rounded-2xl font-bold hover:border-rose-500/50 hover:bg-slate-800 transition-all text-slate-300"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {step === 'results' && result && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-left max-w-2xl mx-auto">
            <div className="glass p-12 rounded-[3rem] border border-slate-800 bg-slate-950/50 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Brain className="w-64 h-64 text-white" />
              </div>

              <div className="relative z-10">
                <p className="text-rose-500 font-black uppercase tracking-[0.2em] mb-4 text-sm">Psychological Maturity Report</p>
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="text-8xl font-black text-white leading-none">{result.mentalAge}</h2>
                  <span className="text-slate-500 font-bold text-xl uppercase tracking-widest">Mental Age</span>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-xs font-black uppercase text-slate-500 mb-3 tracking-widest">Primary Evaluation</h3>
                    <p className="text-lg text-slate-200 leading-relaxed font-medium">{result.explanation}</p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section>
                      <h3 className="text-xs font-black uppercase text-green-500/70 mb-3 tracking-widest">Strengths Detected</h3>
                      <ul className="space-y-2">
                        {result.strengths.map(s => (
                          <li key={s} className="text-sm font-bold text-slate-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {s}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-xs font-black uppercase text-rose-500/70 mb-3 tracking-widest">Areas for Calibration</h3>
                      <ul className="space-y-2">
                        {result.weaknesses.map(w => (
                          <li key={w} className="text-sm font-bold text-slate-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> {w}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <section className="p-6 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <h3 className="text-xs font-black uppercase text-rose-500 mb-2 tracking-widest">Mental Challenge Insight</h3>
                    <p className="text-sm text-rose-100 font-bold leading-relaxed">{result.insight}</p>
                  </section>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-12">
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 p-4 bg-slate-900 border border-slate-800 rounded-xl font-bold text-xs text-slate-300 hover:bg-slate-800 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Link Copied' : 'Copy Result'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 p-4 bg-slate-900 border border-slate-800 rounded-xl font-bold text-xs text-slate-300 hover:bg-slate-800 transition-all"
                  >
                    <Download className="w-4 h-4" /> Export PDF
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 p-4 bg-rose-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-500/20 transition-all"
                  >
                    <Share2 className="w-4 h-4" /> Share Report
                  </button>
                </div>

                <button
                  onClick={handleStart}
                  className="mt-8 text-slate-500 hover:text-white font-bold flex items-center gap-2 mx-auto text-xs transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" /> Reset Assessment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Educational Content for psychological maturity */}
      <div className="mt-24 pt-24 border-t border-slate-800 text-left">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-white italic">The Framework of Psychological Maturity</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-rose-500" /> Behavioral Indicators
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Unlike simple quizzes, this assessment evaluates **cognitive and behavioral indicators** that define psychological age. Maturity is not merely the passage of time, but the development of specific traits such as *emotional regulation* and *long-term thinking*.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                By analyzing your risk tolerance and responsibility patterns, we can determine the 'age' of your decision-making processes, which often differs significantly from your chronological age.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-500" /> The Maturity Gap
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                It is medically recognized that different parts of the brain mature at different rates. The prefrontal cortex, responsible for impulse control, often doesn't fully develop until the mid-20s. This creates a "maturity gap" where cognitive ability might exceed emotional regulation.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our model identifies these inconsistencies, helping you understand where your psychological standing may be advanced or where it might still be anchored in adolescent reaction patterns.
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-slate-900/50 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Psychological Dimensions We Track</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <HelpCircle className="w-5 h-5 text-rose-500 mb-2" />
                <p className="text-xs font-black text-white mb-1">Self-Awareness</p>
                <p className="text-[10px] text-slate-500 leading-tight">The ability to introspect and recognize one’s own mental states and drivers.</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <BookOpen className="w-5 h-5 text-rose-500 mb-2" />
                <p className="text-xs font-black text-white mb-1">Impulse Control</p>
                <p className="text-[10px] text-slate-500 leading-tight">Measuring the threshold between an initial urge and a deliberate action.</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <Star className="w-5 h-5 text-rose-500 mb-2" />
                <p className="text-xs font-black text-white mb-1">Maturity Scale</p>
                <p className="text-[10px] text-slate-500 leading-tight">Weighted scoring that prioritizes long-term outcomes over immediate gratification.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalAgeTest;

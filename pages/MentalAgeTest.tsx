import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, RefreshCcw, Share2, Star, Copy, Download, Check, Brain, ShieldCheck, HelpCircle, BookOpen } from 'lucide-react';
import { shareResult, downloadResultImage } from '../lib/share';
import { SEO } from '../lib/seo';

const MENTAL_QUESTIONS = [
  { q: "You discover a new hobby. What do you do first?", options: ["Research it for hours", "Jump right in and learn as I go", "Ask someone to teach me", "I don't have time for hobbies"], score: [5, 1, 3, 10] },
  { q: "How do you handle a cancelled plan?", options: ["Celebrate! Free time!", "A bit annoyed but move on", "Try to reschedule immediately", "Upset, I was looking forward to it"], score: [10, 5, 3, 2] },
  { q: "What's your ideal vacation?", options: ["Relaxing beach resort", "Adventurous backpacking", "Quiet cabin in the woods", "The most expensive luxury city"], score: [8, 2, 6, 4] },
  { q: "Pick a snack:", options: ["Candy/Sweets", "Fruit/Healthy", "Charcuterie board", "Whatever is fastest"], score: [1, 5, 8, 3] },
  { q: "How do you feel about social media?", options: ["Love it, I'm always on", "Use it for news", "It's a necessary evil", "Waste of time"], score: [2, 5, 4, 10] }
];

const MentalAgeTest: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'testing' | 'results'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleSelect = (points: number) => {
    setTotalPoints(totalPoints + points);
    if (currentIdx < MENTAL_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('results');
    }
  };

  const calculateMentalAge = () => {
    const base = 12;
    return Math.floor(base + (totalPoints * 0.8));
  };

  const handleCopy = async () => {
    const age = calculateMentalAge();
    const text = `My mental age result is ${age}. Check yours: ${window.location.origin}/#/mental-age-test`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const age = calculateMentalAge();
    downloadResultImage(
      'Mental Age Assessment',
      age.toString(),
      'Old Soul',
      `PSYCHOLOGICAL MATURITY INDEX • IQCHECKERXYZ.COMPRESSPDFTO200KB.ONLINE`,
      `mental-age-${age}.png`
    );
  };

  const handleShare = async () => {
    const age = calculateMentalAge();
    const status = await shareResult({
      title: 'Mental Age Result - IQ Checker XYZ',
      text: `My mental age is ${age}. What's yours?`,
      url: `${window.location.origin}/#/mental-age-test`
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
            <Clock className="w-16 h-16 text-rose-500 mx-auto mb-6" />
            <h1 className="text-4xl font-black mb-6 text-white">Mental Age Assessment</h1>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto">Discover how your personality and habits compare to your chronological age. Are you a child at heart or an old soul?</p>
            <button
              onClick={() => setStep('testing')}
              className="px-10 py-4 bg-rose-500 text-white font-black rounded-2xl shadow-xl shadow-rose-500/20"
            >
              Start Test
            </button>
          </motion.div>
        )}

        {step === 'testing' && (
          <motion.div key="testing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-left">
            <p className="text-sm font-bold text-rose-500 uppercase mb-2">Question {currentIdx + 1} of {MENTAL_QUESTIONS.length}</p>
            <div className="glass p-10 rounded-[2rem]">
              <h2 className="text-2xl font-bold mb-8 text-white">{MENTAL_QUESTIONS[currentIdx].q}</h2>
              <div className="space-y-4">
                {MENTAL_QUESTIONS[currentIdx].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(MENTAL_QUESTIONS[currentIdx].score[idx])}
                    className="w-full p-6 text-left bg-slate-900 border border-slate-800 rounded-2xl font-bold hover:border-rose-500 transition-all text-slate-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div key="results" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass p-12 rounded-[3rem] bg-gradient-to-br from-rose-500 to-orange-500 text-white">
            <Star className="w-16 h-16 text-white/50 mx-auto mb-6" />
            <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Your Mental Age is</p>
            <h2 className="text-9xl font-black mb-8 leading-none tracking-tight">{calculateMentalAge()}</h2>
            <p className="text-xl mb-12 opacity-90 font-bold">"You are an old soul with a youthful perspective."</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-lg mx-auto">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 p-4 bg-white/20 rounded-xl font-bold text-sm hover:bg-white/30 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 p-4 bg-white/20 rounded-xl font-bold text-sm hover:bg-white/30 transition-all"
              >
                <Download className="w-4 h-4" /> Save
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 p-4 bg-white text-rose-500 rounded-xl font-bold text-sm shadow-lg transition-all"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            <button
              onClick={() => { setStep('intro'); setCurrentIdx(0); setTotalPoints(0); }}
              className="text-white/60 hover:text-white font-bold flex items-center gap-2 mx-auto text-sm transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> Retake Test
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Educational Content for Mental Age */}
      <div className="mt-24 pt-24 border-t border-slate-800 text-left">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-white">The Psychology of Mental Age Assessment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-rose-500" /> What is Mental Age?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The concept of **mental age** was originally introduced by the French psychologist Alfred Binet in 1905. It was designed to define the age at which an individual's cognitive performance matches the average performance of a specific age group. For example, if a 10-year-old performs as well as the average 12-year-old on a logic scale, their mental age is 12.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                At **IQ Checker XYZ**, our assessment focuses more on the *behavioral and emotional* aspects of maturity rather than strict academic performance. We evaluate how you handle social situations, stress, and lifestyle choices to estimate your psychological maturity level.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-500" /> Emotional Intelligence (EQ)
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Modern psychology often links mental maturity to Emotional Intelligence. This involves self-regulation, empathy, and social awareness. A person with a high mental age often demonstrates 'Old Soul' characteristics: they are reflective, patient, and less prone to impulsive decisions driven by peer pressure.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Conversely, having a youthful mental age can be a sign of high creativity, spontaneity, and a "growth mindset." It doesn't necessarily mean immaturity, but rather a preservation of playfulness and curiosity that many lose as they age chronologically.
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-rose-500/5 rounded-3xl border border-rose-500/20">
            <h3 className="text-xl font-bold text-white mb-6">Historical Context: The Binet-Simon Scale</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Binet's work was revolutionary because it shifted the focus from measuring the size of the skull (phrenology) to measuring actual mental tasks. While the original scale was used to identify children who needed extra educational support, it later evolved into the foundational logic for the Stanford-Binet Intelligence Scales used today.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <HelpCircle className="w-5 h-5 text-rose-500 mb-2" />
                <p className="text-xs font-bold text-white mb-1">Self-Reflection</p>
                <p className="text-[10px] text-slate-500 leading-tight">Gauging your own maturity through introspection.</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <BookOpen className="w-5 h-5 text-rose-500 mb-2" />
                <p className="text-xs font-bold text-white mb-1">Habit Tracking</p>
                <p className="text-[10px] text-slate-500 leading-tight">Analyzing daily routines and social responses.</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <Star className="w-5 h-5 text-rose-500 mb-2" />
                <p className="text-xs font-bold text-white mb-1">Personality Bias</p>
                <p className="text-[10px] text-slate-500 leading-tight">Understanding how tastes and hobbies evolve over time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalAgeTest;

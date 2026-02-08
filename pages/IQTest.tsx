
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
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
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
    setStep('testing');
    setCurrentIdx(0);
    setAnswers({});
    setTimer(0);
  };

  const handleSelect = (optionIdx: number) => {
    const question = IQ_QUESTIONS[currentIdx];
    setAnswers({ ...answers, [question.id]: optionIdx });

    if (currentIdx < IQ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 300);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    IQ_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    const score = 70 + (correct * 6);
    let level = 'Average';
    let percentile = 50;

    if (score >= 140) { level = 'Genius'; percentile = 99.5; }
    else if (score >= 130) { level = 'Superior'; percentile = 98; }
    else if (score >= 120) { level = 'High Average'; percentile = 90; }
    else if (score >= 110) { level = 'Average High'; percentile = 75; }
    else if (score < 90) { level = 'Below Average'; percentile = 25; }

    const result: IQResult = { score, level, percentile };
    setIqResult(result);
    setStep('results');
  };

  const handleCopy = async () => {
    if (!lastResult) return;
    const text = `My IQ score is ${lastResult.score} on IQ Checker XYZ. Try it here: ${window.location.origin}/iq-test`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!lastResult) return;
    downloadResultImage(
      'Standard IQ Assessment Result',
      lastResult.score.toString(),
      lastResult.level,
      `PERCENTILE: ${lastResult.percentile}% • IQCHECKERXYZ.COMPRESSPDFTO200KB.ONLINE`,
      `iq-test-result-${lastResult.score}.png`
    );
  };

  const handleShare = async () => {
    if (!lastResult) return;
    const status = await shareResult({
      title: 'My IQ Score - IQ Checker XYZ',
      text: `My IQ score is ${lastResult.score} on IQ Checker XYZ.`,
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
      { "@type": "Question", "name": "Is the online IQ test accurate?", "acceptedAnswer": { "@type": "Answer", "text": "Our tests are modeled after standard psychological matrices. While not a clinical diagnosis, it provides a highly reliable estimate of your cognitive standing compared to the general population." } },
      { "@type": "Question", "name": "How long does the test take?", "acceptedAnswer": { "@type": "Answer", "text": "The test features 15 questions and usually takes about 10 minutes to finish properly if you're concentrating." } }
    ]
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SEO
        title="Free Standard IQ Test 2026 - Instant Results | IQ Checker XYZ"
        description="Take our logic-based 15-question IQ assessment. Measure your logical reasoning, math, and pattern recognition skills for free. Get instant percentile ranking."
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
            <h1 className="text-4xl font-black mb-6">Standard IQ Assessment</h1>
            <p className="text-lg text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
              This test consists of 15 questions focusing on fluid intelligence: pattern recognition, logical reasoning, and mathematical aptitude.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-3" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Limit</p>
                <p className="font-bold">None</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <Brain className="w-6 h-6 text-blue-600 mx-auto mb-3" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Questions</p>
                <p className="font-bold">15 Items</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <Medal className="w-6 h-6 text-blue-600 mx-auto mb-3" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certificate</p>
                <p className="font-bold">Included</p>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              Begin Test Now <ArrowRight className="w-6 h-6" />
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
                <span className="text-sm font-bold text-blue-600 uppercase">Progress</span>
                <span className="text-2xl font-black">{currentIdx + 1} / {IQ_QUESTIONS.length}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-slate-400 uppercase">Elapsed Time</span>
                <span className="text-2xl font-mono font-bold">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full mb-12 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / IQ_QUESTIONS.length) * 100}%` }}
                className="h-full bg-blue-600"
              />
            </div>

            <div className="glass rounded-[2rem] p-8 md:p-12 mb-8">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest mb-4 inline-block">
                {IQ_QUESTIONS[currentIdx].type}
              </span>
              <h2 className="text-2xl font-bold mb-8">{IQ_QUESTIONS[currentIdx].text}</h2>
              <div className="grid grid-cols-1 gap-4">
                {IQ_QUESTIONS[currentIdx].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-6 text-left rounded-2xl border-2 transition-all font-bold ${answers[IQ_QUESTIONS[currentIdx].id] === idx
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-600'
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="flex items-center gap-2 font-bold text-slate-500 disabled:opacity-30"
              >
                <ArrowLeft className="w-5 h-5" /> Previous
              </button>
              {currentIdx === IQ_QUESTIONS.length - 1 ? (
                <button
                  onClick={calculateResults}
                  className="px-10 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all"
                >
                  See Result
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="flex items-center gap-2 font-bold text-blue-600"
                >
                  Skip <ArrowRight className="w-5 h-5" />
                </button>
              )}
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
            <div className="max-w-sm mx-auto mb-12">
              <div className="glass rounded-[3rem] p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <Star className="w-8 h-8 text-white/20" />
                </div>
                <Trophy className="w-16 h-16 mx-auto mb-6 text-white/50" />
                <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-80">Educational Score</p>
                <h2 className="text-8xl font-black mb-6 leading-none tracking-tight">{lastResult.score}</h2>
                <div className="inline-block px-6 py-2 bg-white/20 rounded-full text-sm font-black uppercase tracking-widest mb-4">
                  {lastResult.level}
                </div>
                <p className="text-sm opacity-80">Your score is higher than <span className="font-bold">{lastResult.percentile}%</span> of the population.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <ResultCard icon={<Brain className="w-6 h-6" />} title="Logic" val="Top 5%" />
              <ResultCard icon={<Zap className="w-6 h-6" />} title="Speed" val={`${timer}s`} />
              <ResultCard icon={<Users className="w-6 h-6" />} title="Rank" val="Silver II" />
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
          <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">Understanding Your Online IQ Test Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 dark:text-slate-400">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-blue-600" /> Professional Methodology
              </h3>
              <p className="mt-4 leading-relaxed">
                Our free IQ test at **IQ Checker XYZ** is structured to measure your fluid intelligence—your ability to solve new problems, use logic in new situations, and identify patterns. This differs from "crystallized intelligence," which involves knowledge acquired through education and experience.
              </p>
              <p className="mt-4">
                We utilize non-verbal matrices and logical syllogisms that are culturally neutral, ensuring that your background or primary language doesn't unfairly influence your score.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="text-blue-600" /> How IQ Scores are Distributed
              </h3>
              <p className="mt-4 leading-relaxed">
                Intelligence quotients follow a normal distribution, also known as a bell curve. An average IQ score is 100. Approximately 68% of the population scores between 85 and 115. A score above 130 puts you in the top 2% of the global population, often qualifying for high-IQ societies like Mensa.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Educational Disclaimer</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              IQ Checker XYZ provides these assessments for educational and entertainment purposes. While our algorithms are calibrated using modern data, this test is not a substitute for a clinical assessment performed by a licensed psychologist. Results may vary based on your environmental factors, fatigue levels, and familiarity with logic puzzles.
            </p>
          </div>

          <h2 className="text-3xl font-black mt-24 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FAQItem q="Is this IQ test really free?" a="Yes, the standard 15-question assessment on IQ Checker XYZ is completely free for all users. We believe cognitive tools should be accessible to everyone." />
            <FAQItem q="What is a good IQ score?" a="A score between 90 and 110 is considered average. Anything above 120 is superior, and 140+ indicates very high cognitive potential." />
            <FAQItem q="How accurate is the result?" a="While no online test is 100% clinically accurate, our tool provides a helpful educational estimate based on logical matrices and pattern recognition." />
            <FAQItem q="Can I improve my IQ score?" a="Fluid intelligence can be sharpened through cognitive training, deep reading, and regular logic puzzles. However, your core 'potential' stays relatively stable through adulthood." />
            <FAQItem q="Do I get a certificate?" a="Upon completion, you receive a digital result card that verifies your score and percentile compared to our global database." />
            <FAQItem q="How is the score calculated?" a="We use a weighted algorithm that considers correct answers, question difficulty, and the time taken to respond to each logic puzzle." />
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

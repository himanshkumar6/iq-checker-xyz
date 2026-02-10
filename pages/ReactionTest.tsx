import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap,
  Clock,
  Info,
  RefreshCcw,
  Trophy,
  Share2,
  Download
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { downloadResultImage } from '../lib/share';
import { SEO } from '../lib/seo';
import { ShareModal } from '../components/ShareModal';
import { REACTION_FAQS } from '../constants';
import {
  PersonalBestCelebration,
  triggerPBCelebration
} from '../components/PersonalBestCelebration';
import {
  isNewPersonalBest,
  savePersonalBest
} from '../lib/personalBest';

type GameState = 'waiting' | 'ready' | 'clicking' | 'too-early' | 'result';

const ReactionTest: React.FC = () => {
  const [state, setState] = useState<GameState>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const timeoutRef = useRef<any>(null);

  const addReactionAttempt = useStore(s => s.addReactionAttempt);
  const history = useStore(s => s.reactionHistory);

  /* ---------------- START TEST ---------------- */
  const startTest = () => {
    setState('ready');
    const delay = Math.random() * 3000 + 2000;
    timeoutRef.current = setTimeout(() => {
      setState('clicking');
      setStartTime(Date.now());
    }, delay);
  };

  /* ---------------- CLICK HANDLER ---------------- */
  const handleClick = () => {
    if (state === 'ready') {
      clearTimeout(timeoutRef.current);
      setState('too-early');
    } else if (state === 'clicking') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      addReactionAttempt({ id: Date.now(), time });

      if (isNewPersonalBest('reaction_test', time, true)) {
        savePersonalBest('reaction_test', time);
        setTimeout(() => triggerPBCelebration('reaction_test'), 300);
      }

      setState('result');
    } else {
      startTest();
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  /* ---------------- RATING ---------------- */
  const getRating = (ms: number) => {
    if (ms < 180) return { label: 'Inhuman', color: 'text-purple-500' };
    if (ms < 220) return { label: 'Elite', color: 'text-blue-500' };
    if (ms < 280) return { label: 'Excellent', color: 'text-green-500' };
    if (ms < 350) return { label: 'Average', color: 'text-amber-500' };
    return { label: 'Below Average', color: 'text-red-500' };
  };

  return (
    <>
      <SEO
        title="Reaction Time Test - Measure Your Cognitive Speed | IQ Checker XYZ"
        description="Benchmark your reaction speed with millisecond precision."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/reaction-test"
      />

      {/* ✅ MAIN SECTION — NO BACKDROP BLUR */}
      <section className="px-4 pb-16 bg-transparent pt-16">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* HEADER */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-black mb-4 text-slate-50 light:text-slate-900">
              Reaction Speed Test
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-10 max-w-2xl mx-auto">

            {/* GAME CARD */}
            <motion.div
              onClick={handleClick}
              className={`min-h-100 rounded-4xl shadow-2xl flex items-center justify-center cursor-pointer text-slate-50 text-center p-8 transition-colors
                ${state === 'waiting'
                  ? 'bg-blue-600'
                  : state === 'ready'
                    ? 'bg-rose-500'
                    : state === 'clicking'
                      ? 'bg-emerald-500'
                      : state === 'too-early'
                        ? 'bg-slate-800'
                        : 'bg-blue-600'
                }`}
            >
              <AnimatePresence mode="wait">
                {state === 'waiting' && (
                  <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Zap className="w-14 h-14 mx-auto mb-6" />
                    <h2 className="text-3xl font-black mb-3">Click to Start</h2>
                    <p className="opacity-80">Wait for GREEN.</p>
                  </motion.div>
                )}

                {state === 'ready' && (
                  <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Clock className="w-14 h-14 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl font-black">Wait…</h2>
                  </motion.div>
                )}

                {state === 'clicking' && (
                  <motion.div key="clicking" initial={{ scale: 0.85 }} animate={{ scale: 1 }}>
                    <h2 className="text-5xl font-black">CLICK NOW!</h2>
                  </motion.div>
                )}

                {state === 'too-early' && (
                  <motion.div key="early" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Info className="w-14 h-14 mx-auto mb-4 text-slate-400" />
                    <h2 className="text-3xl font-black mb-2">Too Early</h2>
                    <p className="opacity-80">Wait for green.</p>
                  </motion.div>
                )}

                {state === 'result' && reactionTime && (
                  <motion.div key="result" initial={{ y: 20 }} animate={{ y: 0 }}>
                    <h3 className="text-xs uppercase tracking-widest mb-2 opacity-80">
                      Reaction Time
                    </h3>

                    <div className="text-6xl font-black mb-6">
                      {reactionTime}
                      <span className="text-3xl ml-1">ms</span>
                    </div>

                    <div className="inline-block px-4 py-1 rounded-full bg-white/20 font-bold text-sm mb-6">
                      {getRating(reactionTime).label}
                    </div>

                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          downloadResultImage(
                            'Reaction Speed',
                            `${reactionTime}ms`,
                            getRating(reactionTime).label,
                            'COGNITIVE SPEED',
                            `reaction-${reactionTime}.png`
                          );
                        }}
                        className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 text-sm font-bold"
                      >
                        <Download className="w-4 h-4 inline mr-1" />
                        Download
                      </button>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setShareModalOpen(true);
                        }}
                        className="px-4 py-2 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                      >
                        <Share2 className="w-4 h-4 inline mr-1" />
                        Share
                      </button>
                    </div>

                    {/* DISCLAIMER & LINKS */}
                    <div className="mt-8 pt-8 border-t border-white/10 text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4">
                        Educational Context
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <Link to="/blog/average-iq-by-age" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                          <p className="text-[10px] font-bold text-white">Mind Evolution</p>
                        </Link>
                        <Link to="/blog/brain-training" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                          <p className="text-[10px] font-bold text-white">Brain Training</p>
                        </Link>
                      </div>
                      <p className="text-[10px] text-white/40 italic leading-relaxed">
                        Reaction time is a measure of neurological efficiency, not general intelligence. Results are influenced by hardware, fatigue, and environmental factors. Educational use only.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* HISTORY — SAFE GLASS BLUR */}
            <div className="glass bg-slate-900 light:bg-white/70 backdrop-blur-md rounded-4xl p-8 border border-slate-800 light:border-slate-200">
              <h3 className="text-xl font-bold mb-6 text-slate-50 light:text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Your History
              </h3>

              {history.length === 0 ? (
                <p className="text-center text-slate-400 light:text-slate-500">
                  No attempts yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {history.slice(0, 5).map(h => (
                    <div
                      key={h.id}
                      className="flex justify-between items-center p-4 rounded-xl bg-slate-950 light:bg-white/50 backdrop-blur-sm border border-slate-800 light:border-slate-100"
                    >
                      <span className="font-bold">
                        {h.time} ms
                      </span>
                      <span className={`text-xs font-black uppercase tracking-widest ${getRating(h.time).color}`}>
                        {getRating(h.time).label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <PersonalBestCelebration gameName="reaction_test" />

          {reactionTime && (
            <ShareModal
              isOpen={shareModalOpen}
              onClose={() => setShareModalOpen(false)}
              title="Reaction Speed"
              value={`${reactionTime}ms`}
              label={getRating(reactionTime).label}
              footer="COGNITIVE SPEED"
              shareText={`My reaction speed is ${reactionTime}ms!`}
              shareUrl={`${window.location.origin}/reaction-test`}
            />
          )}
        </div>
      </section>

      {/* FAQ SECTION — glass */}
      <section className="px-4 pb-16 bg-transparent pt-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-50 light:text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {REACTION_FAQS.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
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

export default ReactionTest;

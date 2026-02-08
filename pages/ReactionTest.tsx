
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Info, RefreshCcw, Trophy, Share2, Copy, Download, Check, Brain, MousePointer2, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';
import { downloadResultImage } from '../lib/share';
import { SEO } from '../lib/seo';
import { ShareModal } from '../components/ShareModal';

type GameState = 'waiting' | 'ready' | 'clicking' | 'too-early' | 'result';

const ReactionTest: React.FC = () => {
  const [state, setState] = useState<GameState>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const timeoutRef = useRef<any>(null);
  const addReactionAttempt = useStore(state => state.addReactionAttempt);
  const history = useStore(state => state.reactionHistory);

  const startTest = () => {
    setState('ready');
    const delay = Math.random() * 3000 + 2000;
    timeoutRef.current = setTimeout(() => {
      setState('clicking');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (state === 'ready') {
      clearTimeout(timeoutRef.current);
      setState('too-early');
    } else if (state === 'clicking') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      addReactionAttempt({ id: Date.now(), time });
      setState('result');
    } else if (state === 'too-early' || state === 'result' || state === 'waiting') {
      startTest();
    }
  };

  const handleDownload = () => {
    if (!reactionTime) return;
    const rating = getRating(reactionTime);
    downloadResultImage(
      'Reaction Speed Assessment',
      `${reactionTime}ms`,
      rating.label,
      `COGNITIVE PROCESSING SPEED • IQCHECKERXYZ.COMPRESSPDFTO200KB.ONLINE`,
      `reaction-speed-${reactionTime}ms.png`
    );
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const getRating = (ms: number) => {
    if (ms < 180) return { label: 'Inhuman', color: 'text-purple-500' };
    if (ms < 220) return { label: 'Elite', color: 'text-blue-500' };
    if (ms < 280) return { label: 'Excellent', color: 'text-green-500' };
    if (ms < 350) return { label: 'Average', color: 'text-amber-500' };
    return { label: 'Below Average', color: 'text-red-500' };
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <SEO
        title="Reaction Time Test - Measure Your Cognitive Speed | IQ Checker XYZ"
        description="Benchmark your reaction speed with millisecond precision. Compare your results with the global average. Free cognitive tools."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/reaction-test"
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4 text-white">Reaction Speed Test</h1>
        <p className="text-slate-400 font-medium">Measure your cognitive processing and response time with 1ms precision.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
        <div className="w-full">
          <motion.div
            onClick={handleClick}
            className={`min-h-[400px] h-auto rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 text-white text-center p-6 md:p-12 ${state === 'waiting' ? 'bg-blue-600' :
              state === 'ready' ? 'bg-rose-500' :
                state === 'clicking' ? 'bg-emerald-500' :
                  state === 'too-early' ? 'bg-slate-800' :
                    'bg-blue-600'
              }`}
          >
            <AnimatePresence mode="wait">
              {state === 'waiting' && (
                <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Zap className="w-16 h-16 mx-auto mb-6" />
                  <h2 className="text-3xl font-black mb-4">Click to Start</h2>
                  <p className="opacity-80">Wait for the color to turn GREEN.</p>
                </motion.div>
              )}
              {state === 'ready' && (
                <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Clock className="w-16 h-16 mx-auto mb-6 animate-pulse" />
                  <h2 className="text-3xl font-black mb-4">Wait for Green...</h2>
                </motion.div>
              )}
              {state === 'clicking' && (
                <motion.div key="clicking" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                  <h2 className="text-5xl font-black">CLICK NOW!</h2>
                </motion.div>
              )}
              {state === 'too-early' && (
                <motion.div key="too-early" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Info className="w-16 h-16 mx-auto mb-6 text-slate-400" />
                  <h2 className="text-3xl font-black mb-4">Too Early!</h2>
                  <p className="opacity-80">Wait for green before clicking.</p>
                  <p className="mt-6 font-bold">Click to try again</p>
                </motion.div>
              )}
              {state === 'result' && reactionTime && (
                <motion.div key="result" initial={{ y: 20 }} animate={{ y: 0 }}>
                  <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Reaction Time</h2>
                  <h3 className="text-5xl md:text-8xl font-black mb-6">{reactionTime} <span className="text-2xl md:text-4xl">ms</span></h3>
                  <div className={`px-4 py-1 bg-white/20 rounded-full font-black text-sm uppercase mb-8`}>
                    {getRating(reactionTime).label}
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                      className="flex flex-col md:flex-row items-center justify-center gap-2 p-3 min-h-[60px] md:min-h-[44px] bg-white/10 rounded-xl hover:bg-white/20 transition-all text-[10px] md:text-xs font-bold active:scale-95 touch-manipulation"
                    >
                      <Download className="w-5 h-5 md:w-4 md:h-4" /> <span>Download</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setShareModalOpen(true); }}
                      className="flex flex-col md:flex-row items-center justify-center gap-2 p-3 min-h-[60px] md:min-h-[44px] bg-white text-blue-600 rounded-xl hover:bg-slate-100 transition-all text-[10px] md:text-xs font-bold active:scale-95 touch-manipulation shadow-lg"
                    >
                      <Share2 className="w-5 h-5 md:w-4 md:h-4" /> <span>Share</span>
                    </button>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); startTest(); }}
                    className="mt-6 flex items-center gap-2 mx-auto text-white/60 hover:text-white transition-colors text-sm font-bold"
                  >
                    <RefreshCcw className="w-4 h-4" /> Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="w-full">
          <div className="glass rounded-[2rem] p-8 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Trophy className="w-5 h-5 text-amber-500" /> Your History
            </h3>
            {history.length > 0 ? (
              <div className="space-y-4">
                {history.slice(0, 5).map((h) => {
                  const rating = getRating(h.time);
                  return (
                    <div key={h.id} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <div>
                        <p className="font-bold text-white">{h.time} ms</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(h.id).toLocaleTimeString()}</p>
                      </div>
                      <span className={`text-xs font-bold ${rating.color}`}>{rating.label}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Clock className="w-8 h-8 mx-auto mb-4 opacity-20" />
                <p>No history yet. Start clicking!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 glass rounded-[2rem] p-8 md:p-12">
        <h2 className="text-3xl font-black mb-8 text-white">Deep Dive into Human Reaction Speed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 leading-relaxed text-sm">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Biological Factors
            </h3>
            <p>
              Human reaction time is the interval between the presentation of a stimulus and the initiation of a muscular response. In physiological terms, it involves the stimulus reaching a sensory organ (like the eye), the signal traveling to the brain via the central nervous system, and the motor cortex sending a signal back to the muscles (like the finger clicking the mouse).
            </p>
            <p>
              Factors that significantly impact your speed include **age** (which usually peaks in your early 20s), **circadian rhythms**, and **physical fitness**. Interestingly, visual reaction times are typically slower than auditory reaction times (around 160ms for sound vs. 190ms for light).
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MousePointer2 className="w-5 h-5 text-blue-600" /> Technical Variables
            </h3>
            <p>
              When testing online at **IQ Checker XYZ**, your hardware plays a major role. A typical 60Hz monitor has an input lag of about 16.7ms per frame. Elite 240Hz monitors reduce this to just 4.16ms.
            </p>
            <p>
              Additionally, your browser's execution speed and the mouse's polling rate contribute to the "total latency" of your result. To get the most accurate "biological" benchmark, we recommend using a wired mouse and a high-refresh-rate display in a distraction-free environment.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <p className="font-bold text-white text-sm mb-1 uppercase tracking-tight">Focus Benchmarking</p>
            <p className="text-xs text-slate-500">Improves mental presence and focus stamina.</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <p className="font-bold text-white text-sm mb-1 uppercase tracking-tight">Neuroplasticity</p>
            <p className="text-xs text-slate-500">Regular testing helps maintain conduction velocity.</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-5 h-5" />
            </div>
            <p className="font-bold text-white text-sm mb-1 uppercase tracking-tight">Global Ranking</p>
            <p className="text-xs text-slate-500">Benchmark yourself against the community average.</p>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {reactionTime && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title="Reaction Speed Assessment"
          value={`${reactionTime}ms`}
          label={getRating(reactionTime).label}
          footer="COGNITIVE PROCESSING SPEED"
          shareText={`My reaction speed is ${reactionTime}ms on IQ Checker XYZ. Can you beat me?`}
          shareUrl={`${window.location.origin}/reaction-test`}
        />
      )}
    </div>
  );
};

export default ReactionTest;

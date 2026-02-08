import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { useBrainGameSession } from '../../lib/hooks/useBrainGameSession';
import { SessionSummaryModal } from '../../components/SessionSummaryModal';
import { SoundControl, playSound } from '../../components/SoundControl';
import { PersonalBestCelebration, triggerPBCelebration } from '../../components/PersonalBestCelebration';
import { isNewPersonalBest, savePersonalBest } from '../../lib/personalBest';

type GamePhase = 'memorize' | 'recall' | 'feedback';

const MemoryGrid: React.FC = () => {
  const [gridSize, setGridSize] = useState(3);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [phase, setPhase] = useState<GamePhase>('memorize');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [level, setLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

  const { session, updateSession } = useBrainGameSession({
    onSessionEnd: (finalSession) => {
      // Check for personal best
      const isNewBest = isNewPersonalBest('memory_grid', finalSession.score, false);
      if (isNewBest) {
        savePersonalBest('memory_grid', finalSession.score);
        // Small delay to let the summary modal reveal animation start
        setTimeout(() => triggerPBCelebration('memory_grid'), 500);
      }
      setShowSummary(true);
    }
  });

  // Generate random pattern
  const generatePattern = (size: number, numCells: number): number[] => {
    const totalCells = size * size;
    const pattern: number[] = [];

    while (pattern.length < numCells) {
      const cell = Math.floor(Math.random() * totalCells);
      if (!pattern.includes(cell)) {
        pattern.push(cell);
      }
    }

    return pattern;
  };

  // Initialize first pattern
  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const numCells = Math.min(3 + Math.floor(level / 2), gridSize * gridSize - 1);
    const newPattern = generatePattern(gridSize, numCells);
    setPattern(newPattern);
    setUserPattern([]);
    setPhase('memorize');
    setFeedback(null);

    // Auto-transition to recall phase
    const displayTime = Math.max(2000, 3000 - level * 100);
    setTimeout(() => {
      setPhase('recall');
    }, displayTime);
  };

  const handleCellClick = (index: number) => {
    if (phase !== 'recall') return;

    playSound('click');

    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);

    // Check if pattern is complete
    if (newUserPattern.length === pattern.length) {
      checkPattern(newUserPattern);
    }
  };

  const checkPattern = (userPat: number[]) => {
    const isCorrect = userPat.every((cell, idx) => cell === pattern[idx]);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setPhase('feedback');

    playSound(isCorrect ? 'correct' : 'incorrect');

    const newQuestionsAnswered = (session.questionsAnswered || 0) + 1;
    const newCorrectAnswers = (session.correctAnswers || 0) + (isCorrect ? 1 : 0);
    const newAccuracy = Math.round((newCorrectAnswers / newQuestionsAnswered) * 100);
    const newScore = newCorrectAnswers * 10;

    updateSession({
      questionsAnswered: newQuestionsAnswered,
      correctAnswers: newCorrectAnswers,
      accuracy: newAccuracy,
      score: newScore,
      level: level
    });

    if (isCorrect) {
      const newLevel = level + 1;
      setLevel(newLevel);

      // Increase grid size every 4 levels
      if (newLevel % 4 === 0 && gridSize < 6) {
        setGridSize(prev => prev + 1);
        playSound('levelup');
      }
    }

    // Next round after delay
    setTimeout(() => {
      startNewRound();
    }, 2000);
  };

  const getCategoryLabel = (score: number): string => {
    if (score >= 100) return 'Memory Master';
    if (score >= 70) return 'Pattern Expert';
    if (score >= 40) return 'Visual Thinker';
    if (score >= 20) return 'Grid Navigator';
    return 'Getting Started';
  };

  const totalCells = gridSize * gridSize;

  return (
    <div className="min-h-screen overflow-hidden">
      <SEO
        title="Memory Grid Game – Visual Memory Training | IQ Checker XYZ"
        description="Test your visual memory with expanding grid patterns. Free brain game for memory practice and spatial recall."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/brain-games/memory-grid"
      />

      <SoundControl />

      {/* Header */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/brain-games" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Brain Games
          </Link>
          <button
            onClick={() => setShowSummary(true)}
            className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-xl font-bold text-sm hover:bg-red-600/30 transition-all"
          >
            Quit Game
          </button>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Memory Grid</h1>
            <p className="text-slate-400">Remember and recreate the pattern</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Score</p>
            <p className="text-3xl font-black text-white">{session.score}</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="p-3 glass rounded-xl text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Accuracy</p>
            <p className="text-lg font-bold text-white">{session.accuracy}%</p>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Completed</p>
            <p className="text-lg font-bold text-white">{session.correctAnswers}</p>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Level</p>
            <p className="text-lg font-bold text-white">{level}</p>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Grid</p>
            <p className="text-lg font-bold text-white">{gridSize}×{gridSize}</p>
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${phase === 'memorize' ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-900 text-slate-500'
            }`}>
            <Eye className="w-4 h-4" />
            <span className="text-sm font-bold">Memorize</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${phase === 'recall' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-900 text-slate-500'
            }`}>
            <EyeOff className="w-4 h-4" />
            <span className="text-sm font-bold">Recall</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${phase}-${pattern.join(',')}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 glass rounded-3xl"
            >
              {/* Instruction */}
              <div className="text-center mb-6">
                {phase === 'memorize' && (
                  <p className="text-slate-400 text-sm">
                    <Eye className="w-4 h-4 inline mr-2" />
                    Memorize the highlighted cells...
                  </p>
                )}
                {phase === 'recall' && (
                  <p className="text-emerald-400 text-sm font-bold">
                    <EyeOff className="w-4 h-4 inline mr-2" />
                    Tap the cells in the same order!
                  </p>
                )}
                {phase === 'feedback' && feedback && (
                  <p className={`text-sm font-bold ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'
                    }`}>
                    {feedback === 'correct' ? '✓ Perfect!' : '✗ Try again!'}
                  </p>
                )}
              </div>

              {/* Grid */}
              <div
                className="grid gap-3 mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                  maxWidth: `${gridSize * 80}px`
                }}
              >
                {Array.from({ length: totalCells }).map((_, index) => {
                  const isInPattern = pattern.includes(index);
                  const isInUserPattern = userPattern.includes(index);
                  const showPattern = phase === 'memorize' || phase === 'feedback';

                  let bgClass = 'bg-slate-900';
                  if (showPattern && isInPattern) bgClass = 'bg-blue-600';
                  if (phase === 'recall' && isInUserPattern) bgClass = 'bg-emerald-600';
                  if (phase === 'feedback' && feedback === 'incorrect' && isInUserPattern && !isInPattern) {
                    bgClass = 'bg-red-600';
                  }

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleCellClick(index)}
                      disabled={phase !== 'recall'}
                      className={`aspect-square ${bgClass} rounded-xl border-2 border-slate-800 transition-all hover:scale-105 active:scale-95 disabled:cursor-default`}
                      whileTap={phase === 'recall' ? { scale: 0.9 } : {}}
                    >
                      {phase === 'recall' && isInUserPattern && (
                        <span className="text-white font-bold text-sm">
                          {userPattern.indexOf(index) + 1}
                        </span>
                      )}
                      {showPattern && isInPattern && (
                        <span className="text-white font-bold text-sm">
                          {pattern.indexOf(index) + 1}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Progress */}
              {phase === 'recall' && (
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Progress</span>
                    <span>{userPattern.length} / {pattern.length}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${(userPattern.length / pattern.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Session Summary Modal */}
      <SessionSummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        gameName="Memory Grid"
        score={session.score}
        accuracy={session.accuracy}
        timePlayedSeconds={session.timePlayedSeconds}
        categoryLabel={getCategoryLabel(session.score)}
        additionalStats={[
          { label: 'Level', value: level },
          { label: 'Grid Size', value: `${gridSize}×${gridSize}` }
        ]}
      />

      {/* Personal Best Celebration Overlay */}
      <PersonalBestCelebration gameName="memory_grid" />
    </div>
  );
};

export default MemoryGrid;

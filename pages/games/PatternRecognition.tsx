import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { useBrainGameSession } from '../../lib/hooks/useBrainGameSession';
import { SessionSummaryModal } from '../../components/SessionSummaryModal';
import { SoundControl, playSound } from '../../components/SoundControl';
import { PersonalBestCelebration, triggerPBCelebration } from '../../components/PersonalBestCelebration';
import { isNewPersonalBest, savePersonalBest } from '../../lib/personalBest';

interface Pattern {
  sequence: number[];
  options: number[];
  correctAnswer: number;
  type: 'arithmetic' | 'geometric' | 'fibonacci';
}

const PatternRecognition: React.FC = () => {
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [difficulty, setDifficulty] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

  const { session, updateSession } = useBrainGameSession({
    onSessionEnd: (finalSession) => {
      // Check for personal best
      const isNewBest = isNewPersonalBest('pattern_recognition', finalSession.score, false);
      if (isNewBest) {
        savePersonalBest('pattern_recognition', finalSession.score);
        // Small delay to let the summary modal reveal animation start
        setTimeout(() => triggerPBCelebration('pattern_recognition'), 500);
      }
      setShowSummary(true);
    }
  });

  // Generate pattern based on difficulty
  const generatePattern = (diff: number): Pattern => {
    const types: Pattern['type'][] = ['arithmetic', 'geometric', 'fibonacci'];
    const type = types[Math.floor(Math.random() * Math.min(types.length, Math.ceil(diff / 2)))];

    let sequence: number[] = [];
    let correctAnswer: number;

    if (type === 'arithmetic') {
      const start = Math.floor(Math.random() * 10) + 1;
      const step = Math.floor(Math.random() * (diff + 2)) + 1;
      const length = Math.min(5 + Math.floor(diff / 3), 7);

      for (let i = 0; i < length; i++) {
        sequence.push(start + step * i);
      }
      correctAnswer = start + step * length;
    } else if (type === 'geometric') {
      const start = Math.floor(Math.random() * 5) + 2;
      const ratio = Math.floor(Math.random() * 2) + 2;
      const length = Math.min(4 + Math.floor(diff / 4), 6);

      for (let i = 0; i < length; i++) {
        sequence.push(start * Math.pow(ratio, i));
      }
      correctAnswer = start * Math.pow(ratio, length);
    } else {
      // Fibonacci-like
      const a = Math.floor(Math.random() * 3) + 1;
      const b = Math.floor(Math.random() * 3) + 2;
      sequence = [a, b];
      const length = Math.min(5 + Math.floor(diff / 3), 7);

      for (let i = 2; i < length; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
      }
      correctAnswer = sequence[length - 1] + sequence[length - 2];
    }

    // Generate options
    const options = [correctAnswer];
    while (options.length < 4) {
      const offset = Math.floor(Math.random() * 20) - 10;
      const option = correctAnswer + offset;
      if (option > 0 && !options.includes(option)) {
        options.push(option);
      }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    return { sequence, options, correctAnswer, type };
  };

  // Initialize first pattern
  useEffect(() => {
    setCurrentPattern(generatePattern(difficulty));
  }, []);

  const handleAnswer = (answer: number) => {
    if (!currentPattern || selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentPattern.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    playSound(isCorrect ? 'correct' : 'incorrect');

    const newQuestionsAnswered = (session.questionsAnswered || 0) + 1;
    const newCorrectAnswers = (session.correctAnswers || 0) + (isCorrect ? 1 : 0);
    const newAccuracy = Math.round((newCorrectAnswers / newQuestionsAnswered) * 100);
    const newScore = newCorrectAnswers * 10;

    updateSession({
      questionsAnswered: newQuestionsAnswered,
      correctAnswers: newCorrectAnswers,
      accuracy: newAccuracy,
      score: newScore
    });

    // Increase difficulty every 3 correct answers
    if (isCorrect && newCorrectAnswers % 3 === 0) {
      setDifficulty(prev => prev + 1);
      playSound('levelup');
    }

    // Next pattern after delay
    setTimeout(() => {
      setCurrentPattern(generatePattern(isCorrect && newCorrectAnswers % 3 === 0 ? difficulty + 1 : difficulty));
      setSelectedAnswer(null);
      setFeedback(null);
    }, 1500);
  };

  const getCategoryLabel = (score: number): string => {
    if (score >= 100) return 'Pattern Master';
    if (score >= 70) return 'Logic Expert';
    if (score >= 40) return 'Quick Thinker';
    if (score >= 20) return 'Pattern Finder';
    return 'Getting Started';
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <SEO
        title="Pattern Recognition Game – Test Your Logic Skills | IQ Checker XYZ"
        description="Challenge your pattern recognition skills with endless logical sequences. Free brain game for logic practice and mental exercise."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/brain-games/pattern-recognition"
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
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Pattern Recognition</h1>
            <p className="text-slate-400">Find the next number in the sequence</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Score</p>
            <p className="text-3xl font-black text-white">{session.score}</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 glass rounded-xl text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Accuracy</p>
            <p className="text-xl font-bold text-white">{session.accuracy}%</p>
          </div>
          <div className="p-4 glass rounded-xl text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Answered</p>
            <p className="text-xl font-bold text-white">{session.questionsAnswered}</p>
          </div>
          <div className="p-4 glass rounded-xl text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Difficulty</p>
            <p className="text-xl font-bold text-white">Level {difficulty}</p>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          {currentPattern && (
            <motion.div
              key={currentPattern.sequence.join('-')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              {/* Sequence Display */}
              <div className="p-8 glass rounded-3xl mb-6">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <p className="text-sm text-slate-400">What comes next?</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                  {currentPattern.sequence.map((num, idx) => (
                    <div key={idx} className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
                      <span className="text-2xl font-bold text-white">{num}</span>
                    </div>
                  ))}
                  <div className="w-16 h-16 bg-blue-600/20 border-2 border-blue-600 border-dashed rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400">?</span>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                {currentPattern.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentPattern.correctAnswer;
                  const showResult = selectedAnswer !== null;

                  let bgClass = 'bg-slate-900 hover:bg-slate-800';
                  if (showResult && isSelected && isCorrect) bgClass = 'bg-green-600';
                  if (showResult && isSelected && !isCorrect) bgClass = 'bg-red-600';
                  if (showResult && !isSelected && isCorrect) bgClass = 'bg-green-600/50';

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                      className={`p-6 ${bgClass} rounded-2xl border border-slate-800 transition-all disabled:cursor-not-allowed hover:scale-105 active:scale-95`}
                    >
                      <span className="text-3xl font-bold text-white">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl text-center font-bold ${feedback === 'correct' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                    }`}
                >
                  {feedback === 'correct' ? '✓ Correct!' : '✗ Incorrect'}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Session Summary Modal */}
      <SessionSummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        gameName="Pattern Recognition"
        score={session.score}
        accuracy={session.accuracy}
        timePlayedSeconds={session.timePlayedSeconds}
        categoryLabel={getCategoryLabel(session.score)}
        additionalStats={[
          { label: 'Patterns', value: session.questionsAnswered || 0 }
        ]}
      />

      {/* Personal Best Celebration Overlay */}
      <PersonalBestCelebration gameName="pattern_recognition" />
    </div>
  );
};

export default PatternRecognition;

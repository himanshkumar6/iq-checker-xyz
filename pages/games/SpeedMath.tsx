import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Timer } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { useBrainGameSession } from '../../lib/hooks/useBrainGameSession';
import { SessionSummaryModal } from '../../components/SessionSummaryModal';
import { QuitConfirmationModal } from '../../components/QuitConfirmationModal';
import { SoundControl, playSound } from '../../components/SoundControl';
import { PersonalBestCelebration, triggerPBCelebration } from '../../components/PersonalBestCelebration';
import { isNewPersonalBest, savePersonalBest } from '../../lib/personalBest';

interface MathQuestion {
  question: string;
  answer: number;
  operator: '+' | '-' | '×' | '÷';
}

const SpeedMath: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [difficulty, setDifficulty] = useState(1);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [totalResponseTime, setTotalResponseTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const navigate = useNavigate();

  const { session, updateSession } = useBrainGameSession({
    onSessionEnd: (finalSession) => {
      // Check for personal best
      const isNewBest = isNewPersonalBest('speed_math', finalSession.score, false);
      if (isNewBest) {
        savePersonalBest('speed_math', finalSession.score);
        // Small delay to let the summary modal reveal animation start
        setTimeout(() => triggerPBCelebration('speed_math'), 500);
      }
      setShowSummary(true);
    }
  });

  // Generate math question based on difficulty
  const generateQuestion = (diff: number): MathQuestion => {
    const operators: MathQuestion['operator'][] = ['+', '-'];
    if (diff >= 3) operators.push('×');
    if (diff >= 5) operators.push('÷');

    const operator = operators[Math.floor(Math.random() * operators.length)];
    const maxNum = Math.min(10 + diff * 5, 100);

    let num1: number, num2: number, answer: number, question: string;

    if (operator === '+') {
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * maxNum) + 1;
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
    } else if (operator === '-') {
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
      question = `${num1} - ${num2}`;
    } else if (operator === '×') {
      num1 = Math.floor(Math.random() * Math.min(12, diff + 2)) + 1;
      num2 = Math.floor(Math.random() * Math.min(12, diff + 2)) + 1;
      answer = num1 * num2;
      question = `${num1} × ${num2}`;
    } else {
      // Division - ensure clean division
      num2 = Math.floor(Math.random() * Math.min(12, diff + 2)) + 1;
      answer = Math.floor(Math.random() * Math.min(12, diff + 2)) + 1;
      num1 = num2 * answer;
      question = `${num1} ÷ ${num2}`;
    }

    return { question, answer, operator };
  };

  // Initialize first question
  useEffect(() => {
    setCurrentQuestion(generateQuestion(difficulty));
    setQuestionStartTime(Date.now());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion || userAnswer === '' || feedback !== null) return;

    const responseTime = Date.now() - questionStartTime;
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    playSound(isCorrect ? 'correct' : 'incorrect');

    const newQuestionsAnswered = (session.questionsAnswered || 0) + 1;
    const newCorrectAnswers = (session.correctAnswers || 0) + (isCorrect ? 1 : 0);
    const newAccuracy = Math.round((newCorrectAnswers / newQuestionsAnswered) * 100);
    const newTotalResponseTime = totalResponseTime + (isCorrect ? responseTime : 0);
    const avgResponseTime = newCorrectAnswers > 0 ? Math.round(newTotalResponseTime / newCorrectAnswers) : 0;

    // Score: correct answers * 10, bonus for speed (max 5 points per question)
    const speedBonus = isCorrect ? Math.max(0, 5 - Math.floor(responseTime / 1000)) : 0;
    const newScore = (session.score || 0) + (isCorrect ? 10 + speedBonus : 0);

    updateSession({
      questionsAnswered: newQuestionsAnswered,
      correctAnswers: newCorrectAnswers,
      accuracy: newAccuracy,
      score: newScore
    });

    if (isCorrect) {
      setTotalResponseTime(newTotalResponseTime);
    }

    // Increase difficulty every 5 correct answers
    if (isCorrect && newCorrectAnswers % 5 === 0) {
      setDifficulty(prev => prev + 1);
      playSound('levelup');
    }

    // Next question after delay
    setTimeout(() => {
      setCurrentQuestion(generateQuestion(isCorrect && newCorrectAnswers % 5 === 0 ? difficulty + 1 : difficulty));
      setUserAnswer('');
      setFeedback(null);
      setQuestionStartTime(Date.now());
    }, 1200);
  };

  const getCategoryLabel = (score: number): string => {
    if (score >= 150) return 'Math Wizard';
    if (score >= 100) return 'Speed Calculator';
    if (score >= 60) return 'Quick Thinker';
    if (score >= 30) return 'Number Cruncher';
    return 'Getting Started';
  };

  const avgResponseTime = (session.correctAnswers || 0) > 0
    ? Math.round(totalResponseTime / (session.correctAnswers || 1))
    : 0;

  return (
    <div className="min-h-screen overflow-hidden bg-transparent">
      <SEO
        title="Speed Math Challenge – Quick Mental Arithmetic | IQ Checker XYZ"
        description="Test your mental math speed with timed arithmetic challenges. Free brain game for calculation practice and quick thinking."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/brain-games/speed-math"
      />

      <SoundControl />

      {/* Header */}
      <div className="pt-16 pb-8 bg-slate-900/20 light:bg-slate-50/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link to="/brain-games" className="inline-flex items-center gap-2 text-slate-400 light:text-slate-500 hover:text-slate-50 light:hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Arena
            </Link>
            <button
              onClick={() => setShowQuitConfirm(true)}
              className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-xl font-bold text-sm hover:bg-red-600/30 transition-all"
            >
              Quit Game
            </button>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-50 light:text-slate-900 mb-2">Speed Math Challenge</h1>
              <p className="text-slate-300 light:text-slate-600">Solve as fast as you can</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 light:text-slate-400 uppercase tracking-widest mb-1">Score</p>
              <p className="text-3xl font-black text-slate-50 light:text-slate-900">{session.score}</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            <div className="p-3 glass bg-slate-900 light:bg-white/70 backdrop-blur-md border border-slate-800 light:border-slate-200 rounded-xl text-center shadow-sm">
              <p className="text-xs text-slate-500 light:text-slate-400 uppercase mb-1">Accuracy</p>
              <p className="text-lg font-bold text-slate-50 light:text-slate-900">{session.accuracy}%</p>
            </div>
            <div className="p-3 glass bg-slate-900 light:bg-white/70 backdrop-blur-md border border-slate-800 light:border-slate-200 rounded-xl text-center shadow-sm">
              <p className="text-xs text-slate-500 light:text-slate-400 uppercase mb-1">Solved</p>
              <p className="text-lg font-bold text-slate-50 light:text-slate-900">{session.correctAnswers}</p>
            </div>
            <div className="p-3 glass bg-slate-900 light:bg-white/70 backdrop-blur-md border border-slate-800 light:border-slate-200 rounded-xl text-center shadow-sm">
              <p className="text-xs text-slate-500 light:text-slate-400 uppercase mb-1">Avg Time</p>
              <p className="text-lg font-bold text-slate-50 light:text-slate-900">{(avgResponseTime / 1000).toFixed(1)}s</p>
            </div>
            <div className="p-3 glass bg-slate-900 light:bg-white/70 backdrop-blur-md border border-slate-800 light:border-slate-200 rounded-xl text-center shadow-sm">
              <p className="text-xs text-slate-500 light:text-slate-400 uppercase mb-1">Level</p>
              <p className="text-lg font-bold text-slate-50 light:text-slate-900">{difficulty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="px-4 pb-16 bg-transparent pt-16">
        <div className="container mx-auto">
          <div className="max-w-lg mx-auto">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.question}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                {/* Question Display */}
                <div className="p-12 glass bg-slate-900 light:bg-white/70 backdrop-blur-md rounded-3xl mb-6 text-center border border-slate-800 light:border-slate-200 shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-6 text-amber-500 light:text-amber-600">
                    <Timer className="w-5 h-5" />
                    <p className="text-sm font-bold uppercase tracking-widest">Blitz Focus</p>
                  </div>

                  <div className="text-6xl md:text-7xl font-black text-slate-50 light:text-slate-900 mb-8">
                    {currentQuestion.question}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      disabled={feedback !== null}
                      placeholder="Your answer"
                      autoFocus
                      className="w-full p-6 bg-slate-950 light:bg-slate-50 border-2 border-slate-800 light:border-slate-200 rounded-2xl text-center text-3xl font-bold text-slate-300 light:text-slate-900 placeholder-slate-600 light:placeholder-slate-400 focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      disabled={userAnswer === '' || feedback !== null}
                      className="w-full p-4 bg-amber-600 text-slate-50 font-bold rounded-xl hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  </form>
                </div>

                {/* Feedback */}
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center font-bold ${feedback === 'correct' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                      }`}
                  >
                    {feedback === 'correct' ? '✓ Correct!' : `✗ Incorrect - Answer was ${currentQuestion.answer}`}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Number Pad (Mobile Optimization) */}
            <div className="grid grid-cols-3 gap-3 md:hidden">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  onClick={() => setUserAnswer(prev => prev + num.toString())}
                  disabled={feedback !== null}
                  className="p-6 bg-slate-900 light:bg-white rounded-xl text-2xl font-bold text-slate-50 light:text-slate-900 hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-800 light:border-slate-200 active:scale-95 transition-all disabled:opacity-50 shadow-sm"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setUserAnswer(prev => prev.slice(0, -1))}
                disabled={feedback !== null}
                className="p-6 bg-red-900/30 rounded-xl text-lg font-bold text-red-400 hover:bg-red-900/50 active:scale-95 transition-all disabled:opacity-50"
              >
                ←
              </button>
            </div>
          </div>
        </div>

        {/* Session Summary Modal */}
        <SessionSummaryModal
          isOpen={showSummary}
          onClose={() => setShowSummary(false)}
          gameName="Speed Math Challenge"
          score={session.score}
          accuracy={session.accuracy}
          timePlayedSeconds={session.timePlayedSeconds}
          categoryLabel={getCategoryLabel(session.score)}
          additionalStats={[
            { label: 'Solved', value: session.correctAnswers || 0 },
            { label: 'Avg Time', value: `${(avgResponseTime / 1000).toFixed(1)}s` }
          ]}
        />

        {/* Personal Best Celebration Overlay */}
        <PersonalBestCelebration gameName="speed_math" />

        {/* Quit Confirmation Modal */}
        <QuitConfirmationModal
          isOpen={showQuitConfirm}
          onClose={() => setShowQuitConfirm(false)}
          onConfirm={() => navigate('/brain-games')}
          gameName="Speed Math Challenge"
        />
      </div>
    </div>
  );
};

export default SpeedMath;

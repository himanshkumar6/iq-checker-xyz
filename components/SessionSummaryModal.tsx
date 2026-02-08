import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import { ShareModal } from './ShareModal';

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  score: number;
  accuracy?: number;
  timePlayedSeconds: number;
  categoryLabel: string;
  additionalStats?: { label: string; value: string | number }[];
}

export const SessionSummaryModal: React.FC<SessionSummaryModalProps> = ({
  isOpen,
  onClose,
  gameName,
  score,
  accuracy,
  timePlayedSeconds,
  categoryLabel,
  additionalStats = []
}) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md glass rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Session Complete!</h2>
              <p className="text-sm text-slate-400">{gameName}</p>
            </div>

            {/* Stats Grid */}
            <div className="space-y-4 mb-8">
              {/* Score */}
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">Score</p>
                <p className="text-5xl font-black text-white mb-2">{score}</p>
                <div className="inline-flex px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold uppercase tracking-widest">
                  {categoryLabel}
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-2 gap-4">
                {accuracy !== undefined && (
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <p className="text-xs text-slate-500 font-bold uppercase">Accuracy</p>
                    </div>
                    <p className="text-2xl font-black text-white">{accuracy}%</p>
                  </div>
                )}

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <p className="text-xs text-slate-500 font-bold uppercase">Time</p>
                  </div>
                  <p className="text-2xl font-black text-white">{formatTime(timePlayedSeconds)}</p>
                </div>

                {additionalStats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      <p className="text-xs text-slate-500 font-bold uppercase">{stat.label}</p>
                    </div>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                <span className="font-bold text-blue-400">Self-assessed • For fun and educational purposes only</span>
                <br />
                This is not a clinical or diagnostic assessment.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share Result
              </button>
              <button
                onClick={onClose}
                className="flex-1 p-4 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title={gameName}
          value={score.toString()}
          label={categoryLabel}
          footer={`Played for ${formatTime(timePlayedSeconds)}`}
          shareText={`I scored ${score} on ${gameName}! ${categoryLabel} 🧠`}
          shareUrl={`https://iqcheckerxyz.compresspdfto200kb.online/brain-games`}
        />
      )}
    </>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface QuitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  gameName: string;
}

export const QuitConfirmationModal: React.FC<QuitConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  gameName
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Softer Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        />

        {/* Compact Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="bg-slate-900 light:bg-white/80 backdrop-blur-md border border-slate-800 light:border-slate-200 w-full max-w-sm rounded-3xl shadow-2xl relative overflow-hidden p-6 text-center"
        >
          <div className="w-12 h-12 bg-red-500/20 light:bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-slate-50 light:text-slate-900 mb-2">Quit Game?</h2>
          <p className="text-sm text-slate-400 light:text-slate-600 mb-6">
            Your progress in <span className="text-slate-200 light:text-slate-900 font-semibold">{gameName}</span> will be lost.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 p-3 bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-700 light:hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 p-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
            >
              Exit Game
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

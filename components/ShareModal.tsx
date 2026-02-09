import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Download, Check, AlertCircle, Twitter, Facebook } from 'lucide-react';
import { shareResult, generateResultImageBlob, shareToTwitter, shareToFacebook, copyToClipboard } from '../lib/share';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: string;
  label: string;
  footer: string;
  shareText: string;
  shareUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  value,
  label,
  footer,
  shareText,
  shareUrl
}) => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Body scroll lock & Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Generate preview image
  useEffect(() => {
    if (isOpen) {
      generateResultImageBlob(title, value, label, footer).then((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setPreviewUrl(url);
        }
      });
    }
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [isOpen, title, value, label, footer]);

  const handleTwitterShare = () => {
    if (!consentGiven) return;
    shareToTwitter(shareText, shareUrl);
  };

  const handleFacebookShare = () => {
    if (!consentGiven) return;
    shareToFacebook(shareUrl);
  };

  const handleCopyLink = async () => {
    if (!consentGiven) return;

    const success = await copyToClipboard(`${shareText}\n\n${shareUrl}`);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!consentGiven) return;

    const blob = await generateResultImageBlob(title, value, label, footer);
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `iq-checker-result-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900 light:bg-white/80 backdrop-blur-md border border-slate-800 light:border-slate-200 w-full max-w-[480px] max-h-[calc(100vh-48px)] overflow-y-auto rounded-[2.5rem] shadow-2xl relative p-6 md:p-8 scrollbar-hide"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-slate-50/10 light:hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400 light:text-slate-500" />
          </button>

          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-50 light:text-slate-900 mb-1">Share Your Result</h2>
            <p className="text-xs text-slate-400 light:text-slate-500">
              Share your self-assessment result with friends
            </p>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mb-4 relative w-2/3 mx-auto aspect-square overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-slate-800 light:ring-slate-200">
              <img
                src={previewUrl}
                alt="Result preview"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>
          )}

          {/* Educational Notice */}
          <div className="mb-4 p-3 bg-blue-500/10 light:bg-blue-50 border border-blue-500/20 light:border-blue-100 rounded-2xl">
            <div className="flex gap-3">
              <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-300 light:text-slate-600 leading-snug">
                <p className="font-semibold text-blue-400 light:text-blue-600 mb-0.5">Educational Purpose Only</p>
                <p>
                  This is a self-administered assessment for entertainment and exploration.
                  Results are not clinical or professionally verified.
                </p>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-3 mb-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-2 border-slate-700 light:border-slate-300 bg-slate-900 light:bg-white checked:bg-blue-600 checked:border-blue-600 cursor-pointer transition-colors"
            />
            <span className="text-[11px] text-slate-400 light:text-slate-500 leading-relaxed group-hover:text-slate-50 light:group-hover:text-slate-900 transition-colors">
              I understand this is a self-assessment for entertainment purposes and does not represent a clinical or professional evaluation.
            </span>
          </label>

          {/* Share Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleTwitterShare}
              disabled={!consentGiven}
              className="flex items-center justify-center gap-2 py-3.5 bg-[#1DA1F2] text-slate-50 rounded-xl font-bold text-xs shadow-md hover:bg-[#1a8cd8] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Twitter className="w-4 h-4" />
              Share on X
            </button>
            <button
              onClick={handleFacebookShare}
              disabled={!consentGiven}
              className="flex items-center justify-center gap-2 py-3.5 bg-[#1877F2] text-slate-50 rounded-xl font-bold text-xs shadow-md hover:bg-[#166fe5] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Facebook className="w-4 h-4" />
              Share on FB
            </button>
            <button
              onClick={handleCopyLink}
              disabled={!consentGiven}
              className="flex items-center justify-center gap-2 py-3.5 bg-slate-800 light:bg-slate-100 text-slate-50 light:text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-700 light:hover:bg-slate-200 transition-all disabled:opacity-40"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleDownload}
              disabled={!consentGiven}
              className="flex items-center justify-center gap-2 py-3.5 bg-slate-800 light:bg-slate-100 text-slate-50 light:text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-700 light:hover:bg-slate-200 transition-all disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          {/* Platform Hints */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              Share your results on social media or download for later
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

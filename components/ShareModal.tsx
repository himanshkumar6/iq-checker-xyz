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
          className="relative w-full max-w-lg glass rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white mb-2">Share Your Result</h2>
            <p className="text-sm text-slate-400">
              Share your self-assessment result with friends
            </p>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mb-6 rounded-2xl overflow-hidden border-2 border-slate-800">
              <img src={previewUrl} alt="Result preview" className="w-full h-auto" />
            </div>
          )}

          {/* Educational Notice */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-300 leading-relaxed">
                <p className="font-semibold text-blue-400 mb-1">Educational Purpose Only</p>
                <p>
                  This is a self-administered online assessment designed for entertainment and educational exploration.
                  Results are not clinical, diagnostic, or professionally verified.
                </p>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-3 mb-6 cursor-pointer group">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-2 border-slate-600 bg-slate-900 checked:bg-blue-600 checked:border-blue-600 cursor-pointer transition-colors"
            />
            <span className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">
              I understand this is a self-assessment for entertainment purposes and does not represent a clinical or professional evaluation.
            </span>
          </label>

          {/* Share Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleTwitterShare}
              disabled={!consentGiven}
              className="flex items-center justify-center gap-2 p-4 bg-[#1DA1F2] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#1a8cd8] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1DA1F2]"
            >
              <Twitter className="w-4 h-4" />
              Share on X
            </button>
            <button
              onClick={handleFacebookShare}
              disabled={!consentGiven}
              className="flex items-center justify-center gap-2 p-4 bg-[#1877F2] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#166fe5] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1877F2]"
            >
              <Facebook className="w-4 h-4" />
              Share on FB
            </button>
            <button
              onClick={handleCopyLink}
              disabled={!consentGiven}
              className="flex items-center justify-center gap-2 p-4 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleDownload}
              disabled={!consentGiven}
              className="flex items-center justify-center gap-2 p-4 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10"
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

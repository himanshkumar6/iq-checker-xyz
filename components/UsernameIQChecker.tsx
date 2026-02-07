
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Instagram, Search, Share2, Download, Copy, Info, Check, ExternalLink, Clock } from 'lucide-react';
import { useIqStore } from '../store/useIqStore';
import { generateIqFromUsername } from '../lib/iqGenerator';
import { shareResult, downloadResultImage, generateResultImageBlob } from '../lib/share';

const BellCurve = ({ score }: { score: number }) => {
  const percentage = Math.min(Math.max(((score - 70) / 80) * 100, 5), 95);

  return (
    <div className="relative w-full h-32 mt-8 mb-4">
      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
        <path
          d="M 0 40 Q 20 40 40 10 T 60 10 Q 80 40 100 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-slate-800"
        />
        <path
          d="M 0 40 Q 20 40 40 10 T 60 10 Q 80 40 100 40"
          fill="url(#gradient)"
          className="opacity-20"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        <motion.g
          initial={{ x: 0 }}
          animate={{ x: percentage }}
          transition={{ type: 'spring', damping: 12 }}
        >
          <line x1="0" y1="5" x2="0" y2="40" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2" />
          <circle cx="0" cy="5" r="2" fill="#3b82f6" />
          <text x="0" y="0" fontSize="3" textAnchor="middle" fill="#3b82f6" fontWeight="bold">YOU</text>
        </motion.g>
      </svg>
      <div className="flex justify-between text-[10px] text-slate-400 font-bold px-2">
        <span>80</span>
        <span>100</span>
        <span>120</span>
        <span>140+</span>
      </div>
    </div>
  );
};

export const UsernameIQChecker: React.FC = () => {
  const { username, setUsername, platform, setPlatform, result, setResult, isGenerating, setGenerating } = useIqStore();
  const [copied, setCopied] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [sharing, setSharing] = React.useState(false);

  const handleCheck = () => {
    if (!username.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const res = generateIqFromUsername(username);
      setResult(res);
      setGenerating(false);
    }, 1200);
  };

  const getShareText = () => {
    const cleanUser = username.replace(/^@/, '');
    return `@${cleanUser}'s estimated IQ score is ${result?.score} on IQ Checker XYZ! 🧠`;
  };

  const handleShare = async () => {
    if (!result) return;
    setSharing(true);

    const title = `@${username.replace(/^@/, '')}'s Estimated IQ`;
    const label = result.category;
    const footer = `ESTIMATED ACCOUNT AGE: ${result.ageScore} YEARS • IQCHECKERXYZ.COMPRESSPDFTO200KB.ONLINE`;
    const filename = `iq-result-${username.replace(/^@/, '')}.png`;

    let files: File[] | undefined = undefined;

    // Attempt to generate image for sharing (supported on many mobile browsers)
    try {
      const blob = await generateResultImageBlob(title, result.score.toString(), label, footer);
      if (blob) {
        files = [new File([blob], filename, { type: 'image/png' })];
      }
    } catch (e) {
      console.error('Failed to generate sharing image:', e);
    }

    const shareOptions = {
      title: 'IQ Checker Result',
      text: getShareText(),
      url: `${window.location.origin}/#/username-iq-checker`
    };

    // If on desktop and X (Twitter) is the current context, we can use a direct intent as fallback
    if (platform === 'twitter' && !navigator.share) {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareOptions.text + "\n\n" + shareOptions.url)}`;
      window.open(twitterUrl, '_blank');
      setSharing(false);
      return;
    }

    const status = await shareResult(shareOptions, files);

    if (status === 'copied') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    setSharing(false);
  };

  const handleCopy = async () => {
    const text = `${getShareText()}\nCheck yours: ${window.location.origin}/#/username-iq-checker`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    setDownloading(true);
    downloadResultImage(
      `@${username.replace(/^@/, '')}'s Estimated IQ`,
      result.score.toString(),
      result.category,
      `ESTIMATED ACCOUNT AGE: ${result.ageScore} YEARS • IQCHECKERXYZ.COMPRESSPDFTO200KB.ONLINE`,
      `iq-result-${username.replace(/^@/, '')}.png`
    );
    setDownloading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Username IQ <span className="text-blue-600">Checker</span></h1>
        <p className="text-slate-400 text-lg">Benchmark cognitive traits using platform handle analytics</p>
      </div>

      <div className="glass rounded-[2.5rem] p-8 md:p-10 shadow-xl border-slate-200/50 dark:border-slate-800/50">
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-8">
          <button
            onClick={() => setPlatform('twitter')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${platform === 'twitter' ? 'bg-slate-800 shadow-sm text-blue-600' : 'text-slate-500'}`}
          >
            <Twitter className="w-4 h-4" /> Twitter (X)
          </button>
          <button
            onClick={() => setPlatform('instagram')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${platform === 'instagram' ? 'bg-slate-800 shadow-sm text-pink-600' : 'text-slate-500'}`}
          >
            <Instagram className="w-4 h-4" /> Instagram
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">@</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="Enter username..."
            className="w-full pl-12 pr-6 py-5 bg-slate-950 border-2 border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-lg font-medium"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={isGenerating || !username.trim()}
          className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isGenerating ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Search className="w-6 h-6" />
            </motion.div>
          ) : <Search className="w-6 h-6" />}
          {isGenerating ? 'Simulating Analysis...' : 'Check IQ Score'}
        </button>

        <p className="text-[10px] text-center text-slate-400 mt-6 flex items-center justify-center gap-1 uppercase tracking-widest font-bold">
          <Info className="w-3 h-3" /> Entertainment-based estimate only
        </p>
      </div>

      <AnimatePresence>
        {result && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 glass rounded-[2.5rem] p-8 md:p-10 border-blue-500/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20"
          >
            <div className="text-center">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">@{username.replace(/^@/, '')}'s Estimated IQ</p>
              <h2 className={`text-8xl font-black mb-2 ${result.color}`}>{result.score}</h2>
              <div className={`inline-block px-4 py-1 rounded-full bg-slate-800 text-xs font-black uppercase tracking-widest border border-slate-700 ${result.color} mb-6`}>
                {result.category}
              </div>

              <div className="flex items-center justify-center gap-2 mb-4 text-slate-600 dark:text-slate-400 font-bold">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Simulated Account Age: <span className="text-blue-600">{result.ageScore} years</span></span>
              </div>

              <BellCurve score={result.score} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 p-4 bg-slate-900 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-800 transition-all border border-slate-800"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex items-center justify-center gap-2 p-4 bg-slate-900 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-800 transition-all border border-slate-800 disabled:opacity-50"
                >
                  {downloading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Download className="w-4 h-4" />
                    </motion.div>
                  ) : <Download className="w-4 h-4" />}
                  {downloading ? 'Saving...' : 'Download Image'}
                </button>
                <button
                  onClick={handleShare}
                  disabled={sharing}
                  className={`flex items-center justify-center gap-2 p-4 text-white rounded-xl font-bold text-sm shadow-md transition-all ${platform === 'twitter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:opacity-90'} disabled:opacity-50`}
                >
                  {sharing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Share2 className="w-4 h-4" />
                    </motion.div>
                  ) : <Share2 className="w-4 h-4" />}
                  {sharing ? 'Preparing...' : 'Share Result'}
                </button>
              </div>

              <p className="mt-8 text-[11px] text-slate-400 italic font-medium leading-relaxed">
                Disclaimer: This result is generated through simulation based on handle heuristics and data patterns.
                It is intended for entertainment purposes only and does not reflect actual cognitive performance or clinical intelligence metrics.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

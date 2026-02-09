import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain,
  Zap,
  Grid3x3,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Target,
  Clock,
  Trophy
} from 'lucide-react';
import { SEO } from '../lib/seo';

const BrainGames: React.FC = () => {
  return (
    <div className="overflow-hidden bg-transparent">
      <SEO
        title="Brain Games – Logic, Speed & Memory Challenges | IQ Checker XYZ"
        description="Play free brain games designed to challenge your logic, speed, and memory. Pattern recognition, speed math, and memory grid games for mental exercise and fun."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/brain-games"
      />

      {/* HERO */}
      <section className="relative pt-12 pb-20 px-4 bg-slate-950/10 light:bg-white/10 backdrop-blur-[2px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-120 bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 text-purple-400 text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              Mental Exercise & Fun
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-50 light:text-slate-900">
              Brain Games – Logic, Speed & Memory
            </h1>

            <p className="text-lg text-slate-300 light:text-slate-600 max-w-2xl mx-auto">
              Short, focused challenges designed for casual mental exercise.
              Play instantly. No signup required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EDUCATIONAL CONTENT */}
      <section className="py-16 px-4 bg-slate-900/30 light:bg-white/70 border-y border-slate-800/50 light:border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold mb-8 text-slate-50 light:text-slate-900 text-center">
            What Are Brain Games?
          </h2>

          <div className="space-y-4 text-slate-300 light:text-slate-600 text-sm leading-relaxed">
            <p>
              Brain games are interactive challenges designed to engage cognitive
              skills such as logic, memory, and quick decision-making. They offer
              a light, enjoyable way to stay mentally active.
            </p>
            <p>
              Unlike formal intelligence tests, brain games focus on specific
              tasks in a relaxed, game-like format. Many people use them as a
              mental warm-up or short break.
            </p>
            <p>
              These games are intended for educational exploration and
              entertainment only. They do not measure intelligence or diagnose
              cognitive conditions.
            </p>
          </div>
        </div>
      </section>

      {/* GAMES GRID */}
      <section className="py-20 px-4 bg-slate-900/40 light:bg-slate-50/60 border-b border-slate-900 light:border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-50 light:text-slate-900 mb-4">
              Brain Exercise Arena
            </h2>
            <p className="text-slate-300 light:text-slate-600 max-w-xl mx-auto italic">
              Quick challenges for focus, memory, and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GameCard
              to="/brain-games/pattern-recognition"
              icon={<Brain className="w-8 h-8 text-blue-500" />}
              title="Pattern Recognition"
              description="Identify logical sequences that increase in complexity."
              features={['Logic focus', 'Progressive difficulty', 'Unlimited play']}
            />
            <GameCard
              to="/brain-games/speed-math"
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="Speed Math"
              description="Solve arithmetic problems against the clock."
              features={['Timed rounds', 'Accuracy scoring', 'Instant feedback']}
            />
            <GameCard
              to="/brain-games/memory-grid"
              icon={<Grid3x3 className="w-8 h-8 text-emerald-500" />}
              title="Memory Grid"
              description="Remember and recreate visual grid patterns."
              features={['Visual memory', 'Spatial recall', 'Growing grid']}
            />
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="p-8 bg-blue-900/10 light:bg-blue-50 border border-blue-900/20 light:border-blue-100 rounded-3xl">
            <div className="flex gap-4 items-start">
              <AlertCircle className="w-6 h-6 text-blue-400 light:text-blue-600 mt-1" />
              <div className="space-y-3 text-sm text-slate-300 light:text-slate-600">
                <p>
                  <strong>These games are not IQ tests.</strong> They are designed
                  for entertainment and educational purposes only.
                </p>
                <p>
                  Scores should not be used for medical, psychological, or
                  professional evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <Trophy className="w-16 h-16 text-purple-500 mx-auto mb-6" />
        <h2 className="text-3xl font-extrabold mb-4 text-slate-50 light:text-slate-900">
          Ready to Play?
        </h2>
        <p className="text-slate-300 light:text-slate-600 mb-8">
          Choose a game and start instantly.
        </p>

        <div className="relative z-20 flex justify-center mt-6">
          {/* soft glow background */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-105 h-14 rounded-2xl bg-linear-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-xl opacity-80" />
          </div>

          {/* main surface */}
          <div
            className="
      relative flex gap-2 p-2
      rounded-2xl
      bg-slate-900/70 light:bg-white/70
      border border-slate-700/40 light:border-slate-200
      shadow-lg
      backdrop-saturate-150
    "
          >
            <Link
              to="/brain-games/pattern-recognition"
              className="
        px-5 py-2 rounded-xl text-sm font-semibold
        text-blue-400 light:text-blue-600
        hover:bg-blue-500/15
        transition-all
      "
            >
              Pattern Recognition
            </Link>

            <Link
              to="/brain-games/speed-math"
              className="
        px-5 py-2 rounded-xl text-sm font-semibold
        text-amber-400 light:text-amber-600
        hover:bg-amber-500/15
        transition-all
      "
            >
              Speed Math
            </Link>

            <Link
              to="/brain-games/memory-grid"
              className="
        px-5 py-2 rounded-xl text-sm font-semibold
        text-emerald-400 light:text-emerald-600
        hover:bg-emerald-500/15
        transition-all
      "
            >
              Memory Grid
            </Link>
          </div>
        </div>
      </section >
    </div >
  );
};

const GameCard: React.FC<any> = ({ to, icon, title, description, features }) => (
  <Link
    to={to}
    className="group p-8 rounded-3xl bg-slate-900/80 light:bg-white/90
      border border-slate-800 light:border-slate-200
      hover:scale-[1.02] transition-all shadow-sm flex flex-col"
  >
    <div className="w-12 h-12 rounded-xl bg-slate-800 light:bg-slate-100 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-50 light:text-slate-900 mb-3">
      {title}
    </h3>
    <p className="text-sm text-slate-300 light:text-slate-600 mb-6">
      {description}
    </p>
    <ul className="space-y-2 text-sm text-slate-400 light:text-slate-500 mb-6">
      {features.map((f: string, i: number) => (
        <li key={i}>• {f}</li>
      ))}
    </ul>
    <span className="mt-auto flex items-center gap-2 text-blue-500 font-bold">
      Play Now <ArrowRight className="w-4 h-4" />
    </span>
  </Link>
);

export default BrainGames;

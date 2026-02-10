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
  Trophy,
  X
} from 'lucide-react';
import { BRAIN_GAMES_FAQS } from '../constants';
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SEO } from '../lib/seo';

const BrainGames: React.FC = () => {
  return (
    <div className="overflow-hidden bg-transparent">
      <SEO
        title="Brain Games – Logic, Speed & Memory Challenges"
        description="Play short brain games designed to train logic, reaction speed, and memory. No sign-up. Educational and entertainment focused."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/brain-games"
      />

      {/* HERO */}
      <section className="relative pt-12 pb-20 px-4 bg-slate-950/10 light:bg-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-120 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 text-purple-400 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Quick Mental Exercises
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-50 light:text-slate-900">
              Brain Games for Focus, Speed, and Memory
            </h1>

            <p className="text-lg text-slate-300 light:text-slate-600 max-w-2xl mx-auto">
              Short, interactive challenges designed to keep your mind active.
              Play casually, take a break, or test specific skills — no account required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EDUCATIONAL CONTEXT */}
      <section className="py-16 px-4 bg-slate-900/30 light:bg-white/70 border-y border-slate-800/50 light:border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold mb-8 text-slate-50 light:text-slate-900 text-center">
            What Are Brain Games?
          </h2>

          <div className="space-y-4 text-slate-300 light:text-slate-600 text-sm leading-relaxed">
            <p>
              Brain games are short interactive activities that challenge specific
              cognitive skills such as pattern recognition, reaction speed, and visual memory.
            </p>
            <p>
              Unlike formal intelligence tests, these games are meant to be lightweight
              and engaging. Many people use them as a mental warm-up or a focused break.
            </p>
            <p>
              The games below are designed for educational exploration and entertainment.
              They do not measure intelligence or diagnose cognitive ability.
            </p>
          </div>
        </div>
      </section>

      {/* GAMES GRID */}
      <section className="py-20 px-4 bg-slate-900/40 light:bg-slate-50/60 border-b border-slate-900 light:border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-50 light:text-slate-900 mb-4">
              Choose a Game
            </h2>
            <p className="text-slate-300 light:text-slate-600 max-w-xl mx-auto">
              Each game focuses on a different cognitive skill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GameCard
              to="/brain-games/pattern-recognition"
              icon={<Brain className="w-8 h-8 text-blue-500" />}
              title="Pattern Recognition"
              description="Spot logical sequences and visual relationships as difficulty increases."
              features={[
                'Logical reasoning',
                'Progressive patterns',
                'Unlimited attempts'
              ]}
            />

            <GameCard
              to="/brain-games/speed-math"
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="Speed Math"
              description="Solve quick arithmetic problems under time pressure."
              features={[
                'Timed rounds',
                'Accuracy tracking',
                'Instant feedback'
              ]}
            />

            <GameCard
              to="/brain-games/memory-grid"
              icon={<Grid3x3 className="w-8 h-8 text-emerald-500" />}
              title="Memory Grid"
              description="Memorize and recreate visual grid patterns."
              features={[
                'Visual memory',
                'Spatial recall',
                'Expanding grid size'
              ]}
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
                  <strong>These are not IQ tests.</strong> Brain games are designed
                  for learning and entertainment only.
                </p>
                <p>
                  Results should not be used for medical, psychological, or
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
          Ready to Start?
        </h2>
        <p className="text-slate-300 light:text-slate-600 mb-8">
          Pick a game and play instantly.
        </p>

        <div className="flex justify-center gap-2">
          <Link
            to="/brain-games/pattern-recognition"
            className="px-6 py-3 rounded-xl bg-slate-900/70 light:bg-white border border-slate-700 light:border-slate-200 text-blue-500 font-semibold hover:bg-slate-900 transition"
          >
            Pattern Recognition
          </Link>
          <Link
            to="/brain-games/speed-math"
            className="px-6 py-3 rounded-xl bg-slate-900/70 light:bg-white border border-slate-700 light:border-slate-200 text-amber-500 font-semibold hover:bg-slate-900 transition"
          >
            Speed Math
          </Link>
          <Link
            to="/brain-games/memory-grid"
            className="px-6 py-3 rounded-xl bg-slate-900/70 light:bg-white border border-slate-700 light:border-slate-200 text-emerald-500 font-semibold hover:bg-slate-900 transition"
          >
            Memory Grid
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16 pt-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-50 light:text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {BRAIN_GAMES_FAQS.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const GameCard: React.FC<any> = ({ to, icon, title, description, features }) => (
  <Link
    to={to}
    className="
      group p-8 rounded-3xl
      bg-slate-900/80 light:bg-white
      border border-slate-800 light:border-slate-200
      hover:shadow-xl hover:scale-[1.02]
      transition-all flex flex-col
    "
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

const AccordionItem = ({ question, answer }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="
      rounded-2xl
      border
      border-slate-800
      light:border-slate-200
      overflow-hidden
    ">
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          px-6 py-5
          flex items-center justify-between
          text-left
          font-bold
          text-slate-50
          light:text-slate-900
        "
      >
        <span className="pr-6">{question}</span>

        {/* PLUS / X ICON */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="
            w-8 h-8
            flex items-center justify-center
            rounded-full
            border
            border-slate-700
            light:border-slate-300
            text-slate-400
            light:text-slate-500
            shrink-0
          "
        >
          {open ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.span>
      </button>

      {/* CONTENT (Netflix-style slide) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1] // Netflix / iOS feel
            }}
          >
            <div className="px-6 pb-6 text-slate-400 light:text-slate-600 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrainGames;

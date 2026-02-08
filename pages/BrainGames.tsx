import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Zap, Grid3x3, ArrowRight, AlertCircle, Sparkles, Target, Clock, Trophy } from 'lucide-react';
import { SEO } from '../lib/seo';

const BrainGames: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <SEO
        title="Brain Games – Logic, Speed & Memory Challenges | IQ Checker XYZ"
        description="Play free brain games designed to challenge your logic, speed, and memory. Pattern recognition, speed math, and memory grid games for mental exercise and fun."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/brain-games"
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 text-purple-400 text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" /> Mental Exercise & Fun
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
              Brain Games – Logic, Speed & Memory Challenges
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Challenge your mind with three engaging brain games designed for fun and mental exercise. No signup required, play instantly on any device.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Are Brain Games - Educational Content */}
      <section className="py-16 px-4 bg-slate-900/30 border-y border-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold mb-8 text-white text-center">What Are Brain Games?</h2>
          <div className="space-y-4 text-slate-400 leading-relaxed text-sm md:text-base">
            <p>
              Brain games are interactive challenges designed to engage your cognitive abilities through logic puzzles, memory tasks, and quick-thinking exercises. These games provide a fun and accessible way to practice mental skills like pattern recognition, arithmetic speed, and visual memory retention.
            </p>
            <p>
              Unlike traditional intelligence tests, brain games focus on specific cognitive tasks in an entertaining format. They are designed for casual play, mental warm-ups, or simply as a way to pass time while keeping your mind active. Many people enjoy brain games as a form of mental exercise, similar to how physical exercise keeps the body fit.
            </p>
            <p>
              The three games featured here—Pattern Recognition, Speed Math Challenge, and Memory Grid—each target different aspects of cognitive function. Pattern Recognition helps you practice logical thinking and sequence analysis. Speed Math Challenge combines mental arithmetic with time pressure to test quick calculation skills. Memory Grid focuses on visual memory and spatial recall.
            </p>
            <p>
              It's important to understand that these games are for entertainment and educational exploration only. They are not designed to measure intelligence, diagnose cognitive conditions, or provide any form of medical or psychological assessment. Performance on these games can be influenced by many factors including familiarity with the game type, current focus level, device used, and even time of day.
            </p>
            <p>
              Brain games are best enjoyed as a casual mental activity. Some users play them during breaks, others use them as a daily mental warm-up, and many simply enjoy the challenge and satisfaction of improving their scores over time. Whatever your reason for playing, remember that these games are meant to be fun first and foremost.
            </p>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Choose Your Challenge</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Three unique games, each designed to engage different cognitive skills</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GameCard
              to="/brain-games/pattern-recognition"
              icon={<Brain className="w-8 h-8 text-blue-500" />}
              title="Pattern Recognition"
              description="Identify the next item in logical sequences. Patterns become progressively more complex as you advance."
              features={["Endless gameplay", "Logic-based patterns", "Progressive difficulty"]}
              color="blue"
            />
            <GameCard
              to="/brain-games/speed-math"
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="Speed Math Challenge"
              description="Solve arithmetic problems as quickly as possible. Speed and accuracy combine for your final score."
              features={["Time-based scoring", "Random questions", "Instant feedback"]}
              color="amber"
            />
            <GameCard
              to="/brain-games/memory-grid"
              icon={<Grid3x3 className="w-8 h-8 text-emerald-500" />}
              title="Memory Grid"
              description="Remember and recreate patterns on an expanding grid. Test your visual memory and spatial recall."
              features={["Expanding grid size", "Pattern recall", "Visual memory focus"]}
              color="emerald"
            />
          </div>
        </div>
      </section>

      {/* How Brain Games Relate to Cognitive Skills */}
      <section className="py-16 px-4 bg-slate-900/30 border-y border-slate-800/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-extrabold mb-12 text-white text-center">
            How These Games Relate to <span className="text-purple-500">Focus, Memory & Thinking</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 glass rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Focus & Attention</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Brain games require sustained attention and concentration. Regular practice with these games can help you develop better focus habits, though results vary by individual and context.
              </p>
            </div>

            <div className="p-6 glass rounded-2xl">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Grid3x3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Memory Practice</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Memory-based games like the Memory Grid provide practice in visual recall and pattern retention. They offer a fun way to engage your working memory systems.
              </p>
            </div>

            <div className="p-6 glass rounded-2xl">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Processing Speed</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Timed challenges like Speed Math help you practice quick thinking and rapid decision-making. Performance improves with familiarity and regular practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="p-8 bg-blue-500/10 border border-blue-500/20 rounded-3xl">
            <div className="flex gap-4 items-start">
              <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-4">Important Disclaimer</h3>
                <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                  <p>
                    <strong>These games are not IQ tests.</strong> They are designed for entertainment and educational exploration only. They do not measure intelligence, cognitive ability, or mental capacity in any clinical or diagnostic sense.
                  </p>
                  <p>
                    Results from these games should not be used for any medical, psychological, or professional evaluation purposes. They are not validated assessment tools and do not represent scientifically verified measurements of cognitive function.
                  </p>
                  <p>
                    Performance on these games can vary widely based on factors like device type, internet connection, familiarity with the game mechanics, current energy levels, and environmental distractions. Scores are for personal entertainment only.
                  </p>
                  <p>
                    If you have concerns about cognitive health or mental performance, please consult with a qualified healthcare professional. These games are not a substitute for professional medical or psychological advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 mb-16">
        <div className="container mx-auto max-w-3xl text-center">
          <Trophy className="w-16 h-16 text-purple-500 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold mb-4 text-white">Ready to Challenge Your Mind?</h2>
          <p className="text-slate-400 mb-8">
            Pick a game above and start playing. No signup, no downloads, just instant fun.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/brain-games/pattern-recognition"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
            >
              Pattern Recognition
            </Link>
            <Link
              to="/brain-games/speed-math"
              className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all"
            >
              Speed Math
            </Link>
            <Link
              to="/brain-games/memory-grid"
              className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all"
            >
              Memory Grid
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const GameCard: React.FC<{
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: 'blue' | 'amber' | 'emerald';
}> = ({ to, icon, title, description, features, color }) => {
  const colorClasses = {
    blue: 'hover:border-blue-500/50 group-hover:text-blue-500',
    amber: 'hover:border-amber-500/50 group-hover:text-amber-500',
    emerald: 'hover:border-emerald-500/50 group-hover:text-emerald-500'
  };

  return (
    <Link
      to={to}
      className={`group glass p-8 rounded-3xl hover:scale-[1.02] transition-all ${colorClasses[color]} flex flex-col h-full`}
    >
      <div className="p-4 bg-slate-900 rounded-2xl w-fit mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-extrabold mb-4 text-white group-hover:text-inherit transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 font-bold text-sm text-white group-hover:text-inherit transition-colors">
        Play Now <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default BrainGames;

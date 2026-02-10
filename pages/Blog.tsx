import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_ARTICLES } from '../constants';
import { Clock, ArrowRight } from 'lucide-react';
import { SEO } from '../lib/seo';

const Blog: React.FC = () => {
  return (
    <div className="bg-transparent">
      <SEO
        title="Cognitive Research & Insights | IQ Checker XYZ"
        description="In-depth articles on intelligence, reasoning skills, and cognitive psychology. Written for learning, clarity, and real-world understanding."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/blog"
      />

      {/* HEADER */}
      <section className="py-16 bg-slate-900/20 light:bg-slate-50/10 border-b border-slate-900/50 light:border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-6 text-slate-50 light:text-slate-900 tracking-tight">
              Cognitive Insights
            </h1>
            <p className="text-xl text-slate-300 light:text-slate-600 max-w-2xl mx-auto">
              Research-backed articles exploring intelligence, reasoning,
              and how the human mind processes information.
            </p>
          </div>

          {/* ARTICLES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {BLOG_ARTICLES.map((article, idx) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="
                  group
                  glass
                  bg-slate-900/40
                  light:bg-white/70
                  backdrop-blur-md
                  rounded-4xl
                  overflow-hidden
                  flex
                  flex-col
                  h-full
                  border
                  border-slate-800
                  light:border-slate-200
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                "
              >
                {/* IMAGE */}
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${article.slug}/800/450`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-slate-50 text-[10px] font-bold rounded-full uppercase tracking-widest">
                      Research
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 flex flex-col grow">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 light:text-slate-500 mb-4 uppercase tracking-widest">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold mb-4 text-slate-50 light:text-slate-900 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-slate-300 light:text-slate-600 text-sm leading-relaxed mb-8 grow">
                    {article.excerpt}
                  </p>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="flex items-center gap-2 font-bold text-sm text-blue-600 group-hover:gap-3 transition-all"
                  >
                    Read article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Blog;

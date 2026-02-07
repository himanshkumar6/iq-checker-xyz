
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_ARTICLES } from '../constants';
import { Clock, ArrowRight } from 'lucide-react';
import { SEO } from '../lib/seo';

const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <SEO
        title="Cognitive Insights & Research | IQ Checker XYZ Blog"
        description="Explore deep-dive research into human intelligence, brain training, and cognitive psychology. Stay updated with the latest in psychometrics."
        canonical="https://iqcheckerxyz.compresspdfto200kb.online/blog"
      />
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6">Cognitive Insights</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">Explore our latest articles on intelligence, brain training, and psychological research.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {BLOG_ARTICLES.map((article, idx) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group glass rounded-4xl overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all"
          >
            <div className="aspect-video bg-slate-800 relative overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${article.slug}/800/450`}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Psychology</span>
              </div>
            </div>
            <div className="p-8 flex flex-col grow">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
                <span>{article.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
              </div>
              <h2 className="text-xl font-extrabold mb-4 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 grow">
                {article.excerpt}
              </p>
              <Link
                to={`/blog/${article.slug}`}
                className="flex items-center gap-2 font-black text-sm text-blue-600 group-hover:gap-3 transition-all"
              >
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog;

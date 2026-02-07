
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_ARTICLES } from '../constants';
import { Clock, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon, User, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../lib/seo';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const article = BLOG_ARTICLES.find(a => a.slug === slug);

  if (!article) return <Navigate to="/blog" />;

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <SEO
        title={`${article.title} - IQ Checker XYZ`}
        description={article.excerpt}
        canonical={`https://iqcheckerxyz.compresspdfto200kb.online/blog/${article.slug}`}
        ogTitle={article.title}
        ogDescription={article.excerpt}
        ogType="article"
      />
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Research
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-blue-600 mb-8 uppercase tracking-widest">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Last Updated: Feb 2026</span>
          <span className="flex items-center gap-2 text-slate-400"><Clock className="w-4 h-4" /> {article.readTime}</span>
          <span className="flex items-center gap-2 text-emerald-600"><ShieldCheck className="w-4 h-4" /> Verified Content</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-12 leading-tight text-white">
          {article.title}
        </h1>

        <div className="aspect-21/9 rounded-4xl overflow-hidden mb-12 shadow-2xl">
          <img
            src={`https://picsum.photos/seed/${article.slug}/1200/600`}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Author Block */}
        <div className="flex items-center gap-4 p-6 bg-slate-900 rounded-3xl mb-12 border border-slate-800">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Written By</p>
            <p className="font-bold text-white">Editorial Team — IQ Checker XYZ</p>
          </div>
          <div className="ml-auto px-4 py-1 bg-blue-900/30 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-tighter">
            Cognitive Science Expert
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-3/4">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-slate-500 prose-p:leading-relaxed prose-headings:font-black prose-a:text-blue-600">
              {article.content.split('\n\n').map((para, i) => (
                <p key={i} className="mb-6">{para}</p>
              ))}

              <div className="mt-12 p-8 bg-blue-900/20 rounded-[2rem] border border-blue-900/50">
                <h3 className="text-xl font-bold mb-4">Benchmark Your Cognitive Agility</h3>
                <p className="text-slate-400 mb-6">Put the theory into practice. Our 2026 logical reasoning test is specifically calibrated to measure fluid intelligence across 15 critical pattern recognition items.</p>
                <Link to="/iq-test" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl inline-block shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform">
                  Start Free IQ Test
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:w-1/4">
            <div className="sticky top-32">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Distribute Wisdom</h4>
              <div className="flex flex-row lg:flex-col gap-4">
                <ShareButton icon={<Twitter />} color="text-[#1DA1F2]" label="Tweet" />
                <ShareButton icon={<Facebook />} color="text-[#1877F2]" label="Share" />
                <ShareButton icon={<LinkIcon />} color="text-slate-500" label="Copy Link" />
              </div>

              <div className="mt-12">
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Related Research</h4>
                <div className="space-y-6">
                  {BLOG_ARTICLES.filter(a => a.slug !== slug).slice(0, 3).map(a => (
                    <Link key={a.slug} to={`/blog/${a.slug}`} className="group block">
                      <p className="text-sm font-bold leading-snug group-hover:text-blue-600 transition-colors">{a.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
};

const ShareButton = ({ icon, color, label }: { icon: React.ReactNode, color: string, label: string }) => (
  <button className={`p-4 glass rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 w-full group ${color}`}>
    {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
    <span className="lg:hidden font-bold text-xs">{label}</span>
  </button>
);

export default BlogPost;

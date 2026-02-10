import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_ARTICLES } from '../constants';
import {
  Clock,
  ArrowLeft,
  Facebook,
  Twitter,
  Link as LinkIcon,
  User,
  Calendar,
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../lib/seo';
import { shareToTwitter, shareToFacebook, copyToClipboard } from '../lib/share';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const article = BLOG_ARTICLES.find(a => a.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <>
        <SEO title="Article Not Found" description="The requested article could not be found." noindex />
        <Navigate to="/blog" />
      </>
    );
  }

  const currentUrl = `${window.location.origin}/blog/${article.slug}`;
  const shareText = `${article.title}`;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-transparent min-h-screen">
      <SEO
        title={`${article.title} | IQ Checker XYZ`}
        description={article.excerpt}
        canonical={`https://iqcheckerxyz.compresspdfto200kb.online/blog/${article.slug}`}
        ogType="article"
      />

      <section className="py-16 bg-slate-900/20 light:bg-slate-50/10 border-b border-slate-900/50 light:border-slate-200">
        <article className="container mx-auto px-4 max-w-6xl">

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 light:text-slate-500 hover:text-blue-600 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to articles
          </Link>

          <div className="glass bg-slate-900/40 light:bg-white/70 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-slate-800 light:border-slate-200 shadow-xl">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

              {/* META */}
              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-widest mb-8">
                <span className="flex items-center gap-2 text-blue-500">
                  <Calendar className="w-4 h-4" /> {article.date}
                </span>
                <span className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" /> {article.readTime}
                </span>
                <span className="flex items-center gap-2 text-emerald-500">
                  <ShieldCheck className="w-4 h-4" /> Reviewed
                </span>
              </div>

              {/* TITLE */}
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-10 text-slate-50 light:text-slate-900">
                {article.title}
              </h1>

              {/* IMAGE */}
              <div className="aspect-21/9 rounded-[2.5rem] overflow-hidden mb-14 shadow-2xl">
                <img
                  src={`https://picsum.photos/seed/${article.slug}/1200/600`}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* AUTHOR */}
              <div className="flex gap-6 p-8 bg-slate-950/60 light:bg-slate-50 rounded-4xl mb-14 border border-slate-900 light:border-slate-100">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
                    Written by
                  </p>
                  <p className="text-xl font-black text-slate-50 light:text-slate-900 mb-2">
                    {article.authorName}
                  </p>
                  <p className="text-sm text-slate-400 light:text-slate-600 max-w-2xl">
                    {article.authorBio}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-3/4 prose prose-lg prose-invert light:prose-slate max-w-none prose-headings:font-black">
                  {article.content.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}

                  <div className="mt-16 p-10 bg-blue-600/10 light:bg-blue-50 rounded-[2.5rem] border border-blue-600/30">
                    <h2 className="text-2xl font-black mb-4 text-slate-50 light:text-slate-900">
                      Why this topic matters
                    </h2>
                    <p className="text-slate-300 light:text-slate-700 mb-4">
                      Cognitive performance isn’t about labels or scores.
                      It’s about understanding how people reason, adapt,
                      and process information in real situations.
                    </p>
                    <p className="text-slate-300 light:text-slate-700">
                      Our assessments are designed for learning and self-awareness —
                      not diagnosis or professional evaluation.
                    </p>

                    <Link
                      to="/iq-test"
                      className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:scale-105 transition"
                    >
                      Try the Logical Reasoning Test
                    </Link>
                  </div>
                </div>

                {/* SIDEBAR */}
                <aside className="lg:w-1/4">
                  <div className="sticky top-32 space-y-12">

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                        Share
                      </h4>
                      <div className="space-y-3">
                        <ShareButton icon={<Twitter />} label="Twitter" onClick={() => shareToTwitter(shareText, currentUrl)} />
                        <ShareButton icon={<Facebook />} label="Facebook" onClick={() => shareToFacebook(currentUrl)} />
                        <ShareButton
                          icon={copied ? <Check /> : <LinkIcon />}
                          label={copied ? 'Copied' : 'Copy link'}
                          onClick={handleCopyLink}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                        Related reading
                      </h4>
                      <div className="space-y-4">
                        {BLOG_ARTICLES.filter(a => a.slug !== slug).slice(0, 3).map(a => (
                          <Link
                            key={a.slug}
                            to={`/blog/${a.slug}`}
                            className="block font-semibold text-slate-50 light:text-slate-900 hover:text-blue-600 transition"
                          >
                            {a.title}
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                </aside>
              </div>

            </motion.div>
          </div>
        </article>
      </section>
    </div>
  );
};

const ShareButton = ({ icon, label, onClick }: any) => (
  <button
    onClick={onClick}
    className="glass bg-slate-900/50 light:bg-white/70 border border-slate-800 light:border-slate-200 rounded-xl p-4 flex items-center gap-3 font-semibold text-sm hover:scale-105 transition"
  >
    {icon}
    {label}
  </button>
);

export default BlogPost;

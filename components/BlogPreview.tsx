'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Sparkles, CheckCircle, Mail } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';
import { analytics } from '@/lib/analytics';

export default function BlogPreview() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  // Pull top 4 most recent articles (3 for desktop, 4 for mobile carousel)
  const articles = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  const desktopArticles = articles.slice(0, 3);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      analytics.newsletterEmailSubmit();
      try {
        await fetch('/api/subscribe-newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), source: 'blog_preview' }),
        });
      } catch {
        // Silently fail — user still sees confirmation
      }
      setSubscribed(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      setActiveIndex((prev) => (prev + 1) % articles.length);
    } else if (touchDeltaX.current > threshold) {
      setActiveIndex((prev) => (prev - 1 + articles.length) % articles.length);
    }
  };

  const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
    <article 
      className="group p-2 rounded-3xl bg-gradient-to-b from-white to-white/80 border border-white shadow-[0_10px_30px_-10px_rgba(29,49,95,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(15,117,188,0.18)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between card-hover-bar"
      id={`blog-card-${article.slug}`}
    >
      <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 overflow-hidden flex flex-col h-full">
        
        {/* Article Image Container */}
        <Link href={`/blog/${article.slug}`} onClick={() => analytics.blogArticleClick({ slug: article.slug, title: article.title, category: article.category })} className="block relative h-52 w-full overflow-hidden bg-af-blue-soft">
          <Image 
            src={article.heroImage} 
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-af-navy/90 text-white backdrop-blur-sm shadow-xs">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-af-blue text-white shadow-xs">
                Most Popular
              </span>
            )}
          </div>
        </Link>

        {/* Article Body */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-pv-muted font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-af-blue" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>{article.publishedAt}</span>
            </div>

            <Link href={`/blog/${article.slug}`} onClick={() => analytics.blogArticleClick({ slug: article.slug, title: article.title, category: article.category })} className="block group-hover:text-af-blue transition-colors">
              <h3 className="text-lg font-bold text-af-navy leading-snug group-hover:text-af-blue transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-pv-muted leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          {/* Read More Link */}
          <div className="pt-5 mt-5 border-t border-af-blue-ice/60 flex items-center justify-between">
            <Link 
              href={`/blog/${article.slug}`}
              onClick={() => analytics.blogArticleClick({ slug: article.slug, title: article.title, category: article.category })}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-af-blue group-hover:text-af-navy transition-colors"
              id={`read-article-${article.slug}`}
            >
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-[10px] text-pv-muted uppercase font-bold tracking-wider">
              Advantage First
            </span>
          </div>
        </div>

      </div>
    </article>
  );

  return (
    <section className="py-24 sm:py-32 bg-mesh-hero relative overflow-hidden" id="blog-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-af-blue-ice shadow-xs mb-4">
              <BookOpen className="w-3.5 h-3.5 text-af-blue" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
                Financial Wellbeing Hub
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
              Resources for Financial Management
            </h2>
            <p className="text-base sm:text-lg text-pv-muted mt-3 max-w-xl">
              Expert articles and guides to help you turn your financial dreams into reality and master your credit.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link 
              href="/blog"
              onClick={() => analytics.blogViewAllClick()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-af-blue-ice hover:border-af-blue/40 text-af-navy hover:text-af-blue font-bold text-sm shadow-xs hover:shadow-md transition-all duration-200"
              id="view-all-blog-btn"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {desktopArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Mobile: Swipeable carousel with 4 articles */}
        <div className="md:hidden">
          <div
            className="overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {articles.map((article) => (
                <div key={article.slug} className="w-full flex-shrink-0">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {articles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === activeIndex
                    ? 'bg-af-blue w-5'
                    : 'bg-af-blue-ice w-2'
                }`}
                aria-label={`Go to article ${idx + 1}`}
                id={`blog-dot-${idx}`}
              />
            ))}
          </div>
        </div>

        {/* Substack-style Newsletter Subscribe Card */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-af-navy via-af-navy-deep to-[#142345] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-af-blue/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-bold text-white shadow-lg shadow-black/10">
                <Sparkles className="w-3.5 h-3.5 text-af-red" />
                <span>Free Monthly Insights</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Stay Ahead of Rate Cuts &amp; Loan Strategies
              </h3>
              <p className="text-sm text-white/80 max-w-xl leading-relaxed">
                Join the Smart Money and start receiving our monthly digest to get the inside edge on interest rate trends, consolidation tactics, and credit optimization.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-trust-green/20 border border-trust-green/40 rounded-2xl p-5 flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-trust-green flex-shrink-0" />
                  <div>
                    <strong className="block text-sm font-bold">You&apos;re subscribed!</strong>
                    <span className="text-xs text-white/80">Check your inbox for our latest borrowing blueprint.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work or personal email"
                    className="w-full px-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-af-blue-cyan focus:bg-white/15 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-full bg-gradient-to-r from-af-red to-[#E63935] hover:from-[#C02926] hover:to-af-red text-white font-bold text-sm shadow-md shadow-af-red/30 transition-all duration-150 whitespace-nowrap active:scale-95"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

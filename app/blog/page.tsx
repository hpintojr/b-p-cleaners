'use client';

import React, { useState, useMemo } from 'react';
import { analytics } from '@/lib/analytics';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Tag, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight,
  Flame,
  User,
  Share2,
  Mail
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from '@/data/blogPosts';

export default function BlogHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Master chronologically sorted post array (newest to oldest)
  const sortedAllPosts = useMemo(() => {
    return [...BLOG_POSTS].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, []);

  // Featured post: most recent article marked as featured (Editor's Pick), or the latest article in the catalog
  const featuredPost = useMemo(() => {
    return sortedAllPosts.find((p) => p.featured) || sortedAllPosts[0];
  }, [sortedAllPosts]);

  // Filter and sort posts based on category, search query, and recency
  const filteredPosts = useMemo(() => {
    return sortedAllPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.categorySlug === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [sortedAllPosts, selectedCategory, searchQuery]);

  const gridPosts = useMemo(() => {
    if (selectedCategory === 'all' && !searchQuery) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredPost]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      analytics.newsletterEmailSubmit();
      try {
        await fetch('/api/subscribe-newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newsletterEmail.trim(), source: 'blog_page' }),
        });
      } catch {
        // Silently fail — user sees confirmation
      }
      setIsSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-af-navy flex flex-col selection:bg-af-blue selection:text-white font-sans">
      <Navbar />

      {/* Substack-Style Publication Masthead */}
      <section className="bg-white border-b border-af-blue-ice/80 pt-12 pb-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Masthead Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-af-blue-soft border border-af-blue-ice shadow-xs">
              <Flame className="w-3.5 h-3.5 text-af-red" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
                The Advantage Dispatch
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-af-navy leading-[1.1]">
              Financial Intelligence for Smart Borrowers
            </h1>

            <p className="text-base sm:text-lg text-pv-muted leading-relaxed max-w-2xl mx-auto">
              Strategic blueprints on loan consolidation, rate negotiation, credit optimization, and capital allocation from licensed lending professionals.
            </p>

            {/* Substack Publication Stats Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-pv-muted font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-trust-green animate-pulse" />
                25,000+ Readers
              </span>
              <span>•</span>
              <span>Updated Monthly</span>
              <span>•</span>
              <span className="text-af-blue font-bold">100% Free Access</span>
            </div>
          </div>

          {/* Search & Category Filter Navigation Bar */}
          <div className="mt-10 pt-6 border-t border-af-blue-ice/60 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Filter Pills (Single continuous line, fits all buttons) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 flex-nowrap min-w-0">
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? 'bg-af-navy text-white shadow-xs'
                        : 'bg-af-blue-soft hover:bg-af-blue-ice text-af-navy border border-af-blue-ice'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Search Input Aligned to the Right */}
            <div className="relative w-full lg:w-60 flex-shrink-0 lg:ml-auto">
              <Search className="w-3.5 h-3.5 text-pv-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dispatches..."
                className="w-full pl-9 pr-7 py-1.5 rounded-full bg-af-blue-soft border border-af-blue-ice text-xs focus:outline-none focus:ring-2 focus:ring-af-blue focus:bg-white transition-all text-af-navy placeholder-pv-muted shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-pv-muted hover:text-af-navy font-bold p-0.5"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        
        {/* Featured Story Spotlight (Shown when viewing "all" with no active search) */}
        {selectedCategory === 'all' && !searchQuery && featuredPost && (
          <section className="mb-16 sm:mb-20" id="featured-dispatch">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-af-red flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Editorial
              </span>
            </div>

            <article className="group rounded-3xl bg-white border border-af-blue-ice p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-15px_rgba(29,49,95,0.08)] hover:shadow-[0_25px_60px_-15px_rgba(15,117,188,0.15)] transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Visual Cover */}
                <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden bg-af-blue-soft shadow-inner">
                  <Image
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-af-navy text-white shadow-md">
                      {featuredPost.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-trust-green text-white shadow-md">
                      Editor’s Pick
                    </span>
                  </div>
                </div>

                {/* Editorial Content & Byline */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-3 text-xs text-pv-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-af-blue" />
                      {featuredPost.readTime}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.publishedAt}</span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`} onClick={() => analytics.blogArticleClick({ slug: featuredPost.slug, title: featuredPost.title, category: featuredPost.category })} className="block group-hover:text-af-blue transition-colors">
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-af-navy tracking-tight leading-tight group-hover:text-af-blue transition-colors">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm sm:text-base text-pv-muted leading-relaxed">
                    {featuredPost.subtitle}
                  </p>

                  {/* Key Takeaway Snippet */}
                  <div className="p-4 rounded-xl bg-af-blue-soft border border-af-blue-ice/80 text-xs text-af-navy space-y-1">
                    <strong className="block font-bold text-af-blue flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-trust-green" />
                      Key Core Insight:
                    </strong>
                    <p className="text-pv-muted leading-normal">
                      {featuredPost.keyTakeaways[0]}
                    </p>
                  </div>

                  {/* Author Byline & CTA */}
                  <div className="pt-4 border-t border-af-blue-ice/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-af-blue-ice bg-white p-1.5 shadow-2xs">
                        <div className="relative w-full h-full">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-af-navy">
                          {featuredPost.author.name}
                        </span>
                        <span className="block text-[10px] text-pv-muted">
                          {featuredPost.author.role} · <span className="text-trust-green font-semibold">Fact-Checked</span>
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      onClick={() => analytics.blogArticleClick({ slug: featuredPost.slug, title: featuredPost.title, category: featuredPost.category })}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-af-navy hover:bg-af-blue text-white font-bold text-xs shadow-md transition-all duration-200 group-hover:translate-x-0.5"
                    >
                      <span>Read Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>
            </article>
          </section>
        )}

        {/* Filtered Dispatches Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-af-blue-ice/60">
          <div>
            <h3 className="font-display text-2xl font-extrabold text-af-navy">
              {selectedCategory === 'all' && !searchQuery ? 'Latest Dispatches' : `Articles (${filteredPosts.length})`}
            </h3>
            {searchQuery && (
              <p className="text-xs text-pv-muted mt-1">
                Showing results matching &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Zero Results State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-af-blue-ice p-8 space-y-4">
            <BookOpen className="w-12 h-12 text-pv-muted mx-auto" />
            <h4 className="text-lg font-bold text-af-navy">No dispatches found</h4>
            <p className="text-xs text-pv-muted max-w-sm mx-auto">
              We couldn&apos;t find any articles matching your search criteria. Try selecting another category or clearing your query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-af-navy text-white text-xs font-bold hover:bg-af-blue transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <article
              key={post.slug}
              className="group p-2 rounded-3xl bg-white border border-af-blue-ice shadow-[0_10px_30px_-10px_rgba(29,49,95,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(15,117,188,0.16)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              id={`blog-card-${post.slug}`}
            >
              <div className="rounded-[1.25rem] bg-white overflow-hidden flex flex-col h-full">
                
                {/* Article Cover */}
                <Link href={`/blog/${post.slug}`} onClick={() => analytics.blogArticleClick({ slug: post.slug, title: post.title, category: post.category })} className="block relative h-52 w-full overflow-hidden bg-af-blue-soft">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-af-navy/90 text-white backdrop-blur-sm shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-pv-muted font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-af-blue" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} onClick={() => analytics.blogArticleClick({ slug: post.slug, title: post.title, category: post.category })} className="block group-hover:text-af-blue transition-colors">
                      <h4 className="text-lg font-bold text-af-navy leading-snug group-hover:text-af-blue transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>

                    <p className="text-xs sm:text-sm text-pv-muted leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author & Action */}
                  <div className="pt-5 mt-5 border-t border-af-blue-ice/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-af-blue-ice/60 bg-white p-0.5 shadow-2xs">
                        <div className="relative w-full h-full">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-af-navy truncate max-w-[140px]">
                        Advantage First
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => analytics.blogArticleClick({ slug: post.slug, title: post.title, category: post.category })}
                      className="inline-flex items-center gap-1 text-xs font-bold text-af-blue group-hover:text-af-navy transition-colors"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Substack-Style Embedded Publication Subscription Card */}
        <section className="mt-20 rounded-3xl bg-gradient-to-br from-af-navy via-af-navy-deep to-[#142345] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-white/10 text-center sm:text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-af-blue/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-af-blue-light">
                <Mail className="w-3.5 h-3.5 text-af-red" />
                <span>The Advantage Dispatch Newsletter</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Get Monthly Borrowing Intelligence &amp; Rate Analysis
              </h3>
              <p className="text-sm text-white/80 max-w-xl leading-relaxed">
                Each month, our lending and financial analysts break down interest rate movements, credit card loop strategies, and practical wealth protection tips.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="bg-trust-green/20 border border-trust-green/40 rounded-2xl p-6 flex items-center gap-3 text-white">
                  <CheckCircle className="w-8 h-8 text-trust-green flex-shrink-0" />
                  <div>
                    <strong className="block text-base font-bold">Welcome to The Dispatch!</strong>
                    <span className="text-xs text-white/80">Check your inbox for our latest market analysis and welcome guide.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input 
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-af-blue-cyan focus:bg-white/15 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-af-red to-[#E63935] hover:from-[#C02926] hover:to-af-red text-white font-bold text-sm shadow-lg shadow-af-red/30 transition-all duration-150 whitespace-nowrap active:scale-95 flex-shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                  <span className="block text-[11px] text-white/60 text-center sm:text-left">
                    No spam ever. Unsubscribe at any time with 1 click.
                  </span>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

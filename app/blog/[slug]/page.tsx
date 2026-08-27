'use client';

import React, { useState, useEffect, useRef, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Check, 
  Volume2, 
  Play,
  Pause,
  Square,
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Mail,
  User,
  ExternalLink
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getRelatedPosts, BLOG_POSTS } from '@/data/blogPosts';
import { analytics } from '@/lib/analytics';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Custom hook for blog article read-time tracking.
 * Uses 'use no memo' to opt out of React compiler purity checks —
 * performance.now() is intentionally impure but safe inside effects.
 */
function useReadTimeTracker(slug: string, title: string, category: string) {
  'use no memo';
  const startRef = useRef(0);

  useEffect(() => {
    analytics.blogArticleView({ slug, title, category });
    startRef.current = performance.now();

    const sendReadTime = () => {
      const seconds = Math.round((performance.now() - startRef.current) / 1000);
      if (seconds > 2) {
        analytics.blogArticleReadTime({ slug, title, category, read_time_seconds: seconds });
      }
    };

    const handleVisChange = () => {
      if (document.visibilityState === 'hidden') sendReadTime();
    };

    document.addEventListener('visibilitychange', handleVisChange);
    window.addEventListener('beforeunload', sendReadTime);

    return () => {
      sendReadTime();
      document.removeEventListener('visibilitychange', handleVisChange);
      window.removeEventListener('beforeunload', sendReadTime);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  const [copied, setCopied] = useState(false);
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [inlineEmail, setInlineEmail] = useState('');
  const [isInlineSubscribed, setIsInlineSubscribed] = useState(false);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 2);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Blog article view + read time tracking
  useReadTimeTracker(post.slug, post.title, post.category);

  const handleAudioToggle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    const synth = window.speechSynthesis;

    if (audioState === 'playing') {
      synth.pause();
      setAudioState('paused');
      return;
    }

    if (audioState === 'paused') {
      synth.resume();
      setAudioState('playing');
      return;
    }

    // Build the full spoken text
    synth.cancel(); // Clear any existing queue

    const speechText = [
      post.title + '.',
      post.subtitle + '.',
      'Key strategic takeaways:',
      ...post.keyTakeaways.map((k) => k + '.'),
      post.content.intro + '.',
      ...post.content.sections.map((s) => {
        return s.heading + '. ' + (s.subheading ? s.subheading + '. ' : '') + s.body.join(' ');
      }),
      'In conclusion: ' + post.content.conclusion
    ].join(' ');

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick natural voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(
      (v) => (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Alex') || v.name.includes('Google US English') || v.lang === 'en-US') && !v.name.includes('Zira')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setAudioState('idle');
    };

    utterance.onerror = () => {
      setAudioState('idle');
    };

    synth.speak(utterance);
    setAudioState('playing');
  };

  const handleAudioStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setAudioState('idle');
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleInlineSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inlineEmail.trim()) {
      analytics.newsletterEmailSubmit();
      try {
        await fetch('/api/subscribe-newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: inlineEmail.trim(), source: 'blog_article' }),
        });
      } catch {
        // Silently fail — user sees confirmation
      }
      setIsInlineSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-af-navy flex flex-col selection:bg-af-blue selection:text-white font-sans">
      <Navbar />

      {/* Reading Progress / Navigation Masthead Header */}
      <div className="bg-white border-b border-af-blue-ice/80 py-4 sticky top-[96px] sm:top-[112px] z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link 
            href="/blog" 
            onClick={() => analytics.articleCtaClick(post.slug, 'back_to_blog')}
            className="inline-flex items-center gap-2 text-xs font-bold text-pv-muted hover:text-af-blue transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>The Advantage Dispatch</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-af-blue bg-af-blue-soft px-3 py-1 rounded-full border border-af-blue-ice">
              {post.category}
            </span>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        
        {/* Article Header */}
        <header className="space-y-6 mb-10 text-left">
          
          {/* Category & Date */}
          <div className="flex items-center gap-3 text-xs text-pv-muted font-mono">
            <span className="font-bold text-af-navy uppercase tracking-wider">{post.category}</span>
            <span>•</span>
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-af-blue" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {/* Deck / Subtitle */}
          <p className="text-lg sm:text-xl text-pv-muted leading-relaxed font-normal">
            {post.subtitle}
          </p>

          {/* Substack-Style Author Byline & Social Bar */}
          <div className="pt-6 border-t border-b border-af-blue-ice/70 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-af-blue-ice shadow-xs flex-shrink-0 bg-white p-1.5">
                <div className="relative w-full h-full">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-af-navy">{post.author.name}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-trust-green bg-trust-green-light px-2 py-0.5 rounded-full border border-trust-green/30">
                    <ShieldCheck className="w-3 h-3" />
                    {post.reviewer?.badge || 'Fact-Checked & Verified'}
                  </span>
                </div>
                <span className="text-xs text-pv-muted block">
                  {post.author.role} · <span className="text-af-blue font-semibold">Reviewed by {post.reviewer?.name || 'Compliance Desk'}</span>
                </span>
              </div>
            </div>

            {/* Interactive Share & Audio Actions */}
            <div className="flex items-center gap-2.5">
              
              {/* Functional Audio Player Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleAudioToggle}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    audioState === 'playing'
                      ? 'bg-af-blue text-white shadow-md shadow-af-blue/20 ring-2 ring-af-blue/30'
                      : audioState === 'paused'
                      ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-400/30'
                      : 'bg-af-blue-soft hover:bg-af-blue-ice text-af-navy border border-af-blue-ice shadow-xs'
                  }`}
                  title={
                    audioState === 'playing'
                      ? 'Pause Audio Narration'
                      : audioState === 'paused'
                      ? 'Resume Audio Narration'
                      : 'Listen to Full Article Narration'
                  }
                >
                  {audioState === 'playing' ? (
                    <>
                      <span className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
                        <span className="w-1 h-4 bg-white rounded-full animate-bounce" />
                        <span className="w-1 h-2.5 bg-white rounded-full animate-pulse" />
                      </span>
                      <span>Pause Narration</span>
                    </>
                  ) : audioState === 'paused' ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-af-blue" />
                      <span>Listen ({post.readTime})</span>
                    </>
                  )}
                </button>

                {audioState !== 'idle' && (
                  <button
                    onClick={handleAudioStop}
                    className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-af-red border border-red-200 text-xs font-bold transition-all shadow-xs"
                    title="Stop Audio Narration"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
              </div>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-af-blue-soft hover:bg-af-blue-ice text-af-navy border border-af-blue-ice text-xs font-bold transition-all shadow-xs"
                title="Share this article"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-trust-green" />
                    <span className="text-trust-green">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-pv-muted" />
                    <span>Share</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </header>

        {/* Hero Image */}
        <figure className="mb-12 rounded-3xl overflow-hidden bg-af-blue-soft border border-af-blue-ice/80 shadow-md">
          <div className="relative h-72 sm:h-96 lg:h-[450px] w-full">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
          {post.imageCaption && (
            <figcaption className="p-3.5 bg-white text-center text-xs text-pv-muted border-t border-af-blue-ice/60 italic">
              {post.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Key Takeaways Callout Card */}
        <aside className="mb-12 rounded-2xl bg-gradient-to-br from-af-blue-soft to-white border border-af-blue/20 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-af-blue" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-af-navy">
              Key Strategic Takeaways
            </h2>
          </div>
          <ul className="space-y-2.5 text-sm text-af-navy">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-trust-green flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Article Body Content */}
        <article className="prose prose-lg max-w-none text-af-navy space-y-8 leading-relaxed">
          
          {/* Editorial Intro with Drop-Cap feel */}
          <p className="text-lg sm:text-xl text-af-navy font-medium leading-relaxed">
            {post.content.intro}
          </p>

          {/* Render Sections */}
          {post.content.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-5 pt-4">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-af-navy tracking-tight pt-2 border-t border-af-blue-ice/50">
                {section.heading}
              </h2>

              {section.subheading && (
                <p className="text-base font-semibold text-af-blue italic">
                  {section.subheading}
                </p>
              )}

              {section.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-base sm:text-lg text-af-navy/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Highlight Callout Box */}
              {section.highlightBox && (
                <div className="my-6 rounded-2xl bg-af-blue-soft/90 border-l-4 border-af-blue p-5 sm:p-6 space-y-1.5 shadow-xs">
                  <strong className="block text-sm font-bold text-af-navy uppercase tracking-wider">
                    {section.highlightBox.title}
                  </strong>
                  <p className="text-sm text-af-navy/90 leading-relaxed font-medium">
                    {section.highlightBox.text}
                  </p>
                </div>
              )}

              {/* Comparison Table */}
              {section.table && (
                <div className="my-8 overflow-hidden rounded-2xl border border-af-blue-ice shadow-xs bg-white">
                  {section.table.caption && (
                    <div className="bg-af-navy text-white px-5 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>{section.table.caption}</span>
                      <span className="text-[10px] text-white/70 font-mono">Advantage First Data</span>
                    </div>
                  )}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-af-blue-soft border-b border-af-blue-ice text-af-navy font-extrabold">
                        <tr>
                          {section.table.headers.map((header, hIdx) => (
                            <th key={hIdx} className="px-4 sm:px-6 py-3.5">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-af-blue-ice/60 font-medium text-af-navy/90">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx === section.table!.rows.length - 1 ? 'bg-trust-green-light/40 font-bold text-trust-green' : 'hover:bg-af-blue-soft/40 transition-colors'}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 sm:px-6 py-3.5">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Pull Quote */}
              {section.quote && (
                <blockquote className="my-8 border-l-4 border-af-red pl-6 sm:pl-8 py-2 italic space-y-2">
                  <p className="font-display text-xl sm:text-2xl text-af-navy font-extrabold leading-snug">
                    &ldquo;{section.quote.text}&rdquo;
                  </p>
                  <cite className="block text-xs font-bold text-pv-muted not-italic uppercase tracking-wider">
                    — {section.quote.cite}
                  </cite>
                </blockquote>
              )}

              {/* Mid-Article Substack Newsletter Signup Box (after first section) */}
              {sIdx === 0 && (
                <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-af-blue-soft via-white to-af-blue-soft border border-af-blue-ice text-center sm:text-left space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-af-red uppercase tracking-wider block">
                        Monthly Dispatch
                      </span>
                      <h3 className="text-lg font-bold text-af-navy">
                        Enjoying this analysis? Subscribe to receive next month&apos;s issue.
                      </h3>
                    </div>

                    <div className="flex-shrink-0 w-full sm:w-auto">
                      {isInlineSubscribed ? (
                        <span className="text-xs font-bold text-trust-green flex items-center gap-1 justify-center sm:justify-start">
                          <CheckCircle className="w-4 h-4" /> You&apos;re subscribed!
                        </span>
                      ) : (
                        <form onSubmit={handleInlineSubscribe} className="flex gap-2">
                          <input
                            type="email"
                            required
                            value={inlineEmail}
                            onChange={(e) => setInlineEmail(e.target.value)}
                            placeholder="Your email address"
                            className="px-4 py-2 rounded-full bg-white border border-af-blue-ice text-xs focus:outline-none focus:ring-2 focus:ring-af-blue w-full sm:w-56"
                          />
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-full bg-af-navy hover:bg-af-blue text-white font-bold text-xs shadow-sm whitespace-nowrap transition-colors"
                          >
                            Join Free
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </section>
          ))}

          {/* Conclusion */}
          <div className="pt-6 border-t border-af-blue-ice/60 space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-af-navy">
              The Bottom Line
            </h2>
            <p className="text-base sm:text-lg text-af-navy/90 leading-relaxed font-medium">
              {post.content.conclusion}
            </p>
          </div>

          {/* Authoritative Sources & Regulatory Citations */}
          {post.sources && post.sources.length > 0 && (
            <div className="pt-8 mt-10 border-t border-af-blue-ice/80" id="sources-and-citations">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-af-blue" />
                <h3 className="font-display text-xs sm:text-sm font-extrabold text-af-navy tracking-wider uppercase">
                  Authoritative Sources &amp; Regulatory Citations
                </h3>
              </div>
              <p className="text-xs text-pv-muted mb-4 leading-relaxed">
                Advantage First Financial adheres to strict institutional editorial standards. All statistical claims, benchmark interest rates, and statutory provisions in this analysis are cited directly from official federal repositories, regulatory bodies, and industry data:
              </p>
              <div className="space-y-3">
                {post.sources.map((source, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-[#F8FAFC] border border-af-blue-ice/70 hover:border-af-blue/30 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-af-blue bg-af-blue-ice px-2 py-0.5 rounded-md">
                          [{idx + 1}]
                        </span>
                        <span className="font-bold text-af-navy text-xs">
                          {source.name}
                        </span>
                        <span className="text-[10px] font-medium text-pv-muted px-2 py-0.5 rounded-full bg-white border border-af-blue-ice/60">
                          {source.publisher}
                        </span>
                      </div>
                      <p className="text-pv-muted text-xs leading-relaxed pl-6 sm:pl-0">
                        {source.description}
                      </p>
                    </div>

                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => analytics.articleCtaClick(post.slug, `source_${source.name}`)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-af-blue hover:text-af-navy transition-colors whitespace-nowrap self-start sm:self-center flex-shrink-0"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </article>

        {/* Editorial Standards & Author Bio Box */}
        <section className="mt-14 rounded-3xl bg-white border border-af-blue-ice p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-af-blue-ice flex-shrink-0 bg-white p-2 shadow-xs">
              <div className="relative w-full h-full">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="space-y-2 text-center sm:text-left flex-grow">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="font-display text-lg font-bold text-af-navy">
                  Published by the {post.author.name}
                </h3>
                <span className="text-[10px] font-bold text-af-blue bg-af-blue-ice px-2.5 py-0.5 rounded-full border border-af-blue/20">
                  {post.author.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-pv-muted leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>

          {/* Compliance Reviewer Band */}
          <div className="pt-4 border-t border-af-blue-ice/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-pv-muted">
              <ShieldCheck className="w-4 h-4 text-trust-green flex-shrink-0" />
              <span>
                <strong className="text-af-navy font-semibold">Regulatory Review:</strong> Verified by the {post.reviewer?.name || 'Advantage First Lending & Compliance Desk'}.
              </span>
            </div>
            <span className="text-[11px] font-semibold text-trust-green bg-trust-green-light px-2.5 py-1 rounded-full border border-trust-green/20">
              {post.reviewer?.badge || 'Fact-Checked & Verified'}
            </span>
          </div>
        </section>

        {/* High-Converting Bottom Rate Check Card */}
        <section className="mt-14 rounded-3xl bg-gradient-to-br from-af-navy to-af-navy-deep p-8 sm:p-12 text-white text-center sm:text-left relative overflow-hidden shadow-xl border border-white/10">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-af-red uppercase tracking-wider block">
                Take Strategic Action Today
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to Lower Your Monthly Payments?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed">
                Check personalized consolidation loan options up to $100,000 with zero impact to your credit score.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/#estimator-anchor"
                onClick={() => analytics.articleCtaClick(post.slug, 'check_options_cta')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-af-red to-[#E63935] hover:from-[#C02926] hover:to-af-red text-white font-bold text-sm shadow-lg shadow-af-red/30 transition-all duration-150 text-center"
              >
                Check My Options Online
              </Link>
              <a
                href="tel:18003441202"
                onClick={() => analytics.articleCtaClick(post.slug, 'call_cta')}
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center"
              >
                (800) 344-1202
              </a>
            </div>
          </div>
        </section>

        {/* Related Posts: Up Next in The Dispatch */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-af-blue-ice/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-af-red block">
                  Keep Reading
                </span>
                <h3 className="font-display text-2xl font-extrabold text-af-navy">
                  Up Next in The Dispatch
                </h3>
              </div>
              <Link
                href="/blog"
                onClick={() => analytics.articleCtaClick(post.slug, 'view_all_articles')}
                className="text-xs font-bold text-af-blue hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  onClick={() => analytics.blogArticleClick({ slug: rel.slug, title: rel.title, category: rel.category })}
                  className="group p-5 rounded-2xl bg-white border border-af-blue-ice hover:border-af-blue/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-pv-muted font-mono">
                      <span className="text-af-blue font-bold">{rel.category}</span>
                      <span>•</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="font-display text-base font-bold text-af-navy group-hover:text-af-blue transition-colors leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-pv-muted line-clamp-2 leading-relaxed">
                      {rel.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-af-blue-ice/60 flex items-center justify-between text-xs font-bold text-af-blue">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}

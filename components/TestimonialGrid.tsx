'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react';
import allReviews from '@/data/trustpilot-reviews.json';
import { analytics } from '@/lib/analytics';

export default function TestimonialGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  // Pick 3 featured real Trustpilot reviews with the most compelling content
  const reviews = [
    allReviews[25], // Danielle Bruyn – "Feeling hopeful and supported. 🙏"
    allReviews[0],  // Jenny Benda – "I have been wanting to start this process for years"
    allReviews[3],  // BABS – "Ernie was very polite, understanding and helpful"
  ].map((r, i) => ({
    id: `rev-${i + 1}`,
    name: r.name,
    title: r.title,
    quote: r.body,
    date: r.date,
    stars: r.stars,
    url: r.url,
    verified: 'Verified Trustpilot Reviewer',
  }));

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    } else if (touchDeltaX.current > threshold) {
      setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  }, [reviews.length]);

  const ReviewCard = ({ rev }: { rev: typeof reviews[0] }) => (
    <a 
      href={rev.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.trustpilotReviewClick({ reviewer: rev.name, title: rev.title, location: 'testimonials' })}
      className="block"
    >
    <div 
      className="p-2 rounded-3xl bg-gradient-to-b from-af-blue-soft to-white border border-af-blue-ice shadow-[0_10px_30px_-10px_rgba(29,49,95,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(15,117,188,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between card-hover-bar"
      id={`review-card-${rev.id}`}
    >
      <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 p-7 sm:p-8 flex flex-col justify-between h-full">
        
        <div>
          {/* Rating Stars & date */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1" id={`rev-stars-${rev.id}`}>
              {[...Array(rev.stars)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-[#00B67A] flex items-center justify-center rounded-xs shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-semibold text-pv-muted">{rev.date}</span>
          </div>

          <h3 className="text-base font-bold text-af-navy mb-2 leading-snug">
            &ldquo;{rev.title}&rdquo;
          </h3>

          <p className="text-xs sm:text-sm text-pv-muted leading-relaxed italic" id={`rev-quote-text-${rev.id}`}>
            &ldquo;{rev.quote}&rdquo;
          </p>
        </div>

        {/* Attribution & Verified Badge */}
        <div className="flex items-center gap-3 border-t border-af-blue-ice/60 pt-4 mt-6" id={`rev-user-profile-${rev.id}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-af-navy to-af-blue text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {rev.name.charAt(0)}
          </div>
          <div>
            <span className="block text-xs font-bold text-af-navy">
              {rev.name}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-trust-green font-semibold mt-0.5">
              <CheckCircle2 className="w-3 h-3" />
              {rev.verified}
            </span>
          </div>
        </div>

      </div>
    </div>
    </a>
  );

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden" id="customer-testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20" id="testimonials-header">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-trust-green-light border border-trust-green/20 mb-4">
            <ThumbsUp className="w-3.5 h-3.5 text-trust-green" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-trust-green">
              Real Borrower Experiences
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            Loved by Thousands of Borrowers
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 max-w-2xl mx-auto leading-relaxed">
            See how Advantage First has helped real clients consolidate balances, fund life milestones, and save thousands on interest charges.
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-8" id="testimonials-grid">
          {reviews.map((rev) => (
            <ReviewCard key={rev.id} rev={rev} />
          ))}
        </div>

        {/* Mobile: Swipeable carousel */}
        <div className="md:hidden" id="testimonials-carousel">
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
              {reviews.map((rev) => (
                <div key={rev.id} className="w-full flex-shrink-0">
                  <ReviewCard rev={rev} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === activeIndex
                    ? 'bg-af-blue w-5'
                    : 'bg-af-blue-ice w-2'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
                id={`testimonial-dot-${idx}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

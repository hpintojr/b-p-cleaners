'use client';

import { useState, useRef, useCallback } from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import reviews from '../data/trustpilot-reviews.json';
import { analytics } from '@/lib/analytics';

/** Fisher-Yates shuffle — called once from useState initializer */
function pickRandomReviews(count: number) {
  const pool = [...reviews];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

/**
 * HeroReviews — Randomly selects 4 unique 5-star Trustpilot reviews
 * from the scraped pool.
 * - Mobile: swipeable carousel showing 1 card at a time with dot indicators
 * - Desktop: 2x2 grid
 */
export default function HeroReviews() {
  const [selected] = useState(() => pickRandomReviews(4));
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
      // Swipe left → next
      setActiveIndex((prev) => (prev + 1) % 4);
    } else if (touchDeltaX.current > threshold) {
      // Swipe right → prev
      setActiveIndex((prev) => (prev - 1 + 4) % 4);
    }
  }, []);

  // SSR placeholder
  if (selected.length === 0) {
    return (
      <div className="order-4 lg:order-3 min-h-[140px] lg:min-h-[200px]" id="hero-trustpilot-reviews" />
    );
  }

  const ReviewCard = ({ review, idx }: { review: typeof reviews[0]; idx: number }) => (
    <a
      href={review.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.trustpilotReviewClick({ reviewer: review.name, title: review.title, location: 'hero' })}
      className="group block p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 hover:border-[#00B67A]/40 shadow-[0_2px_10px_-2px_rgba(29,49,95,0.04)] hover:shadow-[0_8px_20px_-4px_rgba(0,182,122,0.12)] transition-all duration-200 hover:-translate-y-0.5 card-hover-bar"
      id={`hero-review-${idx + 1}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-[#00B67A] flex items-center justify-center rounded-2xs">
              <Star className="w-2.5 h-2.5 fill-white text-white" />
            </div>
          ))}
        </div>
        <span className="text-[10px] font-semibold text-pv-muted">{review.date}</span>
      </div>
      <p className="text-xs font-bold text-af-navy leading-snug mb-1">
        &ldquo;{review.title}&rdquo;
      </p>
      <p className="text-[11px] text-pv-muted leading-relaxed line-clamp-2">
        {review.body}
      </p>
      <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-af-blue-ice/60">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-af-navy to-af-blue text-white flex items-center justify-center text-[10px] font-bold">
          {review.name.charAt(0)}
        </div>
        <span className="text-[10px] font-semibold text-trust-green flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> {review.name} · Verified Trustpilot Review
        </span>
      </div>
    </a>
  );

  return (
    <div className="order-4 lg:order-3" id="hero-trustpilot-reviews">
      {/* Desktop: 2x2 Grid */}
      <div className="hidden sm:grid grid-cols-2 gap-3">
        {selected.map((review, idx) => (
          <ReviewCard key={idx} review={review} idx={idx} />
        ))}
      </div>

      {/* Mobile: Swipeable Carousel */}
      <div className="sm:hidden">
        <div
          ref={containerRef}
          className="overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {selected.map((review, idx) => (
              <div key={idx} className="w-full flex-shrink-0">
                <ReviewCard review={review} idx={idx} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-3">
          {selected.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                idx === activeIndex
                  ? 'bg-af-blue w-5'
                  : 'bg-af-blue-ice'
              }`}
              aria-label={`Go to review ${idx + 1}`}
              id={`review-dot-${idx}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

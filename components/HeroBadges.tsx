'use client';

import { Star, ShieldCheck, BadgeCheck } from 'lucide-react';
import { analytics } from '@/lib/analytics';

/**
 * HeroBadges — Trust signal badges shown above the hero headline.
 * Generic, non-third-party-branded badges (no external review platform
 * claims until B&P Cleaners has real, verifiable listings there).
 */
export default function HeroBadges() {
  return (
    <>
      {/* ── 5-Star Customer Rating Eyebrow Badge ── */}
      <a href="/#customer-testimonials-section" onClick={() => analytics.trustpilotLinkClick('hero_badge')} className="order-3 lg:order-4 inline-flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-0 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 mt-2 rounded-2xl sm:rounded-full bg-white border border-af-blue-ice shadow-xs hover:shadow-md hover:border-af-blue/40 transition-all duration-200 lg:self-center whitespace-nowrap" id="hero-badge">
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-af-blue flex items-center justify-center rounded-2xs">
              <Star className="w-2.5 h-2.5 fill-white text-white" />
            </div>
          ))}
          <span className="text-[14px] sm:text-xs font-bold text-af-navy uppercase tracking-normal sm:tracking-wider">Rated by Our Customers</span>
        </div>
        <div className="hidden sm:block h-3 w-[1px] bg-af-blue-ice mx-2 flex-shrink-0" />
        <span className="text-[14px] sm:text-xs font-bold text-af-navy uppercase tracking-normal sm:tracking-wider text-center">
          Vetted, Experienced Cleaners
        </span>
      </a>

      {/* ── Insured & Bonded Badge ── */}
      <div className="order-4 lg:order-5 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full bg-white border border-af-blue-ice shadow-xs hover:shadow-md transition-all duration-200 self-center whitespace-nowrap" id="hero-insured-badge">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-af-navy flex-shrink-0" />
          <span className="text-[13px] sm:text-xs font-extrabold text-af-navy tracking-wide">Insured &amp; Bonded</span>
        </div>
        <div className="h-3 w-[1px] bg-af-blue-ice mx-0.5 sm:mx-4 flex-shrink-0" />
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <BadgeCheck className="w-4 h-4 text-trust-green" />
          <span className="text-[13px] sm:text-xs font-bold text-af-navy uppercase tracking-wider">Background-Checked</span>
        </div>
        <div className="hidden sm:block h-3 w-[1px] bg-af-blue-ice mx-4 flex-shrink-0" />
        <span className="hidden sm:inline text-xs font-bold text-af-navy uppercase tracking-wider">
          Trust, Built Locally.
        </span>
      </div>
    </>
  );
}

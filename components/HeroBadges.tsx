'use client';

import { Star } from 'lucide-react';
import { analytics } from '@/lib/analytics';

/**
 * HeroBadges — Client component wrapping Trustpilot and BBB hero badges
 * with analytics click tracking. Extracted from page.tsx server component.
 */
export default function HeroBadges() {
  return (
    <>
      {/* ── Trustpilot 5-Star Social Proof Eyebrow Badge ── */}
      <a href="https://www.trustpilot.com/review/adv1st.com" target="_blank" rel="noopener noreferrer" onClick={() => analytics.trustpilotLinkClick('hero_badge')} className="order-3 lg:order-4 inline-flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-0 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 mt-2 rounded-2xl sm:rounded-full bg-white border border-af-blue-ice shadow-xs hover:shadow-md hover:border-[#00B67A]/40 transition-all duration-200 lg:self-center whitespace-nowrap" id="hero-badge">
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="#00B67A">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[14px] sm:text-sm font-bold text-[#191C1F] tracking-tight">Trustpilot</span>
          <div className="h-3 w-[1px] bg-af-blue-ice mx-0.5 sm:mx-1 flex-shrink-0" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-[#00B67A] flex items-center justify-center rounded-2xs">
              <Star className="w-2.5 h-2.5 fill-white text-white" />
            </div>
          ))}
          <span className="text-[14px] sm:text-xs font-bold text-af-navy uppercase tracking-normal sm:tracking-wider">Rated 4.8/5</span>
        </div>
        <div className="hidden sm:block h-3 w-[1px] bg-af-blue-ice mx-2 flex-shrink-0" />
        <span className="text-[14px] sm:text-xs font-bold text-af-navy uppercase tracking-normal sm:tracking-wider text-center">
          Licensed Direct Lender &amp; Lending Network
        </span>
      </a>

      {/* ── BBB A+ Accredited Social Proof Badge ── */}
      <a href="https://www.bbb.org/us/ca/costa-mesa/profile/financial-services/advantage-first-financial-1126-1000114844" target="_blank" rel="noopener noreferrer" onClick={() => analytics.bbbBadgeClick('hero')} className="order-4 lg:order-5 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full bg-white border border-af-blue-ice shadow-xs hover:shadow-md hover:border-[#003F72]/40 transition-all duration-200 self-center whitespace-nowrap" id="hero-bbb-badge">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#003F72] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" opacity="0.1" />
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span className="text-[13px] sm:text-xs font-extrabold text-[#003F72] tracking-wide">Better Business Bureau</span>
        </div>
        <div className="h-3 w-[1px] bg-af-blue-ice mx-0.5 sm:mx-4 flex-shrink-0" />
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#003F72] text-white text-[10px] font-extrabold leading-none flex-shrink-0">A+</span>
          <span className="text-[13px] sm:text-xs font-bold text-af-navy uppercase tracking-wider">Accredited · 4.86/5</span>
        </div>
        <div className="hidden sm:block h-3 w-[1px] bg-af-blue-ice mx-4 flex-shrink-0" />
        <span className="hidden sm:inline text-xs font-bold text-af-navy uppercase tracking-wider">
          Trust, Built Locally.
        </span>
      </a>
    </>
  );
}

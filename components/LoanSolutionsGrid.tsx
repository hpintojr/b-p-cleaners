'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface LoanSolutionsGridProps {
  onApplyClick?: () => void;
}

export default function LoanSolutionsGrid({ onApplyClick }: LoanSolutionsGridProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'popular'>('all');

  const handleAction = () => {
    if (onApplyClick) {
      onApplyClick();
    } else if (typeof window !== 'undefined') {
      const el = document.getElementById('estimator-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        router.push('/#estimator-anchor');
      }
    }
  };

  const solutions = [
    {
      id: 'personal-loans',
      title: 'Personal Loans',
      tagline: 'Versatile Funding for Life’s Major Moments',
      iconSrc: '/images/personal-loans-icon_DT.png',
      amount: 'Up to $100,000',
      rates: 'From 5.99% APR',
      terms: '12 – 72 Months',
      badge: 'Most Flexible',
      badgeColor: 'bg-af-blue-ice text-af-blue border-af-blue/20',
      description: 'Cover emergency expenses, fund large purchases, or streamline cash flow with predictable monthly payments and no collateral requirements.',
      features: [
        'Unsecured — zero collateral required',
        'Fixed interest rate for entire term',
        'Direct deposit to your bank account'
      ]
    },
    {
      id: 'debt-consolidation',
      title: 'Loan Consolidation',
      tagline: 'Combine High-Interest Cards into 1 Lower Payment',
      iconSrc: '/images/debt-consolidation-icon-DT.png',
      amount: 'Up to $100,000',
      rates: 'From 5.99% APR',
      terms: '12 – 72 Months',
      badge: 'Highest Savings',
      badgeColor: 'bg-trust-green-light text-trust-green border-trust-green/20',
      description: 'Replace multiple confusing credit card statements and 20%+ APR rates with a single, lower-rate monthly payment designed to get you financially clear faster.',
      features: [
        'Pay off expensive credit card balances',
        'One simple monthly due date',
        'Clear payoff completion date'
      ]
    },
    {
      id: 'home-improvement',
      title: 'Home Improvement',
      tagline: 'Renovate & Upgrade Without Tapping Equity',
      iconSrc: '/images/home-improvements-icon_DT.png',
      amount: 'Up to $100,000',
      rates: 'Competitive Fixed APR',
      terms: 'Flexible Timelines',
      badge: 'No Home Appraisal',
      badgeColor: 'bg-af-blue-ice text-af-navy border-af-navy/20',
      description: 'Fund kitchen remodels, roof repairs, solar installations, or room additions without touching your mortgage rate or going through appraisal delays.',
      features: [
        'No lien placed on your property',
        'Faster approval than HELOCs',
        'Funds paid upfront for contractor milestones'
      ]
    },
    {
      id: 'business-needs',
      title: 'Business Needs',
      tagline: 'Working Capital to Scale Operations & Growth',
      iconSrc: '/images/business-needs-icon_DT.png',
      amount: 'Up to $100,000',
      rates: 'Tailored Terms',
      terms: 'Custom Financing',
      badge: 'Growth Capital',
      badgeColor: 'bg-af-red-light text-af-red border-af-red/20',
      description: 'Fuel inventory purchases, marketing campaigns, equipment upgrades, or seasonal cash flow bridges with fast, flexible business loan options.',
      features: [
        'Streamlined revenue-based approvals',
        'Funds available for any business purpose',
        'Maintain 100% equity ownership'
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-mesh-hero relative overflow-hidden" id="loan-solutions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-af-blue-ice shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
              Tailored Lending Solutions
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            Simple Solutions to Unique Situations
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed max-w-2xl mx-auto">
            We connect you with the right loan products through our trusted lender network — designed to fit your unique financial goals and budget.
          </p>
        </div>

        {/* 4 Solutions Double-Bezel Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {solutions.map((item) => (
            <div 
              key={item.id}
              className="group relative p-2 rounded-3xl bg-gradient-to-b from-white to-white/70 backdrop-blur-xl border border-white shadow-[0_12px_35px_-10px_rgba(29,49,95,0.08)] hover:shadow-[0_20px_45px_-12px_rgba(15,117,188,0.18)] transition-all duration-300 hover:-translate-y-1 card-hover-bar"
              id={`solution-card-${item.id}`}
            >
              <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 p-7 sm:p-9 flex flex-col justify-between h-full">
                
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-af-blue-soft/80 border border-af-blue-ice p-3 flex items-center justify-center group-hover:scale-105 group-hover:bg-af-blue-ice transition-all duration-300 shadow-sm">
                      <Image 
                        src={item.iconSrc} 
                        alt={item.title} 
                        fill 
                        className="object-contain p-2.5"
                        sizes="72px"
                      />
                    </div>

                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-xs ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-af-navy tracking-tight group-hover:text-af-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-af-blue mt-1">
                    {item.tagline}
                  </p>

                  <p className="text-sm text-pv-muted mt-3.5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Key Highlights Bar */}
                  <div className="grid grid-cols-3 gap-2 my-6 p-3.5 rounded-xl bg-af-blue-soft/60 border border-af-blue-ice/60 text-center">
                    <div>
                      <span className="block text-[10px] font-bold text-pv-muted uppercase">Limit</span>
                      <span className="block text-xs sm:text-sm font-extrabold text-af-navy font-mono mt-0.5">{item.amount}</span>
                    </div>
                    <div className="border-x border-af-blue-ice/80 px-1">
                      <span className="block text-[10px] font-bold text-pv-muted uppercase">Rates</span>
                      <span className="block text-xs sm:text-sm font-extrabold text-trust-green font-mono mt-0.5">{item.rates}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-pv-muted uppercase">Terms</span>
                      <span className="block text-xs sm:text-sm font-extrabold text-af-navy font-mono mt-0.5">{item.terms}</span>
                    </div>
                  </div>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2 mb-8">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-pv-text">
                        <CheckCircle2 className="w-4 h-4 text-trust-green flex-shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Action */}
                <div className="pt-4 border-t border-af-blue-ice/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-pv-muted">
                    <ShieldCheck className="w-4 h-4 text-af-blue" />
                    <span>No Pre-Approval Fee</span>
                  </div>

                  <button
                    onClick={() => { analytics.loanCardCtaClick(item.title); handleAction(); }}
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-af-navy hover:bg-af-blue text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md active:scale-98"
                  >
                    <span>Check Loan Options</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-af-blue-ice shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-af-blue-soft text-af-blue flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-af-navy">
                Not sure which loan option is right for you?
              </h4>
              <p className="text-xs text-pv-muted mt-0.5">
                Our specialists review your situation and match you with the highest approval probabilities across our network.
              </p>
            </div>
          </div>

          <a 
            href="tel:18003441202" 
            onClick={() => analytics.loanCardCtaClick('call_specialist')}
            className="flex-shrink-0 px-5 py-3 rounded-full bg-af-red hover:bg-af-red/90 text-white font-bold text-xs tracking-wide transition-colors duration-200 flex items-center gap-2 border border-af-red/20"
          >
            <span>Call (800) 344-1202</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

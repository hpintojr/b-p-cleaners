'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Search, BadgeCheck, ChevronRight, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface ProcessStepsProps {
  onApplyClick?: () => void;
}

export default function ProcessSteps({ onApplyClick }: ProcessStepsProps) {
  const steps = [
    {
      number: '01',
      title: 'Fast Online Inquiry',
      subtitle: 'Takes Just 2 Minutes',
      badge: 'Zero Credit Impact',
      icon: <FileText className="w-6 h-6 text-af-blue" />,
      description: 'Tell us how much you need (up to $100,000) and your primary goal — loan consolidation, home improvement, or personal expense. No tedious paperwork required.',
    },
    {
      number: '02',
      title: 'Instant Lender Matching',
      subtitle: 'Multiple Competing Offers',
      badge: 'Transparent Comparison',
      icon: <Search className="w-6 h-6 text-af-red" />,
      description: 'We evaluate your request against Advantage First direct loan solutions and our trusted lender network (including SoFi, Prosper, Upgrade, Best Egg) to unlock your highest approval odds and lowest APR rates.',
    },
    {
      number: '03',
      title: 'Direct Funding & Freedom',
      subtitle: 'Fast Direct Deposit',
      badge: 'As fast as 24hrs',
      icon: <BadgeCheck className="w-6 h-6 text-trust-green" />,
      description: 'Select your preferred loan term (up to 72 months), e-sign your loan agreement, and receive direct deposit into your bank account. Predictable fixed monthly payments start.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden" id="program-process-steps-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20" id="process-section-header">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-af-blue-soft border border-af-blue-ice mb-4">
            <Zap className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
              Simple 3-Step Journey
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            How Getting a Loan Works with Advantage First
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 max-w-2xl mx-auto leading-relaxed">
            We’ve eliminated traditional banking friction. Apply once, compare personalized offers from top lenders, and fund your goals with total clarity.
          </p>
        </div>

        {/* 3 Step Cards with Double-Bezel Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative" id="process-steps-grid">
          {steps.map((step, idx) => (
            <div 
              key={step.number} 
              className="relative p-2 rounded-3xl bg-gradient-to-b from-af-blue-soft to-white border border-af-blue-ice shadow-[0_10px_30px_-10px_rgba(29,49,95,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(15,117,188,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between card-hover-bar overflow-visible"
              id={`process-card-${step.number}`}
            >
              <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 p-7 sm:p-8 flex flex-col justify-between h-full">
                
                <div>
                  {/* Step Top Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-af-blue-soft border border-af-blue-ice flex items-center justify-center shadow-xs">
                      {step.icon}
                    </div>
                    <span className="font-display text-4xl sm:text-5xl font-black text-af-navy/15 font-mono tracking-tighter" id={`step-num-${step.number}`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Step Info */}
                  <div className="mb-4">
                    <span className="inline-block text-[10px] font-extrabold text-af-blue uppercase tracking-wider bg-af-blue-ice px-2.5 py-0.5 rounded-full mb-1.5">
                      {step.badge}
                    </span>
                    <span className="block text-xs font-bold text-pv-muted uppercase tracking-wider">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl font-extrabold text-af-navy tracking-tight mt-0.5">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-pv-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-af-blue-ice/60 flex items-center justify-between text-xs text-pv-muted">
                  <span className="font-semibold">Stage {step.number} of 03</span>
                  {idx === 2 ? (
                    <Link
                      href="/#estimator-anchor"
                      onClick={() => analytics.processGetRateClick()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-af-red hover:bg-af-red/90 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Get My Rate
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-af-blue font-bold">100% Online</span>
                  )}
                </div>

              </div>

              {/* Connecting Chevron on Desktop */}
              {idx < 2 && (
                <div className="hidden lg:flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 z-30 text-af-blue bg-white rounded-full p-1.5 border border-af-blue-ice shadow-md" id={`step-divider-${idx}`}>
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Process Trust Guarantee Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-af-blue-soft/80 border border-af-blue-ice text-center max-w-3xl mx-auto shadow-xs" id="process-safety-guarantee">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-pv-muted leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-trust-green flex-shrink-0" />
            <p>
              <strong className="text-af-navy font-bold">Transparent Lending Standards:</strong> Advantage First Financial LLC never charges advance pre-approval fees. All loan terms, APR rates, and repayment schedules are fully disclosed before acceptance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

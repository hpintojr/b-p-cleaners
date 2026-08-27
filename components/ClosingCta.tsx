'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Phone, ArrowRight, ShieldCheck, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface ClosingCtaProps {
  onEstimatorClick?: () => void;
}

export default function ClosingCta({ onEstimatorClick }: ClosingCtaProps) {
  const router = useRouter();

  const handleAction = () => {
    if (onEstimatorClick) {
      onEstimatorClick();
    } else if (typeof window !== 'undefined') {
      const el = document.getElementById('estimator-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        router.push('/#estimator-anchor');
      }
    }
  };
  return (
    <section className="bg-mesh-dark text-white py-24 sm:py-32 relative overflow-hidden" id="closing-cta-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Live Indicator Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 mb-8" id="cta-trust-badge">
          <span className="w-2 h-2 rounded-full bg-trust-green animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-widest">
            Loan Specialists Active Now
          </span>
        </div>

        {/* Big Impact Headline */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto mb-6">
          Let’s Discuss Your Financial Goals.
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-12">
          The money you need, when you need it — with competitive fixed rates, flexible terms up to 72 months, and a dedicated team that puts your needs first.
        </p>

        {/* Dual Interactive Conversion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14" id="cta-button-stack">
          
          {/* Card 1: Phone Consultation Card */}
          <a 
            href="tel:18003441202" 
            onClick={() => analytics.closingCtaCallClick()}
            className="group p-6 rounded-3xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-xl text-left transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between card-hover-bar"
            id="oversized-call-button"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-af-red text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md">
                <Phone className="w-6 h-6" />
              </div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-af-red-light">
                Direct Phone Line
              </span>
              <span className="block text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white mt-1">
                (800) 344-1202
              </span>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">
                Speak directly with an Advantage First advisor for a free 5-minute assessment.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white group-hover:text-af-blue-light transition-colors">
              <span>Call Toll-Free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>

          {/* Card 2: Online Pre-Qualification Card */}
          <div 
            onClick={() => { analytics.closingCtaApplyClick(); handleAction(); }}
            className="group p-6 rounded-3xl bg-gradient-to-br from-af-blue to-af-navy-card border border-af-blue-light/30 hover:border-af-blue-cyan/60 backdrop-blur-xl text-left transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between cursor-pointer card-hover-bar"
            id="cta-estimator-card"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-af-blue flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-af-blue-cyan">
                Instant Online Quote
              </span>
              <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                Check My Options
              </span>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Compare pre-qualified rates up to $100,000 with zero impact to your credit score.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white group-hover:text-af-blue-cyan transition-colors">
              <span>Calculate Savings Online</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>

        {/* Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-xs font-semibold" id="cta-security-indicators">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-trust-green" />
            <span>Texas OCCC &amp; Utah DFI Licensed</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5 text-trust-green" />
            <span>Soft Credit Pull · Zero Score Impact</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-trust-green" />
            <span>256-Bit Bank Level Encryption</span>
          </div>
        </div>

      </div>
    </section>
  );
}

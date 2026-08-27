'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ShieldCheck, Lock, Award, CheckCircle2, Star } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function TrustBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const trustFeatures = [
    {
      id: 'tf-license',
      icon: <Award className="w-5 h-5 text-af-blue" />,
      title: 'Licensed & Regulated',
      desc: 'Registered through Utah & Texas Departments of Financial Institutions',
    },
    {
      id: 'tf-rates',
      icon: <ShieldCheck className="w-5 h-5 text-trust-green" />,
      title: 'Locked Fixed APR',
      desc: 'Predictable rates from 5.99% APR with zero variable payment shock',
    },
    {
      id: 'tf-security',
      icon: <Lock className="w-5 h-5 text-af-red" />,
      title: '256-Bit SSL Bank Encryption',
      desc: 'Your sensitive personal & financial data is completely encrypted',
    },
    {
      id: 'tf-no-fees',
      icon: <CheckCircle2 className="w-5 h-5 text-af-blue-light" />,
      title: 'Zero Prepayment Fees',
      desc: 'Pay off your balance early at any point with zero financial penalty',
    },
  ];

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
      setActiveIndex((prev) => (prev + 1) % trustFeatures.length);
    } else if (touchDeltaX.current > threshold) {
      setActiveIndex((prev) => (prev - 1 + trustFeatures.length) % trustFeatures.length);
    }
  }, [trustFeatures.length]);

  const TrustCard = ({ tf }: { tf: typeof trustFeatures[0] }) => (
    <div 
      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-200 shadow-xs"
      id={`compliance-card-${tf.id}`}
    >
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3.5 border border-white/10">
        {tf.icon}
      </div>
      <h4 className="text-sm font-bold text-white uppercase tracking-wide leading-tight">
        {tf.title}
      </h4>
      <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
        {tf.desc}
      </p>
    </div>
  );

  return (
    <section className="bg-af-navy text-white py-16 relative overflow-hidden" id="compliance-trust-bar">
      {/* Background glow elements */}
      <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Trustpilot Rating Banner — Custom Styled */}
        <a 
          href="https://www.trustpilot.com/review/adv1st.com" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => analytics.trustpilotLinkClick('trustbar')}
          className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 mb-12 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl hover:bg-white/[0.12] transition-colors"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Trustpilot Logo Badge */}
            <div className="flex items-center gap-1.5 bg-[#00B67A] text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
              <Star className="w-4 h-4 fill-white text-white" />
              <span>Trustpilot</span>
            </div>

            {/* 5 Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-[#00B67A] flex items-center justify-center rounded-xs shadow-2xs">
                  <Star className="w-4 h-4 fill-white text-white" />
                </div>
              ))}
            </div>

            {/* Rating Text */}
            <div className="hidden sm:block">
              <span className="block text-sm font-bold text-white">
                Rated 4.8 / 5.0 by Borrowers
              </span>
              <span className="block text-xs text-white/60 mt-0.5">
                Verified reviews • Transparent lending partner network
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-white/90 bg-white/10 px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-trust-green animate-pulse" />
            <span>State Regulatory Compliant</span>
          </div>
        </a>

        {/* Desktop: 4-column grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6" id="compliance-badges-grid">
          {trustFeatures.map((tf) => (
            <TrustCard key={tf.id} tf={tf} />
          ))}
        </div>

        {/* Mobile: Swipeable carousel */}
        <div className="sm:hidden" id="compliance-badges-carousel">
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {trustFeatures.map((tf) => (
                <div key={tf.id} className="w-full flex-shrink-0 px-0.5">
                  <TrustCard tf={tf} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {trustFeatures.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === activeIndex
                    ? 'bg-af-blue w-5'
                    : 'bg-white/30 w-2'
                }`}
                aria-label={`Go to trust feature ${idx + 1}`}
                id={`trust-dot-${idx}`}
              />
            ))}
          </div>
        </div>


        {/* Regulatory Disclosure Text */}
        <div className="text-center mt-10 text-[11px] text-white/50 max-w-3xl mx-auto leading-relaxed border-t border-white/10 pt-6">
          Advantage First Financial, LLC connects consumers with trusted loan providers. Rates range from 5.99% to 35.99% APR with terms from 12 to 72 months. Checking options does not affect credit scores.
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ShieldCheck, Lock, Award, CheckCircle2, Star } from 'lucide-react';

export default function TrustBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const trustFeatures = [
    {
      id: 'tf-vetted',
      icon: <Award className="w-5 h-5 text-af-blue" />,
      title: 'Vetted Cleaners',
      desc: 'Every cleaner is interviewed, reference-checked, and background-checked before dispatch',
    },
    {
      id: 'tf-insured',
      icon: <ShieldCheck className="w-5 h-5 text-trust-green" />,
      title: 'Insured & Bonded',
      desc: 'Every job is covered — no surprises if something goes wrong',
    },
    {
      id: 'tf-security',
      icon: <Lock className="w-5 h-5 text-af-red" />,
      title: 'Secure Booking & Payment',
      desc: 'Your contact and payment details are handled through encrypted, secure forms',
    },
    {
      id: 'tf-no-fees',
      icon: <CheckCircle2 className="w-5 h-5 text-af-blue-light" />,
      title: 'No Upfront Fees',
      desc: 'You’re only billed after the cleaning is completed to your satisfaction',
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

        {/* Customer Rating Banner */}
        <div
          className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 mb-12 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            {/* 5 Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-af-blue flex items-center justify-center rounded-xs shadow-2xs">
                  <Star className="w-4 h-4 fill-white text-white" />
                </div>
              ))}
            </div>

            {/* Rating Text */}
            <div className="hidden sm:block">
              <span className="block text-sm font-bold text-white">
                Rated by Our Customers
              </span>
              <span className="block text-xs text-white/60 mt-0.5">
                Vetted cleaner network • Transparent, upfront pricing
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-white/90 bg-white/10 px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-trust-green animate-pulse" />
            <span>Insured &amp; Background-Checked</span>
          </div>
        </div>

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


        {/* Service Disclosure Text */}
        <div className="text-center mt-10 text-[11px] text-white/50 max-w-3xl mx-auto leading-relaxed border-t border-white/10 pt-6">
          Benny &amp; Penny Cleaning Services connects customers with vetted, insured independent
          cleaning contractors. Instant quotes are estimates confirmed before your appointment.
        </div>

      </div>
    </section>
  );
}

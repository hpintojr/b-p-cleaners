'use client';

import React from 'react';
import { Clock, ShieldCheck, CalendarRange, Sparkles } from 'lucide-react';

export default function StatsRow() {
  const stats = [
    {
      id: 'stat-quote-time',
      icon: <Clock className="w-5 h-5 text-af-blue" />,
      value: '< 60 Sec',
      prefix: 'Instant',
      label: 'Online Quote',
      description: 'Get a real price range the moment you finish the form — no callback needed.',
      badge: 'No Waiting',
      badgeColor: 'bg-af-blue-ice text-af-blue',
    },
    {
      id: 'stat-vetted',
      icon: <ShieldCheck className="w-5 h-5 text-trust-green" />,
      value: '100%',
      prefix: 'Every Cleaner',
      suffix: 'Vetted',
      label: 'Insured & Background-Checked',
      description: 'Experienced independent cleaners bring their own supplies and equipment.',
      badge: 'Fully Vetted',
      badgeColor: 'bg-trust-green-light text-trust-green',
    },
    {
      id: 'stat-frequency',
      icon: <CalendarRange className="w-5 h-5 text-af-red" />,
      value: '4 Options',
      prefix: 'Schedule',
      label: 'One-Time to Monthly',
      description: 'Choose one-time, weekly, bi-weekly, or monthly — with a discount for recurring service.',
      badge: 'Flexible Plans',
      badgeColor: 'bg-af-red-light text-af-red',
    },
    {
      id: 'stat-guarantee',
      icon: <Sparkles className="w-5 h-5 text-af-blue-cyan" />,
      value: 'No Fees',
      prefix: 'Transparent',
      label: 'Pricing Guarantee',
      description: 'The range you quote is the range you’re billed, confirmed before we arrive.',
      badge: 'No Hidden Costs',
      badgeColor: 'bg-af-blue-ice text-af-blue-light',
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="metrics-stat-section">
      {/* Outer Double-Bezel Frame */}
      <div className="p-2 sm:p-3 rounded-3xl bg-gradient-to-b from-white/90 to-white/40 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_-15px_rgba(26,29,31,0.14)] card-hover-bar">
        <div className="rounded-2xl bg-white border border-af-blue-ice/80 p-6 sm:p-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-af-blue-ice">
            {stats.map((stat, idx) => (
              <div
                key={stat.id}
                className={`flex flex-col justify-between lg:px-4 ${idx > 0 ? 'pt-6 sm:pt-0' : ''}`}
                id={`metric-col-${stat.id}`}
              >
                <div>
                  <div className="flex items-center justify-between lg:justify-start gap-2 lg:gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-af-blue-soft border border-af-blue-ice flex items-center justify-center shadow-sm">
                      {stat.icon}
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${stat.badgeColor}`}>
                      {stat.badge}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="block text-[11px] font-bold text-pv-muted uppercase tracking-wider">
                      {stat.prefix}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl sm:text-4xl font-extrabold text-af-navy tracking-tight">
                        {stat.value}
                      </span>
                      {stat.suffix && (
                        <span className="text-sm font-extrabold text-pv-muted font-mono">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-af-blue uppercase tracking-wide pt-1">
                      {stat.label}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-pv-muted mt-3 leading-relaxed border-t border-af-blue-ice/60 pt-3 whitespace-pre-line">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

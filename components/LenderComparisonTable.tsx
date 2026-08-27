'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Check, ShieldCheck, ArrowUpRight, Sparkles, Building2 } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface LenderComparisonTableProps {
  onApplyClick?: () => void;
}

export default function LenderComparisonTable({ onApplyClick }: LenderComparisonTableProps) {
  const router = useRouter();

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
  const lenders = [
    {
      name: 'SoFi',
      badge: 'Best for High Balances',
      badgeColor: 'bg-af-blue-ice text-af-blue',
      amount: '$40,000',
      apr: '5.99% APR',
      term: '48 Months',
      features: 'No origination fee • Fast direct deposit',
      rating: '4.9/5'
    },
    {
      name: 'Prosper',
      badge: 'Best for Loan Consolidation',
      badgeColor: 'bg-trust-green-light text-trust-green',
      amount: '$35,000',
      apr: '6.99% APR',
      term: '60 Months',
      features: 'Fixed low rate • Streamlined verification',
      rating: '4.8/5'
    },
    {
      name: 'Upgrade',
      badge: 'Fast Approval Decision',
      badgeColor: 'bg-af-blue-ice text-af-navy',
      amount: '$30,000',
      apr: '7.29% APR',
      term: '36 Months',
      features: 'Credit building tools • Rapid funding',
      rating: '4.8/5'
    },
    {
      name: 'Best Egg',
      badge: 'Flexible Credit Profiles',
      badgeColor: 'bg-af-red-light text-af-red',
      amount: '$25,000',
      apr: '8.99% APR',
      term: '36 Months',
      features: 'Convenient autopay discounts',
      rating: '4.7/5'
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-mesh-hero border-y border-af-blue-ice relative overflow-hidden" id="lender-comparison-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-af-blue-soft border border-af-blue-ice mb-4">
            <Building2 className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
              Trusted Lender Network
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            One Application Unlocks Multiple Competing Offers
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed max-w-2xl mx-auto">
            Why apply to one bank when you can have top national lenders compete for your business? Review sample rates from our lending partner network:
          </p>
        </div>

        {/* Comparison Table / Cards Container */}
        <div className="double-bezel max-w-5xl mx-auto">
          <div className="double-bezel-inner p-4 sm:p-8">
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-af-blue-ice text-[11px] font-extrabold text-pv-muted uppercase tracking-wider">
                    <th className="pb-4 pl-4">Lender Partner</th>
                    <th className="pb-4">Example Amount</th>
                    <th className="pb-4">Starting APR</th>
                    <th className="pb-4">Term Length</th>
                    <th className="pb-4">Key Advantage</th>
                    <th className="pb-4 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-af-blue-ice/60">
                  {lenders.map((lender, i) => (
                    <tr key={lender.name} className="hover:bg-af-blue-soft/50 transition-colors group">
                      <td className="py-5 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-af-navy text-white flex items-center justify-center font-extrabold font-display text-base shadow-sm">
                            {lender.name.substring(0, 2)}
                          </div>
                          <div>
                            <span className="font-bold text-af-navy text-base block group-hover:text-af-blue transition-colors">
                              {lender.name}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lender.badgeColor}`}>
                              {lender.badge}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 font-mono font-bold text-af-navy text-base">
                        {lender.amount}
                      </td>
                      <td className="py-5">
                        <span className="font-mono font-extrabold text-trust-green text-base bg-trust-green-light px-2.5 py-1 rounded-lg border border-trust-green/20">
                          {lender.apr}
                        </span>
                      </td>
                      <td className="py-5 text-sm font-semibold text-pv-text">
                        {lender.term}
                      </td>
                      <td className="py-5 text-xs text-pv-muted">
                        {lender.features}
                      </td>
                      <td className="py-5 pr-4 text-right">
                        <button
                          onClick={() => { analytics.lenderCompareClick(lender.name); handleAction(); }}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-af-navy hover:bg-af-blue text-white text-xs font-bold transition-all shadow-xs group-hover:shadow-md"
                        >
                          <span>Compare</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards */}
            <div className="md:hidden space-y-4">
              {lenders.map((lender) => (
                <div key={lender.name} className="p-4 rounded-2xl bg-af-blue-soft/50 border border-af-blue-ice space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-af-navy text-white flex items-center justify-center font-bold text-sm">
                        {lender.name.substring(0, 2)}
                      </div>
                      <span className="font-bold text-af-navy text-base">{lender.name}</span>
                    </div>
                    <span className="font-mono font-extrabold text-trust-green text-sm bg-trust-green-light px-2 py-0.5 rounded-md border border-trust-green/20">
                      {lender.apr}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-af-blue-ice/60">
                    <div>
                      <span className="text-pv-muted block">Example Amount</span>
                      <span className="font-bold text-af-navy font-mono text-sm">{lender.amount}</span>
                    </div>
                    <div>
                      <span className="text-pv-muted block">Term Length</span>
                      <span className="font-bold text-af-navy text-sm">{lender.term}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { analytics.lenderCompareClick(lender.name); handleAction(); }}
                    className="w-full py-2.5 rounded-full bg-af-navy text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Check Match with {lender.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Callout in Table Frame */}
            <div className="mt-6 pt-6 border-t border-af-blue-ice flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-pv-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-trust-green flex-shrink-0" />
                <span>Rates shown are representative examples. Checking offers does not impact your credit score.</span>
              </div>
              <button
                onClick={() => { analytics.lenderUnlockAllClick(); handleAction(); }}
                className="font-bold text-af-blue hover:text-af-navy flex items-center gap-1 underline underline-offset-4 flex-shrink-0"
              >
                <span>Unlock All 40+ Partner Offers</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

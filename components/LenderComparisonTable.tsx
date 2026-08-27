'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface LenderComparisonTableProps {
  onApplyClick?: () => void;
}

/**
 * Service tier comparison — repurposed from the original lender-comparison
 * layout. Keeps the same table/card architecture, replaced with B&P
 * Cleaners' service tiers instead of competing lenders.
 */
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

  const tiers = [
    {
      name: 'Standard Clean',
      badge: 'Most Popular',
      badgeColor: 'bg-af-blue-ice text-af-blue',
      rate: '$0.20 / sqft',
      frequency: 'One-time or recurring',
      features: 'Dusting, vacuuming, kitchens & bathrooms, trash removal',
    },
    {
      name: 'Deep Clean',
      badge: 'Best for First Visit',
      badgeColor: 'bg-trust-green-light text-trust-green',
      rate: '+$0.10 / sqft',
      frequency: 'One-time, then switch to Standard',
      features: 'Baseboards, inside cabinets, detailed scrubbing top to bottom',
    },
    {
      name: 'Move-In / Move-Out',
      badge: 'Get Your Deposit Back',
      badgeColor: 'bg-af-blue-ice text-af-navy',
      rate: '+$0.15 / sqft',
      frequency: 'One-time',
      features: 'Full empty-property detail clean, inside every cabinet & closet',
    },
    {
      name: 'Recurring Maintenance',
      badge: 'Best Value',
      badgeColor: 'bg-af-red-light text-af-red',
      rate: 'Up to 20% off',
      frequency: 'Weekly, bi-weekly, or monthly',
      features: 'Standard clean on a set schedule with a locked-in discount',
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-mesh-hero border-y border-af-blue-ice relative overflow-hidden" id="service-comparison-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-af-blue-soft border border-af-blue-ice mb-4">
            <Sparkles className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
              Simple, Transparent Pricing
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            One Quote, Every Service Tier
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed max-w-2xl mx-auto">
            Every tier is built on the same instant quote — pick standard upkeep, a one-time deep
            clean, a move-out detail, or lock in recurring savings.
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
                    <th className="pb-4 pl-4">Service Tier</th>
                    <th className="pb-4">Rate Adjustment</th>
                    <th className="pb-4">Frequency</th>
                    <th className="pb-4">What&apos;s Included</th>
                    <th className="pb-4 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-af-blue-ice/60">
                  {tiers.map((tier) => (
                    <tr key={tier.name} className="hover:bg-af-blue-soft/50 transition-colors group">
                      <td className="py-5 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-af-navy text-white flex items-center justify-center font-extrabold font-display text-base shadow-sm">
                            {tier.name.substring(0, 2)}
                          </div>
                          <div>
                            <span className="font-bold text-af-navy text-base block group-hover:text-af-blue transition-colors">
                              {tier.name}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tier.badgeColor}`}>
                              {tier.badge}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5">
                        <span className="font-mono font-extrabold text-trust-green text-base bg-trust-green-light px-2.5 py-1 rounded-lg border border-trust-green/20">
                          {tier.rate}
                        </span>
                      </td>
                      <td className="py-5 text-sm font-semibold text-pv-text">
                        {tier.frequency}
                      </td>
                      <td className="py-5 text-xs text-pv-muted">
                        {tier.features}
                      </td>
                      <td className="py-5 pr-4 text-right">
                        <button
                          onClick={() => { analytics.lenderCompareClick(tier.name); handleAction(); }}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-af-navy hover:bg-af-blue text-white text-xs font-bold transition-all shadow-xs group-hover:shadow-md"
                        >
                          <span>Get My Quote</span>
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
              {tiers.map((tier) => (
                <div key={tier.name} className="p-4 rounded-2xl bg-af-blue-soft/50 border border-af-blue-ice space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-af-navy text-white flex items-center justify-center font-bold text-sm">
                        {tier.name.substring(0, 2)}
                      </div>
                      <span className="font-bold text-af-navy text-base">{tier.name}</span>
                    </div>
                    <span className="font-mono font-extrabold text-trust-green text-sm bg-trust-green-light px-2 py-0.5 rounded-md border border-trust-green/20">
                      {tier.rate}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-af-blue-ice/60">
                    <div>
                      <span className="text-pv-muted block">Frequency</span>
                      <span className="font-bold text-af-navy text-sm">{tier.frequency}</span>
                    </div>
                    <div>
                      <span className="text-pv-muted block">Includes</span>
                      <span className="font-bold text-af-navy text-sm">{tier.features}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { analytics.lenderCompareClick(tier.name); handleAction(); }}
                    className="w-full py-2.5 rounded-full bg-af-navy text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Get My {tier.name} Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Callout in Table Frame */}
            <div className="mt-6 pt-6 border-t border-af-blue-ice flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-pv-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-trust-green flex-shrink-0" />
                <span>Rates shown are estimates. Your exact quote is calculated from your property details below.</span>
              </div>
              <button
                onClick={() => { analytics.lenderUnlockAllClick(); handleAction(); }}
                className="font-bold text-af-blue hover:text-af-navy flex items-center gap-1 underline underline-offset-4 flex-shrink-0"
              >
                <span>Build My Custom Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

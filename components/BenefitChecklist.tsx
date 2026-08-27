'use client';

import React, { useEffect, useState } from 'react';
import { Zap, Sliders, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  highlight: string;
  icon: React.ReactNode;
}

export default function BenefitChecklist() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const benefits: BenefitItem[] = [
    {
      id: 'quick-approvals',
      title: 'Quick Approvals',
      highlight: 'As fast as 24 hrs',
      description: 'Streamlined digital application with rapid decisioning so you move forward fast.',
      icon: <Zap className="w-4 h-4 text-af-blue" />,
    },
    {
      id: 'flexible-options',
      title: 'Amounts up to $100,000',
      highlight: 'Tailored limits',
      description: 'Find loans structured for loan consolidation, home remodels, or major purchases.',
      icon: <Sliders className="w-4 h-4 text-af-blue" />,
    },
    {
      id: 'competitive-rates',
      title: 'Fixed Rates from 5.99% APR',
      highlight: 'Lock in certainty',
      description: 'Predictable fixed monthly payments with zero surprise rate hikes for the full term.',
      icon: <CheckCircle2 className="w-4 h-4 text-trust-green" />,
    },
    {
      id: 'no-hidden-fees',
      title: 'No Prepayment Penalties',
      highlight: '100% transparent',
      description: 'Clear terms with zero hidden fees. Pay off your balance early at any time with no charge.',
      icon: <ShieldCheck className="w-4 h-4 text-af-red" />,
    }
  ];

  return (
    <div className="mt-1 space-y-4" id="benefit-checklist-wrapper">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-extrabold tracking-wider text-pv-muted uppercase">
            The Advantage First Difference
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-af-blue-ice to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" id="benefit-grid-2col">
          {benefits.map((benefit, idx) => (
            <div 
              key={benefit.id} 
              className="group p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 hover:border-af-blue/40 shadow-[0_2px_10px_-2px_rgba(29,49,95,0.04)] hover:shadow-[0_8px_20px_-4px_rgba(15,117,188,0.12)] transition-all duration-200 hover:-translate-y-0.5 card-hover-bar"
              id={`benefit-item-${benefit.id}`}
            >
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-af-blue-soft border border-af-blue-ice flex items-center justify-center group-hover:bg-af-blue-ice group-hover:scale-105 transition-all">
                  {benefit.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-af-navy leading-tight truncate">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="text-xs text-pv-muted mt-1 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

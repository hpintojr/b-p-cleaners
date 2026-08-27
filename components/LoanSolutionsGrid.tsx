'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Home, Building2, Repeat, PackageOpen } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface LoanSolutionsGridProps {
  onApplyClick?: () => void;
}

export default function LoanSolutionsGrid({ onApplyClick }: LoanSolutionsGridProps) {
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

  const solutions = [
    {
      id: 'residential-cleaning',
      title: 'Residential Cleaning',
      tagline: 'A Spotless Home, On Your Schedule',
      icon: <Home className="w-8 h-8" />,
      rate: '$0.20 / sqft',
      frequency: 'One-time to monthly',
      addOns: 'Fridge, oven, windows',
      badge: 'Most Popular',
      badgeColor: 'bg-af-blue-ice text-af-blue border-af-blue/20',
      description: 'Standard or deep cleans for houses, condos, and apartments — kitchens, bathrooms, living spaces, and everything in between.',
      features: [
        'Vetted, insured independent cleaners',
        'Bring their own supplies & equipment',
        'One-time visits or recurring plans'
      ]
    },
    {
      id: 'commercial-cleaning',
      title: 'Commercial Cleaning',
      tagline: 'Keep Your Business Client-Ready',
      icon: <Building2 className="w-8 h-8" />,
      rate: '$0.15 / sqft',
      frequency: 'Weekly to monthly',
      addOns: 'Windows, breakrooms',
      badge: 'For Offices & Retail',
      badgeColor: 'bg-trust-green-light text-trust-green border-trust-green/20',
      description: 'Recurring office, retail, and commercial-space cleaning scheduled around your business hours — no disruption to your team.',
      features: [
        'After-hours or early-morning scheduling',
        'Consistent cleaner assigned to your account',
        'Scales from single suites to full floors'
      ]
    },
    {
      id: 'deep-clean',
      title: 'Deep Clean',
      tagline: 'A Top-to-Bottom Reset',
      icon: <Sparkles className="w-8 h-8" />,
      rate: '+$0.10 / sqft',
      frequency: 'One-time, then switch to Standard',
      addOns: 'Baseboards, cabinets',
      badge: 'Great First Visit',
      badgeColor: 'bg-af-blue-ice text-af-navy border-af-navy/20',
      description: 'Every surface, baseboard, and inside cabinet gets attention — the ideal starting point before switching to a recurring plan.',
      features: [
        'Inside cabinets, fridge & oven available',
        'Interior window cleaning available',
        'Recommended before your first recurring visit'
      ]
    },
    {
      id: 'move-in-out',
      title: 'Move-In / Move-Out',
      tagline: 'Get Your Deposit Back',
      icon: <PackageOpen className="w-8 h-8" />,
      rate: '+$0.15 / sqft',
      frequency: 'One-time',
      addOns: 'Full empty-property detail',
      badge: 'Landlord-Ready',
      badgeColor: 'bg-af-red-light text-af-red border-af-red/20',
      description: 'A full detail clean of an empty property — every cabinet, closet, and corner — sized for move-out inspections and new-tenant turnover.',
      features: [
        'Scheduled around your move date',
        'Empty-property detail, floor to ceiling',
        'Ideal for renters and property managers'
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-mesh-hero relative overflow-hidden" id="cleaning-services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-af-blue-ice shadow-sm mb-4">
            <Repeat className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
              Our Cleaning Services
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            Simple Solutions for Every Space
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed max-w-2xl mx-auto">
            From a single deep clean to a standing weekly plan, our vetted cleaner network handles
            residential and commercial properties of every size.
          </p>
        </div>

        {/* 4 Solutions Double-Bezel Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {solutions.map((item) => (
            <div
              key={item.id}
              className="group relative p-2 rounded-3xl bg-gradient-to-b from-white to-white/70 backdrop-blur-xl border border-white shadow-[0_12px_35px_-10px_rgba(24,52,55,0.10)] hover:shadow-[0_20px_45px_-12px_rgba(185,139,61,0.18)] transition-all duration-300 hover:-translate-y-1 card-hover-bar"
              id={`solution-card-${item.id}`}
            >
              <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 p-7 sm:p-9 flex flex-col justify-between h-full">

                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-af-blue-soft/80 border border-af-blue-ice flex items-center justify-center text-af-navy group-hover:scale-105 group-hover:bg-af-blue-ice transition-all duration-300 shadow-sm">
                      {item.icon}
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
                      <span className="block text-[10px] font-bold text-pv-muted uppercase">Rate</span>
                      <span className="block text-xs sm:text-sm font-extrabold text-af-navy font-mono mt-0.5">{item.rate}</span>
                    </div>
                    <div className="border-x border-af-blue-ice/80 px-1">
                      <span className="block text-[10px] font-bold text-pv-muted uppercase">Frequency</span>
                      <span className="block text-xs sm:text-sm font-extrabold text-trust-green font-mono mt-0.5">{item.frequency}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-pv-muted uppercase">Add-Ons</span>
                      <span className="block text-xs sm:text-sm font-extrabold text-af-navy font-mono mt-0.5">{item.addOns}</span>
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
                    <span>No Upfront Fees</span>
                  </div>

                  <button
                    onClick={() => { analytics.loanCardCtaClick(item.title); handleAction(); }}
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-af-navy hover:bg-af-blue text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md active:scale-98"
                  >
                    <span>Get My Quote</span>
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
                Not sure which service tier fits your space?
              </h4>
              <p className="text-xs text-pv-muted mt-0.5">
                Start the instant quote and adjust property type, size, and add-ons until it matches your needs.
              </p>
            </div>
          </div>

          <a
            href="tel:15550101234"
            onClick={() => analytics.loanCardCtaClick('call_specialist')}
            className="flex-shrink-0 px-5 py-3 rounded-full bg-af-red hover:bg-af-red/90 text-white font-bold text-xs tracking-wide transition-colors duration-200 flex items-center gap-2 border border-af-red/20"
          >
            <span>Call (555) 010-1234</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface NavbarProps {
  onEstimatorClick?: () => void;
}

export default function Navbar({ onEstimatorClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyClick = (e: React.MouseEvent) => {
    if (onEstimatorClick) {
      e.preventDefault();
      onEstimatorClick();
    } else if (typeof window !== 'undefined' && window.location.pathname === '/') {
      const el = document.getElementById('estimator-anchor');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-af-blue-ice shadow-[0_4px_20px_-4px_rgba(24,52,55,0.08)] transition-all duration-200"
    >
      {/* Top micro-announcement bar */}
      <div className="bg-gradient-to-r from-af-navy-deep via-af-navy to-af-blue text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-trust-green/20 text-trust-green text-[10px] font-bold uppercase tracking-wider border border-trust-green/30 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-trust-green animate-pulse" />
              Now Booking
            </span>
            <span className="hidden sm:inline text-white/90">
              Residential &amp; commercial cleaning — <strong className="text-white font-semibold">get your instant quote in under 60 seconds</strong>
            </span>
            <span className="sm:hidden text-white/90 whitespace-nowrap">
              Instant online quotes — no call needed
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-white/80 font-medium">
            <div className="flex items-center gap-1.5 ml-1 sm:ml-0">
              <ShieldCheck className="w-3.5 h-3.5 text-trust-green" />
              <span className="hidden md:inline">Insured &amp; Vetted Cleaners</span>
            </div>
            {/* Desktop: phone link | Mobile: hamburger toggle */}
            <a
              href="tel:15550101234"
              onClick={() => analytics.navbarCallClick('desktop')}
              className="hidden lg:flex font-bold text-white hover:text-af-blue-light transition-colors items-center gap-1"
            >
              <Phone className="w-3 h-3 text-af-blue-cyan" />
              (555) 010-1234
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              id="mobile-topbar-menu-btn"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Scroll Progress Bar */}
      <div
        className="w-full h-[3.5px] bg-af-blue-ice/40 relative overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        id="header-scroll-progressbar"
      >
        <div
          className="h-full bg-gradient-to-r from-af-blue via-[#C9A05C] to-af-red transition-all duration-75 ease-out shadow-[0_0_8px_rgba(185,139,61,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:justify-between sm:gap-0 h-[77px] sm:h-28">

          {/* B&P Cleaners Logo */}
          <Link href="/" onClick={() => analytics.navbarLogoClick()} className="flex items-center gap-1.5 group" aria-label="B&amp;P Cleaners Homepage">
            <div className="relative h-16 w-52 sm:h-20 sm:w-80 transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/images/bp-cleaners-logo.svg"
                alt="B&P Cleaners — Benny & Penny Cleaning Services"
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-2.5" aria-label="Main Navigation">
              <Link
                href="/"
                onClick={() => analytics.navbarLinkClick('home')}
                className="px-3.5 py-2 text-[17px] lg:text-[18px] font-bold text-af-navy hover:text-af-blue rounded-xl hover:bg-af-blue-soft transition-all duration-150"
              >
                Home
              </Link>
              <Link
                href="/#cleaning-services-section"
                onClick={() => analytics.navbarLinkClick('services')}
                className="px-3.5 py-2 text-[17px] lg:text-[18px] font-bold text-af-navy hover:text-af-blue rounded-xl hover:bg-af-blue-soft transition-all duration-150"
              >
                Services
              </Link>
              <Link
                href="/#estimator-anchor"
                onClick={(e) => { analytics.navbarLinkClick('get_quote'); handleApplyClick(e); }}
                className="px-3.5 py-2 text-[17px] lg:text-[18px] font-bold text-af-navy hover:text-af-blue rounded-xl hover:bg-af-blue-soft transition-all duration-150"
              >
                Get a Quote
              </Link>
              <Link
                href="/blog"
                onClick={() => analytics.navbarLinkClick('blog')}
                className="px-3.5 py-2 text-[17px] lg:text-[18px] font-bold text-af-navy hover:text-af-blue rounded-xl hover:bg-af-blue-soft transition-all duration-150"
              >
                Blog
              </Link>
            </nav>

            <div className="h-7 w-[1px] bg-af-blue-ice" />

            {/* Phone Link */}
            <a
              href="tel:15550101234"
              onClick={() => analytics.navbarCallClick('desktop')}
              className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-af-blue border border-af-blue/80 text-white hover:bg-af-blue/90 transition-all duration-200 group whitespace-nowrap shadow-xs"
              id="nav-phone-link"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white group-hover:scale-110 transition-transform duration-200">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-base sm:text-[17px] font-extrabold font-mono tracking-tight text-white">
                (555) 010-1234
              </span>
            </a>

            {/* Get a Quote CTA */}
            {onEstimatorClick ? (
              <button
                onClick={() => { analytics.navbarApplyClick('desktop'); onEstimatorClick(); }}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-af-red to-[#B98B3D] text-white font-bold text-base tracking-wide shadow-[0_8px_20px_-4px_rgba(141,98,37,0.35)] hover:shadow-[0_12px_28px_-4px_rgba(141,98,37,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] overflow-hidden"
                id="nav-cta-btn"
              >
                <span>Get a Quote</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white/30">
                  <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
                </div>
              </button>
            ) : (
              <Link
                href="/#estimator-anchor"
                onClick={() => analytics.navbarApplyClick('desktop')}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-af-red to-[#B98B3D] text-white font-bold text-base tracking-wide shadow-[0_8px_20px_-4px_rgba(141,98,37,0.35)] hover:shadow-[0_12px_28px_-4px_rgba(141,98,37,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] overflow-hidden"
                id="nav-cta-btn"
              >
                <span>Get a Quote</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white/30">
                  <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
                </div>
              </Link>
            )}
          </div>

          {/* Mobile: Get Quote + Phone CTA */}
          <div className="flex-shrink-0 flex lg:hidden items-center gap-1.5">
            <Link
              href="/#estimator-anchor"
              onClick={(e) => { analytics.navbarApplyClick('mobile'); handleApplyClick(e); }}
              className="glow-btn flex items-center justify-center px-3 py-2.5 rounded-full bg-gradient-to-r from-af-red to-[#B98B3D] text-white font-bold text-xs tracking-wide whitespace-nowrap shadow-md active:scale-95 transition-all"
              id="mobile-prequalify-btn"
            >
              Get a Quote
            </Link>
            <a
              href="tel:15550101234"
              onClick={() => analytics.navbarCallClick('mobile')}
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-af-red text-white shadow-md active:scale-95 transition-transform"
              aria-label="Call B&amp;P Cleaners"
              id="mobile-phone-cta"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-af-blue-ice bg-white/98 backdrop-blur-2xl animate-fadeIn py-6 px-4 shadow-2xl" id="mobile-menu-drawer">
          <div className="flex flex-col gap-4">

            <nav className="flex flex-col gap-1.5">
              <Link
                href="/"
                className="px-4 py-3 text-lg font-bold text-af-navy hover:bg-af-blue-ice/60 rounded-xl transition-colors"
                onClick={() => { analytics.navbarLinkClick('home'); setIsOpen(false); }}
              >
                Home
              </Link>
              <Link
                href="/#cleaning-services-section"
                className="px-4 py-3 text-lg font-bold text-af-navy hover:bg-af-blue-ice/60 rounded-xl transition-colors"
                onClick={() => { analytics.navbarLinkClick('services'); setIsOpen(false); }}
              >
                Services
              </Link>
              <Link
                href="/#estimator-anchor"
                className="px-4 py-3 text-lg font-bold text-af-navy hover:bg-af-blue-ice/60 rounded-xl transition-colors"
                onClick={(e) => {
                  analytics.navbarLinkClick('get_quote');
                  setIsOpen(false);
                  handleApplyClick(e);
                }}
              >
                Get a Quote
              </Link>
              <Link
                href="/blog"
                className="px-4 py-3 text-lg font-bold text-af-navy hover:bg-af-blue-ice/60 rounded-xl transition-colors"
                onClick={() => { analytics.navbarLinkClick('blog'); setIsOpen(false); }}
              >
                Blog
              </Link>
            </nav>

            <div className="h-[1px] bg-af-blue-ice my-1" />

            <a
              href="tel:15550101234"
              onClick={() => analytics.navbarCallClick('mobile')}
              className="flex items-center gap-4 p-4 rounded-2xl bg-af-blue-soft border border-af-blue-ice shadow-sm"
              id="mobile-menu-phone-call"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-af-blue text-white shadow-md">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-bold text-pv-muted uppercase tracking-wider">
                  Call for a Free Quote
                </span>
                <span className="block text-xl font-bold font-mono text-pv-primary mt-0.5">
                  (555) 010-1234
                </span>
              </div>
            </a>

            <Link
              href="/#estimator-anchor"
              onClick={(e) => {
                setIsOpen(false);
                handleApplyClick(e);
              }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-af-red to-[#B98B3D] text-white font-bold text-base tracking-wide shadow-lg shadow-af-red/25 hover:shadow-xl transition-all duration-200 text-center flex items-center justify-center gap-2"
              id="mobile-menu-cta-btn"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>

            <div className="text-center text-xs text-pv-muted px-4 mt-1">
              🔒 Insured &amp; Vetted Cleaners • No Obligation Quote • Fast Booking
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

import React from 'react';
import Navbar from '../components/Navbar';
import TypewriterHeader from '../components/TypewriterHeader';
import BenefitChecklist from '../components/BenefitChecklist';
import SavingsEstimator from '../components/SavingsEstimator';
import StatsRow from '../components/StatsRow';
import LoanSolutionsGrid from '../components/LoanSolutionsGrid';
import ProcessSteps from '../components/ProcessSteps';
import LenderComparisonTable from '../components/LenderComparisonTable';
import TrustBar from '../components/TrustBar';
import BlogPreview from '../components/BlogPreview';
import TestimonialGrid from '../components/TestimonialGrid';
import TrustpilotCarousel from '../components/TrustpilotCarousel';
import HeroReviews from '../components/HeroReviews';
import HeroBadges from '../components/HeroBadges';
import FaqAccordion from '../components/FaqAccordion';
import ClosingCta from '../components/ClosingCta';
import Footer from '../components/Footer';
import ScrollDepthTracker from '../components/ScrollDepthTracker';
import { ShieldCheck, Sparkles, Repeat } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="app-wrapper">

      {/* 1. Sticky Navigation (B&P Cleaners Logo, 4-Item Nav, Phone, Gold CTA) */}
      <Navbar />

      {/* 2. S-Tier Split Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-14 sm:pb-16 lg:pt-18 lg:pb-20 bg-mesh-hero" id="hero-split-section">
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">

            <div className="lg:col-span-7 flex flex-col gap-6 text-left h-full self-stretch" id="hero-left-content">

              <HeroBadges />

              {/* Tier 3: Main hero content — headline, subtitle, checklist, trust signals */}
              <div className="order-1 lg:order-1 flex flex-col gap-3 mt-2">
              {/* Headline with Typewriter Rotating Phrases */}
              <TypewriterHeader />

              {/* Hero Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-pv-muted max-w-[50ch] leading-relaxed" id="hero-subtext">
                Vetted, experienced cleaners for residential and commercial properties — with an <strong className="text-af-navy font-bold">instant online quote</strong>, flexible one-time or recurring plans, and no upfront fees.
              </p>

              {/* Benefit Checklist with Double-Bezel Cards */}
              <BenefitChecklist />

              </div>{/* end Tier 3 wrapper */}

              {/* Quick Trust Signals Bar — below badges on desktop */}
              <div className="order-2 lg:order-5 pt-4 flex flex-wrap items-center justify-center gap-6 text-[14px] sm:text-xs font-semibold text-pv-muted border-t border-af-blue-ice/60">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-trust-green" />
                  <span>No Upfront Fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-af-blue" />
                  <span>Insured &amp; Vetted Cleaners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Repeat className="w-4 h-4 text-af-red" />
                  <span>One-Time or Recurring Plans</span>
                </div>
              </div>

              {/* ── Customer Review Cards ── */}
              <HeroReviews />

            </div>

            {/* Right Column: Instant Cleaning Quote Estimator */}
            <div className="lg:col-span-5" id="estimator-anchor">
              <div className="w-full transform transition-all duration-300 hover:shadow-2xl" id="estimator-card-container">
                <SavingsEstimator />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. 4-Column Bento Stat Metrics */}
      <StatsRow />

      {/* 4. Service Tier Comparison */}
      <LenderComparisonTable />

      {/* 5. How It Works (3-Step Interactive Stepper) */}
      <ProcessSteps />

      {/* 6. Core Cleaning Services (Residential, Commercial, Deep Clean, Move-In/Out) */}
      <LoanSolutionsGrid />

      {/* 7. Customer Rating & Trust Bar */}
      <TrustBar />

      {/* 8. Verified Customer Testimonials Wall */}
      <TestimonialGrid />


      {/* 9. Blog & Cleaning Resources Hub */}
      <BlogPreview />

      {/* 10. Frequently Asked Questions Accordion */}
      <FaqAccordion />

      {/* 11. High-Impact Closing CTA Band */}
      <ClosingCta />

      {/* 12. Site Footer */}
      <Footer />

      {/* Analytics: Scroll Depth Tracking */}
      <ScrollDepthTracker />

    </div>
  );
}

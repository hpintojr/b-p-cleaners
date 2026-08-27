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
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="app-wrapper">
      
      {/* 1. Sticky Navigation (Official Logo, 4-Item Nav, 1-Line Phone, Red CTA) */}
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
                The money you need, when you need it — with competitive rates as low as <strong className="text-af-navy font-bold">5.99% APR</strong>, terms up to 72 months, and a trusted team that puts you first.
              </p>

              {/* Benefit Checklist with Double-Bezel Cards */}
              <BenefitChecklist />

              </div>{/* end Tier 3 wrapper */}

              {/* Quick Trust Signals Bar — below TP badge on desktop */}
              <div className="order-2 lg:order-5 pt-4 flex flex-wrap items-center justify-center gap-6 text-[14px] sm:text-xs font-semibold text-pv-muted border-t border-af-blue-ice/60">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-trust-green" />
                  <span>No Upfront Fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-af-blue" />
                  <span>Soft Credit Check Only</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-af-red" />
                  <span>Texas OCCC &amp; Utah DFI Licensed</span>
                </div>
              </div>

              {/* ── 4 Random Trustpilot Review Cards (from scraped pool) ── */}
              <HeroReviews />

            </div>

            {/* Right Column: Free Savings & Loan Estimator */}
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

      {/* 4. Multi-Lender Comparison Network (SoFi, Prosper, Upgrade, Best Egg) */}
      <LenderComparisonTable />

      {/* 5. How It Works (3-Step Interactive Stepper) */}
      <ProcessSteps />

      {/* 6. Core Loan Solutions (Personal, Loan Consolidation, Home Improvement, Business) */}
      <LoanSolutionsGrid />

      {/* 7. Trustpilot Live Rating & State Licensing Bar */}
      <TrustBar />

      {/* 8. Verified Borrower Testimonials Wall */}
      <TestimonialGrid />


      {/* 9. Blog & Financial Resources Hub */}
      <BlogPreview />

      {/* 10. Frequently Asked Questions Accordion */}
      <FaqAccordion />

      {/* 11. High-Impact Closing CTA Band */}
      <ClosingCta />

      {/* 12. Regulatory Disclosures & Financial Footer */}
      <Footer />

      {/* Analytics: Scroll Depth Tracking */}
      <ScrollDepthTracker />

    </div>
  );
}

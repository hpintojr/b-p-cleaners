'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-af-navy-deep text-white border-t border-white/10 pt-20 pb-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">

          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="w-full max-w-[430px] sm:max-w-[480px] h-36 rounded-[2rem] bg-white flex items-center justify-center p-3.5 sm:p-4 shadow-2xl">
              <div className="relative w-full h-full">
                <Image
                  src="/images/bp-cleaners-logo.svg"
                  alt="B&P Cleaners — Benny & Penny Cleaning Services"
                  fill
                  className="object-contain object-center"
                  priority
                  sizes="(max-width: 640px) 430px, 480px"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm">
              Benny &amp; Penny Cleaning Services provides residential and commercial cleaning through
              a network of fully vetted, experienced independent cleaners — with instant online
              quotes and flexible one-time or recurring maintenance plans.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold text-trust-green bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl"
                id="footer-insured-badge"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Insured &amp; Vetted Cleaners</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold text-af-red uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-medium">
              <li>
                <Link href="/" onClick={() => analytics.footerLinkClick('home')} className="hover:text-white hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#cleaning-services-section" onClick={() => analytics.footerLinkClick('services')} className="hover:text-white hover:underline transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works-section" onClick={() => analytics.footerLinkClick('how_it_works')} className="hover:text-white hover:underline transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#estimator-anchor" onClick={() => analytics.footerLinkClick('get_quote')} className="hover:text-white hover:underline transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={() => analytics.footerLinkClick('blog')} className="hover:text-white hover:underline transition-colors">
                  Blog &amp; Resources
                </Link>
              </li>
              <li>
                <Link href="/#faq-section" onClick={() => analytics.footerLinkClick('faq')} className="hover:text-white hover:underline transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Cleaning Services Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-af-red uppercase tracking-wider">
              Cleaning Services
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-medium">
              <li>
                <Link href="/#cleaning-services-section" onClick={() => analytics.footerLinkClick('residential_cleaning')} className="hover:text-white hover:underline transition-colors block">
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link href="/#cleaning-services-section" onClick={() => analytics.footerLinkClick('commercial_cleaning')} className="hover:text-white hover:underline transition-colors block">
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link href="/#cleaning-services-section" onClick={() => analytics.footerLinkClick('deep_cleaning')} className="hover:text-white hover:underline transition-colors block">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link href="/#cleaning-services-section" onClick={() => analytics.footerLinkClick('move_in_out')} className="hover:text-white hover:underline transition-colors block">
                  Move-In / Move-Out Cleaning
                </Link>
              </li>
              <li>
                <Link href="/#cleaning-services-section" onClick={() => analytics.footerLinkClick('recurring_maintenance')} className="hover:text-white hover:underline transition-colors block">
                  Recurring Maintenance Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-af-red uppercase tracking-wider">
              Contact &amp; Support
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-white/80 font-medium">
              <li>
                <a href="tel:15550101234" onClick={() => analytics.footerCallClick()} className="hover:text-white font-mono font-bold text-base text-white flex items-center gap-2.5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-af-red flex items-center justify-center text-white flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  (555) 010-1234
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <Mail className="w-4 h-4 text-af-blue-light" />
                </div>
                <a href="mailto:hello@bpcleaners.com" onClick={() => analytics.footerEmailClick()} className="hover:text-white transition-colors">
                  hello@bpcleaners.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-af-blue-light" />
                </div>
                <span className="leading-relaxed">
                  Serving residential &amp; commercial<br />
                  properties across the metro area
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Service Disclosures */}
        <div className="py-10 text-[11px] text-white/55 leading-relaxed space-y-4 border-b border-white/10" id="compliance-disclaimers">
          <p>
            Benny &amp; Penny Cleaning Services, LLC connects customers with independent, insured
            cleaning contractors for residential and commercial cleaning. Cleanings are performed by
            vetted 1099 independent contractors, not employees of Benny &amp; Penny Cleaning Services.
          </p>
          <p>
            Instant quotes shown on this site are estimates based on property type, square footage,
            room count, service frequency, and selected add-ons. Final pricing is confirmed prior to
            your scheduled appointment and may be adjusted after an in-person walkthrough for unusual
            conditions.
          </p>
          <p id="licensing">
            For questions, contact Benny &amp; Penny Cleaning Services. <br />
            <span className="text-white/70">hello@bpcleaners.com | (555) 010-1234</span>
          </p>
        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50" id="footer-copyright-row">
          <span>
            &copy; {currentYear} Benny &amp; Penny Cleaning Services, LLC. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" onClick={() => analytics.footerLinkClick('privacy_policy')} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" onClick={() => analytics.footerLinkClick('terms_of_use')} className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/sms-terms" onClick={() => analytics.footerLinkClick('sms_terms')} className="hover:text-white transition-colors">
              SMS Terms &amp; Conditions
            </Link>
            <Link href="/licenses" onClick={() => analytics.footerLinkClick('licenses_disclosures')} className="hover:text-white text-af-blue-light font-bold transition-colors">
              Licenses &amp; Disclosures
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

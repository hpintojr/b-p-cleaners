'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-af-navy-deep text-white border-t border-white/10 pt-20 pb-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column with 1.5x Larger Filled Official Logo */}
          <div className="md:col-span-4 space-y-6">
            <div className="w-full max-w-[430px] sm:max-w-[480px] h-36 rounded-[2rem] bg-white flex items-center justify-center p-3.5 sm:p-4 shadow-2xl">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/DT_Logo_tight.png" 
                  alt="Advantage First Financial" 
                  fill 
                  className="object-contain object-center" 
                  priority
                  sizes="(max-width: 640px) 430px, 480px"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm">
              Advantage First Financial, LLC provides direct loan solutions and connections with trusted lending partners for personal loans, loan consolidation, home improvements, and business growth — with competitive fixed rates and terms up to 72 months.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link 
                href="/licenses"
                onClick={() => analytics.footerLinkClick('nmls_badge')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-trust-green bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl transition-colors"
                id="footer-nmls-badge"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>NMLS ID #2674295 · Direct Lender</span>
              </Link>
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
                <Link href="/#loan-solutions-section" onClick={() => analytics.footerLinkClick('services')} className="hover:text-white hover:underline transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#program-process-steps-section" onClick={() => analytics.footerLinkClick('how_it_works')} className="hover:text-white hover:underline transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#lender-comparison-section" onClick={() => analytics.footerLinkClick('lender_network')} className="hover:text-white hover:underline transition-colors">
                  Lender Network
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={() => analytics.footerLinkClick('blog')} className="hover:text-white hover:underline transition-colors">
                  Blog &amp; Resources
                </Link>
              </li>
              <li>
                <Link href="/#faq-objection-section" onClick={() => analytics.footerLinkClick('faq')} className="hover:text-white hover:underline transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/licenses" onClick={() => analytics.footerLinkClick('licensing_nmls')} className="hover:text-white hover:underline transition-colors text-af-blue-light font-bold">
                  Licensing &amp; NMLS
                </Link>
              </li>
            </ul>
          </div>

          {/* Lending Solutions Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-af-red uppercase tracking-wider">
              Loan Solutions
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-medium">
              <li>
                <Link href="/#loan-solutions-section" onClick={() => analytics.footerLinkClick('personal_loans')} className="hover:text-white hover:underline transition-colors block">
                  Personal Loans
                </Link>
              </li>
              <li>
                <Link href="/#loan-solutions-section" onClick={() => analytics.footerLinkClick('loan_consolidation')} className="hover:text-white hover:underline transition-colors block">
                  Loan Consolidation
                </Link>
              </li>
              <li>
                <Link href="/#loan-solutions-section" onClick={() => analytics.footerLinkClick('home_improvement_loans')} className="hover:text-white hover:underline transition-colors block">
                  Home Improvement Loans
                </Link>
              </li>
              <li>
                <Link href="/#loan-solutions-section" onClick={() => analytics.footerLinkClick('business_purpose_loans')} className="hover:text-white hover:underline transition-colors block">
                  Business Purpose Loans
                </Link>
              </li>
              <li>
                <Link href="/#lender-comparison-section" onClick={() => analytics.footerLinkClick('multi_lender_network')} className="hover:text-white hover:underline transition-colors block">
                  Multi-Lender Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Licensing Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-af-red uppercase tracking-wider">
              Contact &amp; Support
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-white/80 font-medium">
              <li>
                <a href="tel:18003441202" onClick={() => analytics.footerCallClick()} className="hover:text-white font-mono font-bold text-base text-white flex items-center gap-2.5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-af-red flex items-center justify-center text-white flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  (800) 344-1202
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <Mail className="w-4 h-4 text-af-blue-light" />
                </div>
                <a href="mailto:info@advantagefirst.com" onClick={() => analytics.footerEmailClick()} className="hover:text-white transition-colors">
                  info@advantagefirst.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-af-blue-light" />
                </div>
                <span className="leading-relaxed">
                  3187 Red Hill Ave Suite 230<br />
                  Costa Mesa, CA 92626
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Financial Disclosures & Licensing Statements */}
        <div className="py-10 text-[11px] text-white/55 leading-relaxed space-y-4 border-b border-white/10" id="compliance-disclaimers">
          <p>
            Advantage First Financial, LLC is a licensed direct lender regulated by the Texas Office of Consumer Credit Commissioner (OCCC Regulated Lender License #173702) and the Utah Department of Financial Institutions (NMLS ID #2674295). We offer personal loan products and lending solutions through our direct origination and trusted partner network.
          </p>
          <p>
            Personal loan offers presented to customers feature rate quotes from Advantage First Financial, LLC with Annual Percentage Rates (APR) not exceeding 35.99% and loan terms ranging from 12 months to 72 months.
          </p>
          <p>
            <strong className="text-white/80">Representative Example:</strong> For a personal loan of $10,000 with a 36-month term at 10% APR, the monthly payment would be approximately $322.67, and the total amount paid over the life of the loan would be $11,616.12. This example includes interest and assumes no additional fees.
          </p>
          <p>
            Actual rates, terms, and loan amounts depend on factors such as credit score, credit history, loan amount, loan term, and state of residence, and will be determined in agreement between the borrower and lender.
          </p>
          <p id="licensing">
            For questions, contact Advantage First Financial, LLC. <br />
            <span className="text-white/70">info@advantagefirst.com | (800) 344-1202 | 3187 Red Hill Ave Suite 230, Costa Mesa, CA 92626</span>
          </p>
        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50" id="footer-copyright-row">
          <span>
            &copy; {currentYear} Advantage First Financial, LLC. All rights reserved. · NMLS ID #2674295
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

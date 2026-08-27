'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Award, Building2, MapPin, Phone, Mail, CheckCircle2, AlertCircle, FileCheck, Scale, ArrowLeft } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function LicensesPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="licenses-page-wrapper">
      <Navbar />

      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link 
              href="/" 
              onClick={() => analytics.navbarLinkClick('licenses_back_home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-af-blue hover:text-af-navy transition-colors bg-white px-3.5 py-1.5 rounded-full border border-af-blue-ice shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-trust-green-light border border-trust-green/20 mb-4 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-trust-green" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-trust-green">
                Insured &amp; Vetted Cleaners
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
              Business Information &amp; Disclosures
            </h1>
            
            <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed">
              Benny &amp; Penny Cleaning Services, LLC connects customers with independent, insured cleaning contractors for residential and commercial cleaning. Here&apos;s how we operate and what you can expect.
            </p>
          </div>

          {/* Entity Summary Bento Grid */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-af-blue-ice shadow-sm mb-12" id="entity-overview-card">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-af-blue-ice/60 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-af-blue/10 flex items-center justify-center text-af-blue">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-af-navy">
                    Benny &amp; Penny Cleaning Services, LLC
                  </h2>
                  <span className="text-xs font-bold text-pv-muted">
                    Residential &amp; Commercial Cleaning Services
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-trust-green-light text-trust-green text-xs font-extrabold border border-trust-green/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Insured &amp; Bonded
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Corporate Structure
                </span>
                <span className="font-bold text-af-navy block">
                  Limited Liability Company (LLC)
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Principal Office
                </span>
                <span className="font-bold text-af-navy block">
                  231 E Alessandro Blvd. Suite A-208
                </span>
                <span className="text-pv-muted text-xs block">
                  Riverside, CA 92508
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Contact &amp; Communications
                </span>
                <span className="font-bold text-af-navy block">
                  (909) 276-7631
                </span>
                <span className="text-pv-muted text-xs block">
                  hello@bpcleaners.com
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Workforce Model
                </span>
                <span className="font-bold text-af-navy block">
                  Vetted 1099 Independent Contractors
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Service Areas
                </span>
                <span className="font-bold text-af-navy block">
                  Residential &amp; Commercial Properties
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Other Trade Names / DBAs
                </span>
                <span className="font-bold text-af-navy block">
                  None
                </span>
              </div>
            </div>
          </div>

          {/* Insurance & Bonding Section */}
          <div className="space-y-8 mb-14" id="insurance-bonding">
            <div>
              <h2 className="text-2xl font-extrabold text-af-navy tracking-tight">
                Insurance &amp; Vetting
              </h2>
              <p className="text-xs sm:text-sm text-pv-muted mt-1">
                What we require before a cleaner is dispatched to your property.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white border border-af-blue-ice shadow-sm p-6 space-y-2">
                <ShieldCheck className="w-6 h-6 text-trust-green" />
                <h3 className="font-extrabold text-af-navy text-sm">Insured &amp; Bonded</h3>
                <p className="text-xs text-pv-muted leading-relaxed">
                  Cleaning contractors dispatched through B&amp;P Cleaners carry insurance coverage appropriate to residential and commercial cleaning work.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-af-blue-ice shadow-sm p-6 space-y-2">
                <CheckCircle2 className="w-6 h-6 text-trust-green" />
                <h3 className="font-extrabold text-af-navy text-sm">Background-Checked</h3>
                <p className="text-xs text-pv-muted leading-relaxed">
                  Every independent contractor in our network completes a background screening before joining the platform.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-af-blue-ice shadow-sm p-6 space-y-2">
                <FileCheck className="w-6 h-6 text-trust-green" />
                <h3 className="font-extrabold text-af-navy text-sm">Certificate on Request</h3>
                <p className="text-xs text-pv-muted leading-relaxed">
                  Commercial customers may request a certificate of insurance ahead of their scheduled service by contacting our team.
                </p>
              </div>
            </div>
          </div>

          {/* Disclosures Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-af-blue-ice space-y-6 text-xs text-pv-muted leading-relaxed mb-12" id="statutory-notices">
            <h3 className="text-sm font-extrabold text-af-navy uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-af-blue" />
              <span>Customer Disclosures</span>
            </h3>

            <div className="space-y-4">
              <div>
                <strong className="text-af-navy block mb-1">Independent Contractor Notice:</strong>
                <p>
                  Benny &amp; Penny Cleaning Services, LLC connects customers with independent, insured cleaning contractors. Cleanings are performed by vetted 1099 independent contractors, not employees of Benny &amp; Penny Cleaning Services, LLC.
                </p>
              </div>

              <div>
                <strong className="text-af-navy block mb-1">Pricing &amp; Estimates Notice:</strong>
                <p>
                  Instant quotes shown on this site are estimates based on property type, square footage, room count, service frequency, and selected add-ons. Final pricing is confirmed prior to your scheduled appointment and may be adjusted after an in-person walkthrough for unusual conditions.
                </p>
              </div>

              <div>
                <strong className="text-af-navy block mb-1">State &amp; Local Licensing:</strong>
                <p>
                  Business license and permit details applicable to Benny &amp; Penny Cleaning Services, LLC in its operating jurisdictions are available upon request. Contact us using the information below.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action Card */}
          <div className="p-8 rounded-3xl bg-mesh-dark text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-af-blue-light">
                Have a Question?
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Contact the B&amp;P Cleaners Team
              </h3>
              <p className="text-xs sm:text-sm text-white/70">
                Email <a href="mailto:hello@bpcleaners.com" className="text-af-blue-light underline font-mono">hello@bpcleaners.com</a> or call <a href="tel:19092767631" className="text-af-blue-light underline font-mono">(909) 276-7631</a>
              </p>
            </div>
            <Link
              href="/"
              onClick={() => analytics.closingCtaApplyClick()}
              className="px-6 py-3 rounded-full bg-white text-af-navy hover:bg-af-blue-ice font-bold text-xs sm:text-sm transition-all shadow-md flex-shrink-0"
            >
              Get My Quote
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

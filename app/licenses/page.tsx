'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Award, Building2, MapPin, Phone, Mail, CheckCircle2, AlertCircle, FileCheck, Scale, ArrowLeft } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function LicensesPage() {
  const licenses = [
    {
      state: 'Texas',
      regulator: 'Texas - Office of Consumer Credit Commissioner (OCCC)',
      licenseName: 'Regulated Lender Company License',
      licenseNumber: '173702',
      authorized: true,
      originalIssueDate: '01/06/2026',
      status: 'Approved',
      statusDate: '01/06/2026',
      renewedThrough: '2026',
      otherTradeNames: 'None',
      agencyAddress: '2601 N Lamar Blvd, Austin, TX 78705',
      complaintUrl: 'https://occc.texas.gov/consumers',
      notes: 'Advantage First Financial LLC is licensed and examined under the Texas Finance Code. Regulated lenders are subject to strict statutory rate caps and disclosure requirements.',
    },
    {
      state: 'Utah',
      regulator: 'Utah Department of Financial Institutions (Utah-DFI)',
      licenseName: 'Consumer Credit Notification',
      licenseNumber: 'Notification on File',
      authorized: true,
      originalIssueDate: '01/01/2024',
      status: 'Approved',
      statusDate: '12/17/2024',
      renewedThrough: '2026',
      otherTradeNames: 'None',
      agencyAddress: '324 S State St, Suite 201, Salt Lake City, UT 84111',
      complaintUrl: 'https://dfi.utah.gov/',
      notes: 'Authorized under the Utah Consumer Credit Code. Operates in full compliance with Utah DFI statutory regulations governing consumer credit transactions.',
    },
  ];

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
                NMLS Consumer Access Verified
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
              State Licensing &amp; Regulatory Disclosures
            </h1>
            
            <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed">
              Advantage First Financial, LLC maintains direct lending licenses and regulatory approvals in accordance with federal and state consumer credit laws. Verify our official credentials on the Nationwide Multistate Licensing System (NMLS).
            </p>

            {/* Official NMLS Verification Link Callout */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/2674295"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trustbarNmlsClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-af-navy hover:bg-af-blue text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md active:scale-98"
                id="nmls-verification-btn"
              >
                <span>Verify NMLS ID #2674295 on NMLS Consumer Access</span>
                <ExternalLink className="w-3.5 h-3.5 text-af-blue-light" />
              </a>
            </div>
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
                    Advantage First Financial LLC
                  </h2>
                  <span className="text-xs font-bold text-pv-muted">
                    Nationwide Multistate Licensing System (NMLS) Unique Identifier: <strong className="text-af-blue font-mono">2674295</strong>
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-trust-green-light text-trust-green text-xs font-extrabold border border-trust-green/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Authorized / Good Standing
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
                <span className="text-pv-muted text-xs block">
                  Formed in Wyoming, USA · Formed 12/16/2021
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Principal Executive Office
                </span>
                <span className="font-bold text-af-navy block">
                  3187 Red Hill Ave Suite 230
                </span>
                <span className="text-pv-muted text-xs block">
                  Costa Mesa, CA 92626
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Contact &amp; Communications
                </span>
                <span className="font-bold text-af-navy block">
                  (714) 351-7616 · Toll-Free: (800) 344-1202
                </span>
                <span className="text-pv-muted text-xs block">
                  info@advantagefirst.com
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Other Trade Names / DBAs
                </span>
                <span className="font-bold text-af-navy block">
                  None (Operates exclusively as Advantage First Financial LLC)
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  NMLS Regulatory Actions
                </span>
                <span className="font-bold text-trust-green block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Regulatory history available on NMLS Consumer Access
                </span>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-af-blue-soft/40 border border-af-blue-ice/40">
                <span className="text-pv-muted font-semibold block text-[11px] uppercase tracking-wider">
                  Fiscal Year End
                </span>
                <span className="font-bold text-af-navy block">
                  December 31
                </span>
              </div>
            </div>
          </div>

          {/* Active State Licenses Section */}
          <div className="space-y-8 mb-14" id="state-licenses-breakdown">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-af-navy tracking-tight">
                  State Licenses &amp; Registrations
                </h2>
                <p className="text-xs sm:text-sm text-pv-muted mt-1">
                  Displaying 2 Active of 2 Total State Authorizations registered in NMLS
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-af-blue bg-af-blue-ice px-3 py-1.5 rounded-full border border-af-blue/20">
                2 / 2 Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {licenses.map((lic) => (
                <div 
                  key={lic.state}
                  className="rounded-3xl bg-white border border-af-blue-ice shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="space-y-5">
                    {/* State Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-af-navy text-white flex items-center justify-center font-bold text-base shadow-xs">
                          {lic.state.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-xl font-extrabold text-af-navy">
                            {lic.state}
                          </h3>
                          <span className="text-xs font-semibold text-af-blue">
                            {lic.licenseName}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-trust-green-light text-trust-green text-xs font-bold border border-trust-green/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {lic.status}
                      </span>
                    </div>

                    {/* License Metadata Table */}
                    <div className="space-y-2.5 text-xs pt-4 border-t border-af-blue-ice/60">
                      <div className="flex justify-between py-1 border-b border-af-blue-ice/30">
                        <span className="text-pv-muted font-medium">License / Registration #:</span>
                        <span className="font-mono font-bold text-af-navy">{lic.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-af-blue-ice/30">
                        <span className="text-pv-muted font-medium">Regulating Agency:</span>
                        <span className="font-semibold text-af-navy text-right max-w-[220px]">{lic.regulator}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-af-blue-ice/30">
                        <span className="text-pv-muted font-medium">Authorized to Conduct Business:</span>
                        <span className="font-bold text-trust-green">Yes</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-af-blue-ice/30">
                        <span className="text-pv-muted font-medium">Original Issue Date:</span>
                        <span className="font-mono font-bold text-af-navy">{lic.originalIssueDate}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-af-blue-ice/30">
                        <span className="text-pv-muted font-medium">Status Date:</span>
                        <span className="font-mono font-bold text-af-navy">{lic.statusDate}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-pv-muted font-medium">Renewed Through:</span>
                        <span className="font-mono font-bold text-af-navy">{lic.renewedThrough}</span>
                      </div>
                    </div>

                    {/* Statutory Note */}
                    <div className="p-3.5 rounded-xl bg-af-blue-soft/50 border border-af-blue-ice/50 text-[11px] text-pv-muted leading-relaxed">
                      {lic.notes}
                    </div>
                  </div>

                  {/* Regulator Link */}
                  <div className="mt-6 pt-4 border-t border-af-blue-ice/60 flex items-center justify-between text-xs font-bold text-af-blue">
                    <span>Regulatory Agency</span>
                    <a 
                      href={lic.complaintUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => analytics.footerLinkClick(`regulator_${lic.state}`)}
                      className="inline-flex items-center gap-1 hover:text-af-navy underline underline-offset-2"
                    >
                      <span>Visit Agency Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory State Disclosures Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-af-blue-ice space-y-6 text-xs text-pv-muted leading-relaxed mb-12" id="statutory-notices">
            <h3 className="text-sm font-extrabold text-af-navy uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-af-blue" />
              <span>Required Consumer &amp; Regulatory Disclosures</span>
            </h3>

            <div className="space-y-4">
              <div>
                <strong className="text-af-navy block mb-1">Texas Consumer Notice (Office of Consumer Credit Commissioner):</strong>
                <p>
                  Advantage First Financial LLC is licensed under the laws of the State of Texas and by state law is subject to regulatory oversight by the Office of Consumer Credit Commissioner (OCCC). Any consumer wishing to file a complaint against Advantage First Financial LLC should contact the OCCC Consumer Helpline at (800) 538-1579, visit <a href="https://occc.texas.gov" target="_blank" rel="noopener noreferrer" className="text-af-blue underline">occc.texas.gov</a>, or write to 2601 N. Lamar Blvd., Austin, TX 78705.
                </p>
              </div>

              <div>
                <strong className="text-af-navy block mb-1">Utah Department of Financial Institutions Notice:</strong>
                <p>
                  Advantage First Financial LLC has filed the required Consumer Credit Notification with the Utah Department of Financial Institutions pursuant to the Utah Consumer Credit Code.
                </p>
              </div>

              <div>
                <strong className="text-af-navy block mb-1">Equal Credit Opportunity Act (ECOA) Notice:</strong>
                <p>
                  The Federal Equal Credit Opportunity Act prohibits creditors from discriminating against credit applicants on the basis of race, color, religion, national origin, sex, marital status, age (provided the applicant has the capacity to enter into a binding contract); because all or part of the applicant’s income derives from any public assistance program; or because the applicant has in good faith exercised any right under the Consumer Credit Protection Act.
                </p>
                <p className="mt-2">
                  The federal agency that administers compliance with this law concerning this creditor is the Federal Trade Commission, Equal Credit Opportunity, Washington, DC 20580.
                </p>
              </div>

              <div>
                <strong className="text-af-navy block mb-1">Annual Percentage Rate (APR) &amp; Loan Term Details:</strong>
                <p>
                  Personal loan offers presented to consumers feature rate quotes from Advantage First Financial, LLC with Annual Percentage Rates (APR) ranging from 5.99% to 35.99% and loan terms ranging from 12 months to 72 months. Representative Example: For a personal loan of $10,000 with a 36-month term at 10.00% APR, the monthly payment would be approximately $322.67, and the total amount paid over the life of the loan would be $11,616.12. This example includes interest and assumes no additional fees.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action Card */}
          <div className="p-8 rounded-3xl bg-mesh-dark text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-af-blue-light">
                Have a Compliance or Licensing Question?
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Contact the Advantage First Compliance Department
              </h3>
              <p className="text-xs sm:text-sm text-white/70">
                Email <a href="mailto:info@advantagefirst.com" className="text-af-blue-light underline font-mono">info@advantagefirst.com</a> or call <a href="tel:18003441202" className="text-af-blue-light underline font-mono">(800) 344-1202</a>
              </p>
            </div>
            <Link
              href="/"
              onClick={() => analytics.closingCtaApplyClick()}
              className="px-6 py-3 rounded-full bg-white text-af-navy hover:bg-af-blue-ice font-bold text-xs sm:text-sm transition-all shadow-md flex-shrink-0"
            >
              Explore Loan Options
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

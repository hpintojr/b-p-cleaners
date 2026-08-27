import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Scale, ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions of Use | Advantage First Financial',
  description: 'Official Terms and Conditions for Advantage First Financial LLC, governing website use, loan inquiries, and financial services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="terms-page-wrapper">
      <Navbar />

      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-bold text-af-blue hover:text-af-navy transition-colors bg-white px-3.5 py-1.5 rounded-full border border-af-blue-ice shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-trust-green-light border border-trust-green/20 mb-4 shadow-2xs">
              <Scale className="w-3.5 h-3.5 text-trust-green" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-trust-green">
                Legal &amp; Regulatory Agreement
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
              Terms and Conditions
            </h1>
            
            <p className="text-xs sm:text-sm text-pv-muted mt-3 font-semibold">
              Advantage First Financial, LLC · Effective Date: April 2026
            </p>
          </div>

          {/* Terms Document Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-af-blue-ice shadow-sm space-y-10 text-sm text-pv-muted leading-relaxed" id="terms-content">
            
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website operated by Advantage First Financial, LLC (“Advantage First,” “we,” “us,” or “our”), located at advantagefirst.com (the “Site”), you agree to be bound by these Terms and Conditions (“Terms”). If you do not agree to all of these Terms, do not use this Site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">2. Eligibility</h2>
              <p>
                You must be at least 18 years of age and a legal resident of the United States to use this Site or apply for any financial product or service offered through Advantage First. By using this Site, you represent and warrant that you meet these eligibility requirements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">3. Services Offered &amp; Direct Lending Authority</h2>
              <p>
                Advantage First Financial, LLC is a <strong>licensed direct lender regulated by the Texas Office of Consumer Credit Commissioner (OCCC Regulated Lender License #173702) and the Utah Department of Financial Institutions (NMLS ID #2674295)</strong>. We offer personal loan products and loan consolidation solutions through our direct origination and trusted partner network.
              </p>
              <p>
                Personal loan offers presented to customers feature rate quotes from Advantage First Financial, LLC with Annual Percentage Rates (APR) not exceeding 35.99% and loan terms ranging from 12 months to 72 months. Actual rates, terms, and loan amounts depend on factors such as credit score, credit history, loan amount, loan term, and state of residence.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">4. No Guarantee of Approval</h2>
              <p>
                Submitting an application through this Site does not guarantee approval for any loan or financial product. All applications are subject to credit review, underwriting criteria, and verification of information provided. Advantage First reserves the right to decline any application at its sole discretion in accordance with fair lending laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">5. Accuracy of Information</h2>
              <p>
                You agree to provide accurate, current, and complete information when submitting any application or form through this Site. Providing false, misleading, or fraudulent information may result in denial of your application and potential civil or criminal liability.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">6. Credit Authorization (FCRA)</h2>
              <p>
                By submitting an application, you provide written instructions to Advantage First under the Fair Credit Reporting Act (FCRA) authorizing Advantage First to obtain information from your personal credit report from Experian, TransUnion, and/or Equifax for the purposes of evaluating your loan application, loan consolidation eligibility, and fraud prevention.
              </p>
            </section>

            <section className="space-y-3" id="sms-terms">
              <h2 className="text-xl font-extrabold text-af-navy">7. SMS / Text Messaging Terms</h2>
              <p>
                <strong className="text-af-navy">Program Description:</strong> By opting in to receive SMS messages from Advantage First Financial, LLC, you consent to receive text messages regarding your loan inquiry, application status updates, promotional offers, and related informational communications at the mobile number you provided. Messages may be sent using an autodialer or conversational messaging technology.
              </p>
              <p>
                <strong className="text-af-navy">Message Frequency:</strong> You may receive up to 10 messages per month. Message and data rates may apply depending on your mobile carrier and plan.
              </p>
              <p>
                <strong className="text-af-navy">Opt-Out:</strong> You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any message. After opting out, you will receive a one-time confirmation message and no further SMS communications will be sent. For assistance, reply <strong>HELP</strong> or contact us at <a href="mailto:info@advantagefirst.com" className="text-af-blue underline">info@advantagefirst.com</a> or <a href="tel:8003441202" className="text-af-blue underline">(800) 344-1202</a>.
              </p>
              <p>
                <strong className="text-af-navy">Consent:</strong> Consent to receive SMS messages is not a condition of purchase, applying for a loan, or receiving any financial service from Advantage First Financial, LLC.
              </p>
              <p>
                <strong className="text-af-navy">Supported Carriers:</strong> Compatible with most major US carriers including AT&amp;T, Verizon, T-Mobile, Sprint, U.S. Cellular, Boost Mobile, MetroPCS, Cricket, Virgin Mobile, and others. Carriers are not liable for delayed or undelivered messages.
              </p>
              <p>
                <strong className="text-af-navy">No Data Sharing:</strong> We do not sell, rent, or share your phone number or opt-in status with third parties for their marketing purposes. Your information is used solely to facilitate your loan inquiry and related Advantage First Financial communications.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">8. Governing Law &amp; Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be resolved exclusively in the state or federal courts located in Orange County, California.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">9. Contact Information</h2>
              <div className="p-4 rounded-xl bg-white border border-af-blue-ice space-y-1 text-xs">
                <p className="font-bold text-af-navy">Advantage First Financial, LLC</p>
                <p>3187 Red Hill Ave Suite 230, Costa Mesa, CA 92626</p>
                <p>Email: <a href="mailto:info@advantagefirst.com" className="text-af-blue underline">info@advantagefirst.com</a></p>
                <p>Phone: (714) 351-7616 · Toll-Free: (800) 344-1202</p>
                <p>NMLS Unique Identifier: #2674295</p>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

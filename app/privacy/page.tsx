import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Advantage First Financial',
  description: 'Advantage First Financial LLC privacy policy, financial data confidentiality, California CCPA rights, and SMS disclosure notice.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="privacy-page-wrapper">
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
              <Lock className="w-3.5 h-3.5 text-trust-green" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-trust-green">
                Financial Privacy &amp; Data Security
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
              Privacy Policy Disclosure
            </h1>
            
            <p className="text-xs sm:text-sm text-pv-muted mt-3 font-semibold">
              Advantage First Financial, LLC · Effective Date: April 2026
            </p>
          </div>

          {/* Policy Document Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-af-blue-ice shadow-sm space-y-10 text-sm text-pv-muted leading-relaxed" id="privacy-content">
            
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">1. Your Financial Privacy Matters</h2>
              <p>
                At Advantage First Financial, LLC (“Advantage First,” “AFF,” “we,” “us,” or “our”), we value your financial privacy. This policy explains how AFF, our subsidiaries, and affiliates handle your personal information, both online and offline. We are committed to protecting your confidentiality and the security of your personal and financial data in full compliance with federal and state privacy statutes, including the Gramm-Leach-Bliley Act (GLBA) and the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">2. Information We Collect</h2>
              <p>
                When you complete an inquiry or pre-qualification form on our website, we collect your name, residential address, email address, phone number, state of residence, requested loan amount, estimated credit tier, IP address, device interactions, and referral source.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Online Submissions:</strong> Information provided during pre-qualification inquiries, including employment details, income estimates, debt amounts, and financial objectives.</li>
                <li><strong>Credit Reporting Agencies:</strong> Information obtained from consumer reporting agencies (such as Experian, TransUnion, and Equifax) with your explicit authorization for pre-screening and credit evaluation.</li>
                <li><strong>Offline Interactions:</strong> Records of telephone consultations, customer support interactions, and correspondence with our lending specialists.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">3. How We Use Your Information</h2>
              <p>
                We use collected information to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Evaluate your eligibility for direct loan offers and partner lender options.</li>
                <li>Process applications and deliver pre-qualification estimates.</li>
                <li>Verify your identity and prevent financial fraud.</li>
                <li>Communicate with you regarding your application status, customer inquiries, and requested loan consultations.</li>
                <li>Improve our website performance, user experience, and underwriting technology.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">4. We Do Not Sell Your Personal Information</h2>
              <p>
                <strong>Advantage First Financial does not sell your personal information.</strong> We share consumer information only with authorized service providers assisting in loan origination, communications delivery (such as SMS and email platforms), hosting, compliance auditing, or when required by court order or regulatory authority.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">5. SMS / Text Messaging Terms &amp; Conditions</h2>
              <p>
                By opting in to receive SMS messages from Advantage First Financial, LLC, you consent to receive text messages regarding your inquiry, application status, and loan notifications at the mobile number you provided. Message and data rates may apply. Message frequency varies based on your application activity.
              </p>
              <div className="p-4 rounded-2xl bg-af-blue-soft/60 border border-af-blue-ice space-y-2 text-xs">
                <p><strong>Opt-Out:</strong> You may opt out of SMS communications at any time by texting <strong>STOP</strong> to any message. You will receive a one-time confirmation text. To re-subscribe, text <strong>START</strong>.</p>
                <p><strong>Support:</strong> For help, text <strong>HELP</strong> or email <a href="mailto:info@advantagefirst.com" className="text-af-blue underline">info@advantagefirst.com</a> or call <a href="tel:18003441202" className="text-af-blue underline">(800) 344-1202</a>.</p>
                <p><strong>Privacy of Mobile Numbers:</strong> Text messaging originator opt-in data and consent will not be shared with or sold to any third parties for their own marketing purposes.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">6. Your California Privacy Rights (CCPA)</h2>
              <p>
                California residents have specific privacy rights regarding personal information under the California Consumer Privacy Act (CCPA) to the extent data is not governed by the Gramm-Leach-Bliley Act (GLBA):
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Right to Know:</strong> You may request the categories and specific pieces of personal information collected about you.</li>
                <li><strong>Right to Delete:</strong> You may request deletion of your personal data, subject to legal and regulatory retention obligations.</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
              </ul>
              <p className="pt-2">
                To submit a CCPA privacy request, email <a href="mailto:info@advantagefirst.com" className="text-af-blue underline">info@advantagefirst.com</a> or call toll-free at <a href="tel:18003441202" className="text-af-blue underline">(800) 344-1202</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">7. Contact Information</h2>
              <p>
                If you have questions regarding this Privacy Policy, please contact our Compliance Department:
              </p>
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

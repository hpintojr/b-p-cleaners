import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | B&P Cleaners',
  description: 'Benny & Penny Cleaning Services, LLC privacy policy, data handling practices, California CCPA rights, and SMS disclosure notice.',
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
                Privacy &amp; Data Security
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
              Privacy Policy
            </h1>
            
            <p className="text-xs sm:text-sm text-pv-muted mt-3 font-semibold">
              Benny &amp; Penny Cleaning Services, LLC · Effective Date: August 2026
            </p>
          </div>

          {/* Policy Document Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-af-blue-ice shadow-sm space-y-10 text-sm text-pv-muted leading-relaxed" id="privacy-content">
            
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">1. Your Privacy Matters</h2>
              <p>
                At Benny &amp; Penny Cleaning Services, LLC (&quot;B&amp;P Cleaners,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we respect your privacy. This policy explains how we collect, use, and protect the personal information you share with us when you request a quote, book a cleaning, or otherwise interact with our website, in compliance with applicable state and federal privacy laws, including the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">2. Information We Collect</h2>
              <p>
                When you request an instant quote or book service on our website, we collect your name, service address, email address, phone number, property type, square footage, room count, service frequency, selected add-ons, and general device/usage information.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Quote &amp; Booking Submissions:</strong> Property and service details you provide to generate an instant price estimate and schedule an appointment.</li>
                <li><strong>Communications:</strong> Records of phone calls, text messages, emails, and other correspondence related to your service request.</li>
                <li><strong>Website Usage:</strong> Standard analytics data such as IP address, browser type, and pages visited, used to improve our website and quote experience.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">3. How We Use Your Information</h2>
              <p>
                We use collected information to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Generate accurate quote estimates and confirm final pricing before your appointment.</li>
                <li>Schedule, dispatch, and coordinate cleaning service with vetted independent contractors.</li>
                <li>Communicate with you about your appointment, confirmations, and service updates.</li>
                <li>Respond to customer support requests.</li>
                <li>Improve our website, quote calculator, and overall service experience.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">4. We Do Not Sell Your Personal Information</h2>
              <p>
                <strong>B&amp;P Cleaners does not sell your personal information.</strong> We share information only with service providers who help us deliver your cleaning service &mdash; such as scheduling, payment processing, and communications platforms &mdash; or when required by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">5. SMS / Text Messaging Terms &amp; Conditions</h2>
              <p>
                By opting in to receive SMS messages from B&amp;P Cleaners, you consent to receive text messages regarding your quote, appointment confirmations, and service updates at the mobile number you provided. Message and data rates may apply. Message frequency varies based on your service activity.
              </p>
              <div className="p-4 rounded-2xl bg-af-blue-soft/60 border border-af-blue-ice space-y-2 text-xs">
                <p><strong>Opt-Out:</strong> You may opt out of SMS communications at any time by texting <strong>STOP</strong> to any message. You will receive a one-time confirmation text. To re-subscribe, text <strong>START</strong>.</p>
                <p><strong>Support:</strong> For help, text <strong>HELP</strong> or email <a href="mailto:hello@bpcleaners.com" className="text-af-blue underline">hello@bpcleaners.com</a> or call <a href="tel:19092767631" className="text-af-blue underline">(909) 276-7631</a>.</p>
                <p><strong>Privacy of Mobile Numbers:</strong> Text messaging originator opt-in data and consent will not be shared with or sold to any third parties for their own marketing purposes.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">6. Your California Privacy Rights (CCPA)</h2>
              <p>
                California residents have specific privacy rights regarding personal information under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Right to Know:</strong> You may request the categories and specific pieces of personal information collected about you.</li>
                <li><strong>Right to Delete:</strong> You may request deletion of your personal data, subject to legal and record-keeping obligations.</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
              </ul>
              <p className="pt-2">
                To submit a CCPA privacy request, email <a href="mailto:hello@bpcleaners.com" className="text-af-blue underline">hello@bpcleaners.com</a> or call <a href="tel:19092767631" className="text-af-blue underline">(909) 276-7631</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">7. Contact Information</h2>
              <p>
                If you have questions regarding this Privacy Policy, please contact us:
              </p>
              <div className="p-4 rounded-xl bg-white border border-af-blue-ice space-y-1 text-xs">
                <p className="font-bold text-af-navy">Benny &amp; Penny Cleaning Services, LLC</p>
                <p>231 E Alessandro Blvd. Suite A-208, Riverside, CA 92508</p>
                <p>Email: <a href="mailto:hello@bpcleaners.com" className="text-af-blue underline">hello@bpcleaners.com</a></p>
                <p>Phone: (909) 276-7631</p>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

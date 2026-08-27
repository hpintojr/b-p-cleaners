import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Scale, ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions of Use | B&P Cleaners',
  description: 'Official Terms and Conditions for Benny & Penny Cleaning Services, LLC, governing website use, quote requests, and cleaning services.',
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
                Legal Agreement
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
              Terms and Conditions
            </h1>
            
            <p className="text-xs sm:text-sm text-pv-muted mt-3 font-semibold">
              Benny &amp; Penny Cleaning Services, LLC · Effective Date: August 2026
            </p>
          </div>

          {/* Terms Document Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-af-blue-ice shadow-sm space-y-10 text-sm text-pv-muted leading-relaxed" id="terms-content">
            
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website operated by Benny &amp; Penny Cleaning Services, LLC (&quot;B&amp;P Cleaners,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) (the &quot;Site&quot;), you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree to all of these Terms, do not use this Site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">2. Eligibility</h2>
              <p>
                You must be at least 18 years of age and authorized to request service at the property you provide to use this Site or book a cleaning through B&amp;P Cleaners. By using this Site, you represent and warrant that you meet these eligibility requirements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">3. Services Offered</h2>
              <p>
                B&amp;P Cleaners connects customers with independent, insured cleaning contractors for residential and commercial cleaning. Cleanings are performed by vetted 1099 independent contractors, not employees of Benny &amp; Penny Cleaning Services, LLC.
              </p>
              <p>
                Instant quotes shown on this Site are estimates based on property type, square footage, room count, service frequency, and selected add-ons. Final pricing is confirmed prior to your scheduled appointment and may be adjusted after an in-person walkthrough for unusual conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">4. Quote Estimates &amp; Scheduling</h2>
              <p>
                Submitting a quote request or booking through this Site does not guarantee a specific appointment time or final price. All bookings are subject to contractor availability and confirmation. B&amp;P Cleaners reserves the right to decline, reschedule, or cancel a booking at its discretion, including for safety concerns or inaccurate property information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">5. Accuracy of Information</h2>
              <p>
                You agree to provide accurate, current, and complete information when submitting any quote request or booking through this Site, including property size, condition, and access instructions. Inaccurate information may result in an adjusted final price or the need to reschedule your appointment.
              </p>
            </section>

            <section className="space-y-3" id="sms-terms">
              <h2 className="text-xl font-extrabold text-af-navy">6. SMS / Text Messaging Terms</h2>
              <p>
                <strong className="text-af-navy">Program Description:</strong> By opting in to receive SMS messages from B&amp;P Cleaners, you consent to receive text messages regarding your quote, appointment confirmations, scheduling updates, and related informational communications at the mobile number you provided. Messages may be sent using an autodialer or conversational messaging technology.
              </p>
              <p>
                <strong className="text-af-navy">Message Frequency:</strong> Message frequency varies based on your service activity. Message and data rates may apply depending on your mobile carrier and plan.
              </p>
              <p>
                <strong className="text-af-navy">Opt-Out:</strong> You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any message. After opting out, you will receive a one-time confirmation message and no further SMS communications will be sent. For assistance, reply <strong>HELP</strong> or contact us at <a href="mailto:hello@bpcleaners.com" className="text-af-blue underline">hello@bpcleaners.com</a> or <a href="tel:19092767631" className="text-af-blue underline">(909) 276-7631</a>.
              </p>
              <p>
                <strong className="text-af-navy">Consent:</strong> Consent to receive SMS messages is not a condition of booking or receiving any service from B&amp;P Cleaners.
              </p>
              <p>
                <strong className="text-af-navy">Supported Carriers:</strong> Compatible with most major US carriers including AT&amp;T, Verizon, T-Mobile, Sprint, U.S. Cellular, Boost Mobile, MetroPCS, Cricket, Virgin Mobile, and others. Carriers are not liable for delayed or undelivered messages.
              </p>
              <p>
                <strong className="text-af-navy">No Data Sharing:</strong> We do not sell, rent, or share your phone number or opt-in status with third parties for their marketing purposes. Your information is used solely to facilitate your service request and related B&amp;P Cleaners communications.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">7. Governing Law &amp; Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be resolved exclusively in the state or federal courts located in Riverside County, California.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">8. Contact Information</h2>
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

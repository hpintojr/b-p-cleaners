'use client';

import Link from 'next/link';
import { ArrowLeft, MessageSquare, Shield } from 'lucide-react';

export default function SmsTermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-af-blue-soft to-white">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-af-blue hover:text-af-navy transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-af-blue-soft border border-af-blue-ice flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-af-blue" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-af-navy tracking-tight">SMS Terms &amp; Conditions</h1>
            <p className="text-xs text-pv-muted font-medium mt-0.5">Benny &amp; Penny Cleaning Services, LLC</p>
          </div>
        </div>

        <p className="text-xs text-pv-muted mb-8">Last Updated: August 2026</p>

        <div className="space-y-8 text-sm text-pv-muted leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">1. Program Description</h2>
            <p>
              When you opt in to SMS communications from B&amp;P Cleaners (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you consent to receive recurring text messages at the mobile phone number you provided. These messages may include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Quote and booking confirmations</li>
              <li>Appointment reminders and scheduling updates</li>
              <li>Service-related alerts, such as cleaner arrival windows</li>
              <li>Informational content related to your cleaning service</li>
            </ul>
            <p>
              Messages may be sent using an automatic telephone dialing system (autodialer) or conversational messaging technology.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">2. Message Frequency</h2>
            <p>
              Message frequency <strong className="text-af-navy">varies based on your service activity</strong> — for example, quote follow-ups, appointment reminders, and recurring service notifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">3. Message &amp; Data Rates</h2>
            <p>
              Message and data rates may apply depending on your mobile carrier and wireless plan. B&amp;P Cleaners is not responsible for any charges incurred from your carrier for sending or receiving text messages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">4. Opt-Out Instructions</h2>
            <p>
              You may opt out of receiving SMS messages at any time by texting <strong className="text-af-navy font-mono bg-af-blue-soft px-1.5 py-0.5 rounded">STOP</strong> to any message you receive from us. After opting out, you will receive a one-time confirmation message, and no further SMS messages will be sent to your number unless you re-subscribe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">5. Help &amp; Support</h2>
            <p>
              For help with our SMS program, text <strong className="text-af-navy font-mono bg-af-blue-soft px-1.5 py-0.5 rounded">HELP</strong> to any message, or contact us directly:
            </p>
            <div className="p-4 rounded-xl bg-white border border-af-blue-ice space-y-1 text-xs">
              <p className="font-bold text-af-navy">Benny &amp; Penny Cleaning Services, LLC</p>
              <p>231 E Alessandro Blvd. Suite A-208, Riverside, CA 92508</p>
              <p>Email: <a href="mailto:hello@bpcleaners.com" className="text-af-blue underline">hello@bpcleaners.com</a></p>
              <p>Phone: <a href="tel:19092767631" className="text-af-blue underline">(909) 276-7631</a></p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">6. Consent Not Required</h2>
            <p>
              Consent to receive SMS messages is <strong className="text-af-navy">not a condition</strong> of booking or receiving any cleaning service from B&amp;P Cleaners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">7. Supported Carriers</h2>
            <p>
              Our SMS program is compatible with most major US mobile carriers, including but not limited to:
            </p>
            <p className="text-xs font-medium text-af-navy">
              AT&amp;T · Verizon · T-Mobile · Sprint · U.S. Cellular · Boost Mobile · MetroPCS · Cricket Wireless · Virgin Mobile · Google Fi · Mint Mobile · Visible
            </p>
            <p>
              Carriers are not liable for delayed or undelivered messages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">8. No Data Sharing for SMS</h2>
            <p>
              We do not sell, rent, loan, trade, lease, or otherwise transfer for profit any phone numbers or personal information collected through our SMS program to any third party for their marketing purposes. Your information is used solely to facilitate your service request and related B&amp;P Cleaners communications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">9. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our full <Link href="/privacy" className="text-af-blue underline font-semibold">Privacy Policy</Link> for details on how we collect, use, and protect your personal information including your mobile phone number.
            </p>
          </section>

          {/* Trust Badge */}
          <div className="mt-10 p-5 rounded-2xl bg-af-blue-soft/80 border border-af-blue-ice flex items-start gap-3">
            <Shield className="w-5 h-5 text-trust-green flex-shrink-0 mt-0.5" />
            <p className="text-xs text-pv-muted leading-relaxed">
              <strong className="text-af-navy">Your Privacy Matters:</strong> B&amp;P Cleaners is committed to responsible communication. We will never spam your phone, and you can opt out at any time with a single text. Our SMS practices comply with the Telephone Consumer Protection Act (TCPA) and applicable FCC regulations.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMS Terms & Conditions',
  description: 'SMS text messaging terms, opt-out instructions, message frequency, supported carriers, and privacy commitments for Benny & Penny Cleaning Services, LLC.',
  alternates: { canonical: '/sms-terms' },
};

export default function SmsTermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMS Terms & Conditions | B&P Cleaners',
  description: 'SMS text messaging terms, opt-out instructions, message frequency, supported carriers, and privacy commitments for Benny & Penny Cleaning Services, LLC.',
};

export default function SmsTermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

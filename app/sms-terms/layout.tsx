import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMS Terms & Conditions | Advantage First Financial',
  description: 'SMS text messaging terms, opt-out instructions, message frequency, supported carriers, and privacy commitments for Advantage First Financial, LLC.',
};

export default function SmsTermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

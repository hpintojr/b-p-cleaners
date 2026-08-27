import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Information & Disclosures',
  description: 'Business information, insurance and vetting practices, and customer disclosures for Benny & Penny Cleaning Services, LLC.',
  alternates: { canonical: '/licenses' },
};

export default function LicensesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

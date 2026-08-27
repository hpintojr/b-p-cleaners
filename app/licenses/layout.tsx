import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Information & Disclosures | B&P Cleaners',
  description: 'Business information, insurance and vetting practices, and customer disclosures for Benny & Penny Cleaning Services, LLC.',
};

export default function LicensesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

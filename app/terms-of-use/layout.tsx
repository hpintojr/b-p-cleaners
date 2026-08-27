import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms and conditions governing your use of the B&P Cleaners website and cleaning services from Benny & Penny Cleaning Services, LLC.',
  alternates: { canonical: '/terms-of-use' },
};

export default function TermsOfUseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

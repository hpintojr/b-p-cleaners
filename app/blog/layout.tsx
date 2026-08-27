import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cleaning Tips & Resources',
  description: 'Practical cleaning tips, maintenance schedules, and guides for homeowners and businesses across Southern California from the B&P Cleaners team.',
  alternates: { canonical: '/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

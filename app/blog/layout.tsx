import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Resources & Blog | Advantage First Financial',
  description: 'Expert insights on debt consolidation, credit optimization, interest rate trends, and personal loan strategies from the Advantage First Financial editorial team.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

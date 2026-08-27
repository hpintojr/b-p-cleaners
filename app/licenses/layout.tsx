import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licensing & State Regulatory Disclosures | Advantage First Financial (NMLS #2674295)',
  description: 'Official state licensing, regulatory approvals, and NMLS credentials for Advantage First Financial LLC (NMLS ID #2674295) across Texas OCCC and Utah DFI.',
};

export default function LicensesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

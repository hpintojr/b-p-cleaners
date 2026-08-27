import type {Metadata} from 'next';
import {Source_Sans_3, Lato} from 'next/font/google';
import Script from 'next/script';
import PostHogProvider from '@/components/PostHogProvider';
import './globals.css'; // Global styles

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-source-sans',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Advantage First Financial: Tailored Loan Solutions',
  description: 'Achieve your financial goals with Advantage First. Consolidate credit cards or boost your budget. Amounts up to $100,000 with competitive rates as low as 5.99% APR.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/images/torch_logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/torch_logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/images/torch_logo.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${lato.variable}`}>
      <body className="bg-pv-bg text-pv-text font-body antialiased selection:bg-af-blue/20 selection:text-af-navy" suppressHydrationWarning>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        {/* Trustpilot Widget Bootstrap Script */}
        <Script
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

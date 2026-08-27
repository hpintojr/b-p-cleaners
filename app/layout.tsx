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
  title: 'B&P Cleaners: Residential & Commercial Cleaning Services',
  description: 'Get an instant online quote from Benny & Penny Cleaning Services. Vetted, experienced cleaners for residential and commercial properties — one-time, weekly, bi-weekly, or monthly.',
  icons: {
    icon: [
      { url: '/images/bp-cleaners-logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/images/bp-cleaners-logo.svg',
    apple: '/images/bp-cleaners-logo.svg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${lato.variable}`}>
      <body className="bg-pv-bg text-pv-text font-body antialiased selection:bg-af-blue/20 selection:text-af-navy" suppressHydrationWarning>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

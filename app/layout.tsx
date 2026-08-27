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

const SITE_URL = 'https://b-p-cleaners.vercel.app';
const SITE_TITLE = 'B&P Cleaners: Residential & Commercial Cleaning Services';
const SITE_DESCRIPTION = 'Get an instant online quote from Benny & Penny Cleaning Services. Vetted, experienced cleaners for residential and commercial properties across Southern California — one-time, weekly, bi-weekly, or monthly.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | B&P Cleaners',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'house cleaning Southern California',
    'residential cleaning service',
    'commercial cleaning service',
    'move-in move-out cleaning',
    'recurring maid service',
    'Los Angeles County cleaning service',
    'Riverside County cleaning service',
    'Orange County cleaning service',
    'San Diego County cleaning service',
  ],
  applicationName: 'B&P Cleaners',
  authors: [{ name: 'Benny & Penny Cleaning Services, LLC' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'B&P Cleaners',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'B&P Cleaners — Residential & Commercial Cleaning across Southern California',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/images/bp-cleaners-logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/images/bp-cleaners-logo.svg',
    apple: '/images/bp-cleaners-logo.svg',
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'B&P Cleaners (Benny & Penny Cleaning Services, LLC)',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: '+19092767631',
  email: 'hello@bpcleaners.com',
  image: `${SITE_URL}/images/og-image.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '231 E Alessandro Blvd. Suite A-208',
    addressLocality: 'Riverside',
    addressRegion: 'CA',
    postalCode: '92508',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Los Angeles County, CA' },
    { '@type': 'AdministrativeArea', name: 'Riverside County, CA' },
    { '@type': 'AdministrativeArea', name: 'Orange County, CA' },
    { '@type': 'AdministrativeArea', name: 'San Diego County, CA' },
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Cleaning' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Cleaning' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deep Cleaning' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Move-In / Move-Out Cleaning' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Recurring Maintenance Plans' } },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${lato.variable}`}>
      <body className="bg-pv-bg text-pv-text font-body antialiased selection:bg-af-blue/20 selection:text-af-navy" suppressHydrationWarning>
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

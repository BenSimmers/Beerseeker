import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://beerseeker.org';
const SITE_NAME = 'Beerseeker';
const SITE_DESCRIPTION = 'Your travel compass for discovering great beer, pubs, breweries, and wine bars anywhere you go. Download the Beerseeker mobile app for iOS and Android.';
const IMAGE_URL = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: {
    default: 'Beerseeker - Find Great Beer Near You',
    template: '%s | Beerseeker',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [
    {
      name: 'Beerseeker Team',
      url: SITE_URL,
    },
  ],
  generator: 'Next.js',
  keywords: [
    'beer finder',
    'brewery locator',
    'pub finder',
    'bar locator',
    'wine bars',
    'drink finder',
    'travel app',
    'location based',
    'compass navigation',
    'mobile app',
  ],
  referrer: 'strict-origin-when-cross-origin',
  themeColor: '#000000',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.svg',
  },
  // Open Graph for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Beerseeker - Your Compass for Travel',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Beerseeker - Find Great Beer Near You',
        type: 'image/png',
      },
      {
        url: IMAGE_URL,
        width: 800,
        height: 600,
        alt: 'Beerseeker App',
        type: 'image/png',
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@beerseeker',
    creator: '@beerseeker',
    title: 'Beerseeker - Find Great Beer Near You',
    description: SITE_DESCRIPTION,
    images: [IMAGE_URL],
  },
  // Verification
  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
  },
  // Additional Meta Tags
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

// JSON-LD Schema Markup
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: SITE_DESCRIPTION,
  sameAs: [
    'https://apps.apple.com/au/app/beer-seeker/id6776191099',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'bej1380@gmail.com',
  },
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: 'TravelApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1200',
  },
  operatingSystem: 'iOS, Android',
  downloadUrl: [
    'https://apps.apple.com/au/app/beer-seeker/id6776191099',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Web App Manifest for PWA support */}
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://apps.apple.com" />
        <link rel="dns-prefetch" href="https://apps.apple.com" />

        {/* Apple mobile web app meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Beerseeker" />

        {/* Alternative language versions */}
        <link rel="alternate" hrefLang="en" href={SITE_URL} />

        {/* Canonical URL */}
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

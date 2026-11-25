import React from 'react';
import type { Metadata } from 'next';
import Preloader from '@/components/Preloader';
import './globals.css';

export const metadata: Metadata = {
  title: 'White Luxe Real Estate | Advisory. Not Agency. by Rohit Raj Maingi',
  description:
    '30 years across private banking and real estate advisory, guiding HNI and UHNI families on luxury homes, commercial assets and leased income in Gurgaon.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://whiteluxerealestate.com'),
  openGraph: {
    title: 'White Luxe Real Estate | Advisory. Not Agency. by Rohit Raj Maingi',
    description:
      '30 years across private banking and real estate advisory, guiding HNI and UHNI families on luxury homes, commercial assets and leased income in Gurgaon.',
    siteName: 'White Luxe Real Estate',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'White Luxe Real Estate',
  alternateName: 'White Luxe Advisory by Rohit Raj Maingi',
  url: 'https://whiteluxerealestate.com',
  telephone: '+91 98152 02102',
  email: 'rohitrajmaingi@whiteluxerealestate.com',
  slogan: 'Advisory. Not Agency.',
  founder: {
    '@type': 'Person',
    name: 'Rohit Raj Maingi',
    jobTitle: 'Founder & Advisory Director',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'R-7/109 M3M Urbana, Sector 67',
    addressLocality: 'Gurgaon',
    postalCode: '122102',
    addressCountry: 'IN',
  },
  license: 'RC/HARERA/GGM/3367/2962/2025/244',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Gurgaon' },
    { '@type': 'AdministrativeArea', name: 'Golf Course Extension Road' },
    { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0D0D0D] text-[#F4ECD8] font-sans antialiased selection:bg-[#C8A24A] selection:text-[#0D0D0D]">
        <Preloader />
        {children}
      </body>
    </html>
  );
}

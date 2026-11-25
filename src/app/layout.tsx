import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'White Luxe Real Estate | Defining Luxury Real Estate in Gurgaon',
  description:
    'Ethical and strategic property advisors, guiding you to the right residence, workspace or investment in Gurgaon and beyond.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'White Luxe Real Estate | Defining Luxury Real Estate in Gurgaon',
    description:
      'Ethical and strategic property advisors, guiding you to the right residence, workspace or investment in Gurgaon and beyond.',
    siteName: 'White Luxe Real Estate',
  },
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
      </head>
      <body className="bg-[#0D0D0D] text-[#F4ECD8] font-sans antialiased selection:bg-[#C8A24A] selection:text-[#0D0D0D]">
        {children}
      </body>
    </html>
  );
}

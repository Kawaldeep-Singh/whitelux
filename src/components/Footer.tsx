'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-primary/20 pt-space-xl pb-space-lg text-[#cdc3b3]">
      <div className="w-full px-margin-mobile lg:px-margin">
        {/* Top Info Banner */}
        <div className="pb-12 border-b border-primary/15 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3.5 mb-4">
              <img
                alt="White Luxe Real Estate Logo"
                className="h-10 w-auto object-contain rounded-[2px]"
                src="/logo.jpeg"
              />
              <span className="font-headline-sm text-headline-sm text-[#FAF7F0] tracking-wide">
                WHITE LUXE REAL ESTATE
              </span>
            </div>
            <p className="font-body-md text-body-md text-[#b5a999] font-light leading-relaxed">
              Curating the finest architectural masterworks across Golf Course Road, DLF Phase 5,
              and Southern Peripheral Road, Gurgaon.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
            <div className="space-y-1">
              <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.2em] text-primary block font-medium">
                Private Advisory Desk
              </span>
              <span className="font-body-md text-body-md text-[#FAF7F0] block font-light">
                +91 98152 02102
              </span>
              <span className="font-body-sm text-body-sm text-[#a89d8d] block">
                rohitrajmaingi@whiteluxerealestate.com
              </span>
            </div>
            <div className="space-y-1 max-w-xs">
              <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.2em] text-primary block font-medium">
                Advisory Office
              </span>
              <p className="font-body-sm text-body-sm text-[#a89d8d] leading-relaxed">
                R-7/109 M3M Urbana, Sector 67, Gurgaon, Haryana 122102
              </p>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-primary/15">
          {/* Curated Portfolio */}
          <div className="space-y-4">
            <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.25em] text-primary block font-medium">
              Curated Portfolio
            </span>
            <ul className="space-y-2.5">
              {[
                'DLF The Camellias',
                'DLF The Aralias',
                'DLF Magnolias',
                'Trump Towers Delhi NCR',
                'Oberoi Privus',
                'Central Park Resorts Sky Villas',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/properties?search=${encodeURIComponent(item)}`}
                    className="font-body-sm text-body-sm text-[#b3a797] hover:text-primary transition-colors cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Advisory Services */}
          <div className="space-y-4">
            <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.25em] text-primary block font-medium">
              Advisory Services
            </span>
            <ul className="space-y-2.5">
              {[
                'Ultra-Prime Acquisitions',
                'Bespoke Dispositions',
                'Penthouse Advisory',
                'Commercial & Corporate Real Estate',
                'International Investor Desk',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="font-body-sm text-body-sm text-[#b3a797] hover:text-primary transition-colors cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Firm */}
          <div className="space-y-4">
            <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.25em] text-primary block font-medium">
              The Firm
            </span>
            <ul className="space-y-2.5">
              {[
                { name: 'The Partners', href: '/about' },
                { name: 'Editorial Journal', href: '/blog' },
                { name: 'Market Intelligence 2025', href: '/blog' },
                { name: 'Private Client Club', href: '/about' },
                { name: 'Press & Recognition', href: '/about' },
                { name: 'Careers', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-body-sm text-body-sm text-[#b3a797] hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Client Newsletter */}
          <div className="space-y-4">
            <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.25em] text-primary block font-medium">
              Private Client Newsletter
            </span>
            <p className="font-body-sm text-body-sm text-[#a89d8d] leading-relaxed">
              Discreet quarterly insights into private off-market listings in Gurgaon.
            </p>
            {subscribed ? (
              <p className="text-xs text-primary font-medium">Thank you for subscribing.</p>
            ) : (
              <form className="space-y-2 pt-2" onSubmit={handleNewsletterSubmit}>
                <div className="flex items-center bg-[#181818] border border-primary/30 rounded-[4px] focus-within:border-primary transition-colors overflow-hidden">
                  <input
                    className="w-full px-3.5 py-2.5 bg-transparent font-body-sm text-body-sm text-[#FAF7F0] placeholder:text-[#7d7468] focus:outline-none"
                    placeholder="e.g. rohitrajmaingi@whiteluxerealestate.com"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button
                    className="px-4 py-2.5 bg-gradient-to-r from-primary-container to-primary text-on-primary hover:brightness-110 font-label-sm text-label-sm uppercase tracking-wider transition-all cursor-pointer font-semibold"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
                <span className="font-label-sm text-label-sm text-[#7d7468] block">
                  Strict confidentiality protocols enforced.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & RERA Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-4xl">
            <p className="font-body-sm text-body-sm text-[#a89d8d]">
              © 2026 White Luxe Real Estate Advisory LLP. All rights reserved.
            </p>
            <p className="font-body-sm text-body-sm text-[#756b5e] leading-relaxed">
              Registered with Haryana Real Estate Regulatory Authority (HARERA Reg. No.
              HRERA-PKL-GGM-1422-2023). Properties shown are subject to verification and client
              exclusivity agreements.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link
              className="font-label-sm text-label-sm uppercase tracking-wider text-[#918575] hover:text-primary transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="font-label-sm text-label-sm uppercase tracking-wider text-[#918575] hover:text-primary transition-colors"
              href="/disclaimer"
            >
              Terms of Engagement
            </Link>
            <Link
              className="font-label-sm text-label-sm uppercase tracking-wider text-[#918575] hover:text-primary transition-colors"
              href="/disclaimer"
            >
              RERA Compliance
            </Link>
            <Link
              className="font-label-sm text-label-sm uppercase tracking-wider text-[#918575] hover:text-primary transition-colors"
              href="/privacy"
            >
              Anti-Money Laundering
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

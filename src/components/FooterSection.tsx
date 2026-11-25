'use client';

import React from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/types';
import { Instagram, MessageSquare, Linkedin } from 'lucide-react';

interface FooterSectionProps {
  settings?: SiteSettings;
}

export default function FooterSection({ settings }: FooterSectionProps) {
  const address = settings?.address || 'R-7/109 M3M Urbana, Sector 67, Gurgaon 122102';
  const phone = settings?.phone || '+91 98152 02102';
  const email = settings?.email || 'rohitrajmaingi@whiteluxerealestate.com';
  const hrera = settings?.hreraNumber || settings?.reraNumber || 'RC/HARERA/GGM/3367/2962/2025/244';
  const instagramUrl = settings?.instagramUrl || settings?.socialLinks?.instagram || 'https://www.instagram.com/rohitmaing77';
  const linkedinUrl = settings?.linkedinUrl || settings?.socialLinks?.linkedin;
  const whatsappNumber = settings?.whatsappNumber || '919815202102';

  return (
    <footer className="bg-[#080808] text-[#A9A294] pt-20 pb-12 border-t border-[#C8A24A]/25">
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-16">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <img
                src="/logo.jpeg"
                alt="White Luxe Real Estate Logo"
                className="h-10 w-auto object-contain rounded-[2px] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-[0.2em] text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors leading-none font-medium">
                  WHITE LUXE
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans mt-1">
                  ADVISORY. NOT AGENCY.
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#A9A294] font-light leading-relaxed max-w-sm pt-1">
              Founder-led property advisory in Gurugram, offering research-driven client representation across prime residential, commercial assets and leased income.
            </p>
            <div className="pt-2 text-[11px] text-[#A9A294]/80">
              <p>
                <strong className="text-[#C8A24A] font-normal">HRERA:</strong> {hrera}
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-semibold block">
              ADVISORY
            </span>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <Link href="/" className="hover:text-[#E3C06F] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E3C06F] transition-colors">Advisory Practices</Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#E3C06F] transition-colors">Properties</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#E3C06F] transition-colors">Insights</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E3C06F] transition-colors">About Rohit</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E3C06F] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Corridor & Micro-markets */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-semibold block">
              CORRIDOR
            </span>
            <ul className="space-y-2.5 text-xs font-sans font-light">
              <li>
                <Link href="/properties?location=Golf+Course+Extension" className="hover:text-[#E3C06F] transition-colors">Golf Course Ext. Road</Link>
              </li>
              <li>
                <Link href="/properties?location=Sector+63" className="hover:text-[#E3C06F] transition-colors">Sector 63 / 63A</Link>
              </li>
              <li>
                <Link href="/properties?location=Sector+54" className="hover:text-[#E3C06F] transition-colors">Golf Course Road</Link>
              </li>
              <li>
                <Link href="/properties?location=Southern+Peripheral" className="hover:text-[#E3C06F] transition-colors">SPR Gurugram</Link>
              </li>
              <li>
                <Link href="/blog/gurgaons-aspirational-buyer" className="hover:text-[#E3C06F] transition-colors text-[#C8A24A]">Corridor Report →</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-semibold block">
              ADVISORY DESK
            </span>
            <div className="space-y-2.5 text-xs font-sans font-light">
              <p className="text-[#F4ECD8] leading-relaxed">{address}</p>
              <p>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#E3C06F] transition-colors font-medium text-[#F4ECD8]">
                  {phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${email}`} className="hover:text-[#E3C06F] transition-colors break-all">
                  {email}
                </a>
              </p>
            </div>

            {/* Social Icons (Instagram, WhatsApp, LinkedIn only) */}
            <div className="flex items-center gap-3 pt-2">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/30 hover:border-[#C8A24A] flex items-center justify-center text-[#C8A24A] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
              )}
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/30 hover:border-[#C8A24A] flex items-center justify-center text-[#C8A24A] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageSquare size={15} />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/30 hover:border-[#C8A24A] flex items-center justify-center text-[#C8A24A] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="pt-6 border-t border-[#C8A24A]/15 text-[11px] text-[#A9A294]/65 leading-relaxed font-sans">
          <p>
            White Luxe acts as an advisor and intermediary. All information is indicative; verify details with the developer and Haryana RERA before any decision.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-[#C8A24A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A9A294]/70">
          <p>© 2026 White Luxe Real Estate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C8A24A] transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-[#C8A24A] transition-colors">RERA Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

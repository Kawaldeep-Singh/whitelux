'use client';

import React from 'react';
import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer className="bg-[#0D0D0D] text-[#A9A294] pt-20 pb-12 border-t border-[#C8A24A]/25">
      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-16">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & About line */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
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
                  Defining Luxury Real Estate in Gurgaon
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#A9A294] font-light leading-relaxed pt-1">
              White Luxe Real Estate is a property consultancy in Gurgaon offering ethical, research-led advice across residential, commercial and retail real estate.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-semibold block">
              QUICK LINKS
            </span>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <Link href="/" className="hover:text-[#E3C06F] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#E3C06F] transition-colors">Properties</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E3C06F] transition-colors">About</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E3C06F] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#E3C06F] transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E3C06F] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Featured Projects */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-semibold block">
              FEATURED PROJECTS
            </span>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <Link href="/properties/tarc-ishva" className="hover:text-[#E3C06F] transition-colors">TARC Ishva (Sec 63A)</Link>
              </li>
              <li>
                <Link href="/properties/godrej-astra" className="hover:text-[#E3C06F] transition-colors">Godrej Astra (Sec 54)</Link>
              </li>
              <li>
                <Link href="/properties/tulip-monsella" className="hover:text-[#E3C06F] transition-colors">Tulip Monsella (Sec 53)</Link>
              </li>
              <li>
                <Link href="/properties/dlf-privana-north" className="hover:text-[#E3C06F] transition-colors">DLF Privana North (Sec 77)</Link>
              </li>
              <li>
                <Link href="/properties/aipl-autograph" className="hover:text-[#E3C06F] transition-colors">AIPL Autograph (Sec 108)</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Schedule */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-semibold block">
              CONTACT
            </span>
            <div className="space-y-2 text-xs font-sans font-light">
              <p className="text-[#F4ECD8]">Sector 49, Gurgaon, Haryana, India</p>
              <p>
                <a href="tel:+919958009492" className="hover:text-[#E3C06F] transition-colors">+91 9958009492</a>
              </p>
              <p>
                <a href="mailto:support@whiteluxe.com" className="hover:text-[#E3C06F] transition-colors">support@whiteluxe.com</a>
              </p>
              <p className="text-[#C8A24A]">Mon-Sat, 10:00 AM - 7:00 PM</p>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-sans">
              <a
                href="https://www.instagram.com/whiteluxe_real_estate/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E3C06F] transition-colors"
              >
                Instagram
              </a>
              <span>•</span>
              <a
                href="https://www.facebook.com/profile.php"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E3C06F] transition-colors"
              >
                Facebook
              </a>
              <span>•</span>
              <a
                href="https://wa.me/919958009492"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E3C06F] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Line & Copyright */}
        <div className="pt-8 border-t border-[#C8A24A]/20 space-y-4 text-center md:text-left text-[11px] font-sans font-light text-[#A9A294]/80">
          <p className="leading-relaxed">
            White Luxe Real Estate is a property consultancy and advisory firm acting solely as an intermediary between buyers, sellers and developers. All information, plans and prices are indicative. Visitors are advised to independently verify all project details with the respective developer and Haryana RERA before deciding.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-2 text-[10px] text-[#A9A294]/60">
            <p>© 2026 White Luxe Real Estate. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[#E3C06F] transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/disclaimer" className="hover:text-[#E3C06F] transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

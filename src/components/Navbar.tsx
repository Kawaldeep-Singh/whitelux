'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#C8A24A]/25 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent py-5'
      }`}
    >
      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src="/logo.jpeg"
            alt="White Luxe Real Estate Logo"
            className="h-10 md:h-11 w-auto object-contain rounded-[2px]"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors leading-none font-medium">
              WHITE LUXE
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans mt-1">
              Defining Luxury Real Estate in Gurgaon
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-xs uppercase tracking-[0.2em] text-[#A9A294] hover:text-[#E3C06F] transition-colors font-sans font-medium py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A24A] group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
          ))}
        </nav>

        {/* Primary Action Button */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="relative px-6 py-2.5 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(200,162,74,0.4)] overflow-hidden group"
          >
            <span className="relative z-10">Enquire Now</span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#F4ECD8] p-1.5 focus:outline-none transition-transform active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} className="text-[#C8A24A]" /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0D0D0D] border-b border-[#C8A24A]/25 px-6 py-8 space-y-6 overflow-hidden"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] text-[#F4ECD8] hover:text-[#C8A24A] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-[#C8A24A]/20">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] shadow-lg active:scale-98 transition-transform"
              >
                Enquire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

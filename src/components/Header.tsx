'use client';

import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0c0c0c]/85 backdrop-blur-xl border-b border-primary/25 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="h-20 w-full px-margin-mobile lg:px-margin flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-3.5 group" href="/">
            <img
              src="/logo.jpeg"
              alt="White Luxe Real Estate Logo"
              className="h-11 w-auto object-contain rounded-[2px] shadow-sm group-hover:brightness-110 transition-all"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-wide text-[#FAF7F0] group-hover:text-primary transition-colors">
                WHITE LUXE
              </span>
              <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.25em] text-primary font-medium">
                Gurgaon • Private Office
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <Link
            className="uppercase tracking-[0.15em] transition-colors py-1 text-primary border-b border-primary font-bold font-label-md text-label-md"
            href="/"
          >
            Home
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-[0.15em] text-[#cdc3b3] hover:text-primary transition-colors py-1"
            href="/properties"
          >
            Properties
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-[0.15em] text-[#cdc3b3] hover:text-primary transition-colors py-1"
            href="/about"
          >
            About
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-[0.15em] text-[#cdc3b3] hover:text-primary transition-colors py-1"
            href="/services"
          >
            Services
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-[0.15em] text-[#cdc3b3] hover:text-primary transition-colors py-1"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-[0.15em] text-[#cdc3b3] hover:text-primary transition-colors py-1"
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <a
            className="hidden xl:flex items-center gap-2 font-label-sm text-label-sm tracking-wider text-[#d4c9b8] hover:text-primary transition-colors"
            href="tel:+919815202102"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">call</span>
            <span>+91 98152 02102</span>
          </a>

          <Link
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-[3px] bg-gradient-to-r from-primary-container via-primary to-primary-fixed text-on-primary font-label-md text-label-md font-semibold tracking-[0.12em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(201,162,75,0.25)] hover:shadow-[0_6px_22px_rgba(201,162,75,0.45)] hover:scale-105 active:scale-95"
            href="/contact"
          >
            Enquire Now
          </Link>

          <div className="flex items-center pl-2">
            <div className="p-[1.5px] rounded-full border border-primary/50 shadow-[0_0_10px_rgba(201,162,75,0.2)]">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4J6F5pZKYnSrFU80ZcwlC0hrOvjOv9HYb6z8UrmF0qUJ3-LzG4zlqHEokADubCP_d3NPdp9S16vAEHzbOjWTRlJvDFt2YMF0Moc66LRjpFq_gEJuoqkgCjObQomtWjEeLCe4OYT_sodk86GBkHBONkZgy1HSQPN31cMMXTHsIvVJWn9XsCl0fO4onW9VvAMhytkMy1Mnk2vp6TeJifmeNdZ9bycihYc4Mkz5S36ex"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

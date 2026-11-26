'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteSettings } from '@/types';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const founderName = settings.founderName || 'Rohit Raj Maingi';
  const founderTitle = settings.founderTitle || 'Founder & Advisory Director';
  const founderPortrait = settings.founderPortrait || '/images/rohit-raj-maingi.png';
  const hasPortrait = Boolean(founderPortrait && founderPortrait.trim() !== '');
  const whatsappNumber = settings.whatsappNumber || '919815202102';
  const whatsappText = encodeURIComponent(
    settings.whatsappCtaText ||
      'Hello Rohit, I would like to schedule a private advisory consultation regarding Gurgaon luxury properties.'
  );

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-36 pb-20 bg-[#0D0D0D] overflow-hidden">
      {/* Subtle architectural backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/home-page.png')` }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-[#080808]/90 pointer-events-none" />
      {/* Radial soft gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto relative z-10">
        <div
          className={`grid grid-cols-1 ${
            hasPortrait ? 'lg:grid-cols-12 gap-12 lg:gap-16 items-center' : 'max-w-4xl mx-auto text-center'
          }`}
        >
          {/* Left Column (or Full Width if no portrait) */}
          <div className={`${hasPortrait ? 'lg:col-span-7 text-left space-y-7' : 'space-y-8'}`}>
            {/* Gold micro-label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium inline-block border-b border-[#C8A24A]/40 pb-1">
                GURGAON | GOLF COURSE EXTENSION ROAD | DELHI NCR
              </span>
            </motion.div>

            {/* H1 "Advisory. Not Agency." */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal text-[#F4ECD8] leading-[1.05] tracking-tight"
            >
              Advisory.{' '}
              <span className="italic text-[#C8A24A] font-serif font-light">
                Not Agency.
              </span>
            </motion.h1>

            {/* 30-year subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-base md:text-lg text-[#A9A294] font-light leading-relaxed ${
                hasPortrait ? 'max-w-xl' : 'max-w-2xl mx-auto'
              }`}
            >
              30 years across private banking and real estate advisory, now guiding HNI and UHNI families on luxury homes, commercial assets and leased income in Gurgaon.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className={`flex flex-wrap items-center gap-4 pt-3 ${
                hasPortrait ? 'justify-start' : 'justify-center'
              }`}
            >
              {/* Book a Consultation (Filled Gold Gradient) */}
              <a
                href="#consultation"
                className="px-7 py-3.5 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(200,162,74,0.35)] flex items-center gap-2 group"
              >
                <span>Book a Consultation</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>

              {/* WhatsApp Rohit (Outline Gold) */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 border border-[#C8A24A] text-[#E3C06F] hover:bg-[#C8A24A]/10 font-sans font-medium text-xs uppercase tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2"
              >
                <MessageSquare size={14} className="text-[#C8A24A]" />
                <span>WhatsApp Rohit</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Founder Portrait (Cleanly hidden if empty) */}
          {hasPortrait && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 flex flex-col items-center lg:items-end"
            >
              <div className="relative max-w-[345px] w-full p-2.5 bg-[#14110C] border border-[#C8A24A]/40 rounded-[2px] shadow-[0_15px_50px_rgba(0,0,0,0.85)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-gradient-to-b from-[#241E17] via-[#14110C] to-[#0D0D0D]">
                  <img
                    src={founderPortrait}
                    alt={founderName}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
                </div>
                <div className="pt-3 pb-1.5 px-3 text-center border-t border-[#C8A24A]/20 mt-1">
                  <h3 className="font-serif text-lg text-[#F4ECD8] tracking-wide font-medium">
                    {founderName}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#C8A24A] font-sans mt-0.5 font-medium">
                    {founderTitle}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

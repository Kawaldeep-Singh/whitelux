'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export function HeroSection() {
  const router = useRouter();
  const [location, setLocation] = useState('gcr');
  const [typology, setTypology] = useState('sky-villa');
  const [budget, setBudget] = useState('tier2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/properties?location=${location}&type=${typology}&budget=${budget}`);
  };

  return (
    <section className="relative w-full -mt-20 overflow-hidden bg-[#0a0a0a]">
      {/* Full-Bleed Cinematic Background */}
      <div className="relative w-full min-h-[92vh] flex items-center justify-center">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
          data-alt="White Luxe Hero Showcase"
          style={{
            backgroundImage: "url('/home-page.png')",
          }}
        />

        {/* Soft Multi-Layer Scrim - Allows home-page.png to breathe with natural warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(10,10,10,0.8)_100%)]" />

        {/* Hero Content Stack - Spacious & Clean */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-margin-mobile lg:px-margin pt-36 pb-20 flex flex-col items-center text-center">
          {/* Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141414]/80 backdrop-blur-md mb-6 border border-primary/30 shadow-[0_0_20px_rgba(201,162,75,0.15)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.28em] text-primary font-medium">
              Gurgaon • Private Office
            </span>
          </motion.div>

          {/* Grand Editorial Headline - Clean & Uncluttered */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="font-headline-display text-headline-display max-w-4xl text-[#FAF7F0] font-light tracking-tight leading-[1.1] mb-6 drop-shadow-md"
          >
            The Pinnacle of Architectural Living in{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed via-primary to-primary-container">
              Gurgaon
            </span>
            .
          </motion.h1>

          {/* Refined Subtitle - Short & Confident */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="font-body-lg text-body-lg text-[#dcd6cc] font-light max-w-2xl leading-relaxed mb-10"
          >
            Curating rare penthouses, golf-front estates, and confidential private sales from ₹25 Cr to ₹180 Cr.
          </motion.p>

          {/* Floating Glassmorphic Search / Discovery Palette */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="w-full max-w-4xl p-2.5 sm:p-3 rounded-2xl bg-[#141414]/80 backdrop-blur-2xl border border-primary/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-primary/45 transition-all"
          >
            <form
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-left"
              onSubmit={handleSearch}
            >
              {/* Location */}
              <div className="p-3 rounded-xl bg-[#202020]/80 hover:bg-[#262626] border border-white/5 transition-all">
                <label className="block font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.18em] text-primary mb-1">
                  Location
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-transparent font-label-md text-label-md text-[#FAF7F0] appearance-none focus:outline-none cursor-pointer pr-6 py-0.5"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="dlf5">DLF Phase 5</option>
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="gcr">Golf Course Road</option>
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="gce">Golf Course Ext. Rd</option>
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="sohna">Sohna Corridor</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none text-base">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Typology */}
              <div className="p-3 rounded-xl bg-[#202020]/80 hover:bg-[#262626] border border-white/5 transition-all">
                <label className="block font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.18em] text-primary mb-1">
                  Typology
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-transparent font-label-md text-label-md text-[#FAF7F0] appearance-none focus:outline-none cursor-pointer pr-6 py-0.5"
                    value={typology}
                    onChange={(e) => setTypology(e.target.value)}
                  >
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="sky-villa">Sky Villa</option>
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="penthouse">Golf Penthouse</option>
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="mansion">Signature Mansion</option>
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="offmarket">Confidential</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none text-base">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Budget */}
              <div className="p-3 rounded-xl bg-[#202020]/80 hover:bg-[#262626] border border-white/5 transition-all">
                <label className="block font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.18em] text-primary mb-1">
                  Budget
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-transparent font-label-md text-label-md text-[#FAF7F0] appearance-none focus:outline-none cursor-pointer pr-6 py-0.5"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="tier1">₹25 Cr – ₹45 Cr</option>
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="tier2">₹45 Cr – ₹80 Cr</option>
                    <option className="bg-[#1c1c1c] text-[#FAF7F0]" value="tier3">₹80 Cr – ₹150 Cr+</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none text-base">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center">
                <button
                  className="w-full h-full min-h-[50px] px-5 rounded-xl bg-gradient-to-r from-primary-container via-primary to-primary-fixed text-on-primary font-label-md text-label-md font-semibold tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_18px_rgba(201,162,75,0.3)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  type="submit"
                >
                  <span>Explore</span>
                  <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Prestige Metrics Ribbon - Clean Minimalist Strip */}
      <div className="w-full bg-[#101010] border-t border-b border-primary/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-margin-mobile lg:px-margin py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y-0">
            {[
              { stat: '₹4,850+ Cr', label: 'Super-Prime Transacted' },
              { stat: '94%', label: 'Confidential & Off-Market' },
              { stat: '16 Years', label: 'Gurgaon Apex Authority' },
              { stat: 'Top 1%', label: 'Institutional Retention' },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                <span className="font-headline-md text-headline-md font-light text-primary block tracking-tight">
                  {item.stat}
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.16em] text-[#a89d8d] block font-medium">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const LOCATIONS = [
  'Golf Course Road',
  'Golf Course Extension Road',
  'Dwarka Expressway',
  'MG Road',
  'Cyber City',
  'Sohna Road',
  'Southern Peripheral Road',
];

const PROPERTY_TYPES = [
  'Apartment',
  'Penthouse',
  'Villa',
  'Builder Floor',
  'Commercial',
  'Retail',
];

const BUDGETS = ['Under 2 Cr', '2-5 Cr', '5-10 Cr', '10 Cr+'];

export default function Hero() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (selectedLocation) query.append('location', selectedLocation);
    if (selectedType) query.append('type', selectedType);
    if (selectedBudget) query.append('budget', selectedBudget);
    router.push(`/properties?${query.toString()}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-36 pb-24 bg-[#0D0D0D] overflow-hidden">
      {/* Background with dusk skyline photo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/home-page.png')` }}
      />
      {/* Dark gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/75 to-[#080808]/90" />
      {/* Subtle radial golden glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto relative z-10 text-center space-y-9">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C8A24A] font-sans font-medium inline-block border-b border-[#C8A24A]/40 pb-1">
            GURGAON | DELHI NCR
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal text-[#F4ECD8] leading-[1.08] tracking-tight max-w-4xl mx-auto"
        >
          Defining luxury real estate in Gurgaon
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-base text-[#A9A294] font-light max-w-2xl mx-auto leading-relaxed"
        >
          Ethical and strategic property advisors, guiding you to the right residence, workspace or investment in Gurgaon and beyond.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-5 pt-2"
        >
          <Link
            href="/properties"
            className="px-8 py-3.5 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(200,162,74,0.4)]"
          >
            Explore Properties
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 border border-[#C8A24A] text-[#E3C06F] hover:bg-[#C8A24A]/10 hover:border-[#E3C06F] font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Book a Consultation
          </Link>
        </motion.div>

        {/* Glass-style Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSearch}
          className="mt-12 p-3 bg-[#14110C]/85 backdrop-blur-xl border border-[#C8A24A]/30 rounded-[2px] shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-left max-w-5xl mx-auto"
        >
          {/* Location Dropdown */}
          <div className="bg-[#0D0D0D]/90 border border-[#C8A24A]/20 px-4 py-2.5 rounded-[2px] transition-colors hover:border-[#C8A24A]/40">
            <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] font-sans">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-transparent text-[#F4ECD8] text-xs font-serif mt-1 focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#14110C] text-[#F4ECD8]">Select Location</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-[#14110C] text-[#F4ECD8]">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type Dropdown */}
          <div className="bg-[#0D0D0D]/90 border border-[#C8A24A]/20 px-4 py-2.5 rounded-[2px] transition-colors hover:border-[#C8A24A]/40">
            <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] font-sans">
              Property Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-transparent text-[#F4ECD8] text-xs font-serif mt-1 focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#14110C] text-[#F4ECD8]">Select Type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#14110C] text-[#F4ECD8]">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Dropdown */}
          <div className="bg-[#0D0D0D]/90 border border-[#C8A24A]/20 px-4 py-2.5 rounded-[2px] transition-colors hover:border-[#C8A24A]/40">
            <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] font-sans">
              Budget
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full bg-transparent text-[#F4ECD8] text-xs font-serif mt-1 focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#14110C] text-[#F4ECD8]">Select Budget</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b} className="bg-[#14110C] text-[#F4ECD8]">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(200,162,74,0.4)] flex items-center justify-center gap-2 py-3 lg:py-0 shadow-md"
          >
            <Search size={14} />
            <span>Search</span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}

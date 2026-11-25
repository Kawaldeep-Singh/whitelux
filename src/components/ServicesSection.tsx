'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home,
  Building2,
  Store,
  TrendingUp,
  Sparkles,
  FileCheck,
} from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    title: 'Residential',
    desc: 'Luxury apartments, penthouses, villas and builder floors in Gurgaon’s most sought-after sectors.',
    icon: Home,
  },
  {
    num: '02',
    title: 'Commercial',
    desc: 'Office spaces and commercial assets for businesses and investors seeking strong, lasting returns.',
    icon: Building2,
  },
  {
    num: '03',
    title: 'Retail Leasing',
    desc: 'High-footfall retail spaces and strategic leasing support for brands and landlords.',
    icon: Store,
  },
  {
    num: '04',
    title: 'Investment Advisory',
    desc: 'Research-backed guidance on where, when and how to invest for long-term value.',
    icon: TrendingUp,
  },
  {
    num: '05',
    title: 'Pre-launch & Resale',
    desc: 'Early access to new launches and carefully verified resale opportunities.',
    icon: Sparkles,
  },
  {
    num: '06',
    title: 'Documentation & Legal Support',
    desc: 'Clear, compliant paperwork and guidance from booking to possession.',
    icon: FileCheck,
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#0D0D0D] text-[#F4ECD8] py-24 md:py-32 border-t border-[#C8A24A]/20">
      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
            OUR EXPERTISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F4ECD8]">
            Every property need, one trusted partner
          </h2>
        </div>

        {/* 3x2 Grid separated by thin gold lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#C8A24A]/20">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ y: -4, backgroundColor: '#14110C' }}
                className="p-8 md:p-10 border-r border-b border-[#C8A24A]/20 bg-[#0D0D0D] transition-all duration-300 group flex flex-col justify-between cursor-default"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#C8A24A]/70">{srv.num}</span>
                    <Icon size={24} className="text-[#C8A24A] group-hover:scale-115 group-hover:text-[#E3C06F] transition-all duration-300" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#F4ECD8] font-normal group-hover:text-[#E3C06F] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/services"
            className="inline-block text-xs uppercase tracking-[0.2em] text-[#C8A24A] hover:text-[#E3C06F] transition-all font-sans border-b border-[#C8A24A]/40 pb-1 hover:translate-x-1"
          >
            Explore All Services &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Home, Landmark } from 'lucide-react';

const PRACTICES = [
  {
    num: '01',
    leadBadge: 'LEAD PRACTICE',
    title: 'Commercial, SCO & Leasing',
    desc: 'SCO plots, pre-leased assets and rental income, structured like a portfolio.',
    icon: Building2,
    href: '/services',
    isLead: true,
  },
  {
    num: '02',
    leadBadge: null,
    title: 'Luxury Residential',
    desc: 'Pre-launch, under construction and resale homes for end use or investment.',
    icon: Home,
    href: '/services',
    isLead: false,
  },
  {
    num: '03',
    leadBadge: null,
    title: 'Investment Advisory',
    desc: 'Allocation, financing and exit planning, from a private banker’s lens.',
    icon: Landmark,
    href: '/services',
    isLead: false,
  },
];

export default function WhereIAdvise() {
  return (
    <section className="bg-[#080808] py-24 sm:py-28 relative border-b border-[#C8A24A]/25">
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-14">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium inline-block">
              AREAS OF PRACTICE
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] font-normal"
          >
            Where I Advise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-[#A9A294] font-light leading-relaxed"
          >
            Specialized client representation across prime Gurgaon commercial and residential asset classes.
          </motion.p>
        </div>

        {/* 3 Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRACTICES.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={`flex flex-col justify-between p-8 rounded-[2px] bg-[#14110C] transition-all duration-500 hover:-translate-y-1 ${
                  p.isLead
                    ? 'border-2 border-[#C8A24A] shadow-[0_4px_30px_rgba(200,162,74,0.15)] relative'
                    : 'border border-[#C8A24A]/25 hover:border-[#C8A24A]/60'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl text-[#C8A24A] font-light tracking-wider">
                      {p.num}
                    </span>
                    {p.leadBadge && (
                      <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold px-2.5 py-1 rounded-[2px] bg-[#C8A24A] text-[#0D0D0D]">
                        {p.leadBadge}
                      </span>
                    )}
                  </div>

                  <div className="w-12 h-12 rounded-[2px] bg-[#0D0D0D] border border-[#C8A24A]/30 flex items-center justify-center">
                    <Icon size={22} className="text-[#E3C06F]" />
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-serif text-2xl text-[#F4ECD8] font-medium tracking-wide">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#A9A294] leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[#C8A24A] hover:text-[#E3C06F] transition-colors group"
                  >
                    <span>Explore practice</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

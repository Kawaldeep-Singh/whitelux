'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  price: string;
  badge: string;
  imageUrl: string;
  specs: {
    area: string;
    beds: string;
    feature: string;
    featureIcon: string;
  };
  refCode: string;
}

const defaultProperties: PropertyCardProps[] = [
  {
    id: '1',
    slug: 'the-grand-sky-villa-the-camellias',
    name: 'The Grand Sky Villa at The Camellias',
    tagline:
      'Direct frontage over Gary Player championship greens. Private heated lap pool, double-height ceilings, and private elevator.',
    location: 'DLF Phase 5 • Gurgaon',
    price: '₹75.00 Cr',
    badge: 'Exclusive Representation',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmnzIFp1mPxtKrxf9Rrn50WgI0ZBjImzXhcxQdEjFJpAD0oNHhyA4moZXgvCK-SvaviIEzigYahxaL0X0lXztEYvSzhb194SIQ0cod4bfljDSenDRV7n519sI8dKQ1--FpzQeCVX4rVzBrT0wXrVXlw8QfdPWMTDAx7Xz8QawVuD4feXP7QqJIKz0bkQ2DFiBvyz31Nq0qrpnjbNMlHweDbE_beQi9-Nlc1xPyMzQc',
    specs: {
      area: '11,000 Sq. Ft.',
      beds: '5 En-Suites',
      feature: 'Private Sky Pool',
      featureIcon: 'pool',
    },
    refCode: 'WL-CAM-09',
  },
  {
    id: '2',
    slug: 'the-duplex-horizon-penthouse',
    name: 'The Duplex Horizon Penthouse',
    tagline:
      'Multi-generational residence in DLF The Aralias. Spans two levels with Statuario marble and uninterrupted Aravali vistas.',
    location: 'Sector 42 • Golf Course Rd',
    price: '₹52.00 Cr',
    badge: 'Signature Duplex',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmGgDjopcR_ERMHMgtNPs6OfCQu_iaTAzTPliEf_7Xo5aQvBS4UTaoWTYfDTL33lq7RyqfKcbrIRWXo4fPuOd_mFCdmDU6PEN6yj8XxQF5ZRpC_tz_t_pdWo1uaDsa-YSH2zZOO_wU4jIMD09tXyL3Nkt-Gq8RY5Yxuv2EAObQrqzWcGEPkUl6hd0dg_DUkY4je_0ZiuwYkNvPDUEvQcy45uiPbYY5D5sMOO03CAD6',
    specs: {
      area: '9,800 Sq. Ft.',
      beds: '5 BHK Duplex',
      feature: 'Private Elevator',
      featureIcon: 'elevator',
    },
    refCode: 'WL-ARA-18',
  },
  {
    id: '3',
    slug: 'double-height-glass-residence',
    name: 'Double-Height Glass Residence',
    tagline:
      'Featuring 22-foot double-volume living spaces, private elevator foyer, dedicated personal butler service, and private dining lounge.',
    location: 'Sector 65 • Golf Ext.',
    price: '₹28.50 Cr',
    badge: 'Global Landmark',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVzjtLrivKKoAApz9mK-xwY7nF72IlSV1GLMCy_x_mC3h3hV4_KwDtc75e3DoxVgmjkbksXJu-TcrzSp6aWz9T_QN8RnTRtb1d4EaJZyKLYSbUlwv7yVn7Wkcux5LqFmAdmFGegLxEgps6en-Iy2astm4fXBvADjZ00cRaKTWv0LImTEXoRQ8KT5WM6Xxif4gphimhTaREln9UBwFWR2nrPj-9xSYGgknI6r7iBPGX',
    specs: {
      area: '7,500 Sq. Ft.',
      beds: '4 Grand Suites',
      feature: 'Private Butler',
      featureIcon: 'room_service',
    },
    refCode: 'WL-TRM-32',
  },
];

export function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState('All Residences');

  return (
    <section className="relative w-full py-28 bg-[#FAF7F0] text-[#141414] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        {/* Section Header with Light Theme Elegance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.25em] text-[#B8892F] font-semibold">
                Private Collection
              </span>
              <span className="text-[#B8892F] text-[10px]">◆</span>
              <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.2em] text-[#8C867A]">
                Curated Portfolio
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-[#141414] tracking-tight font-normal">
              Featured Residences
            </h2>
          </motion.div>

          {/* Filter Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {['All Residences', 'Golf Course Rd', 'DLF Phase 5', 'Penthouses'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#141414] text-[#FAF7F0] shadow-md font-semibold'
                    : 'bg-[#ECE8DF] text-[#555045] hover:bg-[#E2DDD3] hover:text-[#141414]'
                }`}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={() => setActiveTab('Confidential')}
              className={`px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'Confidential'
                  ? 'bg-[#B8892F] text-white shadow-md font-semibold'
                  : 'bg-[#ECE8DF] text-[#B8892F] hover:bg-[#E2DDD3]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8892F] animate-pulse" />
              <span>Confidential</span>
            </button>
          </div>
        </div>

        {/* 3-Column Luxury Property Folio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultProperties.map((prop, idx) => (
            <motion.article
              key={prop.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.12 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl overflow-hidden bg-white border border-[#E6E0D4] shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_22px_45px_rgba(201,162,75,0.18)] hover:border-[#C9A24B] transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Viewport with filmic zoom */}
              <div>
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#e0ded8]">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
                    style={{ backgroundImage: `url('${prop.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-sm bg-white/95 backdrop-blur-md text-[#141414] font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.2em] font-semibold shadow-sm">
                      {prop.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.18em] text-[#FAF7F0] drop-shadow-sm">
                      {prop.location}
                    </span>
                    <span className="font-headline-sm text-headline-sm text-[#E8C872] font-semibold drop-shadow">
                      {prop.price}
                    </span>
                  </div>
                </div>

                {/* Metadata & Details */}
                <div className="p-6 space-y-3">
                  <h3 className="font-headline-sm text-headline-sm text-[#141414] font-normal group-hover:text-[#B8892F] transition-colors leading-snug">
                    {prop.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#666055] font-light leading-relaxed">
                    {prop.tagline}
                  </p>

                  {/* Specification Tag Rows */}
                  <div className="pt-3 flex flex-wrap items-center gap-y-2 text-[#444] font-body-sm text-body-sm border-t border-[#F0ECE1]">
                    <span className="flex items-center gap-1.5 mr-4 text-[#222] font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#B8892F]">
                        square_foot
                      </span>
                      <span>{prop.specs.area}</span>
                    </span>
                    <span className="flex items-center gap-1.5 mr-4 text-[#222] font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#B8892F]">
                        bed
                      </span>
                      <span>{prop.specs.beds}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[#222] font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#B8892F]">
                        {prop.specs.featureIcon}
                      </span>
                      <span>{prop.specs.feature}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#F0ECE1]">
                <Link
                  className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-[0.14em] text-[#B8892F] hover:text-[#141414] group-hover:translate-x-1 transition-all font-semibold"
                  href="/contact"
                >
                  <span>Request Private Tour</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
                </Link>
                <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.15em] text-[#9E978C]">
                  Ref: {prop.refCode}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Ingress to Private Vault - High-Contrast Dark Accent */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#141414] text-[#FAF7F0] border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[22px]">lock</span>
              <span className="font-headline-sm text-headline-sm text-[#FAF7F0]">
                Seeking Confidential Off-Market Mandates?
              </span>
            </div>
            <p className="font-body-md text-body-md text-[#d1c5b2] font-light max-w-3xl">
              We hold 14 non-public penthouses and bungalows across Golf Course Road reserved
              exclusively for institutional clients and family offices.
            </p>
          </div>
          <Link
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-container via-primary to-primary-fixed text-on-primary font-label-md text-label-md font-semibold uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_4px_18px_rgba(201,162,75,0.3)] hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
            href="/contact"
          >
            Access The Private Vault
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

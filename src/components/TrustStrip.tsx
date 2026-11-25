'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TrustStripProps {
  experienceYears?: string;
  happyClients?: string;
  projectsCurated?: string;
  transactionVolume?: string;
}

export default function TrustStrip({
  experienceYears = '30+',
  happyClients = '',
  projectsCurated = '',
  transactionVolume = '',
}: TrustStripProps) {
  // Only show stats that have verified non-empty values
  const stats = [
    { value: experienceYears || '30+', label: 'Years Advisory Lineage' },
    ...(happyClients ? [{ value: happyClients, label: 'Happy Clients' }] : []),
    ...(projectsCurated ? [{ value: projectsCurated, label: 'Curated Projects' }] : []),
    ...(transactionVolume ? [{ value: transactionVolume, label: 'in Transactions' }] : []),
  ];

  if (stats.length === 0) return null;

  return (
    <section className="bg-[#14110C] border-y border-[#C8A24A]/20 py-12">
      <div className="w-[90%] max-w-[1440px] mx-auto">
        <div
          className={`grid gap-8 text-center items-center justify-center ${
            stats.length === 1
              ? 'grid-cols-1 max-w-xs mx-auto'
              : stats.length === 2
              ? 'grid-cols-2 max-w-lg mx-auto'
              : stats.length === 3
              ? 'grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto'
              : 'grid-cols-2 md:grid-cols-4'
          }`}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-2 p-2 cursor-default"
            >
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#E3C06F] tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A9A294] font-sans font-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

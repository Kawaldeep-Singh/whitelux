'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TrustStrip() {
  const stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '500+', label: 'Happy Clients' },
    { value: '50+', label: 'Projects Curated' },
    { value: '₹1,000 Cr+', label: 'in Transactions' },
  ];

  return (
    <section className="bg-[#14110C] border-y border-[#C8A24A]/20 py-14">
      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="space-y-2 p-2 transition-transform duration-300 cursor-default"
            >
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#E3C06F] tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#A9A294] font-sans">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CredibilityItem } from '@/types';

interface CredibilityStripProps {
  items?: CredibilityItem[];
}

export default function CredibilityStrip({ items }: CredibilityStripProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#14110C] border-y border-[#C8A24A]/25 py-8 relative z-20">
      <div className="w-[90%] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-center divide-y sm:divide-y-0 sm:divide-x divide-[#C8A24A]/15">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`flex flex-col items-center text-center justify-center ${
                idx > 0 ? 'pt-4 sm:pt-0 sm:pl-4 lg:pl-6' : ''
              }`}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A24A] font-sans font-medium mb-1">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm text-[#F4ECD8] font-medium tracking-wide">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

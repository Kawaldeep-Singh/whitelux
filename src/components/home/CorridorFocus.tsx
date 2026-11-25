'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CorridorSettings } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CorridorFocusProps {
  corridor?: CorridorSettings;
}

const SECTORS = [
  { num: '58', name: 'Sector 58' },
  { num: '59', name: 'Sector 59' },
  { num: '60', name: 'Sector 60' },
  { num: '61', name: 'Sector 61' },
  { num: '62', name: 'Sector 62' },
  { num: '63', name: 'Sector 63', highlight: 'solid', label: 'Pick' },
  { num: '64', name: 'Sector 64' },
  { num: '65', name: 'Sector 65' },
  { num: '66', name: 'Sector 66' },
  { num: '67', name: 'Sector 67', highlight: 'outline', label: 'Office' },
  { num: '68', name: 'Sector 68' },
];

export default function CorridorFocus({ corridor }: CorridorFocusProps) {
  const heading = corridor?.heading || 'Golf Course Extension Road, Sectors 58 to 68.';
  const body = corridor?.body;
  const reportSlug = corridor?.reportSlug;

  return (
    <section className="bg-[#0D0D0D] py-24 sm:py-28 relative border-b border-[#C8A24A]/25">
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A24A]/20 pb-8">
          <div className="space-y-3 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium inline-block">
                CORRIDOR FOCUS
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] font-normal"
            >
              {heading}
            </motion.h2>
            {body && body.trim() !== '' && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-base text-[#A9A294] font-light leading-relaxed pt-1"
              >
                {body}
              </motion.p>
            )}
          </div>

          {reportSlug && reportSlug.trim() !== '' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href={`/blog/${reportSlug}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#C8A24A] hover:text-[#E3C06F] transition-colors group"
              >
                <span>Read the corridor report</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* 4-Column Grid of Sectors 58-68 */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SECTORS.map((sec, idx) => {
              const isSolid = sec.highlight === 'solid';
              const isOutline = sec.highlight === 'outline';

              return (
                <motion.div
                  key={sec.num}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`p-5 rounded-[2px] relative transition-all duration-300 ${
                    isSolid
                      ? 'bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] shadow-[0_4px_25px_rgba(200,162,74,0.3)]'
                      : isOutline
                      ? 'bg-[#14110C] border-2 border-[#C8A24A] text-[#F4ECD8]'
                      : 'bg-[#14110C] border border-[#C8A24A]/20 text-[#A9A294] hover:border-[#C8A24A]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-serif text-2xl font-medium tracking-wide ${
                        isSolid ? 'text-[#0D0D0D] font-bold' : isOutline ? 'text-[#E3C06F]' : 'text-[#F4ECD8]'
                      }`}
                    >
                      {sec.name}
                    </span>
                    {sec.label && (
                      <span
                        className={`text-[9px] uppercase tracking-[0.2em] font-sans font-bold px-2 py-0.5 rounded-[2px] ${
                          isSolid
                            ? 'bg-[#0D0D0D] text-[#C8A24A]'
                            : 'bg-[#C8A24A] text-[#0D0D0D]'
                        }`}
                      >
                        {sec.label}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-[0.16em] block ${
                      isSolid ? 'text-[#0D0D0D]/80 font-medium' : 'text-[#A9A294]/70'
                    }`}
                  >
                    Golf Course Ext. Rd
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-6 pt-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C8A24A] font-sans font-semibold">
              63 PICK · 67 OFFICE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Understand',
    desc: 'Your goals, horizon, tax and family picture, before any site visit.',
  },
  {
    num: '02',
    title: 'Research',
    desc: 'Developer track record, pricing history and corridor supply.',
  },
  {
    num: '03',
    title: 'Shortlist',
    desc: 'Three options at most, each with a clear reason and a clear risk.',
  },
  {
    num: '04',
    title: 'Negotiate',
    desc: 'Price, payment plan and terms, on your side of the table.',
  },
  {
    num: '05',
    title: 'Close & beyond',
    desc: 'Documentation, financing, possession and leasing after handover.',
  },
];

export default function AdvisoryApproach() {
  return (
    <section className="bg-[#0D0D0D] py-24 sm:py-28 relative border-b border-[#C8A24A]/25">
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium inline-block border-b border-[#C8A24A]/40 pb-1">
              THE ADVISORY APPROACH
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] font-normal leading-tight"
          >
            Disciplined. Analytical.{' '}
            <span className="italic text-[#E3C06F]">On your side of the table.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-[#A9A294] font-light max-w-2xl leading-relaxed"
          >
            We operate as private fiduciaries, not commission-driven salespeople. Our 5-stage advisory framework ensures institutional rigor at every step.
          </motion.p>
        </div>

        {/* 5-Step Grid with Gold Hairline Tops */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="pt-6 border-t border-[#C8A24A]/40 space-y-3.5 group hover:border-[#C8A24A] transition-colors"
            >
              <span className="font-serif text-2xl text-[#C8A24A] font-light tracking-widest block">
                {step.num}
              </span>
              <h3 className="font-serif text-xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors font-medium">
                {step.title}
              </h3>
              <p className="text-xs text-[#A9A294] leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

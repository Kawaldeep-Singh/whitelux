'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WHY_POINTS = [
  {
    num: '01',
    title: 'Transparent Dealings',
    desc: 'Clear information on pricing, payment plans and terms. No hidden surprises.',
  },
  {
    num: '02',
    title: 'Market Expertise',
    desc: 'Deep local knowledge of Gurgaon’s sectors, builders and price trends.',
  },
  {
    num: '03',
    title: 'Early & Exclusive Access',
    desc: 'Pre-launch projects and select opportunities before they reach the open market.',
  },
  {
    num: '04',
    title: 'Personalised Shortlisting',
    desc: 'Options chosen around your needs, not a generic list.',
  },
  {
    num: '05',
    title: 'End-to-End Support',
    desc: 'From site visits and negotiation to documentation and after-sales care.',
  },
  {
    num: '06',
    title: 'Ethical Advice',
    desc: 'We recommend what is right for you, even when it is not the quickest deal.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-[#F6F0E3] text-[#1A1712] py-24 md:py-32 border-t border-[#C8A24A]/20">
      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A5C16] font-sans font-semibold block">
            WHY WHITE LUXE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1712] font-normal">
            The White Luxe difference
          </h2>
        </div>

        {/* 6 Numbered Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {WHY_POINTS.map((pt, idx) => (
            <motion.div
              key={pt.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -6, backgroundColor: '#FFFFFF', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}
              className="p-8 md:p-10 bg-white/70 border border-[#C8A24A]/25 rounded-[2px] space-y-3 transition-all duration-300 cursor-default"
            >
              <div className="font-serif text-2xl text-[#7A5C16] font-normal">
                {pt.num}.
              </div>
              <h3 className="font-serif text-2xl text-[#1A1712] font-normal">
                {pt.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A453D] font-light leading-relaxed">
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

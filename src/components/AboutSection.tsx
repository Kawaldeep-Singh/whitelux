'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="bg-[#F6F0E3] text-[#1A1712] py-24 md:py-32">
      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Logo Card Left */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
              transition={{ duration: 0.4 }}
              className="relative p-8 md:p-12 bg-[#0D0D0D] border border-[#C8A24A]/40 rounded-[2px] shadow-2xl text-center max-w-sm w-full space-y-4 group cursor-default"
            >
              <img
                src="/logo.jpeg"
                alt="White Luxe Monogram"
                className="w-24 h-auto mx-auto object-contain rounded-[2px] border border-[#C8A24A]/30 p-1 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pt-2 border-t border-[#C8A24A]/25">
                <h3 className="font-serif text-xl tracking-[0.25em] text-[#F4ECD8] font-normal uppercase group-hover:text-[#E3C06F] transition-colors">
                  WHITE LUXE
                </h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans mt-1">
                  Gurgaon • Private Office
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content Right */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A5C16] font-sans font-semibold block">
              ABOUT WHITE LUXE
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1712] font-normal leading-[1.15]">
              Advice you can trust. Properties you will love.
            </h2>

            <p className="text-[#3A352D] text-sm md:text-base font-light leading-relaxed">
              At White Luxe, we believe a property decision is one of the most important you will ever make. We do not push inventory. We listen, research and advise, so that every recommendation fits your goals, your budget and your future. From a family home to a landmark commercial investment, we bring clarity, honesty and access to the finest addresses in Gurgaon.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#7A5C16] text-[#7A5C16] hover:bg-[#7A5C16] hover:text-[#F6F0E3] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-sm"
              >
                <span>Know More About Us</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

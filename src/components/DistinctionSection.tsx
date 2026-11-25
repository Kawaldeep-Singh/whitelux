'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function DistinctionSection() {
  return (
    <section className="relative w-full py-28 bg-[#111111] text-[#FAF7F0] overflow-hidden">
      {/* Subtle Right Ambient Flare */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Masterpiece Architectural Composition */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#1c1c1c] border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <div
                className="w-full aspect-[4/5] bg-cover bg-center hover:scale-105 transition-transform duration-700"
                data-alt="Interior luxury living room"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsEkWq3nFdTmbkxiSlKQqEktRQ6Sh_LW4RB7Yui4-mMuaGlsGT3TZO9F3DTPBa59F0AnUKCqputyE-aK_1lpSkBCOCu5BsCeIEN18bplgVCcvY20lHceJr_aZh4E8FWOg8uiRc0QIIlqcpDh7xcP-GBOIMVqJefsiClOE0dcdbXBWQdr5_767IKDxxycnsxfNLCAPvg2VqIKEk8IBCByGCgoA4pjJmJYYzy-AV66zB')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent" />
            </div>

            {/* Architectural Callout Accent Plaque */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 p-6 rounded-xl bg-[#1c1c1c]/95 backdrop-blur-xl border border-primary/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] max-w-xs hidden sm:block"
            >
              <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.2em] text-primary block mb-1 font-semibold">
                Fiduciary Standard
              </span>
              <p className="font-body-sm text-body-sm text-[#d4cbbe] font-light italic">
                “Discretion is not an option; it is our paramount operating architecture.”
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Editorial Philosophy & Clean Pillars */}
          <div className="lg:col-span-7 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-3"
            >
              <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.28em] text-primary block font-medium">
                The White Luxe Distinction
              </span>
              <h2 className="font-headline-display text-headline-display max-w-2xl text-[#FAF7F0] font-light tracking-tight leading-tight">
                Unrivaled Discretion. Generational Assets.
              </h2>
              <p className="font-body-lg text-body-lg text-[#cdc3b4] font-light leading-relaxed">
                Advising India’s prominent families and visionary founders with deep market research,
                strict confidentiality, and exclusive access to unlisted properties.
              </p>
            </motion.div>

            {/* 3 Clean Spaced Pillars */}
            <div className="space-y-3.5 pt-1">
              {[
                {
                  num: '01',
                  title: 'Fiduciary Discretion & Qualified Vetting',
                  desc: 'All off-market estates require non-disclosure agreements and buyer verification prior to private viewings.',
                },
                {
                  num: '02',
                  title: 'Off-Market Mandates',
                  desc: 'Over 60% of our ultra-luxury transactions occur entirely off-market, passing between family offices without public listing.',
                },
                {
                  num: '03',
                  title: 'End-to-End Conveyance & Legal Desk',
                  desc: 'Full title verification, HARERA legal compliance, and multi-jurisdictional wealth office coordination.',
                },
              ].map((pillar, idx) => (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.12 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-5 p-4 rounded-xl bg-[#191919] border border-primary/15 hover:border-primary/45 transition-all duration-300"
                >
                  <span className="font-headline-md text-headline-md text-primary font-light tracking-tight shrink-0">
                    {pillar.num}
                  </span>
                  <div className="space-y-0.5">
                    <h4 className="font-label-md text-label-md font-semibold uppercase tracking-[0.12em] text-[#FAF7F0]">
                      {pillar.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-[#b0a595] font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Primary CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2"
            >
              <Link
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container via-primary to-primary-fixed text-on-primary font-label-md text-label-md font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_6px_22px_rgba(201,162,75,0.3)] hover:scale-105 active:scale-95 gap-3 cursor-pointer"
                href="/contact"
              >
                <span>Book a Consultation</span>
                <span className="material-symbols-outlined text-[17px]">calendar_today</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

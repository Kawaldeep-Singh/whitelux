'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '@/types';
import { Quote } from 'lucide-react';

interface ClientVoicesProps {
  testimonials: Testimonial[];
}

export default function ClientVoices({ testimonials }: ClientVoicesProps) {
  // Only show max 2 featured testimonials if they exist
  const featuredTestimonials = testimonials.filter((t) => t.featured).slice(0, 2);

  if (featuredTestimonials.length === 0) return null;

  return (
    <section className="bg-[#14110C] py-24 sm:py-28 relative border-b border-[#C8A24A]/25">
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
              CLIENT VOICES
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] font-normal"
          >
            Discreet Client Perspectives
          </motion.h2>
        </div>

        {/* 2 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredTestimonials.map((t, idx) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] space-y-6"
            >
              <Quote size={24} className="text-[#C8A24A]/60" />
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#F4ECD8] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="border-t border-[#C8A24A]/15 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm text-[#F4ECD8]">{t.clientName}</h4>
                  <p className="text-xs text-[#A9A294] font-light">{t.clientLocation}</p>
                </div>
                {t.project && (
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#C8A24A] font-sans font-semibold">
                    {t.project}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

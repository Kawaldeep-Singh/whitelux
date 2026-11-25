'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FoundersNoteProps {
  quote?: string;
  body?: string;
  founderName?: string;
  founderPortrait?: string;
}

export default function FoundersNote({
  quote,
  body,
  founderName = 'Rohit Raj Maingi',
  founderPortrait,
}: FoundersNoteProps) {
  const portrait = founderPortrait || '/images/rohit-raj-maingi.png';
  const quoteText =
    quote ||
    'I spent 18 years helping families grow their wealth in private banking. Property is usually the largest decision on that balance sheet, and it deserves the same discipline.';

  return (
    <section className="bg-[#F6F0E3] text-[#1A1712] py-24 sm:py-28 relative overflow-hidden border-b border-[#C8A24A]/30">
      <div className="w-[90%] max-w-[1080px] mx-auto text-center space-y-8">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A5C16] font-sans font-semibold inline-block border-b border-[#7A5C16]/30 pb-1">
            A NOTE FROM THE FOUNDER
          </span>
        </motion.div>

        {/* Large Italic Cormorant Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] text-[#1A1712] font-normal max-w-4xl mx-auto"
        >
          &ldquo;{quoteText}&rdquo;
        </motion.blockquote>

        {/* Optional Body Paragraph (Hidden if empty) */}
        {body && body.trim() !== '' && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm sm:text-base text-[#4A453E] max-w-2xl mx-auto leading-relaxed font-light"
          >
            {body}
          </motion.p>
        )}

        {/* Signature & Link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="pt-4 flex flex-col items-center gap-3"
        >
          {portrait && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#C8A24A] shadow-[0_4px_20px_rgba(200,162,74,0.3)] mb-1 bg-gradient-to-b from-[#221D16] to-[#0D0D0D]">
              <img
                src={portrait}
                alt={founderName}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
          <div className="font-serif text-xl sm:text-2xl text-[#1A1712] tracking-wide font-medium italic">
            — {founderName}
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#7A5C16] hover:text-[#1A1712] transition-colors group mt-2"
          >
            <span>Read my story</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

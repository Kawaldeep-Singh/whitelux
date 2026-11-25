'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If navigating to admin, skip loading immediately
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      setLoading(false);
      return;
    }

    // Disable body scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="white-luxe-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#080808] text-[#F4ECD8] select-none pointer-events-auto"
        >
          {/* Subtle Ambient Radial Gold Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 0.22 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="absolute w-[600px] h-[600px] rounded-full bg-[#C8A24A] blur-[160px] pointer-events-none"
          />

          {/* Decorative Corner Accents (Subtle Luxury Frames) */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#C8A24A]/40 pointer-events-none" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#C8A24A]/40 pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[#C8A24A]/40 pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#C8A24A]/40 pointer-events-none" />

          {/* Central Brand Composition */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
            {/* Crest / Logo Reveal - Enlarged */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 relative"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[3px] p-2 bg-[#14110C] border-2 border-[#C8A24A]/50 shadow-[0_0_40px_rgba(200,162,74,0.35)] flex items-center justify-center">
                <img
                  src="/logo.jpeg"
                  alt="White Luxe"
                  className="w-full h-full object-contain rounded-[2px]"
                />
              </div>
            </motion.div>

            {/* WHITE LUXE Title - Enlarged & Tracked */}
            <motion.h1
              initial={{ opacity: 0, y: 14, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.24em' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F4ECD8] uppercase font-normal tracking-[0.24em] leading-tight"
            >
              WHITE LUXE
            </motion.h1>

            {/* Expanding Hairline Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.45, ease: 'easeInOut' }}
              className="w-32 sm:w-44 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A24A] to-transparent my-4"
            />

            {/* by Rohit Raj Maingi - Enlarged */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
              className="flex items-center gap-2"
            >
              <span className="font-sans text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] text-[#E3C06F] font-semibold">
                by Rohit Raj Maingi
              </span>
            </motion.div>

            {/* Micro Positioning Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
              className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#A9A294] mt-2.5 font-light"
            >
              Advisory. Not Agency.
            </motion.p>

            {/* Minimalist Gold Shimmer Progress Indicator */}
            <div className="w-44 sm:w-56 h-[2px] bg-[#1C1812] rounded-full overflow-hidden mt-8 relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.3,
                  ease: 'easeInOut',
                }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#E3C06F] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

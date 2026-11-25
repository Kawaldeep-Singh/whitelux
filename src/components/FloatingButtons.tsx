'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingButtons() {
  const whatsappUrl =
    'https://wa.me/919958009492?text=' +
    encodeURIComponent('Hello White Luxe, I would like to know more about your properties.');

  return (
    <aside className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating Call Button */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto group relative flex items-center"
      >
        <span className="absolute right-14 mr-2 hidden group-hover:block whitespace-nowrap bg-[#14110C]/95 text-[#F4ECD8] text-[11px] uppercase tracking-wider py-1 px-3 rounded-[2px] border border-[#C8A24A]/30 backdrop-blur-md shadow-xl font-sans">
          Direct Line: +91 9958009492
        </span>
        <a
          href="tel:+919958009492"
          aria-label="Direct Phone Line to White Luxe"
          className="w-11 h-11 rounded-[2px] bg-[#0D0D0D] border border-[#C8A24A] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#0D0D0D] flex items-center justify-center transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          <Phone size={18} />
        </a>
      </motion.div>

      {/* Floating WhatsApp Button */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto group relative flex items-center"
      >
        <span className="absolute right-14 mr-2 hidden group-hover:block whitespace-nowrap bg-[#14110C]/95 text-[#F4ECD8] text-[11px] uppercase tracking-wider py-1 px-3 rounded-[2px] border border-[#C8A24A]/30 backdrop-blur-md shadow-xl font-sans">
          WhatsApp Advisory
        </span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp White Luxe Advisors"
          className="w-11 h-11 rounded-[2px] bg-gradient-to-br from-[#B8892F] to-[#E8C872] text-[#0D0D0D] flex items-center justify-center transition-shadow duration-300 shadow-[0_4px_20px_rgba(200,162,74,0.35)] hover:shadow-[0_4px_25px_rgba(200,162,74,0.55)]"
        >
          <MessageCircle size={19} />
        </a>
      </motion.div>
    </aside>
  );
}

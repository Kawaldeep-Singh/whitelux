'use client';

import React from 'react';

export function FloatingActions() {
  return (
    <aside className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Direct Private Line */}
      <div className="pointer-events-auto group relative flex items-center">
        <span className="absolute right-14 mr-2 hidden group-hover:block whitespace-nowrap bg-surface-container-high/90 text-on-surface font-label-sm text-label-sm uppercase tracking-wider py-1.5 px-3 rounded-[2px] border border-primary/20 backdrop-blur-md shadow-xl">
          Direct Private Line
        </span>
        <a
          aria-label="Call White Luxe Private Office"
          className="w-12 h-12 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl border border-primary/40 text-primary flex items-center justify-center transition-all duration-300 hover:border-primary hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          href="tel:+919815202102"
        >
          <span className="material-symbols-outlined text-[20px]">call</span>
        </a>
      </div>

      {/* WhatsApp Floating Chat */}
      <div className="pointer-events-auto group relative flex items-center">
        <span className="absolute right-14 mr-2 hidden group-hover:block whitespace-nowrap bg-surface-container-high/90 text-on-surface font-label-sm text-label-sm uppercase tracking-wider py-1.5 px-3 rounded-[2px] border border-primary/20 backdrop-blur-md shadow-xl">
          Chat with Rohit Raj Maingi
        </span>
        <a
          aria-label="WhatsApp Rohit Raj Maingi"
          className="w-12 h-12 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl border border-primary/40 text-primary flex items-center justify-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(235,193,102,0.35)] hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          href="https://wa.me/919815202102?text=Hello%20Rohit%2C%20I%20would%20like%20to%20schedule%20a%20private%20advisory%20consultation%20regarding%20Gurgaon%20luxury%20properties."
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-[22px]">forum</span>
        </a>
      </div>
    </aside>
  );
}

export default FloatingActions;

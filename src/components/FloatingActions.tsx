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
          href="tel:+919810058930"
        >
          <span className="material-symbols-outlined text-[20px]">call</span>
        </a>
      </div>

      {/* WhatsApp Floating Chat */}
      <div className="pointer-events-auto group relative flex items-center">
        <span className="absolute right-14 mr-2 hidden group-hover:block whitespace-nowrap bg-surface-container-high/90 text-on-surface font-label-sm text-label-sm uppercase tracking-wider py-1.5 px-3 rounded-[2px] border border-primary/20 backdrop-blur-md shadow-xl">
          Chat with Private Advisor
        </span>
        <a
          aria-label="WhatsApp White Luxe Private Office"
          className="w-12 h-12 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl border border-primary/40 text-primary flex items-center justify-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(235,193,102,0.35)] hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          href="https://wa.me/919810058930?text=Hello%20White%20Luxe,%20I%20would%20like%20to%20know%20more%20about%20your%20properties."
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

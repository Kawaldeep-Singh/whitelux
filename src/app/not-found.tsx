import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#FAF7F0] text-[#131313] min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="max-w-md w-full bg-white border border-[#E5E2DB] rounded-lg p-10 text-center shadow-lg space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F0] border border-[#C9A24B] flex items-center justify-center text-[#B8892F] mx-auto">
            <Compass size={28} />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-[#C9A24B] font-semibold">
              ERROR 404
            </span>
            <h1 className="font-serif text-3xl text-[#131313]">
              This page could not be found.
            </h1>
            <p className="text-xs text-[#666] font-light leading-relaxed">
              The address may have changed, or the property may have been acquired and moved to our private archives.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0B0B] hover:bg-[#C9A24B] text-[#FAF7F0] hover:text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-md"
            >
              <span>Back to Home</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

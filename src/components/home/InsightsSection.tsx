'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReelItem, Blog } from '@/types';
import { ArrowRight, Play, ExternalLink, BookOpen } from 'lucide-react';

interface InsightsSectionProps {
  reels?: ReelItem[];
  latestBlog?: Blog | null;
  instagramHandle?: string;
  instagramUrl?: string;
}

export default function InsightsSection({
  reels = [],
  latestBlog,
  instagramHandle = '@rohitmaing77',
  instagramUrl = 'https://www.instagram.com/rohitmaing77',
}: InsightsSectionProps) {
  const displayReels = reels.slice(0, 3);
  const hasReels = displayReels.length > 0;
  const hasBlog = Boolean(latestBlog);

  if (!hasReels && !hasBlog) return null;

  return (
    <section className="bg-[#0D0D0D] py-24 sm:py-28 relative border-b border-[#C8A24A]/25">
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A24A]/20 pb-8">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium inline-block">
                MARKET DISCOURSE
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] font-normal"
            >
              On camera, <span className="italic text-[#E3C06F]">on record.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#C8A24A] hover:text-[#E3C06F] transition-colors group"
            >
              <span>Follow {instagramHandle}</span>
              <ExternalLink size={14} className="transition-transform group-hover:scale-110" />
            </a>
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Latest Article Card (Takes 5 or 12 cols) */}
          {hasBlog && latestBlog && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`${
                hasReels ? 'lg:col-span-5' : 'lg:col-span-8 mx-auto'
              } flex flex-col justify-between p-8 bg-[#14110C] border border-[#C8A24A]/30 rounded-[2px] relative overflow-hidden group hover:border-[#C8A24A] transition-colors`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8A24A] font-sans font-semibold px-2.5 py-1 bg-[#C8A24A]/10 border border-[#C8A24A]/25 rounded-[2px]">
                    LATEST ARTICLE
                  </span>
                  <span className="text-xs text-[#A9A294] font-light">
                    {latestBlog.readTime}
                  </span>
                </div>

                <div className="pt-2 space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#A9A294] font-medium block">
                    {latestBlog.category}
                  </span>
                  <Link href={`/blog/${latestBlog.slug}`}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors font-medium leading-snug">
                      {latestBlog.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#A9A294] leading-relaxed font-light line-clamp-3">
                    {latestBlog.summary}
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/blog/${latestBlog.slug}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[#C8A24A] group-hover:text-[#F4ECD8] transition-colors"
                >
                  <BookOpen size={14} />
                  <span>Read Article</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Reels Column (Takes 7 cols) */}
          {hasReels && (
            <div className={`${hasBlog ? 'lg:col-span-7' : 'lg:col-span-12'} grid grid-cols-1 sm:grid-cols-3 gap-5`}>
              {displayReels.map((reel, idx) => (
                <motion.a
                  key={idx}
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group flex flex-col bg-[#14110C] border border-[#C8A24A]/25 hover:border-[#C8A24A] rounded-[2px] overflow-hidden transition-all duration-300"
                >
                  <div className="relative aspect-[9/14] bg-[#080808] overflow-hidden flex items-center justify-center">
                    {reel.thumbnail ? (
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-t from-[#0D0D0D] to-[#14110C] flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#C8A24A]/20 border border-[#C8A24A]/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={20} className="text-[#E3C06F] ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/60 text-[#C8A24A]">
                      <ExternalLink size={12} />
                    </div>
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs text-[#F4ECD8] font-medium line-clamp-2 group-hover:text-[#E3C06F] transition-colors leading-snug">
                      {reel.title}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

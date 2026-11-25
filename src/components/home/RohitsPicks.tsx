'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ArrowRight, MapPin } from 'lucide-react';

interface RohitsPicksProps {
  projects: Project[];
}

export default function RohitsPicks({ projects }: RohitsPicksProps) {
  // Filter for projects marked isPick, sort by pickRank ascending, take max 3
  const picks = projects
    .filter((p) => p.isPick)
    .sort((a, b) => (a.pickRank || 99) - (b.pickRank || 99))
    .slice(0, 3);

  if (picks.length === 0) return null;

  return (
    <section className="bg-[#080808] py-24 sm:py-28 relative border-b border-[#C8A24A]/25">
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-14">
        {/* Header with Title and Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A24A]/20 pb-8">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium inline-block">
                CURATED ADVISORY SELECTION
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] font-normal"
            >
              Three I would buy today,{' '}
              <span className="italic text-[#E3C06F]">and why.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#C8A24A] hover:text-[#E3C06F] transition-colors group"
            >
              <span>View all properties</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* 3-Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {picks.map((project, idx) => {
            const hasQuote = Boolean(project.pickNote && project.pickNote.trim() !== '');
            const isTopPick = project.pickBadge?.toLowerCase() === 'top pick';

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group flex flex-col bg-[#14110C] border border-[#C8A24A]/25 hover:border-[#C8A24A] rounded-[2px] overflow-hidden transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image */}
                <Link href={`/properties/${project.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                  <img
                    src={project.heroImage || '/home-page.png'}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110C] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {project.pickBadge ? (
                      <span
                        className={`text-[10px] uppercase tracking-[0.2em] font-sans font-semibold px-2.5 py-1 rounded-[2px] ${
                          isTopPick
                            ? 'bg-[#C8A24A] text-[#0D0D0D] shadow-md'
                            : 'bg-[#14110C]/90 text-[#E3C06F] border border-[#C8A24A]/40'
                        }`}
                      >
                        {project.pickBadge}
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium px-2 py-0.5 rounded-[2px] bg-[#14110C]/80 text-[#A9A294] border border-[#A9A294]/30 backdrop-blur-sm">
                        {project.status === 'ready'
                          ? 'Ready to Move'
                          : project.status === 'upcoming'
                          ? 'New Launch'
                          : 'Under Construction'}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Link href={`/properties/${project.slug}`}>
                      <h3 className="font-serif text-2xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors font-medium">
                        {project.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#A9A294] flex items-center gap-1.5 font-light">
                      <MapPin size={13} className="text-[#C8A24A] flex-shrink-0" />
                      <span>{project.location}</span>
                      <span className="text-[#C8A24A] mx-1">·</span>
                      <span className="text-[#E3C06F] font-medium">From {project.startingPrice}</span>
                    </p>
                  </div>

                  {/* Italic Quote (Hides cleanly if empty) */}
                  {hasQuote && (
                    <div className="pt-3 border-t border-[#C8A24A]/15">
                      <p className="font-serif italic text-sm text-[#F4ECD8]/90 leading-relaxed">
                        <span className="text-[#C8A24A] font-sans not-italic text-xs font-semibold mr-1">
                          Why I&apos;d buy it:
                        </span>
                        &ldquo;{project.pickNote}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="pt-2">
                    <Link
                      href={`/properties/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#C8A24A] group-hover:text-[#F4ECD8] transition-colors font-semibold"
                    >
                      <span>Explore details</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small Muted RERA Line */}
        <div className="text-center pt-4">
          <p className="text-[11px] text-[#A9A294]/60 font-sans tracking-wide">
            Personal views, not investment advice. Verify with the developer and Haryana RERA.
          </p>
        </div>
      </div>
    </section>
  );
}

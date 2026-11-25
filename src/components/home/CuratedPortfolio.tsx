'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ArrowRight, MapPin, Building2, Home, Landmark, PlusCircle } from 'lucide-react';

interface CuratedPortfolioProps {
  projects: Project[];
}

export default function CuratedPortfolio({ projects }: CuratedPortfolioProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'all') return true;
    const typeStr = (project.type || '').toLowerCase();
    if (activeTab === 'residential') {
      return (
        typeStr.includes('residential') ||
        typeStr.includes('apartment') ||
        typeStr.includes('villa') ||
        typeStr.includes('luxury')
      );
    }
    if (activeTab === 'commercial') {
      return (
        typeStr.includes('commercial') ||
        typeStr.includes('sco') ||
        typeStr.includes('retail') ||
        typeStr.includes('office')
      );
    }
    return true;
  });

  return (
    <section id="portfolio" className="bg-[#0D0D0D] py-24 sm:py-28 relative border-b border-[#C8A24A]/25">
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A24A]/20 pb-8">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium inline-block">
                CURATED PORTFOLIO & VERIFIED DEVELOPMENTS
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] font-normal"
            >
              Prime Residences &{' '}
              <span className="italic text-[#E3C06F]">Commercial Landmark Assets.</span>
            </motion.h2>
            <p className="text-xs sm:text-sm text-[#A9A294] font-light max-w-2xl leading-relaxed">
              Institutional underwriting, verified developer pricing, and exclusive allocations across Gurgaon&apos;s prime sectors.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#C8A24A] hover:text-[#E3C06F] transition-colors group"
            >
              <span>Explore All Properties</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-[2px] text-xs uppercase tracking-[0.16em] font-sans transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-[#C8A24A] text-[#0D0D0D] font-semibold shadow-[0_0_15px_rgba(200,162,74,0.3)]'
                : 'bg-[#14110C] text-[#A9A294] border border-[#C8A24A]/20 hover:text-[#F4ECD8] hover:border-[#C8A24A]/50'
            }`}
          >
            All Developments ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('residential')}
            className={`px-5 py-2 rounded-[2px] text-xs uppercase tracking-[0.16em] font-sans transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === 'residential'
                ? 'bg-[#C8A24A] text-[#0D0D0D] font-semibold shadow-[0_0_15px_rgba(200,162,74,0.3)]'
                : 'bg-[#14110C] text-[#A9A294] border border-[#C8A24A]/20 hover:text-[#F4ECD8] hover:border-[#C8A24A]/50'
            }`}
          >
            <Home size={13} />
            <span>Luxury Residential</span>
          </button>
          <button
            onClick={() => setActiveTab('commercial')}
            className={`px-5 py-2 rounded-[2px] text-xs uppercase tracking-[0.16em] font-sans transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === 'commercial'
                ? 'bg-[#C8A24A] text-[#0D0D0D] font-semibold shadow-[0_0_15px_rgba(200,162,74,0.3)]'
                : 'bg-[#14110C] text-[#A9A294] border border-[#C8A24A]/20 hover:text-[#F4ECD8] hover:border-[#C8A24A]/50'
            }`}
          >
            <Building2 size={13} />
            <span>Commercial & SCO</span>
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col bg-[#14110C] border border-[#C8A24A]/25 hover:border-[#C8A24A] rounded-[2px] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            >
              {/* Image banner */}
              <Link href={`/properties/${project.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                <img
                  src={project.heroImage || '/home-page.png'}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110C] via-transparent to-transparent opacity-85" />

                {/* Status Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-sans font-semibold px-2.5 py-1 rounded-[2px] bg-[#0D0D0D]/90 text-[#E3C06F] border border-[#C8A24A]/30 backdrop-blur-md">
                    {project.status === 'ready'
                      ? 'Ready to Move'
                      : project.status === 'upcoming'
                      ? 'New Launch'
                      : 'Under Construction'}
                  </span>
                </div>

                {/* Type pill */}
                <div className="absolute top-3.5 right-3.5">
                  <span className="text-[9px] uppercase tracking-[0.16em] font-sans font-medium px-2 py-0.5 rounded-[2px] bg-[#14110C]/80 text-[#A9A294] border border-[#A9A294]/30 backdrop-blur-sm">
                    {project.type || 'Luxury Property'}
                  </span>
                </div>

                {/* Sector / City overlay */}
                <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[#C8A24A] font-sans">
                  {project.city || 'GURGAON'}
                </div>
              </Link>

              {/* Card content */}
              <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <Link href={`/properties/${project.slug}`}>
                    <h3 className="font-serif text-2xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors font-medium">
                      {project.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#A9A294] flex items-center gap-1.5 font-light">
                    <MapPin size={13} className="text-[#C8A24A] flex-shrink-0" />
                    <span>{project.location}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C8A24A]/20 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">
                      Starting Investment
                    </span>
                    <span className="font-serif text-xl text-[#F4ECD8] font-normal">
                      {project.startingPrice || 'Price on Enquiry'}
                    </span>
                  </div>

                  <Link
                    href={`/properties/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[#C8A24A] group-hover:text-[#E3C06F] transition-all group-hover:translate-x-1"
                  >
                    <span>View Project</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Developer / Asset Owner Listing & Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-10 bg-gradient-to-r from-[#14110C] via-[#1A1610] to-[#14110C] border border-[#C8A24A]/40 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C8A24A] font-sans font-semibold">
              <Landmark size={14} />
              <span>FOR PROPERTY OWNERS & DEVELOPERS</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F4ECD8]">
              Have a Landmark Asset or High-Value Property to Advise On?
            </h3>
            <p className="text-xs text-[#A9A294] max-w-2xl font-light leading-relaxed">
              White Luxe advises developers, landowners, and asset owners on underwriting, floor plan viability, pre-launch positioning, and discreet private client placement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Link
              href="#consultation"
              className="px-6 py-3.5 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-[2px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-2"
            >
              <PlusCircle size={14} />
              <span>Submit Property for Advisory</span>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 border border-[#C8A24A] text-[#E3C06F] hover:bg-[#C8A24A]/10 font-sans font-medium text-xs uppercase tracking-[0.18em] rounded-[2px] transition-colors"
            >
              Direct Office Connect
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

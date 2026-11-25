'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Project } from '@/types';

// Authentic live properties from whiteluxerealestate.com
const FALLBACK_PROPERTIES: Partial<Project>[] = [
  {
    _id: 'live-1',
    name: 'TARC Ishva',
    slug: 'tarc-ishva',
    city: 'GURGAON',
    type: 'Luxury Apartment',
    location: 'Sector - 63A, Gurugram',
    startingPrice: '₹ 9.7 Cr*',
    status: 'construction',
    heroImage: 'https://www.whiteluxerealestate.com/img/Trac-ishca/Main-banner.webp',
  },
  {
    _id: 'live-2',
    name: 'Godrej Astra',
    slug: 'godrej-astra',
    city: 'GURGAON',
    type: 'Luxury Apartment',
    location: 'Sector 54, Golf Course Road, Gurugram',
    startingPrice: '₹ 11.52 Cr*',
    status: 'construction',
    heroImage: 'https://www.whiteluxerealestate.com/img/Godrej-Astra/Hero.webp',
  },
  {
    _id: 'live-3',
    name: 'Tulip Monsella',
    slug: 'tulip-monsella',
    city: 'GURGAON',
    type: 'Luxury Apartment',
    location: 'Sector 53, Golf Course Road, Gurugram',
    startingPrice: '₹ 7.18 Cr*',
    status: 'construction',
    heroImage: 'https://www.whiteluxerealestate.com/img/TulipMonsella/bannerr.avif',
  },
  {
    _id: 'live-4',
    name: 'DLF Privana North',
    slug: 'dlf-privana-north',
    city: 'GURGAON',
    type: 'Luxury Apartment',
    location: 'Sector 77, Southern Peripheral Road, Gurugram',
    startingPrice: '₹ 9.7 Cr*',
    status: 'construction',
    heroImage: 'https://www.whiteluxerealestate.com/img/DlfPrivena/Banner.jpg',
  },
  {
    _id: 'live-5',
    name: 'AIPL Autograph',
    slug: 'aipl-autograph',
    city: 'GURGAON',
    type: 'Commercial',
    location: 'Sector 108, Gurugram',
    startingPrice: '₹ 71 Lakhs*',
    status: 'construction',
    heroImage: 'https://www.whiteluxerealestate.com/img/AiplAutograp/b1.jpg',
  },
];

export default function FeaturedPropertiesSection() {
  const [properties, setProperties] = useState<Partial<Project>[]>(FALLBACK_PROPERTIES);

  useEffect(() => {
    async function loadProperties() {
      try {
        const res = await api.getProjects({ limit: 3 });
        if (res && res.success && res.data?.length > 0) {
          setProperties(res.data.slice(0, 3));
        }
      } catch {
        // keep fallback
      }
    }
    loadProperties();
  }, []);

  const getStatusLabel = (st?: string) => {
    if (st === 'construction') return 'Under Construction';
    if (st === 'ready') return 'Ready to Move';
    return 'Upcoming Launch';
  };

  return (
    <section className="bg-[#14110C] text-[#F4ECD8] py-24 md:py-32 border-t border-[#C8A24A]/20">
      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
              FEATURED PROPERTIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F4ECD8]">
              Handpicked residences, worth your attention
            </h2>
          </div>
          <Link
            href="/properties"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C8A24A] hover:text-[#E3C06F] transition-all border-b border-[#C8A24A]/40 pb-1 self-start md:self-auto font-sans hover:translate-x-1"
          >
            <span>View All Properties</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Property Cards with Hover Lift & Zoom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => (
            <motion.div
              key={prop._id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-[#0D0D0D] border border-[#C8A24A]/25 hover:border-[#C8A24A] rounded-[2px] overflow-hidden group flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
            >
              {/* Image with subtle hover zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#080808]">
                {prop.heroImage && (
                  <img
                    src={prop.heroImage}
                    alt={prop.name || 'Property'}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />

                {/* Status Badge */}
                <div className="absolute top-3.5 left-3.5 bg-[#0D0D0D]/90 backdrop-blur-md px-3 py-1 rounded-[2px] text-[10px] uppercase tracking-wider font-sans font-semibold text-[#E3C06F] border border-[#C8A24A]/30">
                  {getStatusLabel(prop.status)}
                </div>

                {/* City Label */}
                <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[#C8A24A] font-sans">
                  {prop.city || 'GURGAON'}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors font-normal">
                    {prop.name}
                  </h3>
                  <p className="text-xs text-[#A9A294] flex items-center gap-1.5 font-light">
                    <MapPin size={13} className="text-[#C8A24A] flex-shrink-0" />
                    <span>{prop.location}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C8A24A]/20 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">
                      Starting from
                    </span>
                    <span className="font-serif text-xl text-[#F4ECD8] font-normal">
                      {prop.startingPrice || 'Price on call'}
                    </span>
                  </div>
                  <Link
                    href={`/properties/${prop.slug}`}
                    className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#C8A24A] group-hover:text-[#E3C06F] transition-all flex items-center gap-1 group-hover:translate-x-1"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center md:hidden pt-2">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#C8A24A] text-[#E3C06F] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] hover:bg-[#C8A24A]/10 transition-all"
          >
            <span>View All Properties</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

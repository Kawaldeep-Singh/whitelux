import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import {
  Home,
  Building2,
  Store,
  TrendingUp,
  Sparkles,
  FileCheck,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Real Estate Services in Gurgaon | White Luxe',
  description:
    'Residential, commercial, retail leasing and investment advisory services across Gurgaon and Delhi NCR.',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Residential Properties',
      desc: 'Luxury apartments, penthouses, villas and builder floors across Gurgaon’s premium corridors. We help you compare projects, assess builders, understand pricing and choose a home that fits how you live.',
      icon: Home,
    },
    {
      title: 'Commercial Properties',
      desc: 'Office spaces, business centres and commercial assets in prime business districts. We advise on location, rental yield, lease structure and long-term appreciation.',
      icon: Building2,
    },
    {
      title: 'Retail Leasing',
      desc: 'Strategic retail space for brands and landlords. We match the right space with the right footfall, and support negotiation and lease closure.',
      icon: Store,
    },
    {
      title: 'Investment Advisory',
      desc: 'Whether you are a first-time investor or building a portfolio, we provide research-backed guidance on locations, timing, expected returns and risks.',
      icon: TrendingUp,
    },
    {
      title: 'Pre-launch & Resale',
      desc: 'Early access to select new launches, and verified resale options with a transparent review of paperwork and price.',
      icon: Sparkles,
    },
    {
      title: 'Documentation & Legal Support',
      desc: 'Guidance on agreements, registrations, payment schedules and compliance, so your transaction stays clean and secure.',
      icon: FileCheck,
    },
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Hero */}
        <section className="bg-[#14110C] border-b border-[#C8A24A]/20 py-20 md:py-28 relative overflow-hidden">
          <div className="w-[90%] max-w-[1440px] mx-auto relative z-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block mb-3">
              OUR EXPERTISE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F4ECD8] max-w-4xl leading-tight font-normal">
              Our Services
            </h1>
            <p className="text-[#A9A294] text-sm md:text-lg max-w-2xl mt-6 font-light leading-relaxed">
              Complete real estate advisory, from search to possession.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />
        </section>

        {/* Services Grid */}
        <section className="py-24 md:py-32 w-[90%] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#14110C] p-8 md:p-10 rounded-[2px] border border-[#C8A24A]/25 hover:border-[#C8A24A] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(200,162,74,0.12)] transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-default"
                >
                  <div className="space-y-4">
                    <Icon size={24} className="text-[#C8A24A] group-hover:text-[#E3C06F] group-hover:scale-110 transition-all duration-300" />
                    <h3 className="font-serif text-2xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors font-normal">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#C8A24A]/20">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#C8A24A] group-hover:text-[#E3C06F] group-hover:translate-x-1 transition-all"
                    >
                      <span>Inquire &rarr;</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 text-center bg-[#14110C] border-t border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1440px] mx-auto space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium">
              BESPOKE ADVISORY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
              Not sure where to start?
            </h2>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.2em] rounded-[2px] transition-all hover:brightness-110 active:scale-95 shadow-lg"
              >
                <span>Talk to an Advisor</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
      <FloatingButtons />
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import { getSettingsServer } from '@/lib/serverData';
import {
  Building2,
  Home,
  Landmark,
  Store,
  FileCheck,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advisory Practices | White Luxe Real Estate',
  description:
    'Founder-led real estate advisory in Gurgaon: Commercial, SCO & Leasing lead practice, Luxury Residential, and Private Investment Advisory by Rohit Raj Maingi.',
};

export default async function ServicesPage() {
  const settings = await getSettingsServer();

  const primaryPractices = [
    {
      badge: 'LEAD PRACTICE',
      title: 'Commercial, SCO & Leasing',
      desc: 'SCO plots, pre-leased commercial assets, and rental income structured with private banking discipline. We assist HNI investors and business owners with asset selection, tenant covenant assessment, lease deed terms, and long-term yield generation.',
      icon: Building2,
      isLead: true,
      features: [
        'SCO (Shop-cum-Office) Plots & High-Street Commercial',
        'Pre-Leased Assets with Institutional Tenants',
        'Long-term Lease Negotiations & Escalation Structuring',
        'Corporate Office Leasing & Asset Management',
      ],
    },
    {
      badge: 'PRACTICE 02',
      title: 'Luxury Residential',
      desc: 'Pre-launch, under construction, and vetted resale homes for end-use or capital growth along Golf Course Road, Golf Course Extension Road, and Southern Peripheral Road. We prioritize density, builder track record, and locational scarcity.',
      icon: Home,
      isLead: false,
      features: [
        'Large-Format 3,500+ Sq.Ft. Luxury Apartments & Penthouses',
        'Early-Stage Allocations in Top Tier-1 Developments',
        'Verified Secondary Market Dispositions & Acquisitions',
        'Strict RERA Due Diligence & Construction Milestone Audits',
      ],
    },
    {
      badge: 'PRACTICE 03',
      title: 'Investment Advisory',
      desc: 'Capital allocation, financing evaluation, and exit planning from a 30-year private banking and real estate lens. We view property not as a speculative gamble, but as a core anchor on your balance sheet.',
      icon: Landmark,
      isLead: false,
      features: [
        'Multi-Year Portfolio Allocation Framework',
        'Holding Cost vs. Capital Appreciation Projections',
        'Comparative Micro-Market Corridor Yield Analysis',
        'Structured Exit Timelines & Reinvestment Strategy',
      ],
    },
  ];

  const specializedSubPractices = [
    {
      title: 'Retail & High-Street Leasing',
      desc: 'Matching premium lifestyle and retail brands with high-footfall commercial catchments across Gurgaon’s primary arterial sectors.',
      icon: Store,
    },
    {
      title: 'Title Verification & Documentation',
      desc: 'Fiduciary review of conveyance deeds, RERA filings, payment milestones, and encumbrance certificates before capital transfer.',
      icon: FileCheck,
    },
    {
      title: 'Asset Yield Optimization',
      desc: 'Restructuring under-performing real estate holdings to maximize net capitalization rates and tax efficiency.',
      icon: TrendingUp,
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
              AREAS OF PRACTICE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F4ECD8] max-w-4xl leading-tight font-normal">
              Advisory Practices
            </h1>
            <p className="text-[#A9A294] text-sm md:text-lg max-w-2xl mt-6 font-light leading-relaxed">
              Institutional real estate guidance across Gurgaon commercial assets, luxury residential, and wealth allocation.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />
        </section>

        {/* 3 Main Practices */}
        <section className="py-20 md:py-24 w-[90%] max-w-[1440px] mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
              CORE SPECIALIZATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4ECD8] font-normal">
              Structured Representation for Family Offices &amp; HNIs
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {primaryPractices.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className={`bg-[#14110C] p-8 md:p-10 rounded-[2px] transition-all duration-300 flex flex-col justify-between space-y-8 ${
                    p.isLead
                      ? 'border-2 border-[#C8A24A] shadow-[0_4px_30px_rgba(200,162,74,0.15)] relative'
                      : 'border border-[#C8A24A]/25 hover:border-[#C8A24A]/60'
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8A24A] font-sans font-semibold px-2.5 py-1 bg-[#C8A24A]/10 border border-[#C8A24A]/30 rounded-[2px]">
                        {p.badge}
                      </span>
                      <Icon size={26} className="text-[#E3C06F]" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl text-[#F4ECD8] font-medium tracking-wide">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#C8A24A]/15 space-y-2.5">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A24A] font-sans font-medium block mb-2">
                        Practice Scope:
                      </span>
                      {p.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#F4ECD8]/85 font-light">
                          <span className="text-[#C8A24A] font-bold">·</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#C8A24A]/20">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[#C8A24A] hover:text-[#E3C06F] transition-colors"
                    >
                      <span>Consult on {p.title}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Specialized Sub-Practices */}
        <section className="bg-[#14110C] py-20 border-t border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1440px] mx-auto space-y-10">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                ANCILLARY EXPERTISE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F4ECD8] font-normal">
                Supporting Due Diligence &amp; Lease Advisory
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specializedSubPractices.map((sub, idx) => {
                const Icon = sub.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 bg-[#0D0D0D] border border-[#C8A24A]/20 rounded-[2px] space-y-3"
                  >
                    <Icon size={22} className="text-[#C8A24A]" />
                    <h4 className="font-serif text-lg text-[#F4ECD8] font-medium">{sub.title}</h4>
                    <p className="text-xs text-[#A9A294] font-light leading-relaxed">{sub.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center bg-[#080808] border-t border-[#C8A24A]/20">
          <div className="w-[90%] max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4ECD8] font-normal">
              Book a Private Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
              Direct, confidential discussion with Rohit Raj Maingi regarding your property requirements or portfolio restructuring.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all hover:scale-[1.03]"
              >
                <span>Request Advisory Call</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection settings={settings} />
      <FloatingButtons />
    </div>
  );
}

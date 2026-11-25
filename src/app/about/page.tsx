import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import { getSettingsServer } from '@/lib/serverData';
import { ShieldCheck, Eye, HeartHandshake, Award, ArrowRight, Building2, Landmark, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Rohit Raj Maingi | Founder & Advisory Director | White Luxe',
  description:
    '30 years across private banking (Standard Chartered, HSBC, Deutsche Bank) and real estate advisory, guiding HNI and UHNI families in Gurgaon.',
};

export default async function AboutPage() {
  const settings = await getSettingsServer();
  const founderName = settings.founderName || 'Rohit Raj Maingi';
  const founderTitle = settings.founderTitle || 'Founder & Advisory Director';
  const founderPortrait = settings.founderPortrait || '/images/rohit-raj-maingi.png';
  const hasPortrait = Boolean(founderPortrait && founderPortrait.trim() !== '');

  const lineagePoints = [
    {
      institution: 'Standard Chartered · HSBC · Deutsche Bank',
      role: 'Private Banking & Wealth Management',
      desc: '18 years managing liquid assets, structured debt, and family balance sheets across top tier international financial institutions.',
      icon: Landmark,
    },
    {
      institution: 'White Luxe Real Estate',
      role: 'Founder & Advisory Director',
      desc: '12+ years dedicated exclusively to prime Gurgaon luxury residential, commercial SCO assets, and high-yield lease transactions.',
      icon: Briefcase,
    },
    {
      institution: 'Regulatory & Industry Credentials',
      role: 'HRERA & Member: NAR India · APP',
      desc: `Registered advisor under Haryana RERA (${settings.hreraNumber || 'RC/HARERA/GGM/3367/2962/2025/244'}), adhering to strict fiduciary norms.`,
      icon: ShieldCheck,
    },
  ];

  const values = [
    {
      title: 'Advisory Over Agency',
      desc: 'We do not sell inventory. We advise capital. If a project does not meet strict due diligence criteria, we advise our clients to walk away.',
      icon: ShieldCheck,
    },
    {
      title: 'Balance Sheet Discipline',
      desc: 'Property is rarely a short-term gamble; it is an enduring asset class requiring liquidity analysis, holding cost assessment, and tax foresight.',
      icon: Eye,
    },
    {
      title: 'Corridor Specialization',
      desc: 'Deep micro-market focus on Golf Course Extension Road, Golf Course Road, and Southern Peripheral Road, tracking every land parcel and launch.',
      icon: Award,
    },
    {
      title: 'Confidential Representation',
      desc: 'Discreet, one-on-one advisory for family offices, business owners, and corporate leaders who value absolute privacy.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Hero Banner */}
        <section className="bg-[#14110C] border-b border-[#C8A24A]/20 py-20 md:py-28 relative overflow-hidden">
          <div className="w-[90%] max-w-[1440px] mx-auto relative z-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block mb-3">
              ABOUT THE FOUNDER
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F4ECD8] max-w-4xl leading-tight font-normal">
              Advisory. Not Agency.
            </h1>
            <p className="text-[#A9A294] text-sm md:text-lg max-w-2xl mt-6 font-light leading-relaxed">
              30 years of private banking and property advisory experience, bringing institutional wealth discipline to Gurgaon real estate.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />
        </section>

        {/* Narrative & Lineage (Split Section) */}
        <section className="bg-[#F6F0E3] text-[#1A1712] py-20 md:py-28">
          <div className="w-[90%] max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Portrait or Large Title */}
            <div className="lg:col-span-5 space-y-6">
              {hasPortrait ? (
                <div className="p-3 bg-[#14110C] border border-[#C8A24A]/40 rounded-[2px] shadow-xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-gradient-to-b from-[#251F17] via-[#14110C] to-[#0D0D0D]">
                    <img
                      src={founderPortrait}
                      alt={founderName}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="pt-3.5 pb-1 text-center border-t border-[#C8A24A]/20 mt-1">
                    <h3 className="font-serif text-xl font-medium text-[#F4ECD8]">{founderName}</h3>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#C8A24A] font-sans mt-0.5 font-semibold">
                      {founderTitle}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A5C16] font-sans font-semibold block">
                    FOUNDER PROFILE
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl text-[#1A1712] font-normal leading-snug">
                    {founderName}
                  </h2>
                  <p className="text-sm font-sans uppercase tracking-[0.18em] text-[#7A5C16] font-semibold">
                    {founderTitle}
                  </p>
                  <p className="text-xs text-[#5A544A] italic font-serif text-lg leading-relaxed pt-2">
                    &ldquo;{settings.founderNoteQuote}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Bio */}
            <div className="lg:col-span-7 space-y-6 text-[#3A352D] font-light leading-relaxed text-sm md:text-base">
              <h3 className="font-serif text-2xl md:text-3xl text-[#1A1712] font-medium">
                Bringing Banking Rigor to Real Estate
              </h3>
              <p>
                Before establishing White Luxe, Rohit Raj Maingi spent nearly two decades navigating the private banking trenches at institutions including Standard Chartered, HSBC, and Deutsche Bank. Guiding ultra-high-net-worth families on capital allocation taught him a simple truth: <strong className="text-[#1A1712] font-normal">real estate is almost always the single largest item on a family&apos;s balance sheet, yet it is rarely evaluated with the same fiduciary discipline as liquid assets</strong>.
              </p>
              <p>
                Traditional real estate agency models are structured around velocity, developer incentives, and moving whatever inventory is on offer. White Luxe was created to reverse that paradigm: acting purely as an advisor on your side of the table, focusing on commercial SCO developments, pre-leased institutional income, and truly scarce luxury residential assets.
              </p>
              <p>
                From our office at M3M Urbana, Sector 67, Gurgaon, we provide direct, personal counsel across Golf Course Extension Road, Golf Course Road, and Southern Peripheral Road.
              </p>
            </div>
          </div>
        </section>

        {/* Banking & Advisory Lineage Strip */}
        <section className="bg-[#080808] py-20 border-y border-[#C8A24A]/25">
          <div className="w-[90%] max-w-[1440px] mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                CAREER TIMELINE &amp; CREDENTIALS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4ECD8] font-normal">
                30 Years of Institutional Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {lineagePoints.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 bg-[#14110C] border border-[#C8A24A]/25 rounded-[2px] space-y-4"
                  >
                    <Icon size={24} className="text-[#E3C06F]" />
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-[#F4ECD8] font-medium">
                        {item.institution}
                      </h4>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#C8A24A] font-sans">
                        {item.role}
                      </p>
                    </div>
                    <p className="text-xs text-[#A9A294] font-light leading-relaxed pt-1">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Fiduciary Principles */}
        <section className="py-20 md:py-28 w-[90%] max-w-[1440px] mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
              OUR PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4ECD8] font-normal">
              How We Protect Client Capital
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#14110C] p-7 rounded-[2px] border border-[#C8A24A]/20 hover:border-[#C8A24A]/60 transition-colors space-y-4"
                >
                  <Icon size={22} className="text-[#C8A24A]" />
                  <h4 className="font-serif text-xl text-[#F4ECD8] font-medium">{v.title}</h4>
                  <p className="text-xs text-[#A9A294] font-light leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-[#14110C] py-20 border-t border-[#C8A24A]/25 text-center">
          <div className="w-[90%] max-w-xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4ECD8] font-normal">
              Connect Directly with Rohit
            </h2>
            <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
              Arrange a private consultation at our M3M Urbana office or over a confidential telephone conversation.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all hover:scale-[1.03]"
              >
                <span>Book a Consultation</span>
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

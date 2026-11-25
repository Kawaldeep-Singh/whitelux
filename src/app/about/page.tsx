import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import { ShieldCheck, Eye, HeartHandshake, Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About White Luxe Real Estate | Trusted Property Advisors in Gurgaon',
  description:
    'Meet Gurgaon’s trusted luxury property advisors, built on honesty, clarity, and personalized strategic care.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Integrity',
      desc: 'We say what is true, even when it is inconvenient.',
      icon: ShieldCheck,
    },
    {
      title: 'Clarity',
      desc: 'Plain information, clear numbers, no fine print surprises.',
      icon: Eye,
    },
    {
      title: 'Care',
      desc: 'Your goals guide every recommendation.',
      icon: HeartHandshake,
    },
    {
      title: 'Excellence',
      desc: 'Premium service at every step.',
      icon: Award,
    },
  ];

  const stats = [
    { label: 'Years of Experience', value: '10+' },
    { label: 'Happy Clients', value: '500+' },
    { label: 'Projects Curated', value: '50+' },
    { label: 'in Transactions', value: '₹1,000 Cr+' },
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Hero Banner */}
        <section className="bg-[#14110C] border-b border-[#C8A24A]/20 py-20 md:py-28 relative overflow-hidden">
          <div className="w-[90%] max-w-[1440px] mx-auto relative z-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block mb-3">
              ABOUT WHITE LUXE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F4ECD8] max-w-4xl leading-tight font-normal">
              Ethical. Strategic. Personal.
            </h1>
            <p className="text-[#A9A294] text-sm md:text-lg max-w-2xl mt-6 font-light leading-relaxed">
              We founded White Luxe on a single guiding conviction: luxury real estate decisions demand complete fiduciary honesty over transactional velocity.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />
        </section>

        {/* Our Story (Ivory Section) */}
        <section className="bg-[#F6F0E3] text-[#1A1712] py-20 md:py-28">
          <div className="w-[90%] max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="md:col-span-5 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A5C16] font-sans font-semibold block">
                WHO WE ARE
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#1A1712] font-normal leading-snug">
                Beyond Transactions, Building Relationships
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-[#3A352D] font-light leading-relaxed text-sm md:text-base">
              <p>
                At White Luxe, we believe real estate is more than an investment—<strong className="text-[#1A1712] font-normal">it’s the foundation of your future</strong>. That’s why we take the time to understand your aspirations, offering personalized solutions that align with your goals.
              </p>
              <p>
                With unwavering transparency, deep industry expertise, and exclusive partnerships with top developers, we don’t just connect you to properties—we open doors to opportunities that create lasting success.
              </p>
              <p>
                Based in Sector 49, Gurgaon, we represent buyers and investors across DLF Golf Course Road, Golf Course Extension, Dwarka Expressway, and Southern Peripheral Road.
              </p>
            </div>
          </div>
        </section>

        {/* Developer Partners Strip */}
        <section className="bg-[#0D0D0D] py-14 border-y border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1440px] mx-auto text-center space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A9A294] font-sans block">
              TRUSTED DEVELOPER PARTNERS ACROSS GURGAON &amp; NCR
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-sm font-serif tracking-[0.15em] text-[#E3C06F]/80">
              <span className="hover:text-[#F4ECD8] transition-colors">DLF</span>
              <span>•</span>
              <span className="hover:text-[#F4ECD8] transition-colors">EMAAR</span>
              <span>•</span>
              <span className="hover:text-[#F4ECD8] transition-colors">GODREJ PROPERTIES</span>
              <span>•</span>
              <span className="hover:text-[#F4ECD8] transition-colors">TARC</span>
              <span>•</span>
              <span className="hover:text-[#F4ECD8] transition-colors">TULIP INFRATECH</span>
              <span>•</span>
              <span className="hover:text-[#F4ECD8] transition-colors">AIPL</span>
              <span>•</span>
              <span className="hover:text-[#F4ECD8] transition-colors">GANGA REALTY</span>
            </div>
          </div>
        </section>

        {/* Mission & Vision (Dark Warm Section) */}
        <section className="bg-[#14110C] text-[#F4ECD8] py-20 border-y border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 md:p-10 bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] space-y-4 hover:border-[#C8A24A] hover:-translate-y-1.5 transition-all duration-300 shadow-xl group">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium group-hover:text-[#E3C06F] transition-colors">
                OUR MISSION
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#F4ECD8] font-normal">
                Clarity in Every Decision
              </h3>
              <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
                To make every property decision clear, informed and rewarding, through ethical advice, deep market knowledge and personal attention.
              </p>
            </div>

            <div className="p-8 md:p-10 bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] space-y-4 hover:border-[#C8A24A] hover:-translate-y-1.5 transition-all duration-300 shadow-xl group">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium group-hover:text-[#E3C06F] transition-colors">
                OUR VISION
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#F4ECD8] font-normal">
                Delhi NCR&apos;s Most Trusted Standard
              </h3>
              <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
                To be the most trusted luxury property advisory in Delhi NCR.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 md:py-28 w-[90%] max-w-[1440px] mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
              OUR VALUES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
              The Principles That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#14110C] p-8 rounded-[2px] border border-[#C8A24A]/25 space-y-4 hover:border-[#C8A24A] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(200,162,74,0.12)] transition-all duration-300 group cursor-default"
                >
                  <Icon size={22} className="text-[#C8A24A] group-hover:text-[#E3C06F] group-hover:scale-110 transition-all duration-300" />
                  <h3 className="font-serif text-2xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors font-normal">{v.title}</h3>
                  <p className="text-xs text-[#A9A294] font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-[#14110C] py-16 border-y border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="space-y-1 hover:-translate-y-1 transition-transform duration-300 cursor-default">
                <div className="font-serif text-3xl sm:text-5xl font-normal text-[#E3C06F]">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#A9A294]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0D0D0D] text-[#F4ECD8] py-24 text-center">
          <div className="w-[90%] max-w-[1440px] mx-auto space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A]">
              BEGIN YOUR JOURNEY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#F4ECD8] font-normal">
              Ready to begin your property journey?
            </h2>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.2em] rounded-[2px] transition-all hover:brightness-110 active:scale-95 shadow-xl"
              >
                <span>Book a Consultation</span>
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

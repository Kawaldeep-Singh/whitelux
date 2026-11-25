import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';

export const metadata: Metadata = {
  title: 'Disclaimer | White Luxe Real Estate',
  description: 'Legal disclaimer and regulatory disclosures for White Luxe Real Estate.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32">
        <section className="bg-[#14110C] border-b border-[#C8A24A]/20 py-16 md:py-20">
          <div className="w-[90%] max-w-[1100px] mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block mb-2">
              LEGAL
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#F4ECD8] font-normal">
              Disclaimer
            </h1>
          </div>
        </section>

        <section className="w-[90%] max-w-[1100px] mx-auto py-16 text-[#A9A294] space-y-6 font-light text-sm md:text-base leading-relaxed">
          <p>
            White Luxe Real Estate is a real estate brokerage and advisory firm acting solely as an intermediary between buyers, sellers, landlords, tenants, builders, and developers.
          </p>
          <p>
            All property information, pricing, layouts, approvals, and possession timelines displayed on this website are based on details provided by respective builders, developers, owners, or third parties.
          </p>
          <p>
            White Luxe Real Estate does not guarantee the accuracy, completeness, or reliability of such information and shall not be responsible for discrepancies, delays, cancellations, or non-compliance by builders or owners.
          </p>
          <p>
            Visitors and prospective purchasers are advised to independently verify all project details, including Haryana RERA registration certificates, building sanction approvals, and pricing with the respective developers and official government portals before entering into any transaction.
          </p>
        </section>
      </main>

      <FooterSection />
      <FloatingButtons />
    </div>
  );
}

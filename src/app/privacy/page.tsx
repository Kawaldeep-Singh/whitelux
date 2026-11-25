import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';

export const metadata: Metadata = {
  title: 'Privacy Policy | White Luxe Real Estate',
  description: 'Privacy policy for White Luxe Real Estate website.',
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
          </div>
        </section>

        <section className="w-[90%] max-w-[1100px] mx-auto py-16 text-[#A9A294] space-y-6 font-light text-sm md:text-base leading-relaxed">
          <p>
            At White Luxe Real Estate, we respect your privacy and are fully committed to safeguarding your personal information. Any details shared through this website, including your name, contact number, email address, or other personal data, are used strictly for property-related communication, inquiries, and service delivery.
          </p>
          <p>
            We do not sell, rent, or misuse client information under any circumstances, and appropriate measures are taken to ensure data security and confidentiality.
          </p>
          <p>
            By submitting your details on our website, you voluntarily consent to being contacted via phone calls, WhatsApp, SMS, or email for relevant property updates, offers, and advisory communications.
          </p>
          <p>
            You may request deletion or modification of your data at any time by contacting our advisory desk at <a href="mailto:rohitrajmaingi@whiteluxerealestate.com" className="text-[#E3C06F] underline">rohitrajmaingi@whiteluxerealestate.com</a> or calling <a href="tel:+919815202102" className="text-[#E3C06F]">+91 98152 02102</a>.
          </p>
        </section>
      </main>

      <FooterSection />
      <FloatingButtons />
    </div>
  );
}

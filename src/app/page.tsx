'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturedPropertiesSection from '@/components/FeaturedPropertiesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CtaSection from '@/components/CtaSection';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';

export default function HomePage() {
  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans selection:bg-[#C8A24A] selection:text-[#0D0D0D]">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* 2. Hero */}
        <Hero />

        {/* 3. Trust strip */}
        <TrustStrip />

        {/* 4. About (Ivory section) */}
        <AboutSection />

        {/* 5. Services (3x2 grid with thin gold lines) */}
        <ServicesSection />

        {/* 6. Featured Properties (loaded from database) */}
        <FeaturedPropertiesSection />

        {/* 7. Why Choose Us (6 points on Ivory) */}
        <WhyChooseUsSection />

        {/* 8. CTA Banner with lead form */}
        <CtaSection />
      </main>

      {/* 9. Footer */}
      <FooterSection />

      {/* Floating WhatsApp and Call buttons */}
      <FloatingButtons />
    </div>
  );
}

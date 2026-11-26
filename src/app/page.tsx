import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/home/Hero';
import CredibilityStrip from '@/components/home/CredibilityStrip';
import FoundersNote from '@/components/home/FoundersNote';
import AdvisoryApproach from '@/components/home/AdvisoryApproach';
import RohitsPicks from '@/components/home/RohitsPicks';
import CorridorFocus from '@/components/home/CorridorFocus';
import CuratedPortfolio from '@/components/home/CuratedPortfolio';
import WhereIAdvise from '@/components/home/WhereIAdvise';
import InsightsSection from '@/components/home/InsightsSection';
import ClientVoices from '@/components/home/ClientVoices';
import FeaturedVideoSection from '@/components/home/FeaturedVideoSection';
import ConsultationSection from '@/components/home/ConsultationSection';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import {
  getSettingsServer,
  getProjectsServer,
  getBlogsServer,
  getTestimonialsServer,
} from '@/lib/serverData';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, projects, blogs, testimonials] = await Promise.all([
    getSettingsServer(),
    getProjectsServer(),
    getBlogsServer(),
    getTestimonialsServer(),
  ]);

  const latestBlog = blogs && blogs.length > 0 ? blogs[0] : null;

  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans selection:bg-[#C8A24A] selection:text-[#0D0D0D]">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* 1. Hero (Split screen / Single-column if no portrait) */}
        <Hero settings={settings} />

        {/* 2. Credibility strip (5 columns from settings.credibility) */}
        <CredibilityStrip items={settings.credibility} />

        {/* 3. Founder's note */}
        <FoundersNote
          quote={settings.founderNoteQuote}
          body={settings.founderNoteBody}
          founderName={settings.founderName}
          founderPortrait={settings.founderPortrait}
        />

        {/* 4. The Advisory Approach (5 numbered steps with gold hairlines) */}
        <AdvisoryApproach />

        {/* 5. Rohit's Picks (Max 3 projects where isPick = true) */}
        <RohitsPicks projects={projects} />

        {/* 6. Corridor focus (Settings.corridor & Sectors 58-68 grid) */}
        <CorridorFocus corridor={settings.corridor} />

        {/* 7. Curated Portfolio & Verified Properties (Commented out) */}
        {/* <CuratedPortfolio projects={projects} /> */}

        {/* 8. Where I Advise (3 practices: Commercial/SCO/Leasing lead practice) */}
        <WhereIAdvise />

        {/* 8. Insights from Rohit (Reels + Latest Article) */}
        <InsightsSection
          reels={settings.reels}
          latestBlog={latestBlog}
          instagramHandle={settings.instagramHandle}
          instagramUrl={settings.instagramUrl}
        />

        {/* 9. Client Voices (Testimonials - auto-hides if none) */}
        <ClientVoices testimonials={testimonials} />

        {/* 10. Featured Brand Film Showcase */}
        {settings.featuredVideo?.isActive && settings.featuredVideo?.videoUrl && (
          <FeaturedVideoSection video={settings.featuredVideo} />
        )}

        {/* 11. Consultation Form ("Speak with Rohit directly.") */}
        <ConsultationSection settings={settings} />
      </main>

      {/* 11. Footer */}
      <FooterSection settings={settings} />

      {/* Floating Call & WhatsApp */}
      <FloatingButtons />
    </div>
  );
}

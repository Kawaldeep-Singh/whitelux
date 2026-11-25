import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlugServer, AUTHENTIC_PROJECTS } from '@/lib/serverData';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import ProjectEnquiryCard from '@/components/ProjectEnquiryCard';
import {
  MapPin,
  Calendar,
  FileDown,
  Compass,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Project } from '@/types';

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return AUTHENTIC_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const project = await getProjectBySlugServer(params.slug);
    if (!project) {
      return { title: 'Property | White Luxe Real Estate' };
    }
    return {
      title: project.seoTitle || `${project.name} ${project.location} | White Luxe Real Estate`,
      description:
        project.seoDescription ||
        `Explore ${project.name} in ${project.location}. Starting from ${project.startingPrice}. View pricing, floor plans, and amenities.`,
    };
  } catch {
    return { title: 'Property | White Luxe Real Estate' };
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectBySlugServer(params.slug);

  if (!project) {
    notFound();
  }

  // Quick stats array - filtered for non-empty values (Rule: auto-hides if empty)
  const statsList = [
    { label: 'Total Land', value: project.totalLand },
    { label: 'Total Towers', value: project.totalTowers },
    { label: 'Total Units', value: project.totalUnits },
    { label: 'Payment Plan', value: project.paymentPlan },
    { label: 'Price', value: project.price },
    {
      label: 'Status',
      value:
        project.status === 'construction'
          ? 'Construction'
          : project.status === 'ready'
          ? 'Ready to Move'
          : 'Upcoming Launch',
    },
    { label: 'Master Plan', value: project.masterPlanName || project.masterPlan?.title },
  ].filter((item) => Boolean(item.value && item.value.trim() !== ''));

  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Banner */}
        <section className="relative min-h-[75vh] md:min-h-[85vh] bg-[#0D0D0D] text-[#F4ECD8] flex items-end pt-28 pb-16 overflow-hidden border-b border-[#C8A24A]/20">
          {project.heroImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
              style={{ backgroundImage: `url('${project.heroImage}')` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/75 to-transparent" />

          <div className="w-[90%] max-w-[1440px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7 space-y-5">
              <nav className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] flex items-center gap-2">
                <Link href="/" className="hover:underline hover:text-[#E3C06F] transition-colors">Home</Link>
                <span>/</span>
                <Link href="/properties" className="hover:underline hover:text-[#E3C06F] transition-colors">Properties</Link>
                <span>/</span>
                <span className="text-[#A9A294]">{project.city || 'GURGAON'}</span>
              </nav>

              <div className="inline-block px-3 py-1 bg-[#14110C] border border-[#C8A24A]/30 rounded-[2px] text-[10px] uppercase tracking-wider text-[#E3C06F]">
                {project.type}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F4ECD8] leading-tight font-normal">
                {project.name}
              </h1>

              <p className="text-sm md:text-base text-[#A9A294] flex items-center gap-2 font-light">
                <MapPin size={16} className="text-[#C8A24A] flex-shrink-0" />
                <span>{project.location}</span>
              </p>

              <div className="pt-4 flex items-baseline gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#A9A294]">
                  Starting Price:
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#E3C06F] font-normal">
                  {project.startingPrice}
                </span>
              </div>
            </div>

            {/* Quick Enquiry Floating Box */}
            <div className="lg:col-span-5 w-full">
              <ProjectEnquiryCard
                projectId={project._id}
                projectSlug={project.slug}
                projectName={project.name}
              />
            </div>
          </div>
        </section>

        {/* 2. Quick Stats Strip (Rule: Auto-hides if empty) */}
        {statsList.length > 0 && (
          <section className="bg-[#14110C] border-b border-[#C8A24A]/20 py-8">
            <div className="w-[90%] max-w-[1440px] mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {statsList.map((st, idx) => (
                  <div key={idx} className="border-l border-[#C8A24A]/40 pl-4 hover:border-[#E3C06F] transition-colors group">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9A294] block group-hover:text-[#E3C06F] transition-colors">
                      {st.label}
                    </span>
                    <p className="font-serif text-lg font-normal text-[#F4ECD8] mt-0.5 truncate">
                      {st.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. About Project (Rule: Auto-hides if empty) */}
        {(project.aboutHeading || project.aboutDescription) && (
          <section className="py-24 md:py-32 w-[90%] max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block mb-2">
                  ABOUT PROJECT
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] leading-snug font-normal">
                  {project.aboutHeading || 'Four-side Open Residences'}
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4 text-sm md:text-base text-[#A9A294] font-light leading-relaxed">
                <p>{project.aboutDescription}</p>
                {project.reraNumber && (
                  <div className="pt-4 flex items-center gap-2 text-xs text-[#C8A24A]">
                    <ShieldCheck size={16} />
                    <span>RERA Registration No: <strong className="text-[#F4ECD8] font-normal">{project.reraNumber}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 4. "How Much" Pricing & Configuration Table (Rule: Auto-hides if empty) */}
        {project.units && project.units.length > 0 && (
          <section className="bg-[#14110C] py-20 md:py-28 border-y border-[#C8A24A]/20">
            <div className="w-[90%] max-w-[1440px] mx-auto space-y-8">
              <div className="text-center space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                  PRICING &amp; TYPOLOGIES
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
                  How Much
                </h2>
                <p className="text-xs text-[#A9A294]">
                  {project.name}, {project.location}
                </p>
              </div>

              <div className="bg-[#0D0D0D] rounded-[2px] border border-[#C8A24A]/25 overflow-hidden shadow-xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#080808] text-[#A9A294] text-xs uppercase tracking-wider border-b border-[#C8A24A]/20">
                    <tr>
                      <th className="py-4 px-6 font-medium">Unit Type</th>
                      <th className="py-4 px-6 font-medium">Unit Size</th>
                      <th className="py-4 px-6 font-medium text-right">Unit Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C8A24A]/15">
                    {project.units.map((u, idx) => (
                      <tr key={idx} className="hover:bg-[#14110C] transition-colors">
                        <td className="py-4 px-6 font-serif text-lg font-normal text-[#F4ECD8]">
                          {u.unitType}
                        </td>
                        <td className="py-4 px-6 text-[#A9A294] font-light">{u.unitSize || 'Size on call'}</td>
                        <td className="py-4 px-6 text-right font-serif text-base text-[#E3C06F]">
                          {u.unitPrice || 'Price on call'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 5. Gallery (Rule: Auto-hides if empty) */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-24 md:py-32 w-[90%] max-w-[1440px] mx-auto space-y-12">
            <div className="text-center space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                GALLERY
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
                Visual Perspectives
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#C8A24A]/20 hover:border-[#C8A24A] bg-[#080808] group transition-all duration-300 hover:shadow-lg"
                >
                  <img
                    src={img}
                    alt={`${project.name} view ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Amenities (Rule: Auto-hides if empty) */}
        {project.amenities && project.amenities.length > 0 && (
          <section className="bg-[#14110C] py-24 md:py-32 border-y border-[#C8A24A]/20">
            <div className="w-[90%] max-w-[1440px] mx-auto space-y-12">
              <div className="text-center space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                  LIFESTYLE PRIVILEGES
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
                  Amenities
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {project.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#0D0D0D] border border-[#C8A24A]/20 rounded-[2px] flex items-center gap-2.5 hover:border-[#C8A24A] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default"
                  >
                    <Check size={14} className="text-[#C8A24A] group-hover:text-[#E3C06F] flex-shrink-0 transition-colors" />
                    <span className="text-xs text-[#F4ECD8] font-light truncate">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. Location Advantages (Rule: Auto-hides if empty) */}
        {project.locationPoints && project.locationPoints.length > 0 && (
          <section className="py-24 md:py-32 w-[90%] max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block mb-2">
                    STRATEGIC CONNECTIVITY
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
                    Location Advantages
                  </h2>
                </div>

                <div className="space-y-3">
                  {project.locationPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#14110C] border border-[#C8A24A]/25 hover:border-[#C8A24A]/60 rounded-[2px] transition-colors">
                      <span className="text-xs font-mono text-[#C8A24A] font-semibold mt-0.5">
                        0{idx + 1}.
                      </span>
                      <p className="text-xs sm:text-sm text-[#F4ECD8] font-light leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Embed or Placeholder */}
              <div className="lg:col-span-6">
                {project.mapLink ? (
                  <div className="aspect-[16/11] rounded-[2px] overflow-hidden border border-[#C8A24A]/30 shadow-xl">
                    <iframe
                      src={project.mapLink}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/11] rounded-[2px] bg-[#14110C] border border-[#C8A24A]/25 flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <Compass size={36} className="text-[#C8A24A]" />
                    <h3 className="font-serif text-xl text-[#F4ECD8]">Prime Gurgaon Corridor</h3>
                    <p className="text-xs text-[#A9A294] max-w-sm font-light">
                      Minutes from Golf Course Road, Rapid Metro stations, premier educational institutions, and luxury retail destinations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 8. Floor Plans & Site Map (Rule: Auto-hides if empty) */}
        {((project.floorPlans && project.floorPlans.length > 0) || project.masterPlan?.image) && (
          <section className="bg-[#14110C] py-24 md:py-32 border-t border-[#C8A24A]/20">
            <div className="w-[90%] max-w-[1440px] mx-auto space-y-12">
              <div className="text-center space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                  ARCHITECTURAL LAYOUTS
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
                  Floor Plans &amp; Site Map
                </h2>
              </div>

              {project.floorPlans && project.floorPlans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.floorPlans.map((fp, idx) => (
                    <div key={idx} className="bg-[#0D0D0D] rounded-[2px] p-6 border border-[#C8A24A]/25 hover:border-[#C8A24A] transition-all duration-300 space-y-4 hover:shadow-xl group">
                      <h4 className="font-serif text-lg text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors font-normal">
                        {fp.label}
                      </h4>
                      <div className="aspect-[4/3] bg-[#080808] rounded-[2px] overflow-hidden flex items-center justify-center border border-[#C8A24A]/15">
                        <img
                          src={fp.image}
                          alt={fp.label}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {project.masterPlan?.image && (
                <div className="bg-[#0D0D0D] rounded-[2px] p-8 border border-[#C8A24A]/25 text-center space-y-4 shadow-xl">
                  <h4 className="font-serif text-xl text-[#F4ECD8] font-normal">
                    {project.masterPlan.title || 'Master Plan'}
                  </h4>
                  <div className="max-w-3xl mx-auto aspect-video bg-[#080808] rounded-[2px] overflow-hidden flex items-center justify-center border border-[#C8A24A]/15">
                    <img
                      src={project.masterPlan.image}
                      alt={project.masterPlan.title || 'Master Plan'}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 9. Closing Action Banner */}
        <section className="bg-[#080808] text-[#F4ECD8] py-24 text-center relative overflow-hidden border-t border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1440px] mx-auto relative z-10 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A]">
              CONFIDENTIAL INQUIRY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#F4ECD8] font-normal">
              Interested in {project.name}?
            </h2>
            <p className="text-xs md:text-sm text-[#A9A294] font-light max-w-xl mx-auto leading-relaxed">
              Connect with our dedicated relationship partner for complete floor schematics, itemized cost sheets, and escorted site visits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {project.brochurePdf && (
                <a
                  href={project.brochurePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.2em] rounded-[2px] transition-all hover:brightness-110 active:scale-95 shadow-lg"
                >
                  <FileDown size={15} />
                  <span>Download Brochure</span>
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#C8A24A] text-[#E3C06F] hover:bg-[#C8A24A]/10 text-xs font-medium uppercase tracking-[0.2em] rounded-[2px] active:scale-95 transition-all shadow-md"
              >
                <Calendar size={15} />
                <span>Schedule a Site Visit</span>
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

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProjectsServer } from '@/lib/serverData';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import { Building2, MapPin, Search, ArrowRight } from 'lucide-react';
import { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Luxury Properties in Gurgaon | White Luxe Real Estate',
  description:
    'Explore handpicked luxury apartments, penthouses, villas and commercial properties across Golf Course Road, Dwarka Expressway and Gurgaon prime corridors.',
};

export const revalidate = 60;

const LOCATIONS = [
  'All Locations',
  'Golf Course Road',
  'Golf Course Extension Road',
  'Dwarka Expressway',
  'MG Road',
  'Cyber City',
  'Sohna Road',
  'Southern Peripheral Road',
];

const PROPERTY_TYPES = [
  'All Types',
  'Luxury Apartment',
  'Penthouse',
  'Luxury Villa',
  'Builder Floor',
  'Commercial',
  'Retail',
];

const STAGES = [
  { label: 'All Stages', value: '' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Under Construction', value: 'construction' },
  { label: 'Ready to Move', value: 'ready' },
];

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const locationParam = searchParams.location && searchParams.location !== 'All Locations' ? searchParams.location : undefined;
  const typeParam = searchParams.type && searchParams.type !== 'All Types' ? searchParams.type : undefined;
  const statusParam = searchParams.status || undefined;
  const searchParam = searchParams.search || undefined;

  const projects = await getProjectsServer({
    location: locationParam,
    type: typeParam,
    status: statusParam,
    search: searchParam,
  });

  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Page Hero Header */}
        <section className="bg-[#14110C] border-b border-[#C8A24A]/20 py-16 md:py-24 relative overflow-hidden">
          <div className="w-[90%] max-w-[1440px] mx-auto relative z-10">
            <nav className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] mb-4 flex items-center gap-2">
              <Link href="/" className="hover:underline hover:text-[#E3C06F] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#A9A294]">Properties</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-6xl text-[#F4ECD8] max-w-3xl leading-tight font-normal">
              Curated Residences &amp; Landmark Investments
            </h1>
            <p className="text-[#A9A294] text-sm md:text-base max-w-2xl mt-4 font-light leading-relaxed">
              Every residence in our collection is vetted for construction provenance, legal clarity, and enduring architectural prestige.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />
        </section>

        {/* Filter Navigation Bar */}
        <section className="bg-[#0D0D0D] border-b border-[#C8A24A]/20 sticky top-20 z-20 shadow-xl backdrop-blur-md">
          <div className="w-[90%] max-w-[1440px] mx-auto py-4">
            <form method="GET" action="/properties" className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9A294]" />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchParam || ''}
                  placeholder="Search by project name or sector..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#14110C] border border-[#C8A24A]/25 rounded-[2px] text-xs text-[#F4ECD8] placeholder-[#666] focus:outline-none focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A]/40 transition-all"
                />
              </div>

              <select
                name="location"
                defaultValue={locationParam || 'All Locations'}
                className="py-2.5 px-3.5 bg-[#14110C] border border-[#C8A24A]/25 rounded-[2px] text-xs text-[#F4ECD8] focus:outline-none focus:border-[#C8A24A] transition-colors cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#14110C]">
                    {loc}
                  </option>
                ))}
              </select>

              <select
                name="type"
                defaultValue={typeParam || 'All Types'}
                className="py-2.5 px-3.5 bg-[#14110C] border border-[#C8A24A]/25 rounded-[2px] text-xs text-[#F4ECD8] focus:outline-none focus:border-[#C8A24A] transition-colors cursor-pointer"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#14110C]">
                    {t}
                  </option>
                ))}
              </select>

              <select
                name="status"
                defaultValue={statusParam || ''}
                className="py-2.5 px-3.5 bg-[#14110C] border border-[#C8A24A]/25 rounded-[2px] text-xs text-[#F4ECD8] focus:outline-none focus:border-[#C8A24A] transition-colors cursor-pointer"
              >
                {STAGES.map((st) => (
                  <option key={st.label} value={st.value} className="bg-[#14110C]">
                    {st.label}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all hover:brightness-110 active:scale-95 shadow-sm"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="w-[90%] max-w-[1440px] mx-auto py-16">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#A9A294]">
              Showing <span className="font-semibold text-[#E3C06F]">{projects.length}</span> curated properties
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="bg-[#14110C] border border-[#C8A24A]/25 rounded-[2px] p-12 text-center max-w-xl mx-auto my-12 space-y-4 shadow-xl">
              <Building2 size={36} className="mx-auto text-[#C8A24A]" />
              <h3 className="font-serif text-2xl text-[#F4ECD8]">No properties match your current filters</h3>
              <p className="text-xs text-[#A9A294] font-light leading-relaxed">
                Try adjusting your search criteria, or contact our private advisory desk to access off-market pre-launch opportunities.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.2em] rounded-[2px] hover:brightness-110 active:scale-95 transition-all shadow-md"
                >
                  <span>Enquire for Tailored Portfolio</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <Link
                  key={proj._id}
                  href={`/properties/${proj.slug}`}
                  className="group bg-[#14110C] rounded-[2px] overflow-hidden border border-[#C8A24A]/25 hover:border-[#C8A24A] hover:shadow-[0_12px_35px_rgba(200,162,74,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#080808]">
                    {proj.heroImage ? (
                      <img
                        src={proj.heroImage}
                        alt={proj.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#555]">
                        <Building2 size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-md px-3 py-1 rounded-[2px] text-[10px] uppercase font-semibold tracking-wider text-[#E3C06F] border border-[#C8A24A]/30">
                      {proj.status === 'construction'
                        ? 'Under Construction'
                        : proj.status === 'ready'
                        ? 'Ready to Move'
                        : 'Upcoming Launch'}
                    </div>

                    <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[#C8A24A]">
                      {proj.city || 'GURGAON'}
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#C8A24A] font-medium">
                        {proj.type}
                      </span>
                      <h3 className="font-serif text-2xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors mt-1 font-normal">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-[#A9A294] flex items-center gap-1.5 mt-1.5 font-light">
                        <MapPin size={13} className="text-[#C8A24A] flex-shrink-0" />
                        <span>{proj.location}</span>
                      </p>

                      {proj.units && proj.units.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {proj.units.map((u, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-[#0D0D0D] border border-[#C8A24A]/25 text-[10px] text-[#A9A294] rounded-[2px]"
                            >
                              {u.unitType}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#C8A24A]/20 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">
                          Starting From
                        </span>
                        <span className="font-serif text-xl text-[#F4ECD8] font-normal">
                          {proj.startingPrice || 'Price on call'}
                        </span>
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A24A] group-hover:text-[#E3C06F] group-hover:translate-x-1 transition-all flex items-center gap-1">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Private Off-Market Banner */}
        <section className="bg-[#14110C] text-[#F4ECD8] py-20 border-t border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                CONFIDENTIAL ADVISORY
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#F4ECD8]">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="text-xs md:text-sm text-[#A9A294] max-w-xl font-light">
                Our advisors have direct mandates and private access to landmark projects beyond this public catalogue.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.2em] rounded-[2px] transition-all hover:brightness-110 active:scale-95 shadow-lg whitespace-nowrap"
            >
              Talk to Us
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
      <FloatingButtons />
    </div>
  );
}

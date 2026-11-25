'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function NeighbourhoodSection() {
  return (
    <section className="relative w-full py-28 bg-[#F6F3EC] text-[#141414] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        {/* Section Overline & Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-2.5"
        >
          <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.28em] text-[#B8892F] block font-semibold">
            Enclave Intelligence
          </span>
          <h2 className="font-headline-lg text-headline-lg text-[#141414] font-normal tracking-tight">
            Gurgaon’s Pinnacle Addresses
          </h2>
          <p className="font-body-md text-body-md text-[#666055] font-light">
            Micro-markets commanding India&apos;s premier capital appreciation and lifestyle benchmarks.
          </p>
        </motion.div>

        {/* 3 Enclave Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Golf Course Road',
              subtitle: "The Billionaire's Strip",
              desc: 'DLF The Camellias, Magnolias, and Aralias flanked by the Gary Player championship golf course.',
              stat: 'Avg. ₹75,000 / sq. ft.',
              linkText: 'View Residences',
              locationKey: 'gcr',
              imageUrl:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuD26HXa_jEMFsHVl95hPLEXeaXbwfx8T01TRZaANfapy87O6ufH6rxB5d0s-Gr9feBF95GeZGleB9Ywgbvh3dQPO-yYSzRjCP-mleAQ9MQCjBy-swCMiVTFWNdnci-c_FywKr_0mVFJVEjaAob7gN3z_wKAF3bqA_00U78j9NKeZ5yMZjCd0l-6Pm3axXSvu8dYM5aaIa9A_RqA9CbpgrmlJj3Qp-Gu7UQZEWE0i2fW',
            },
            {
              title: 'Extension & SPR',
              subtitle: 'Contemporary High-Design',
              desc: 'Anchored by Trump Towers Delhi NCR, Oberoi Privus, and private clubhouse sanctuaries with Aravali views.',
              stat: 'Avg. ₹38,000 / sq. ft.',
              linkText: 'View Residences',
              locationKey: 'gce',
              imageUrl:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuD30OL0v37NWG11o0xUdhc05N7vIWXJBdvN9Gl8955CkeGvH9wDofXVk7-l_3n1V51biH-2_ItCjK6JUOdp1l-s9UhGRXAWYp-qTON9vJpBTUV5mhh26ik4SeS3vHUFe2JoPTdhlRqylrViGVO2_oV3E44TBIMFUcMzjmvaqkuMVsY4QX77Ul_t95NgeqgrEKKnYj27JpQDSjf8U6JZYqoGZrLemTrWWTjdixJ6j0mM',
            },
            {
              title: 'Aravali Foothills',
              subtitle: 'Secluded Sanctuaries',
              desc: 'Low-density acreage villas and gated country estates nestled within protected reserve forests.',
              stat: '₹35 Cr – ₹120 Cr',
              linkText: 'View Residences',
              locationKey: 'sohna',
              imageUrl:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDXbBjxJNqFRXbqDMw1Gf5_svty7XIXsVyuVDdNKs-tZZXMgvFdPPLXD0t9JILevEaZ0vUljgkoEPhaoVTb24iw88qi6R5SuWcW-vy9zbBssI_VU2PwLms7kYMaWuR5LRZnJFqHb07laHQDQJWAy-gSZ2Vo1KVUH_EFaYkkR9QDCp2hRon9x0ZyIdCZPZrpAg3e_hiupo7CXKaZUaLh_-zEeNNekgD4hF6ce4wVoCZg',
            },
          ].map((enclave, idx) => (
            <motion.div
              key={enclave.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E5DFD2] h-[440px] flex flex-col justify-end p-8 shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(201,162,75,0.18)] hover:border-[#C9A24B] transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
                style={{ backgroundImage: `url('${enclave.imageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              <div className="relative z-10 space-y-2.5 text-white">
                <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.2em] text-[#E8C872] font-semibold">
                  {enclave.subtitle}
                </span>
                <h3 className="font-headline-md text-headline-md text-white font-normal group-hover:text-[#E8C872] transition-colors">
                  {enclave.title}
                </h3>
                <p className="font-body-sm text-body-sm text-[#ddd] font-light leading-relaxed">
                  {enclave.desc}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-white/15">
                  <span className="font-label-sm text-label-sm text-[#E8C872] font-semibold tracking-wider">
                    {enclave.stat}
                  </span>
                  <Link
                    className="font-label-sm text-label-sm text-white uppercase tracking-widest hover:text-[#E8C872] flex items-center gap-1 group-hover:translate-x-1 transition-all"
                    href={`/properties?location=${enclave.locationKey}`}
                  >
                    <span>{enclave.linkText}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

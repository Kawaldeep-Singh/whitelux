'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types';

interface ConsultationSectionProps {
  settings: SiteSettings;
}

export default function ConsultationSection({ settings }: ConsultationSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestedIn, setInterestedIn] = useState('Commercial / SCO');
  const [budget, setBudget] = useState('5-10 Cr');
  const [timeline, setTimeline] = useState('Within 3 months');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const phoneDisplay = settings.phone || '+91 98152 02102';
  const emailDisplay = settings.email || 'rohitrajmaingi@whiteluxerealestate.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trapped
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: email || `${phone.replace(/\D/g, '')}@lead.whiteluxerealestate.com`,
          interestedIn,
          budget,
          timeline,
          message: `Direct consultation request from homepage. Looking for ${interestedIn}, Budget: ${budget}, Timeline: ${timeline}.`,
          botField: honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setName('');
        setPhone('');
        setEmail('');
      } else {
        setError(data.message || 'Unable to submit enquiry. Please call or WhatsApp us directly.');
      }
    } catch {
      setError('Connection error. Please contact Rohit directly via phone or WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultation" className="bg-[#080808] py-24 sm:py-28 relative border-b border-[#C8A24A]/25">
      <div className="w-[90%] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium inline-block border-b border-[#C8A24A]/40 pb-1">
                  PRIVATE CONSULTATION
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] font-normal leading-tight"
              >
                Speak with Rohit{' '}
                <span className="italic text-[#E3C06F]">directly.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-base text-[#A9A294] font-light leading-relaxed"
              >
                Every enquiry is read personally. Expect a call within one working day.
              </motion.p>
            </div>

            {/* Direct Contact Points */}
            <div className="space-y-4 pt-2">
              <a
                href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-4 bg-[#14110C] border border-[#C8A24A]/25 hover:border-[#C8A24A] rounded-[2px] transition-colors group"
              >
                <div className="w-10 h-10 rounded-[2px] bg-[#0D0D0D] border border-[#C8A24A]/30 flex items-center justify-center text-[#C8A24A]">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9A294] font-sans block">
                    Direct Phone Line
                  </span>
                  <span className="text-sm text-[#F4ECD8] font-medium group-hover:text-[#E3C06F] transition-colors">
                    {phoneDisplay}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${emailDisplay}`}
                className="flex items-center gap-4 p-4 bg-[#14110C] border border-[#C8A24A]/25 hover:border-[#C8A24A] rounded-[2px] transition-colors group"
              >
                <div className="w-10 h-10 rounded-[2px] bg-[#0D0D0D] border border-[#C8A24A]/30 flex items-center justify-center text-[#C8A24A]">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9A294] font-sans block">
                    Direct Advisory Email
                  </span>
                  <span className="text-sm text-[#F4ECD8] font-medium group-hover:text-[#E3C06F] transition-colors break-all">
                    {emailDisplay}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#14110C] border border-[#C8A24A]/30 rounded-[2px] shadow-[0_10px_50px_rgba(0,0,0,0.6)]">
              {success ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#C8A24A]/20 border border-[#C8A24A] flex items-center justify-center text-[#C8A24A]">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-serif text-2xl text-[#F4ECD8]">
                    Consultation Request Received
                  </h3>
                  <p className="text-xs text-[#A9A294] max-w-md mx-auto leading-relaxed">
                    Thank you. Rohit Raj Maingi has received your enquiry and will connect with you within one working day.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2 border border-[#C8A24A]/40 text-[#C8A24A] hover:bg-[#C8A24A]/10 text-xs uppercase tracking-wider rounded-[2px] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-200 text-xs rounded flex items-center gap-2">
                      <AlertCircle size={15} className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="botField"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#C9C6C0] font-sans font-medium mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rohit Raj Maingi"
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/30 focus:border-[#C8A24A] rounded-[2px] px-3.5 py-2.5 text-xs text-[#F4ECD8] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#C9C6C0] font-sans font-medium mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98152 02102"
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/30 focus:border-[#C8A24A] rounded-[2px] px-3.5 py-2.5 text-xs text-[#F4ECD8] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#C9C6C0] font-sans font-medium mb-1.5">
                      I am looking for
                    </label>
                    <select
                      value={interestedIn}
                      onChange={(e) => setInterestedIn(e.target.value)}
                      className="w-full bg-[#0D0D0D] border border-[#C8A24A]/30 focus:border-[#C8A24A] rounded-[2px] px-3.5 py-2.5 text-xs text-[#F4ECD8] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Commercial / SCO">Commercial / SCO</option>
                      <option value="Luxury Residential">Luxury Residential</option>
                      <option value="Leasing">Leasing</option>
                      <option value="Investment Advisory">Investment Advisory</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#C9C6C0] font-sans font-medium mb-1.5">
                        Investment Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/30 focus:border-[#C8A24A] rounded-[2px] px-3.5 py-2.5 text-xs text-[#F4ECD8] focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Under 2 Cr">Under 2 Cr</option>
                        <option value="2-5 Cr">2-5 Cr</option>
                        <option value="5-10 Cr">5-10 Cr</option>
                        <option value="10 Cr+">10 Cr+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#C9C6C0] font-sans font-medium mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/30 focus:border-[#C8A24A] rounded-[2px] px-3.5 py-2.5 text-xs text-[#F4ECD8] focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Within 3 months">Within 3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0_0_20px_rgba(200,162,74,0.35)] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span>{loading ? 'Submitting Request...' : 'Request a Call'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

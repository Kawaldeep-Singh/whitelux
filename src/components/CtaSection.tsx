'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CtaSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestedIn, setInterestedIn] = useState('Residential');
  const [botField, setBotField] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (botField) return; // honeypot

    setLoading(true);
    try {
      await api.submitLead({
        name,
        phone,
        email,
        interestedIn,
        botField,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#080808] text-[#F4ECD8] py-24 md:py-32 border-t border-[#C8A24A]/20 relative overflow-hidden">
      {/* Background golden glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-[#C8A24A]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* 90% aligned container */}
      <div className="w-[90%] max-w-[1440px] mx-auto relative z-10 text-center space-y-12">
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
            CONFIDENTIAL ADVISORY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F4ECD8] font-normal leading-tight">
            Let&apos;s find your dream property
          </h2>
          <p className="text-sm md:text-base text-[#A9A294] font-light max-w-xl mx-auto leading-relaxed">
            Share your requirement and our advisor will get back to you shortly.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 bg-[#14110C] border border-[#C8A24A]/40 rounded-[2px] max-w-lg mx-auto space-y-3 shadow-2xl"
          >
            <CheckCircle2 size={40} className="text-[#C8A24A] mx-auto" />
            <h3 className="font-serif text-2xl text-[#F4ECD8]">Request Received</h3>
            <p className="text-xs text-[#A9A294] font-light">
              Thank you, <span className="text-[#E3C06F] font-medium">{name}</span>. Our senior real estate advisor will connect with you shortly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="p-8 md:p-12 bg-[#14110C]/90 backdrop-blur-md border border-[#C8A24A]/30 rounded-[2px] max-w-2xl mx-auto space-y-5 text-left shadow-2xl"
          >
            {error && (
              <div className="p-3 bg-red-950/40 border border-red-800 rounded text-red-200 text-xs flex items-center gap-2">
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Honeypot */}
            <input
              type="text"
              name="botField"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] font-sans mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] font-sans mb-1.5">
                  Your Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98100 XXXXX"
                  className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] font-sans mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vikram@domain.com"
                  className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] font-sans mb-1.5">
                  I am interested in
                </label>
                <select
                  value={interestedIn}
                  onChange={(e) => setInterestedIn(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] focus:outline-none focus:border-[#C8A24A] transition-colors cursor-pointer"
                >
                  <option value="Residential">Residential Luxury Property</option>
                  <option value="Commercial">Commercial Office Space</option>
                  <option value="Retail">Retail Leasing</option>
                  <option value="Investment Advisory">Investment Advisory</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-4 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(200,162,74,0.4)] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0D0D0D] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Request a Call Back</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            <p className="text-[10px] text-[#A9A294]/70 text-center pt-2 font-sans font-light">
              By submitting, you agree to be contacted by White Luxe Real Estate.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}

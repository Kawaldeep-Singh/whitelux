'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';

export function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '₹50 Cr – ₹100 Cr',
    message: '',
    website: '', // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.submitLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        interestedIn: `Investment Bracket: ${formData.budget}`,
        message: formData.message,
        source: 'Website - Private Appointment Form',
        website: formData.website,
      });

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        budget: '₹50 Cr – ₹100 Cr',
        message: '',
        website: '',
      });
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-28 bg-[#101010] overflow-hidden">
      {/* Soft Ambient Light Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-margin-mobile lg:px-margin">
        {/* Translucent Glassmorphic Container with Clean Proportions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="rounded-3xl bg-gradient-to-br from-[#1c1c1c] via-[#161616] to-[#131313] border border-primary/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Partner Profile & Quote Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 bg-gradient-to-b from-[#222222] to-[#181818] border-b lg:border-b-0 lg:border-r border-primary/20 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.22em] text-primary font-medium">
                    Managing Partner
                  </span>
                </div>

                {/* Executive Portrait with Gold Border */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl p-[2px] bg-gradient-to-tr from-primary via-primary-fixed to-primary-container">
                  <img
                    alt="Editorial headshot portrait of senior luxury property advisor"
                    className="w-full h-full object-cover rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4J6F5pZKYnSrFU80ZcwlC0hrOvjOv9HYb6z8UrmF0qUJ3-LzG4zlqHEokADubCP_d3NPdp9S16vAEHzbOjWTRlJvDFt2YMF0Moc66LRjpFq_gEJuoqkgCjObQomtWjEeLCe4OYT_sodk86GBkHBONkZgy1HSQPN31cMMXTHsIvVJWn9XsCl0fO4onW9VvAMhytkMy1Mnk2vp6TeJifmeNdZ9bycihYc4Mkz5S36ex"
                  />
                </div>

                {/* Partner Quote */}
                <blockquote className="space-y-3">
                  <p className="font-headline-sm text-headline-sm text-[#FAF7F0] font-light italic leading-relaxed">
                    “Our clients do not simply buy real estate; they secure timeless architectural
                    heritage in Gurgaon’s most exclusive enclaves.”
                  </p>
                  <div className="space-y-0.5">
                    <span className="font-label-md text-label-md text-primary font-semibold block uppercase tracking-wider">
                      Aditya Singhania
                    </span>
                    <span className="font-body-sm text-body-sm text-[#a89d8d] block font-light">
                      White Luxe Private Office
                    </span>
                  </div>
                </blockquote>
              </div>

              {/* Direct Contact Coordinates */}
              <div className="pt-5 space-y-2.5 border-t border-white/10">
                <div className="flex items-center gap-2.5 font-body-sm text-body-sm text-[#c8bdae]">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>HARERA Registered Advisor No. 1422-2023</span>
                </div>
                <div className="flex items-center gap-2.5 font-body-sm text-body-sm text-[#c8bdae]">
                  <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                  <span>Strict Non-Disclosure Protocol Active</span>
                </div>
              </div>
            </div>

            {/* Minimalist Appointment & Mandate Request Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
              <div className="mb-6 space-y-1.5">
                <span className="font-eyebrow-badge text-eyebrow-badge uppercase tracking-[0.25em] text-primary block font-medium">
                  Confidential Consultation
                </span>
                <h3 className="font-headline-lg text-headline-lg text-[#FAF7F0] font-normal tracking-tight">
                  Initiate Private Dialogue
                </h3>
                <p className="font-body-sm text-body-sm text-[#a89d8d] font-light">
                  Our private desk will reach out through your preferred secure channel within four hours.
                </p>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-[#202020] border border-primary/40 space-y-3 text-center"
                >
                  <span className="material-symbols-outlined text-primary text-5xl">verified_user</span>
                  <h4 className="font-headline-sm text-headline-sm text-primary">
                    Mandate Received in Confidence
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#cdc1b1]">
                    Thank you. Our senior advisory partner will initiate private correspondence
                    shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-3 text-xs uppercase tracking-widest text-primary hover:underline cursor-pointer"
                  >
                    Submit another requirement
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Honeypot field for bot suppression */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {error && (
                    <div className="p-3 rounded bg-error-container/20 border border-error text-error text-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block font-label-sm text-label-sm uppercase tracking-wider text-[#FAF7F0]">
                        Full Name
                      </label>
                      <input
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-[#202020] border border-white/10 text-[#FAF7F0] placeholder:text-[#6e665a] font-body-md text-body-md focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-colors"
                        placeholder="e.g. Rohit Raj Maingi"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Direct Contact */}
                    <div className="space-y-1">
                      <label className="block font-label-sm text-label-sm uppercase tracking-wider text-[#FAF7F0]">
                        Direct Contact
                      </label>
                      <input
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-[#202020] border border-white/10 text-[#FAF7F0] placeholder:text-[#6e665a] font-body-md text-body-md focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-colors"
                        placeholder="+91 98152 02102"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block font-label-sm text-label-sm uppercase tracking-wider text-[#FAF7F0]">
                        Email Address
                      </label>
                      <input
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-[#202020] border border-white/10 text-[#FAF7F0] placeholder:text-[#6e665a] font-body-md text-body-md focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-colors"
                        placeholder="rohitrajmaingi@whiteluxerealestate.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    {/* Target Bracket */}
                    <div className="space-y-1">
                      <label className="block font-label-sm text-label-sm uppercase tracking-wider text-[#FAF7F0]">
                        Target Bracket
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-4 py-2.5 rounded-xl bg-[#202020] border border-white/10 text-[#FAF7F0] font-body-md text-body-md appearance-none focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-colors cursor-pointer"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        >
                          <option className="bg-[#1c1c1c]" value="₹25 Cr – ₹50 Cr">₹25 Cr – ₹50 Cr</option>
                          <option className="bg-[#1c1c1c]" value="₹50 Cr – ₹100 Cr">₹50 Cr – ₹100 Cr</option>
                          <option className="bg-[#1c1c1c]" value="₹100 Cr – ₹200 Cr+">₹100 Cr – ₹200 Cr+</option>
                          <option className="bg-[#1c1c1c]" value="Institutional Commercial">Institutional Grade</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-base">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Private Message */}
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-[#FAF7F0]">
                      Property or Criteria of Interest
                    </label>
                    <textarea
                      className="w-full px-4 py-2.5 rounded-xl bg-[#202020] border border-white/10 text-[#FAF7F0] placeholder:text-[#6e665a] font-body-md text-body-md focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-colors resize-none"
                      placeholder="e.g. The Camellias Sky Villa, Trump Towers Penthouse, or confidential off-market..."
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 space-y-3">
                    <button
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-container via-primary to-primary-fixed text-on-primary font-label-md text-label-md font-semibold tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_6px_22px_rgba(201,162,75,0.3)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                      type="submit"
                    >
                      <span>{loading ? 'Submitting...' : 'Request Private Advisory Call'}</span>
                      <span className="material-symbols-outlined text-[17px]">verified_user</span>
                    </button>
                    <p className="font-body-sm text-body-sm text-[#7a7164] text-center">
                      Strict confidentiality guaranteed. No records shared with external brokers.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';
import { CheckCircle2, AlertCircle, ArrowRight, Shield } from 'lucide-react';

interface ProjectEnquiryCardProps {
  projectId: string;
  projectSlug: string;
  projectName: string;
}

export default function ProjectEnquiryCard({
  projectId,
  projectSlug,
  projectName,
}: ProjectEnquiryCardProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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
        projectId,
        projectSlug,
        projectName,
        interestedIn: projectName,
        message: `Inquiry submitted for ${projectName}`,
        botField,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Unable to submit enquiry. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#141414] border border-[#C9A24B]/40 rounded-lg p-6 text-center text-[#FAF7F0] shadow-xl">
        <CheckCircle2 size={36} className="text-[#C9A24B] mx-auto mb-3" />
        <h3 className="font-serif text-xl text-[#FAF7F0]">Spot Reserved</h3>
        <p className="text-xs text-[#C9C6C0] mt-2 leading-relaxed font-light">
          Thank you, <span className="text-[#C9A24B]">{name}</span>. Our senior advisory partner will connect with you shortly with priority allocations for <span className="font-semibold">{projectName}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] border border-[#2B2B2B] rounded-lg p-6 md:p-8 text-[#FAF7F0] shadow-2xl relative">
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[#C9A24B] font-semibold block mb-1">
          EXCLUSIVE ALLOCATION
        </span>
        <h3 className="font-serif text-2xl text-[#FAF7F0]">Let&apos;s Find Your Dream Home!</h3>
        <p className="text-xs text-[#9A8F7E] mt-1.5 font-light leading-relaxed">
          Please fill out the form below; our expert will get back to you with verified pricing and unit availability.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800 rounded text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle size={14} className="text-rose-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field */}
        <input
          type="text"
          name="botField"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-[#C9C6C0] mb-1.5 font-medium">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Vikram Malhotra"
            className="w-full bg-[#1C1B1B] border border-[#333] rounded px-3.5 py-2.5 text-xs text-[#FAF7F0] placeholder-[#555] focus:outline-none focus:border-[#C9A24B]"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-[#C9C6C0] mb-1.5 font-medium">
            Your Number *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98100 XXXXX"
            className="w-full bg-[#1C1B1B] border border-[#333] rounded px-3.5 py-2.5 text-xs text-[#FAF7F0] placeholder-[#555] focus:outline-none focus:border-[#C9A24B]"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-[#C9C6C0] mb-1.5 font-medium">
            Your Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vikram@domain.com"
            className="w-full bg-[#1C1B1B] border border-[#333] rounded px-3.5 py-2.5 text-xs text-[#FAF7F0] placeholder-[#555] focus:outline-none focus:border-[#C9A24B]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3.5 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] font-semibold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Reserve Your Spot</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>

        <p className="text-[10px] text-[#666] text-center pt-2 flex items-center justify-center gap-1">
          <Shield size={12} className="text-[#C9A24B]" />
          <span>Strict privacy assured. No unsolicited distribution.</span>
        </p>
      </form>
    </div>
  );
}

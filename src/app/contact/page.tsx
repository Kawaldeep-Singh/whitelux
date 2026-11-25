'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import { api } from '@/lib/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Do you charge for private advisory consultations?',
    a: 'Initial exploratory discussions and portfolio reviews are complimentary and strictly confidential.',
  },
  {
    q: 'What is your primary geographic focus?',
    a: 'We specialize specifically in Golf Course Extension Road (Sectors 58 to 68), Golf Course Road, and Southern Peripheral Road, Gurgaon.',
  },
  {
    q: 'How does White Luxe differ from a traditional brokerage agency?',
    a: 'We operate as fiduciary advisors on your side of the table. We evaluate assets using private banking risk-return criteria, developer track records, and physical scarcity rather than pushing developer inventory.',
  },
  {
    q: 'Do you assist with commercial SCO and pre-leased assets?',
    a: 'Yes. Commercial, SCO plots, and pre-leased high-yield assets form our lead advisory practice.',
  },
  {
    q: 'Are all recommended developments RERA registered?',
    a: 'Yes. We strictly adhere to Haryana Real Estate Regulatory Authority (HARERA) compliance and independently audit escrow accounts and statutory approvals.',
  },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestedIn, setInterestedIn] = useState('Commercial / SCO');
  const [budget, setBudget] = useState('5-10 Cr');
  const [timeline, setTimeline] = useState('Within 3 months');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (botField) return; // honeypot

    setLoading(true);
    try {
      await api.submitLead({
        name,
        phone,
        email: email || `${phone.replace(/\D/g, '')}@lead.whiteluxerealestate.com`,
        interestedIn,
        budget,
        timeline,
        message,
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
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Hero */}
        <section className="bg-[#14110C] border-b border-[#C8A24A]/20 py-20 md:py-28 relative overflow-hidden">
          <div className="w-[90%] max-w-[1440px] mx-auto relative z-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block mb-3">
              PRIVATE ADVISORY DESK
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F4ECD8] max-w-4xl leading-tight font-normal">
              Direct Consultation
            </h1>
            <p className="text-[#A9A294] text-sm md:text-lg max-w-2xl mt-6 font-light leading-relaxed">
              Connect directly with Rohit Raj Maingi. Every enquiry is treated with strict confidentiality and fiduciary care.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />
        </section>

        {/* Contact Form & Details Section */}
        <section className="py-24 md:py-28 w-[90%] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Details Left */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                  OFFICE COORDINATES
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
                  Gurgaon Advisory Office
                </h2>
                <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
                  Located in the heart of Golf Course Extension Road corridor. In-person consultations by prior appointment.
                </p>
              </div>

              <div className="space-y-5 pt-2 text-xs font-sans">
                <div className="flex items-start gap-4 p-4 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/20">
                  <div className="w-10 h-10 rounded-[2px] bg-[#0D0D0D] border border-[#C8A24A]/30 text-[#C8A24A] flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">Address</span>
                    <p className="text-sm text-[#F4ECD8] mt-0.5 font-light">
                      R-7/109 M3M Urbana, Sector 67, Gurgaon 122102
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/20">
                  <div className="w-10 h-10 rounded-[2px] bg-[#0D0D0D] border border-[#C8A24A]/30 text-[#C8A24A] flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">Phone &amp; WhatsApp</span>
                    <a
                      href="tel:+919815202102"
                      className="text-sm text-[#F4ECD8] hover:text-[#E3C06F] mt-0.5 font-medium block transition-colors"
                    >
                      +91 98152 02102
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/20">
                  <div className="w-10 h-10 rounded-[2px] bg-[#0D0D0D] border border-[#C8A24A]/30 text-[#C8A24A] flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">Direct Email</span>
                    <a
                      href="mailto:rohitrajmaingi@whiteluxerealestate.com"
                      className="text-sm text-[#F4ECD8] hover:text-[#E3C06F] mt-0.5 font-light block transition-colors break-all"
                    >
                      rohitrajmaingi@whiteluxerealestate.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/20">
                  <div className="w-10 h-10 rounded-[2px] bg-[#0D0D0D] border border-[#C8A24A]/30 text-[#C8A24A] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">HRERA Registration</span>
                    <p className="text-xs text-[#F4ECD8] mt-0.5 font-mono">
                      RC/HARERA/GGM/3367/2962/2025/244
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Right */}
            <div className="lg:col-span-7">
              <div className="bg-[#14110C] p-8 md:p-12 rounded-[2px] border border-[#C8A24A]/30 shadow-2xl">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 size={44} className="text-[#C8A24A] mx-auto" />
                    <h3 className="font-serif text-3xl text-[#F4ECD8] font-normal">Enquiry Received</h3>
                    <p className="text-xs sm:text-sm text-[#A9A294] font-light max-w-md mx-auto leading-relaxed">
                      Thank you. Rohit Raj Maingi has received your submission and will contact you within one business day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.2em] rounded-[2px] hover:brightness-110 active:scale-95 transition-all shadow-md"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-[#C8A24A]/20 pb-4 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-semibold block">
                        REQUEST A PRIVATE CALL
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#F4ECD8] font-normal mt-1">
                        Speak with Rohit directly
                      </h3>
                    </div>

                    {error && (
                      <div className="p-3.5 bg-red-950/40 border border-red-800 rounded text-red-200 text-xs flex items-center gap-2">
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

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
                      <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rohit Raj Maingi"
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A]/40 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98152 02102"
                          className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A]/40 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rohitrajmaingi@whiteluxerealestate.com"
                          className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A]/40 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                        I am looking for
                      </label>
                      <select
                        value={interestedIn}
                        onChange={(e) => setInterestedIn(e.target.value)}
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] focus:outline-none focus:border-[#C8A24A] transition-colors cursor-pointer"
                      >
                        <option value="Commercial / SCO">Commercial / SCO</option>
                        <option value="Luxury Residential">Luxury Residential</option>
                        <option value="Leasing">Leasing</option>
                        <option value="Investment Advisory">Investment Advisory</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                          Budget Range
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] focus:outline-none focus:border-[#C8A24A] transition-colors cursor-pointer"
                        >
                          <option value="Under 2 Cr">Under 2 Cr</option>
                          <option value="2-5 Cr">2-5 Cr</option>
                          <option value="5-10 Cr">5-10 Cr</option>
                          <option value="10 Cr+">10 Cr+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                          Timeline
                        </label>
                        <select
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] focus:outline-none focus:border-[#C8A24A] transition-colors cursor-pointer"
                        >
                          <option value="Within 3 months">Within 3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6-12 months">6-12 months</option>
                          <option value="Just exploring">Just exploring</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                        Specific Requirements / Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Corridor preference, specific project questions, or timing..."
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A]/40 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-[#B8892F] via-[#C8A24A] to-[#E8C872] text-[#0D0D0D] font-semibold text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all hover:brightness-110 active:scale-98 flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-[#0D0D0D] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Request a Call</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Google Map (M3M Urbana, Sector 67, Gurgaon) */}
        <section className="border-t border-[#C8A24A]/20">
          <div className="w-full h-80 bg-[#080808]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.704253106198!2d77.0583090754924!3d28.39798537579178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d22f281e01369%3A0xda01217646ba4a0!2sM3M%20URBANA!5e0!3m2!1sen!2sin!4v1716200000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#14110C] py-24 md:py-28 border-t border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1000px] mx-auto space-y-12">
            <div className="text-center space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                FREQUENT QUESTIONS
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#F4ECD8] font-normal">
                Advisory Protocol &amp; FAQ
              </h2>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#0D0D0D] rounded-[2px] border border-[#C8A24A]/25 hover:border-[#C8A24A]/60 transition-colors overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg md:text-xl text-[#F4ECD8] hover:text-[#E3C06F] transition-colors font-normal"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-[#C8A24A] transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed border-t border-[#C8A24A]/15 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
      <FloatingButtons />
    </div>
  );
}

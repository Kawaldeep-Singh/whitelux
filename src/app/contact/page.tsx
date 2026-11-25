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
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Do you charge for consultation?',
    a: 'Our initial consultation is complimentary.',
  },
  {
    q: 'Can I visit projects before deciding?',
    a: 'Yes. We arrange site visits at your convenience.',
  },
  {
    q: 'Do you help with resale and leasing?',
    a: 'Yes. We assist with new launches, resale and commercial or retail leasing.',
  },
  {
    q: 'Are the prices on the website final?',
    a: 'Prices shown are indicative and may change. Our advisor will share the latest details.',
  },
  {
    q: 'Do you help with documentation?',
    a: 'Yes. We guide you through agreements, registration and payment schedules.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'Primarily Gurgaon, along with select opportunities across Delhi NCR.',
  },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestedIn, setInterestedIn] = useState('Residential');
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
        email,
        interestedIn,
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
              CONTACT
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F4ECD8] max-w-4xl leading-tight font-normal">
              Let&apos;s Talk
            </h1>
            <p className="text-[#A9A294] text-sm md:text-lg max-w-2xl mt-6 font-light leading-relaxed">
              Tell us what you are looking for. We will guide you from there.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />
        </section>

        {/* Contact Form & Details Section */}
        <section className="py-24 md:py-32 w-[90%] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Details Left */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                  COORDINATES
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] font-normal">
                  Gurgaon Private Office
                </h2>
                <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed">
                  Connect with our senior advisory desk for private shortlisting, portfolio structuring, and property visits.
                </p>
              </div>

              <div className="space-y-6 pt-2 text-xs font-sans">
                <div className="flex items-start gap-4 p-3 rounded-[2px] hover:bg-[#14110C] transition-colors">
                  <div className="w-10 h-10 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/30 text-[#C8A24A] flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">Address</span>
                    <p className="text-sm text-[#F4ECD8] mt-0.5 font-light">Sector 49, Gurgaon, Haryana, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-[2px] hover:bg-[#14110C] transition-colors">
                  <div className="w-10 h-10 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/30 text-[#C8A24A] flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">Phone &amp; WhatsApp</span>
                    <a href="tel:+919958009492" className="text-sm text-[#F4ECD8] hover:text-[#E3C06F] mt-0.5 font-light block transition-colors">
                      +91 9958009492
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-[2px] hover:bg-[#14110C] transition-colors">
                  <div className="w-10 h-10 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/30 text-[#C8A24A] flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">Email</span>
                    <a href="mailto:support@whiteluxe.com" className="text-sm text-[#F4ECD8] hover:text-[#E3C06F] mt-0.5 font-light block transition-colors">
                      support@whiteluxe.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-[2px] hover:bg-[#14110C] transition-colors">
                  <div className="w-10 h-10 rounded-[2px] bg-[#14110C] border border-[#C8A24A]/30 text-[#C8A24A] flex items-center justify-center flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A9A294] block">Working Hours</span>
                    <p className="text-sm text-[#F4ECD8] mt-0.5 font-light">Mon-Sat, 10:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Right */}
            <div className="lg:col-span-7">
              <div className="bg-[#14110C] p-8 md:p-12 rounded-[2px] border border-[#C8A24A]/30 shadow-2xl">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 size={40} className="text-[#C8A24A] mx-auto" />
                    <h3 className="font-serif text-3xl text-[#F4ECD8] font-normal">Thank you</h3>
                    <p className="text-xs sm:text-sm text-[#A9A294] font-light max-w-md mx-auto">
                      Thank you. Our advisor will contact you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.2em] rounded-[2px] hover:brightness-110 active:scale-95 transition-all shadow-md"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-[#C8A24A]/20 pb-4 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A24A] font-semibold block">
                        ENQUIRY FORM
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#F4ECD8] font-normal mt-1">
                        Send An Enquiry
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
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A]/40 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Your phone number"
                          className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A]/40 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] placeholder-[#555] focus:outline-none focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A]/40 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                        Interested In *
                      </label>
                      <select
                        value={interestedIn}
                        onChange={(e) => setInterestedIn(e.target.value)}
                        className="w-full bg-[#0D0D0D] border border-[#C8A24A]/25 rounded-[2px] px-4 py-3 text-xs text-[#F4ECD8] focus:outline-none focus:border-[#C8A24A] transition-colors cursor-pointer"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Retail">Retail</option>
                        <option value="Investment">Investment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#A9A294] mb-1.5 font-medium">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you are looking for..."
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
                          <span>Send Enquiry</span>
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

        {/* Embedded Google Map */}
        <section className="border-t border-[#C8A24A]/20">
          <div className="w-full h-80 bg-[#080808]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.9715783307525!2d77.0949168754942!3d28.450280975764023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18dcd1dbb91f%3A0xe7819ad3db59e86c!2sOne%20Horizon%20Center!5e0!3m2!1sen!2sin!4v1716200000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#14110C] py-24 md:py-32 border-t border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1000px] mx-auto space-y-12">
            <div className="text-center space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                FAQ
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#F4ECD8] font-normal">
                Frequently Asked Questions
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

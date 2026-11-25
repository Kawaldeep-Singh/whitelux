'use client';

import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded text-emerald-300 text-xs text-center max-w-md mx-auto">
        ✓ Thank you for subscribing to White Luxe Insights.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-4">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="e.g. rohitrajmaingi@whiteluxerealestate.com"
        className="flex-1 bg-[#1C1B1B] border border-[#333] rounded px-4 py-3 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}

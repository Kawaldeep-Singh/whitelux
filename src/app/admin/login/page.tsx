'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-[#141414] border border-[#2A2A2A] rounded-lg p-8 md:p-10 shadow-2xl">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/logo.jpeg"
            alt="White Luxe"
            className="h-16 w-auto object-contain rounded mb-4 border border-[#2A2A2A]"
          />
          <h1 className="font-serif text-2xl tracking-widest text-[#FAF7F0] uppercase">
            WHITE LUXE
          </h1>
          <p className="text-xs tracking-widest text-[#C9A24B] uppercase mt-1">
            Single-Admin CMS Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-950/40 border border-red-800/60 rounded text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E7B73]" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@whiteluxe.com"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-4 py-2.5 pl-10 text-sm text-[#FAF7F0] placeholder-[#555] focus:outline-none focus:border-[#C9A24B] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E7B73]" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-4 py-2.5 pl-10 text-sm text-[#FAF7F0] placeholder-[#555] focus:outline-none focus:border-[#C9A24B] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] font-semibold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#222] text-center">
          <p className="text-[11px] text-[#666]">
            Strictly authorized access only. Protected by brute-force rate limiting.
          </p>
        </div>
      </div>
    </div>
  );
}

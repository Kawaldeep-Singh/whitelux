'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { SiteSettings } from '@/types';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Lock,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  Share2,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [settingsError, setSettingsError] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.adminGetSettings();
        if (res && res.success) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSettingsError('');
    setSettingsSuccess('');
    setSavingSettings(true);

    try {
      await api.adminUpdateSettings(settings);
      setSettingsSuccess('Brand settings & metrics successfully updated.');
      setTimeout(() => setSettingsSuccess(''), 4000);
    } catch (err: any) {
      setSettingsError(err.message || 'Failed to update settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    try {
      setSavingPassword(true);
      await api.adminUpdatePassword({
        currentPassword,
        newPassword,
      });
      setPasswordSuccess('Password successfully changed. Use your new password on next login.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(''), 5000);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password. Verify current password.');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#222]">
        <h1 className="font-serif text-3xl text-[#FAF7F0] tracking-wide">
          Agency Settings & Trust Metrics
        </h1>
        <p className="text-xs text-[#9A8F7E] mt-1 font-sans">
          Manage brand contact details, public metrics, social media links, and security.
        </p>
      </div>

      {settings && (
        <form onSubmit={handleSettingsSubmit} className="space-y-6">
          {settingsSuccess && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
              <span>{settingsSuccess}</span>
            </div>
          )}

          {settingsError && (
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
              <span>{settingsError}</span>
            </div>
          )}

          {/* 1. Global Brand & Contact */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
              <MapPin size={18} className="text-[#C9A24B]" />
              <span>1. Corporate Identity & Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Headquarters Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="Level 5, One Horizon Center, Golf Course Road, DLF Phase 5, Gurugram"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  placeholder="+91 98100 58930"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="919810058930"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Inquiry Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="concierge@whiteluxerealestate.com"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Consultation Working Hours
              </label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                placeholder="Mon - Sat: 10:00 AM – 7:00 PM (By Appointment)"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
            </div>
          </div>

          {/* 2. Trust Strip & Milestones */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#C9A24B]" />
              <span>2. Trust Metrics & Experience Stats</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Years Experience
                </label>
                <input
                  type="text"
                  value={settings.experienceYears}
                  onChange={(e) => setSettings({ ...settings, experienceYears: e.target.value })}
                  placeholder="15+"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Happy Clients
                </label>
                <input
                  type="text"
                  value={settings.happyClients}
                  onChange={(e) => setSettings({ ...settings, happyClients: e.target.value })}
                  placeholder="850+"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Projects Curated
                </label>
                <input
                  type="text"
                  value={settings.projectsCurated}
                  onChange={(e) => setSettings({ ...settings, projectsCurated: e.target.value })}
                  placeholder="120+"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Transaction Volume
                </label>
                <input
                  type="text"
                  value={settings.transactionVolume}
                  onChange={(e) => setSettings({ ...settings, transactionVolume: e.target.value })}
                  placeholder="1,200 Cr+"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                RERA Advisory Registration No.
              </label>
              <input
                type="text"
                value={settings.reraNumber}
                onChange={(e) => setSettings({ ...settings, reraNumber: e.target.value })}
                placeholder="RC/HARERA/GGM/2024/XX"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
            </div>
          </div>

          {/* 3. Social Media Links */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
              <Share2 size={18} className="text-[#C9A24B]" />
              <span>3. Social Channels</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.instagram || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/whiteluxerealestate"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/company/whiteluxe"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Facebook URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.facebook || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/whiteluxerealestate"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  YouTube URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.youtube || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                    })
                  }
                  placeholder="https://youtube.com/@whiteluxerealestate"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={savingSettings}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md disabled:opacity-50"
            >
              <Save size={16} />
              <span>{savingSettings ? 'Saving Settings...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      )}

      {/* 4. Admin Security / Password Section */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4 pt-6 mt-8">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
          <Lock size={18} className="text-[#C9A24B]" />
          <span>4. Admin Security Credentials</span>
        </h2>

        {passwordSuccess && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        {passwordError && (
          <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              New Password (min 8 chars)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="flex items-center gap-2 px-5 py-2 bg-[#202020] hover:bg-[#2B2B2B] text-xs font-semibold text-[#FAF7F0] border border-[#383838] rounded transition-colors disabled:opacity-50"
          >
            <ShieldCheck size={14} className="text-[#C9A24B]" />
            <span>{savingPassword ? 'Updating Password...' : 'Update Password'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

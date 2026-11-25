'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { SiteSettings, CredibilityItem, ReelItem } from '@/types';
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
  User,
  Compass,
  Video,
  Plus,
  Trash2,
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
      setSettingsSuccess('Brand settings & advisory profile successfully updated.');
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

  // Credibility items helpers
  const addCredibility = () => {
    if (!settings) return;
    const current = settings.credibility || [];
    setSettings({
      ...settings,
      credibility: [...current, { label: 'Featured In', value: '' }],
    });
  };

  const updateCredibility = (index: number, field: keyof CredibilityItem, value: string) => {
    if (!settings || !settings.credibility) return;
    const updated = [...settings.credibility];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, credibility: updated });
  };

  const removeCredibility = (index: number) => {
    if (!settings || !settings.credibility) return;
    const updated = settings.credibility.filter((_, i) => i !== index);
    setSettings({ ...settings, credibility: updated });
  };

  // Reels helpers
  const addReel = () => {
    if (!settings) return;
    const current = settings.reels || [];
    setSettings({
      ...settings,
      reels: [...current, { title: '', url: '', thumbnail: '' }],
    });
  };

  const updateReel = (index: number, field: keyof ReelItem, value: string) => {
    if (!settings || !settings.reels) return;
    const updated = [...settings.reels];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, reels: updated });
  };

  const removeReel = (index: number) => {
    if (!settings || !settings.reels) return;
    const updated = settings.reels.filter((_, i) => i !== index);
    setSettings({ ...settings, reels: updated });
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
          Advisory Brand &amp; Global Settings
        </h1>
        <p className="text-xs text-[#9A8F7E] mt-1 font-sans">
          Configure founder identity, positioning (&quot;Advisory. Not Agency.&quot;), contact details, corridor focus, and trust credentials.
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

          {/* 1. Founder & Brand Positioning */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
              <User size={18} className="text-[#C9A24B]" />
              <span>1. Founder Identity &amp; Positioning</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={settings.brandName || ''}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Brand Tagline (Positioning)
                </label>
                <input
                  type="text"
                  value={settings.brandTagline || settings.tagline || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      brandTagline: e.target.value,
                      tagline: e.target.value,
                    })
                  }
                  placeholder="Advisory. Not Agency."
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Founder Name
                </label>
                <input
                  type="text"
                  value={settings.founderName || ''}
                  onChange={(e) => setSettings({ ...settings, founderName: e.target.value })}
                  placeholder="Rohit Raj Maingi"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Founder Title
                </label>
                <input
                  type="text"
                  value={settings.founderTitle || ''}
                  onChange={(e) => setSettings({ ...settings, founderTitle: e.target.value })}
                  placeholder="Founder & Advisory Director"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Founder Portrait Image URL
              </label>
              <input
                type="text"
                value={settings.founderPortrait || ''}
                onChange={(e) => setSettings({ ...settings, founderPortrait: e.target.value })}
                placeholder="https://... (Leave empty to keep hero clean single-column)"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
              <p className="text-[11px] text-[#888] mt-1">
                Note: If left empty, the homepage hero automatically adapts into a single-column layout without broken spaces.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Founder Note Quote (Homepage)
              </label>
              <textarea
                rows={2}
                value={settings.founderNoteQuote || ''}
                onChange={(e) => setSettings({ ...settings, founderNoteQuote: e.target.value })}
                placeholder="I spent 18 years helping families grow their wealth in private banking..."
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Founder Note Body (Optional - hides if empty)
              </label>
              <textarea
                rows={3}
                value={settings.founderNoteBody || ''}
                onChange={(e) => setSettings({ ...settings, founderNoteBody: e.target.value })}
                placeholder="Optional secondary narrative paragraph..."
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
            </div>
          </div>

          {/* 2. Office Contact & Regulatory */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
              <MapPin size={18} className="text-[#C9A24B]" />
              <span>2. Advisory Office &amp; Regulatory Numbers</span>
            </h2>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Office Address
              </label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="R-7/109 M3M Urbana, Sector 67, Gurgaon 122102"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  placeholder="+91 98152 02102"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  WhatsApp Number (with country code, no +)
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="919815202102"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Advisory Email
                </label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="rohitrajmaingi@whiteluxerealestate.com"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  HRERA Registration Number
                </label>
                <input
                  type="text"
                  value={settings.hreraNumber || settings.reraNumber || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hreraNumber: e.target.value,
                      reraNumber: e.target.value,
                    })
                  }
                  placeholder="RC/HARERA/GGM/3367/2962/2025/244"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Experience Years
                </label>
                <input
                  type="text"
                  value={settings.experienceYears || ''}
                  onChange={(e) => setSettings({ ...settings, experienceYears: e.target.value })}
                  placeholder="30+"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Default WhatsApp Message
              </label>
              <input
                type="text"
                value={settings.whatsappCtaText || ''}
                onChange={(e) => setSettings({ ...settings, whatsappCtaText: e.target.value })}
                placeholder="Hello Rohit, I would like to schedule a private advisory consultation..."
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
            </div>
          </div>

          {/* 3. Credibility Strip Items */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <h2 className="font-serif text-lg text-[#FAF7F0] flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#C9A24B]" />
                <span>3. Credibility &amp; Lineage Badges (Homepage Strip)</span>
              </h2>
              <button
                type="button"
                onClick={addCredibility}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A24B]/10 hover:bg-[#C9A24B]/20 text-[#C9A24B] text-xs rounded transition-colors"
              >
                <Plus size={14} />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {(settings.credibility || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#1A1A1A] p-3 rounded border border-[#2A2A2A]">
                  <div className="w-1/3">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateCredibility(idx, 'label', e.target.value)}
                      placeholder="Label (e.g. Featured In)"
                      className="w-full bg-[#141414] border border-[#333] rounded px-3 py-1.5 text-xs text-[#FAF7F0]"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateCredibility(idx, 'value', e.target.value)}
                      placeholder="Value (e.g. Forbes India)"
                      className="w-full bg-[#141414] border border-[#333] rounded px-3 py-1.5 text-xs text-[#FAF7F0]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCredibility(idx)}
                    className="p-2 text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Corridor Focus (Sectors 58-68) */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
              <Compass size={18} className="text-[#C9A24B]" />
              <span>4. Corridor Focus (Golf Course Extension Road)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Corridor Heading
                </label>
                <input
                  type="text"
                  value={settings.corridor?.heading || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      corridor: { ...settings.corridor!, heading: e.target.value },
                    })
                  }
                  placeholder="Golf Course Extension Road, Sectors 58 to 68."
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Report Article Slug (link on homepage)
                </label>
                <input
                  type="text"
                  value={settings.corridor?.reportSlug || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      corridor: { ...settings.corridor!, reportSlug: e.target.value },
                    })
                  }
                  placeholder="gurgaons-aspirational-buyer"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Corridor Narrative Body (hides if empty)
              </label>
              <textarea
                rows={2}
                value={settings.corridor?.body || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    corridor: { ...settings.corridor!, body: e.target.value },
                  })
                }
                placeholder="The premier residential & commercial growth corridor of Gurugram..."
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
              />
            </div>
          </div>

          {/* 5. Reels & Social */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
              <Share2 size={18} className="text-[#C9A24B]" />
              <span>5. Social Handles &amp; Video Insights</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={settings.instagramHandle || ''}
                  onChange={(e) => setSettings({ ...settings, instagramHandle: e.target.value })}
                  placeholder="@rohitmaing77"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={settings.instagramUrl || settings.socialLinks?.instagram || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      instagramUrl: e.target.value,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  placeholder="https://www.instagram.com/rohitmaing77"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  value={settings.linkedinUrl || settings.socialLinks?.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      linkedinUrl: e.target.value,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
                />
              </div>
            </div>

            {/* Video Reels */}
            <div className="pt-4 border-t border-[#222]">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase">
                  Curated Instagram Reels (max 3 displayed)
                </label>
                <button
                  type="button"
                  onClick={addReel}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#C9A24B]/10 hover:bg-[#C9A24B]/20 text-[#C9A24B] text-xs rounded transition-colors"
                >
                  <Plus size={14} />
                  <span>Add Reel</span>
                </button>
              </div>

              <div className="space-y-3">
                {(settings.reels || []).map((reel, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#1A1A1A] p-3 rounded border border-[#2A2A2A]">
                    <div className="w-1/3">
                      <input
                        type="text"
                        value={reel.title}
                        onChange={(e) => updateReel(idx, 'title', e.target.value)}
                        placeholder="Reel Title"
                        className="w-full bg-[#141414] border border-[#333] rounded px-3 py-1.5 text-xs text-[#FAF7F0]"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={reel.url}
                        onChange={(e) => updateReel(idx, 'url', e.target.value)}
                        placeholder="Instagram Reel Link (https://...)"
                        className="w-full bg-[#141414] border border-[#333] rounded px-3 py-1.5 text-xs text-[#FAF7F0]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeReel(idx)}
                      className="p-2 text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {(!settings.reels || settings.reels.length === 0) && (
                  <p className="text-[11px] text-[#777]">No reels added yet. The reels column automatically hides cleanly.</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingSettings}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md disabled:opacity-50"
            >
              <Save size={16} />
              <span>{savingSettings ? 'Saving Settings...' : 'Save All Settings'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Password Management */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4 pt-6">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3 flex items-center gap-2">
          <Lock size={18} className="text-[#C9A24B]" />
          <span>6. Single-Admin Security &amp; Password</span>
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
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="flex items-center gap-2 px-5 py-2 bg-[#222] hover:bg-[#333] text-[#FAF7F0] text-xs font-medium uppercase tracking-wider rounded transition-colors disabled:opacity-50"
          >
            <Lock size={14} className="text-[#C9A24B]" />
            <span>{savingPassword ? 'Updating...' : 'Update Password'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

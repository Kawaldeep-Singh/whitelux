'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Lead, LeadStatus } from '@/types';
import {
  Download,
  Search,
  Filter,
  Users,
  Calendar,
  MessageSquare,
  Clock,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  Phone,
  Mail,
  Building,
  Save,
} from 'lucide-react';

const STATUS_OPTIONS: LeadStatus[] = [
  'New',
  'Contacted',
  'Follow-up',
  'Site Visit',
  'Closed Won',
  'Closed Lost',
];

const STATUS_BADGES: Record<LeadStatus, string> = {
  New: 'bg-rose-950/60 text-rose-300 border-rose-800/40',
  Contacted: 'bg-blue-950/60 text-blue-300 border-blue-800/40',
  'Follow-up': 'bg-amber-950/60 text-amber-300 border-amber-800/40',
  'Site Visit': 'bg-purple-950/60 text-purple-300 border-purple-800/40',
  'Closed Won': 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40',
  'Closed Lost': 'bg-neutral-800 text-neutral-400 border-neutral-700',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editFollowUp, setEditFollowUp] = useState('');
  const [editStatus, setEditStatus] = useState<LeadStatus>('New');
  const [savingLead, setSavingLead] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetLeads({
        search: search || undefined,
        status: statusFilter || undefined,
      });
      if (res && res.success) {
        setLeads(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load leads', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const openLeadDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setEditNotes(lead.notes || '');
    setEditFollowUp(lead.followUpDate ? lead.followUpDate.slice(0, 10) : '');
    setEditStatus(lead.status);
  };

  const handleSaveLeadModal = async () => {
    if (!selectedLead) return;
    try {
      setSavingLead(true);
      await api.adminUpdateLead(selectedLead._id, {
        status: editStatus,
        notes: editNotes,
        followUpDate: editFollowUp || undefined,
      });
      setSelectedLead(null);
      fetchLeads();
    } catch (err) {
      alert('Failed to update lead details.');
    } finally {
      setSavingLead(false);
    }
  };

  const handleQuickStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      await api.adminUpdateLead(id, { status: newStatus });
      fetchLeads();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await api.adminDeleteLead(id);
      if (selectedLead?._id === id) setSelectedLead(null);
      fetchLeads();
    } catch (err) {
      alert('Failed to delete lead.');
    }
  };

  const handleExportCSV = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    window.open(`${apiUrl}/admin/leads/export`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <h1 className="font-serif text-3xl text-[#FAF7F0] tracking-wide">
            Inquiries & Client Registry
          </h1>
          <p className="text-xs text-[#9A8F7E] mt-1 font-sans">
            High-intent leads received across web forms, property pages, and advisory requests.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1C1B1B] hover:bg-[#252525] text-xs font-semibold uppercase tracking-wider text-[#FAF7F0] border border-[#333] rounded transition-colors self-start sm:self-auto"
        >
          <Download size={15} className="text-[#C9A24B]" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E7B73]" size={16} />
          <input
            type="text"
            placeholder="Search by client name, phone number, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-[#2B2B2B] rounded px-4 py-2 pl-10 text-xs text-[#FAF7F0] placeholder-[#555] focus:outline-none focus:border-[#C9A24B]"
          />
        </form>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#141414] border border-[#2B2B2B] text-xs text-[#C9C6C0] px-3 py-2 rounded focus:outline-none focus:border-[#C9A24B]"
        >
          <option value="">All Pipeline Stages</option>
          {STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg overflow-hidden">
        {loading ? (
          <div className="py-12 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-12 text-center text-[#7E7B73] space-y-3">
            <Users size={36} className="mx-auto text-[#444]" />
            <p className="text-sm">No client inquiries found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1C1B1B] text-[#9A8F7E] uppercase tracking-wider border-b border-[#282828]">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Inquiry / Property</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Notes / Follow-up</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#FAF7F0]">{lead.name}</div>
                      <div className="flex items-center gap-2 text-[11px] text-[#7E7B73] mt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone size={10} /> {lead.phone}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#555]">{lead.email}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-medium text-[#C9A24B] flex items-center gap-1 truncate">
                        <Building size={12} className="flex-shrink-0" />
                        <span className="truncate">
                          {lead.projectName || lead.interestedIn || 'General Inquiry'}
                        </span>
                      </div>
                      {(lead.budget || lead.timeline) && (
                        <div className="text-[10px] text-[#E3C06F] mt-0.5 flex gap-2 font-medium">
                          {lead.budget && <span>Budget: {lead.budget}</span>}
                          {lead.timeline && <span>• {lead.timeline}</span>}
                        </div>
                      )}
                      {lead.message && (
                        <div className="text-[11px] text-[#888] line-clamp-1 mt-0.5">
                          "{lead.message}"
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleQuickStatus(lead._id, e.target.value as LeadStatus)
                        }
                        className={`text-[10px] font-semibold border px-2 py-1 rounded bg-[#181818] cursor-pointer focus:outline-none ${
                          STATUS_BADGES[lead.status]
                        }`}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st} className="bg-[#1A1A1A] text-white">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      {lead.notes ? (
                        <p className="text-[11px] text-[#C9C6C0] line-clamp-1">{lead.notes}</p>
                      ) : (
                        <span className="text-[10px] text-[#555] italic">No notes</span>
                      )}
                      {lead.followUpDate && (
                        <div className="flex items-center gap-1 text-[10px] text-amber-400/90 mt-0.5">
                          <Clock size={10} />
                          <span>Due: {new Date(lead.followUpDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[#7E7B73] whitespace-nowrap">
                      <div>
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-[10px] text-[#555]">
                        {new Date(lead.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openLeadDetail(lead)}
                          title="View / Edit Lead"
                          className="p-1.5 text-[#C9A24B] hover:text-[#FAF7F0] hover:bg-[#C9A24B]/20 rounded transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          title="Delete Lead"
                          className="p-1.5 text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 rounded transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail & Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-[#2D2D2D] rounded-lg max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <div>
                <h3 className="font-serif text-lg text-[#FAF7F0]">
                  Client File: {selectedLead.name}
                </h3>
                <p className="text-xs text-[#7E7B73]">
                  Received {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-[#7E7B73] hover:text-[#FAF7F0]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Contact Strip */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-[#1A1A1A] rounded text-xs border border-[#262626]">
              <div>
                <span className="text-[#7E7B73] text-[10px] uppercase">Phone</span>
                <p className="text-[#FAF7F0] font-medium flex items-center gap-1 mt-0.5">
                  <Phone size={12} className="text-[#C9A24B]" /> {selectedLead.phone}
                </p>
              </div>
              <div>
                <span className="text-[#7E7B73] text-[10px] uppercase">Email</span>
                <p className="text-[#FAF7F0] font-medium flex items-center gap-1 mt-0.5 truncate">
                  <Mail size={12} className="text-[#C9A24B]" /> {selectedLead.email}
                </p>
              </div>
            </div>

            {/* Interest & Message */}
            <div className="space-y-1.5">
              <span className="text-[#7E7B73] text-[10px] uppercase">
                Property / Interested In
              </span>
              <p className="text-xs text-[#FAF7F0] bg-[#181818] p-2.5 rounded border border-[#262626]">
                {selectedLead.projectName
                  ? `${selectedLead.projectName} (Project Slug: /properties/${selectedLead.projectSlug})`
                  : selectedLead.interestedIn || 'General Consultation'}
              </p>
            </div>

            {(selectedLead.budget || selectedLead.timeline) && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[#7E7B73] text-[10px] uppercase">Budget</span>
                  <p className="text-xs text-[#E3C06F] bg-[#181818] p-2 rounded border border-[#262626] font-medium">
                    {selectedLead.budget || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[#7E7B73] text-[10px] uppercase">Timeline</span>
                  <p className="text-xs text-[#E3C06F] bg-[#181818] p-2 rounded border border-[#262626] font-medium">
                    {selectedLead.timeline || 'Not specified'}
                  </p>
                </div>
              </div>
            )}

            {selectedLead.message && (
              <div className="space-y-1.5">
                <span className="text-[#7E7B73] text-[10px] uppercase">Client Message</span>
                <p className="text-xs text-[#FAF7F0] bg-[#181818] p-2.5 rounded border border-[#262626] italic">
                  "{selectedLead.message}"
                </p>
              </div>
            )}

            {/* Pipeline Stage */}
            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Update Pipeline Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as LeadStatus)}
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Follow-up Date */}
            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Scheduled Follow-up Date
              </label>
              <input
                type="date"
                value={editFollowUp}
                onChange={(e) => setEditFollowUp(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              />
            </div>

            {/* Advisor Notes */}
            <div>
              <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                Internal Advisor Notes
              </label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Log discussion notes, budget constraints, preferred sectors..."
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              />
            </div>

            {/* Modal actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-[#222]">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs text-[#C9C6C0] bg-[#222] hover:bg-[#2A2A2A] rounded transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveLeadModal}
                disabled={savingLead}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0B0B0B] bg-[#C9A24B] hover:bg-[#E8C872] rounded transition-colors disabled:opacity-50"
              >
                <Save size={14} />
                <span>{savingLead ? 'Saving...' : 'Save File'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

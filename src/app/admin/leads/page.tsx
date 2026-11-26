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
  ExternalLink,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#141414] border border-[#2D2D2D] rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#222] bg-[#171717]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] font-serif font-bold text-lg">
                  {selectedLead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif text-lg text-[#FAF7F0] tracking-wide">
                      Client File: {selectedLead.name}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold border px-2 py-0.5 rounded ${
                        STATUS_BADGES[selectedLead.status]
                      }`}
                    >
                      {selectedLead.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7E7B73]">
                    Received {new Date(selectedLead.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-[#7E7B73] hover:text-[#FAF7F0] hover:bg-[#222] rounded-md transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* 2-Column Horizontal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#141414]">
              {/* Left Column: Client Profile & Inbound Details */}
              <div className="space-y-4 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-[#222] pb-5 md:pb-0">
                <h4 className="text-[11px] font-semibold tracking-wider text-[#C9A24B] uppercase flex items-center gap-1.5">
                  <Users size={13} /> Client Inquiry Details
                </h4>

                {/* Contact Cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 bg-[#1A1A1A] rounded-lg border border-[#282828]">
                    <span className="text-[#7E7B73] text-[10px] uppercase font-medium">Phone</span>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="text-[#FAF7F0] text-xs font-medium flex items-center gap-1.5 mt-1 hover:text-[#C9A24B] transition-colors"
                    >
                      <Phone size={12} className="text-[#C9A24B] flex-shrink-0" />
                      <span className="truncate">{selectedLead.phone}</span>
                    </a>
                  </div>
                  <div className="p-2.5 bg-[#1A1A1A] rounded-lg border border-[#282828] overflow-hidden">
                    <span className="text-[#7E7B73] text-[10px] uppercase font-medium">Email</span>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      title={selectedLead.email}
                      className="text-[#FAF7F0] text-xs font-medium flex items-center gap-1.5 mt-1 hover:text-[#C9A24B] transition-colors truncate"
                    >
                      <Mail size={12} className="text-[#C9A24B] flex-shrink-0" />
                      <span className="truncate">{selectedLead.email}</span>
                    </a>
                  </div>
                </div>

                {/* Property / Interested In */}
                <div>
                  <span className="text-[#7E7B73] text-[10px] uppercase font-medium block mb-1">
                    Property / Interested In
                  </span>
                  <div className="text-xs text-[#FAF7F0] bg-[#1A1A1A] p-2.5 rounded-lg border border-[#282828] flex items-center justify-between">
                    <span className="truncate mr-2">
                      {selectedLead.projectName
                        ? selectedLead.projectName
                        : selectedLead.interestedIn || 'General Consultation'}
                    </span>
                    {selectedLead.projectSlug && (
                      <a
                        href={`/properties/${selectedLead.projectSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[#C9A24B] hover:underline inline-flex items-center gap-1 flex-shrink-0"
                      >
                        <span>View</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-[#7E7B73] text-[10px] uppercase font-medium block mb-1">Budget</span>
                    <p className="text-xs text-[#E3C06F] bg-[#1A1A1A] p-2.5 rounded-lg border border-[#282828] font-medium">
                      {selectedLead.budget || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#7E7B73] text-[10px] uppercase font-medium block mb-1">Timeline</span>
                    <p className="text-xs text-[#E3C06F] bg-[#1A1A1A] p-2.5 rounded-lg border border-[#282828] font-medium">
                      {selectedLead.timeline || 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Client Message */}
                <div>
                  <span className="text-[#7E7B73] text-[10px] uppercase font-medium block mb-1">
                    Client Message
                  </span>
                  <div className="text-xs text-[#FAF7F0] bg-[#1A1A1A] p-3 rounded-lg border border-[#282828] italic min-h-[50px] leading-relaxed">
                    {selectedLead.message ? `"${selectedLead.message}"` : <span className="text-[#555] not-italic">No message provided.</span>}
                  </div>
                </div>
              </div>

              {/* Right Column: Advisor Pipeline & Internal Workspace */}
              <div className="space-y-4 pl-0 md:pl-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-semibold tracking-wider text-[#C9A24B] uppercase flex items-center gap-1.5">
                    <Building size={13} /> Advisor Pipeline & Follow-up
                  </h4>

                  {/* Pipeline Stage */}
                  <div>
                    <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                      Update Pipeline Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as LeadStatus)}
                      className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#C9A24B] rounded-lg px-3 py-2.5 text-xs text-[#FAF7F0] focus:outline-none transition-colors"
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st} className="bg-[#1A1A1A]">
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
                      className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#C9A24B] rounded-lg px-3 py-2 text-xs text-[#FAF7F0] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Advisor Notes */}
                  <div>
                    <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                      Internal Advisor Notes
                    </label>
                    <textarea
                      rows={4}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Log discussion notes, client requirements, preferred sectors, offer stage..."
                      className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#C9A24B] rounded-lg p-3 text-xs text-[#FAF7F0] focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#222] bg-[#171717]">
              <span className="text-[11px] text-[#7E7B73] hidden sm:inline">
                Changes persist directly to your MongoDB Atlas database.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 text-xs text-[#C9C6C0] bg-[#222] hover:bg-[#2A2A2A] rounded-md transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveLeadModal}
                  disabled={savingLead}
                  className="flex items-center gap-1.5 px-6 py-2 text-xs font-semibold text-[#0B0B0B] bg-[#C9A24B] hover:bg-[#E8C872] rounded-md transition-colors shadow-md disabled:opacity-50"
                >
                  <Save size={14} />
                  <span>{savingLead ? 'Saving...' : 'Save File'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

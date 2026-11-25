'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import {
  Building2,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Plus,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { LeadStatus } from '@/types';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await api.adminGetDashboard();
      if (res && res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await api.adminUpdateLead(leadId, { status: newStatus });
      fetchDashboard();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Projects',
      value: data?.counts?.totalProjects || 0,
      sub: `${data?.counts?.publishedProjects || 0} Published • ${data?.counts?.draftProjects || 0} Draft`,
      icon: Building2,
      href: '/admin/projects',
      color: 'text-[#C9A24B]',
    },
    {
      label: 'Published Blogs',
      value: data?.counts?.publishedBlogs || 0,
      sub: `${data?.counts?.totalBlogs || 0} Total Articles`,
      icon: FileText,
      href: '/admin/blogs',
      color: 'text-emerald-400',
    },
    {
      label: 'Total Leads',
      value: data?.counts?.totalLeads || 0,
      sub: `${data?.counts?.newLeads || 0} Unactioned / New`,
      icon: Users,
      href: '/admin/leads',
      color: 'text-amber-400',
    },
    {
      label: 'New Enquiries',
      value: data?.counts?.newLeads || 0,
      sub: 'Action Required',
      icon: Clock,
      href: '/admin/leads?status=New',
      color: 'text-rose-400',
    },
  ];

  const leadStatusColors: Record<string, string> = {
    New: 'bg-rose-950/50 text-rose-300 border-rose-800/40',
    Contacted: 'bg-blue-950/50 text-blue-300 border-blue-800/40',
    'Follow-up': 'bg-amber-950/50 text-amber-300 border-amber-800/40',
    'Site Visit': 'bg-purple-950/50 text-purple-300 border-purple-800/40',
    'Closed Won': 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40',
    'Closed Lost': 'bg-neutral-800 text-neutral-400 border-neutral-700',
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <h1 className="font-serif text-3xl text-[#FAF7F0] tracking-wide">
            Portfolio Overview
          </h1>
          <p className="text-sm text-[#9A8F7E] mt-1 font-sans">
            Welcome back. Monitor your real estate inquiries, projects, and insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setRefreshing(true);
              fetchDashboard();
            }}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#252525] text-xs font-medium text-[#FAF7F0] border border-[#333] rounded transition-colors"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            <Plus size={16} />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              href={s.href}
              className="bg-[#141414] border border-[#242424] hover:border-[#383838] p-5 rounded-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#9A8F7E] uppercase tracking-wider">
                  {s.label}
                </span>
                <Icon size={18} className={s.color} />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-serif text-3xl font-semibold text-[#FAF7F0]">
                  {s.value}
                </span>
                <span className="text-[11px] text-[#7E7B73] group-hover:text-[#C9A24B] transition-colors flex items-center">
                  View <ArrowUpRight size={12} className="ml-0.5" />
                </span>
              </div>
              <p className="mt-1 text-xs text-[#777] truncate">{s.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Leads Breakdown by Status */}
      {data?.leadsBreakdown && (
        <div className="bg-[#141414] border border-[#242424] p-5 rounded-lg">
          <h2 className="text-xs font-medium text-[#9A8F7E] uppercase tracking-wider mb-4">
            Pipeline by Inquiry Stage
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              'New',
              'Contacted',
              'Follow-up',
              'Site Visit',
              'Closed Won',
              'Closed Lost',
            ].map((st) => (
              <Link
                key={st}
                href={`/admin/leads?status=${encodeURIComponent(st)}`}
                className="bg-[#1A1A1A] p-3 rounded border border-[#282828] hover:border-[#C9A24B]/50 transition-colors"
              >
                <div className="text-[11px] text-[#9A8F7E] truncate">{st}</div>
                <div className="text-xl font-serif text-[#FAF7F0] mt-1">
                  {data.leadsBreakdown[st] || 0}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Section: Recent Leads & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads - 2 cols */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#242424] rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-xl text-[#FAF7F0]">Recent Inquiries</h2>
              <p className="text-xs text-[#7E7B73] mt-0.5">High-intent client requests</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-[#C9A24B] hover:underline flex items-center gap-1"
            >
              All Leads <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1C1B1B] text-[#9A8F7E] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Project / Interest</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {data?.recentLeads?.length > 0 ? (
                  data.recentLeads.map((lead: any) => (
                    <tr key={lead._id} className="hover:bg-[#1A1A1A] transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-medium text-[#FAF7F0]">{lead.name}</div>
                        <div className="text-[11px] text-[#7E7B73]">{lead.phone}</div>
                      </td>
                      <td className="py-3 px-3 text-[#C9C6C0]">
                        <span className="font-medium text-[#FAF7F0]">
                          {lead.projectName || lead.interestedIn || 'General'}
                        </span>
                        {lead.message && (
                          <div className="text-[11px] text-[#666] line-clamp-1 mt-0.5">
                            {lead.message}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead._id, e.target.value as LeadStatus)
                          }
                          className={`text-[11px] font-medium border px-2 py-1 rounded bg-transparent cursor-pointer focus:outline-none ${
                            leadStatusColors[lead.status] || 'text-[#FAF7F0]'
                          }`}
                        >
                          <option value="New" className="bg-[#1A1A1A] text-white">New</option>
                          <option value="Contacted" className="bg-[#1A1A1A] text-white">Contacted</option>
                          <option value="Follow-up" className="bg-[#1A1A1A] text-white">Follow-up</option>
                          <option value="Site Visit" className="bg-[#1A1A1A] text-white">Site Visit</option>
                          <option value="Closed Won" className="bg-[#1A1A1A] text-white">Closed Won</option>
                          <option value="Closed Lost" className="bg-[#1A1A1A] text-white">Closed Lost</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-[#7E7B73]">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-[#666]">
                      No inquiries recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Recent Projects - 1 col */}
        <div className="space-y-6">
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6">
            <h2 className="font-serif text-xl text-[#FAF7F0] mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/admin/projects/new"
                className="w-full flex items-center justify-between p-3 rounded bg-[#1C1B1B] hover:bg-[#252525] text-xs font-medium text-[#FAF7F0] border border-[#2A2A2A] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Building2 size={16} className="text-[#C9A24B]" /> Add New Project
                </span>
                <Plus size={14} />
              </Link>
              <Link
                href="/admin/blogs/new"
                className="w-full flex items-center justify-between p-3 rounded bg-[#1C1B1B] hover:bg-[#252525] text-xs font-medium text-[#FAF7F0] border border-[#2A2A2A] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText size={16} className="text-emerald-400" /> Write Blog Post
                </span>
                <Plus size={14} />
              </Link>
              <Link
                href="/admin/settings"
                className="w-full flex items-center justify-between p-3 rounded bg-[#1C1B1B] hover:bg-[#252525] text-xs font-medium text-[#FAF7F0] border border-[#2A2A2A] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink size={16} className="text-amber-400" /> Edit Contact & Numbers
                </span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Published Projects List */}
          <div className="bg-[#141414] border border-[#242424] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-[#FAF7F0]">Properties</h2>
              <Link href="/admin/projects" className="text-xs text-[#C9A24B] hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {data?.recentProjects?.slice(0, 4).map((proj: any) => (
                <div
                  key={proj._id}
                  className="p-3 bg-[#1A1A1A] rounded border border-[#262626] flex items-center justify-between"
                >
                  <div className="overflow-hidden pr-2">
                    <p className="text-xs font-medium text-[#FAF7F0] truncate">{proj.name}</p>
                    <p className="text-[11px] text-[#7E7B73] truncate">
                      {proj.location} • {proj.startingPrice}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded uppercase font-medium ${
                      proj.publishStatus === 'published'
                        ? 'bg-emerald-950/60 text-emerald-300'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {proj.publishStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

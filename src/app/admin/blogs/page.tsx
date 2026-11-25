'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Blog } from '@/types';
import {
  Plus,
  Search,
  FileText,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  AlertCircle,
  Clock,
  BookOpen,
} from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [publishFilter, setPublishFilter] = useState('');
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetBlogs({
        search: search || undefined,
        category: categoryFilter || undefined,
        publishStatus: publishFilter || undefined,
      });
      if (res && res.success) {
        setBlogs(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load blogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [categoryFilter, publishFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true);
      await api.adminDeleteBlog(id);
      setDeleteModalId(null);
      fetchBlogs();
    } catch (err) {
      alert('Failed to delete blog.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <h1 className="font-serif text-3xl text-[#FAF7F0] tracking-wide">
            Insights & Market Commentary
          </h1>
          <p className="text-xs text-[#9A8F7E] mt-1 font-sans">
            Authoritative research, buying guides, and Gurgaon real estate intelligence.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E7B73]" size={16} />
          <input
            type="text"
            placeholder="Search by article title or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-[#2B2B2B] rounded px-4 py-2 pl-10 text-xs text-[#FAF7F0] placeholder-[#555] focus:outline-none focus:border-[#C9A24B]"
          />
        </form>

        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#141414] border border-[#2B2B2B] text-xs text-[#C9C6C0] px-3 py-2 rounded focus:outline-none focus:border-[#C9A24B]"
          >
            <option value="">All Categories</option>
            <option value="Market Trends">Market Trends</option>
            <option value="Investment">Investment</option>
            <option value="Buying Guide">Buying Guide</option>
            <option value="Luxury Living">Luxury Living</option>
          </select>

          <select
            value={publishFilter}
            onChange={(e) => setPublishFilter(e.target.value)}
            className="bg-[#141414] border border-[#2B2B2B] text-xs text-[#C9C6C0] px-3 py-2 rounded focus:outline-none focus:border-[#C9A24B]"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg overflow-hidden">
        {loading ? (
          <div className="py-12 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-12 text-center text-[#7E7B73] space-y-3">
            <BookOpen size={36} className="mx-auto text-[#444]" />
            <p className="text-sm">No articles found.</p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-1.5 text-xs text-[#C9A24B] hover:underline"
            >
              <Plus size={14} /> Write your first article
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1C1B1B] text-[#9A8F7E] uppercase tracking-wider border-b border-[#282828]">
                <tr>
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author & Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 bg-[#222] rounded overflow-hidden flex-shrink-0">
                          {b.coverImage ? (
                            <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#555]">
                              <FileText size={16} />
                            </div>
                          )}
                        </div>
                        <div className="truncate">
                          <div className="font-medium text-[#FAF7F0] flex items-center gap-1.5 truncate">
                            <span className="truncate">{b.title}</span>
                            {b.featured && (
                              <Star size={12} className="text-[#C9A24B] fill-[#C9A24B] flex-shrink-0" />
                            )}
                          </div>
                          <span className="text-[10px] text-[#777] font-mono">
                            /blog/{b.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#1E1E1E] text-[#C9C6C0] border border-[#333]">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-[#FAF7F0]">{b.author}</div>
                      <div className="text-[10px] text-[#7E7B73]">{b.readTime || '4 min read'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                          b.publishStatus === 'published'
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        }`}
                      >
                        {b.publishStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          title="View Live Article"
                          className="p-1.5 text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525] rounded transition-colors"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <Link
                          href={`/admin/blogs/${b._id}`}
                          title="Edit Article"
                          className="p-1.5 text-[#C9A24B] hover:text-[#FAF7F0] hover:bg-[#C9A24B]/20 rounded transition-colors"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteModalId(b._id)}
                          title="Delete Article"
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

      {/* Delete Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-[#2D2D2D] rounded-lg max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#FAF7F0]">Delete Article</h3>
              <p className="text-xs text-[#888] mt-1">
                Are you sure you want to delete this publication? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                disabled={deleting}
                className="flex-1 py-2 text-xs text-[#C9C6C0] bg-[#222] hover:bg-[#2A2A2A] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                disabled={deleting}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors flex items-center justify-center gap-1.5"
              >
                {deleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

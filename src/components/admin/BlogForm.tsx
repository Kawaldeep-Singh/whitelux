'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Blog } from '@/types';
import BlogEditor from './BlogEditor';
import {
  Upload,
  ArrowLeft,
  Save,
  AlertCircle,
  Image as ImageIcon,
  Plus,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

interface BlogFormProps {
  initialData?: Blog;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [category, setCategory] = useState(initialData?.category || 'Market Trends');
  const [author, setAuthor] = useState(initialData?.author || 'White Luxe Advisory');
  const [readTime, setReadTime] = useState(initialData?.readTime || '4 min read');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [content, setContent] = useState(initialData?.content || '<p></p>');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || ['Gurgaon Real Estate', 'Luxury Living']);
  const [customTag, setCustomTag] = useState('');
  const [publishStatus, setPublishStatus] = useState<'draft' | 'published'>(
    initialData?.publishStatus || 'published'
  );
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('images', files[0]);

      const res = await api.uploadFiles(formData);
      if (res && res.urls && res.urls.length > 0) {
        setCoverImage(res.urls[0]);
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message || 'Error uploading file'}`);
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (customTag.trim() && !tags.includes(customTag.trim())) {
      setTags([...tags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload: Partial<Blog> = {
        title,
        slug,
        category,
        author,
        readTime,
        summary,
        content,
        coverImage,
        tags,
        publishStatus,
        featured,
        seoTitle: seoTitle || `${title} | White Luxe Real Estate`,
        seoDescription: seoDescription || summary,
      };

      if (isEdit && initialData?._id) {
        await api.adminUpdateBlog(initialData._id, payload);
      } else {
        await api.adminCreateBlog(payload);
      }

      router.push('/admin/blogs');
    } catch (err: any) {
      setError(err.message || 'Failed to save blog. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#1A1A1A] rounded transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-serif text-2xl text-[#FAF7F0]">
              {isEdit ? `Edit Article: ${initialData?.title}` : 'Compose New Insight'}
            </h1>
            <p className="text-xs text-[#7E7B73]">
              Rich-text editorial powered by Tiptap with clean typographic structure.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="px-4 py-2 text-xs font-medium text-[#C9C6C0] bg-[#1A1A1A] hover:bg-[#252525] rounded border border-[#333] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save size={16} />
            )}
            <span>{isEdit ? 'Save Article' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Article Metadata */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          1. Article Details
        </h2>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. 7 Things to Check Before Buying a Luxury Apartment in Gurgaon"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-[#C9C6C0] uppercase">
              URL Slug *
            </label>
            <button
              type="button"
              onClick={() => setAutoSlug(!autoSlug)}
              className="text-[10px] text-[#C9A24B] hover:underline"
            >
              {autoSlug ? 'Switch to Manual' : 'Auto-sync from Title'}
            </button>
          </div>
          <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#7E7B73]">
            <span>/blog/</span>
            <input
              type="text"
              required
              value={slug}
              readOnly={autoSlug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="7-things-to-check-before-buying"
              className="w-full bg-transparent text-[#FAF7F0] focus:outline-none ml-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            >
              <option value="Market Trends">Market Trends</option>
              <option value="Investment">Investment</option>
              <option value="Buying Guide">Buying Guide</option>
              <option value="Luxury Living">Luxury Living</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="White Luxe Advisory"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Estimated Read Time
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="4 min read"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Publication Status
            </label>
            <select
              value={publishStatus}
              onChange={(e) => setPublishStatus(e.target.value as any)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="featuredBlogCheck"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-[#C9A24B] rounded cursor-pointer"
            />
            <label htmlFor="featuredBlogCheck" className="text-xs text-[#FAF7F0] cursor-pointer">
              Pin as Featured Lead Article
            </label>
          </div>
        </div>
      </div>

      {/* 2. Cover Image & Summary */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          2. Visual Hero & Brief Summary
        </h2>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Cover Image
          </label>
          <div className="flex gap-4 items-start">
            <div className="w-36 h-24 bg-[#1E1E1E] border border-[#333] rounded overflow-hidden flex-shrink-0">
              {coverImage ? (
                <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#555]">
                  <ImageIcon size={24} />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Direct image URL or upload file"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              />
              <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#201F1F] hover:bg-[#282828] text-xs text-[#FAF7F0] rounded cursor-pointer border border-[#333]">
                <Upload size={14} className="text-[#C9A24B]" />
                <span>{uploading ? 'Uploading...' : 'Upload Cover Photo'}</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Article Summary (Excerpt) *
          </label>
          <textarea
            required
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A short, compelling summary of the article to appear in blog cards..."
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
          />
        </div>
      </div>

      {/* 3. Tiptap Rich Text Editor */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-3">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          3. Article Body Content
        </h2>
        <BlogEditor content={content} onChange={setContent} />
      </div>

      {/* 4. Tags & SEO */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          4. Topic Tags & Search Optimization
        </h2>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1E1E1E] border border-[#333] rounded text-xs text-[#FAF7F0]"
              >
                <span>{t}</span>
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  className="text-[#777] hover:text-rose-400"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add tag (e.g. Golf Course Road)..."
              className="flex-1 bg-[#1A1A1A] border border-[#333] rounded px-3 py-1.5 text-xs text-[#FAF7F0]"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-1.5 bg-[#222] hover:bg-[#2A2A2A] text-xs text-[#FAF7F0] rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Meta SEO Title
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Custom title tag for Google"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Meta SEO Description
          </label>
          <textarea
            rows={2}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Custom meta description for search snippets..."
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
          />
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[#222]">
        <Link
          href="/admin/blogs"
          className="px-5 py-2.5 text-xs text-[#C9C6C0] bg-[#1A1A1A] hover:bg-[#252525] rounded border border-[#333]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save size={16} />
          )}
          <span>{isEdit ? 'Save Article' : 'Publish Article'}</span>
        </button>
      </div>
    </form>
  );
}

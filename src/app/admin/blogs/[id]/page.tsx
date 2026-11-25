'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import BlogForm from '@/components/admin/BlogForm';
import { Blog } from '@/types';

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await api.adminGetBlogById(id);
        if (res && res.success) {
          setBlog(res.data);
        }
      } catch (err) {
        console.error('Failed to load blog', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-8 text-center text-[#7E7B73]">
        <p>Article not found.</p>
      </div>
    );
  }

  return <BlogForm initialData={blog} isEdit />;
}

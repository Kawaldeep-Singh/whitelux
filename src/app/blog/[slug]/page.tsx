import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogBySlugServer, getBlogsServer, AUTHENTIC_BLOGS } from '@/lib/serverData';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Blog } from '@/types';

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return AUTHENTIC_BLOGS.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const blog = await getBlogBySlugServer(params.slug);
    if (!blog) {
      return { title: 'Insights | White Luxe Real Estate' };
    }
    return {
      title: blog.seoTitle || `${blog.title} | White Luxe Real Estate`,
      description: blog.seoDescription || blog.summary,
    };
  } catch {
    return { title: 'Insights | White Luxe Real Estate' };
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await getBlogBySlugServer(params.slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getBlogsServer();
  const relatedBlogs = allBlogs.filter((b) => b.slug !== params.slug).slice(0, 3);

  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32">
        <article className="w-[90%] max-w-[960px] mx-auto py-12 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-[#A9A294] hover:text-[#C8A24A] hover:-translate-x-1 uppercase tracking-[0.2em] mb-8 transition-all"
          >
            <ArrowLeft size={14} /> Back to Insights
          </Link>

          <div className="space-y-4">
            <span className="px-3 py-1 bg-[#14110C] text-[#E3C06F] border border-[#C8A24A]/30 rounded-[2px] text-[10px] uppercase tracking-wider font-semibold inline-block">
              {blog.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4ECD8] leading-tight font-normal">
              {blog.title}
            </h1>

            <p className="text-base sm:text-lg text-[#A9A294] font-light leading-relaxed pt-2">
              {blog.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-8 border-b border-[#C8A24A]/20 text-xs text-[#A9A294]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-[#F4ECD8]">
                  <User size={14} className="text-[#C8A24A]" />
                  {blog.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#C8A24A]" />
                  {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#C8A24A]" />
                  {blog.readTime || '4 min read'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-wider text-[#A9A294]">Share:</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} - https://whiteluxerealestate.com/blog/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#F4ECD8] hover:text-[#C8A24A] transition-colors"
                >
                  WhatsApp
                </a>
                <span>•</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://whiteluxerealestate.com/blog/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#F4ECD8] hover:text-[#C8A24A] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Cover Hero Image */}
          {blog.coverImage && (
            <div className="my-8 rounded-[2px] overflow-hidden border border-[#C8A24A]/25 aspect-[16/9] bg-[#080808] shadow-2xl">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body Content */}
          <div
            className="prose prose-invert max-w-none text-[#F4ECD8]/90 leading-relaxed font-light mt-8 pt-4 border-t border-[#C8A24A]/20 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-normal [&>h2]:text-[#F4ECD8] [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-normal [&>h3]:text-[#F4ECD8] [&>p]:leading-relaxed [&>ul]:space-y-2 [&>p>strong]:text-[#E3C06F]"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-[#C8A24A]/20 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#A9A294] mr-2">Topics:</span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#14110C] border border-[#C8A24A]/25 hover:border-[#C8A24A] rounded-[2px] text-xs text-[#F4ECD8] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Callout Enquiry Box */}
          <div className="my-12 p-8 bg-[#14110C] text-[#F4ECD8] rounded-[2px] border border-[#C8A24A]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif text-2xl text-[#F4ECD8] font-normal">
                Looking for the right property?
              </h3>
              <p className="text-xs text-[#A9A294] font-light">
                Speak to our senior real estate advisor for personalized recommendations.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.2em] rounded-[2px] transition-all hover:brightness-110 active:scale-95 shadow-md whitespace-nowrap"
            >
              Enquire Now
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="bg-[#14110C] py-16 border-t border-[#C8A24A]/20">
            <div className="w-[90%] max-w-[1440px] mx-auto space-y-10">
              <div className="text-center space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
                  FURTHER READING
                </span>
                <h2 className="font-serif text-3xl text-[#F4ECD8] font-normal">
                  Related Market Intelligence
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((rel) => (
                  <Link
                    key={rel._id}
                    href={`/blog/${rel.slug}`}
                    className="bg-[#0D0D0D] p-6 rounded-[2px] border border-[#C8A24A]/25 hover:border-[#C8A24A] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-semibold text-[#C8A24A] block">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors leading-snug font-normal">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#A9A294] font-light line-clamp-2">
                        {rel.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#C8A24A]/15 flex items-center justify-between text-[11px] text-[#A9A294]">
                      <span>{rel.readTime || '4 min read'}</span>
                      <span className="text-[#C8A24A] font-semibold group-hover:text-[#E3C06F] group-hover:translate-x-1 transition-all">Read &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <FooterSection />
      <FloatingButtons />
    </div>
  );
}

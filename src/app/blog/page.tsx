import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getBlogsServer } from '@/lib/serverData';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import FloatingButtons from '@/components/FloatingButtons';
import NewsletterForm from '@/components/NewsletterForm';
import { FileText, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Blog } from '@/types';

export const metadata: Metadata = {
  title: 'Real Estate Insights & Market Updates | White Luxe',
  description:
    'Expert views on Gurgaon luxury real estate, market trends, high-yield commercial investments, and practical home buying guides.',
};

export const revalidate = 60;

const CATEGORIES = [
  'All',
  'Market Trends',
  'Investment',
  'Buying Guide',
  'Luxury Living',
];

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const currentCategory = searchParams.category || 'All';
  const categoryFilter = currentCategory !== 'All' ? currentCategory : undefined;

  const blogs = await getBlogsServer({
    category: categoryFilter,
  });

  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];
  const regularBlogs = blogs.filter((b) => b._id !== featuredBlog?._id);

  return (
    <div className="bg-[#0D0D0D] text-[#F4ECD8] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Header Hero */}
        <section className="bg-[#14110C] border-b border-[#C8A24A]/20 py-16 md:py-24 relative overflow-hidden">
          <div className="w-[90%] max-w-[1440px] mx-auto relative z-10">
            <nav className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] mb-4 flex items-center gap-2">
              <Link href="/" className="hover:underline hover:text-[#E3C06F] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#A9A294]">Blog &amp; Insights</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-6xl text-[#F4ECD8] max-w-3xl leading-tight font-normal">
              Insights &amp; Market Updates
            </h1>
            <p className="text-[#A9A294] text-sm md:text-base max-w-2xl mt-4 font-light leading-relaxed">
              Expert views, macroeconomic analyses, and strategic checklists from our senior advisory desk in Gurgaon.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-[140px] pointer-events-none" />
        </section>

        {/* Categories Bar */}
        <section className="bg-[#0D0D0D] border-b border-[#C8A24A]/20 sticky top-20 z-20 shadow-xl backdrop-blur-md">
          <div className="w-[90%] max-w-[1440px] mx-auto py-3 overflow-x-auto scrollbar-none flex items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat;
              return (
                <Link
                  key={cat}
                  href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-[2px] text-xs uppercase font-medium tracking-[0.2em] whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#B8892F] to-[#E8C872] text-[#0D0D0D] font-semibold shadow-sm'
                      : 'text-[#A9A294] hover:text-[#F4ECD8] hover:bg-[#14110C]'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Content Area */}
        <section className="w-[90%] max-w-[1440px] mx-auto py-16">
          {blogs.length === 0 ? (
            <div className="bg-[#14110C] border border-[#C8A24A]/25 rounded-[2px] p-12 text-center max-w-md mx-auto my-12 space-y-3">
              <BookOpen size={36} className="mx-auto text-[#C8A24A]" />
              <h3 className="font-serif text-2xl text-[#F4ECD8]">No articles found</h3>
              <p className="text-xs text-[#A9A294] font-light">
                Check back soon for latest research papers and market reports.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Hero Article */}
              {featuredBlog && currentCategory === 'All' && (
                <div className="bg-[#14110C] rounded-[2px] border border-[#C8A24A]/25 hover:border-[#C8A24A] hover:shadow-[0_12px_35px_rgba(200,162,74,0.15)] transition-all duration-300 overflow-hidden group grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#080808]">
                    {featuredBlog.coverImage ? (
                      <img
                        src={featuredBlog.coverImage}
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#555] min-h-[300px]">
                        <FileText size={48} />
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#0D0D0D] text-[#E3C06F] border border-[#C8A24A]/30 rounded-[2px] text-[10px] uppercase tracking-wider font-semibold">
                          {featuredBlog.category}
                        </span>
                        <span className="text-[11px] text-[#A9A294]">• Featured Story</span>
                      </div>

                      <h2 className="font-serif text-3xl md:text-4xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors leading-snug font-normal">
                        <Link href={`/blog/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-[#A9A294] font-light leading-relaxed line-clamp-3">
                        {featuredBlog.summary}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[#C8A24A]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#A9A294]">
                        <User size={13} className="text-[#C8A24A]" />
                        <span>{featuredBlog.author}</span>
                        <span>•</span>
                        <Clock size={13} className="text-[#C8A24A]" />
                        <span>{featuredBlog.readTime || '4 min read'}</span>
                      </div>

                      <Link
                        href={`/blog/${featuredBlog.slug}`}
                        className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C8A24A] group-hover:text-[#E3C06F] group-hover:translate-x-1 transition-all flex items-center gap-1"
                      >
                        Read Article &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Other Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(currentCategory === 'All' ? regularBlogs : blogs).map((blog) => (
                  <Link
                    key={blog._id}
                    href={`/blog/${blog.slug}`}
                    className="group bg-[#14110C] rounded-[2px] overflow-hidden border border-[#C8A24A]/25 hover:border-[#C8A24A] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(200,162,74,0.15)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-[#080808]">
                      {blog.coverImage ? (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#555]">
                          <FileText size={32} />
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#C8A24A] font-semibold block mb-2">
                          {blog.category}
                        </span>
                        <h3 className="font-serif text-2xl text-[#F4ECD8] group-hover:text-[#E3C06F] transition-colors leading-snug font-normal">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-[#A9A294] font-light mt-2 line-clamp-2 leading-relaxed">
                          {blog.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#C8A24A]/20 flex items-center justify-between text-[11px] text-[#A9A294]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-[#C8A24A]" />
                          {blog.readTime || '4 min read'}
                        </span>
                        <span className="text-[#C8A24A] font-semibold uppercase tracking-[0.2em] group-hover:text-[#E3C06F] group-hover:translate-x-1 transition-all flex items-center gap-1">
                          Read More &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Newsletter Strip */}
        <section className="bg-[#14110C] text-[#F4ECD8] py-20 border-t border-[#C8A24A]/20">
          <div className="w-[90%] max-w-[1440px] mx-auto text-center space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A24A] font-sans font-medium block">
              WHITE LUXE DISPATCH
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#F4ECD8]">
              Get new insights in your inbox.
            </h2>
            <p className="text-xs md:text-sm text-[#A9A294] font-light max-w-xl mx-auto">
              Receive quarterly investment research, regulatory updates, and exclusive property insights.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <FooterSection />
      <FloatingButtons />
    </div>
  );
}

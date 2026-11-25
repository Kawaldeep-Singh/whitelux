import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://whiteluxerealestate.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  let dynamicProjects: MetadataRoute.Sitemap = [];
  try {
    const res = await api.getProjects({ limit: 100 });
    if (res && res.success && res.data) {
      dynamicProjects = res.data.map((proj: any) => ({
        url: `${baseUrl}/properties/${proj.slug}`,
        lastModified: new Date(proj.updatedAt || proj.createdAt),
        changeFrequency: 'weekly',
        priority: 0.85,
      }));
    }
  } catch (err) {
    console.error('Sitemap project fetch error', err);
  }

  let dynamicBlogs: MetadataRoute.Sitemap = [];
  try {
    const res = await api.getBlogs({ limit: 100 });
    if (res && res.success && res.data) {
      dynamicBlogs = res.data.map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt),
        changeFrequency: 'weekly',
        priority: 0.75,
      }));
    }
  } catch (err) {
    console.error('Sitemap blog fetch error', err);
  }

  return [...staticRoutes, ...dynamicProjects, ...dynamicBlogs];
}

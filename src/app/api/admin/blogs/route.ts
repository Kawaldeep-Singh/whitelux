import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';
import { Blog } from '@/models/Blog';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-dynamic';

// GET /api/admin/blogs - list all blogs
export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const publishStatus = searchParams.get('publishStatus');
    const search = searchParams.get('search');

    const query: any = {};
    if (category) query.category = category;
    if (publishStatus) query.publishStatus = publishStatus;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error fetching admin blogs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blogs - create blog
export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const body = await req.json();

    if (!body.title || !body.summary || !body.content) {
      return NextResponse.json(
        { success: false, message: 'Title, summary, and content are required' },
        { status: 400 }
      );
    }

    let baseSlug = body.slug ? slugify(body.slug) : slugify(body.title);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await Blog.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    body.slug = uniqueSlug;

    if (body.publishStatus === 'published' && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const blog = await Blog.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Blog created successfully',
        data: blog,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error creating blog' },
      { status: 500 }
    );
  }
}

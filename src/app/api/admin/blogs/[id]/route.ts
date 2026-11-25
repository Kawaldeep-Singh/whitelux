import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';
import { Blog } from '@/models/Blog';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error fetching blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const body = await req.json();
    const existing = await Blog.findById(params.id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    if (body.slug && body.slug !== existing.slug) {
      const cleanSlug = slugify(body.slug);
      const collision = await Blog.findOne({ slug: cleanSlug, _id: { $ne: params.id } });
      if (collision) {
        return NextResponse.json(
          { success: false, message: 'That slug is already in use by another article.' },
          { status: 409 }
        );
      }
      body.slug = cleanSlug;
    }

    if (body.publishStatus === 'published' && !existing.publishedAt && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const updated = await Blog.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Blog updated successfully',
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error updating blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const deleted = await Blog.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error deleting blog' },
      { status: 500 }
    );
  }
}

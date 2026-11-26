import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';
import { Project } from '@/models/Project';
import { Blog } from '@/models/Blog';
import { Lead } from '@/models/Lead';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      return unauthorizedResponse();
    }

    const [
      totalProjects,
      publishedProjects,
      totalBlogs,
      publishedBlogs,
      totalLeads,
      newLeads,
      recentLeads,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ publishStatus: 'published' }),
      Blog.countDocuments(),
      Blog.countDocuments({ publishStatus: 'published' }),
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
      Lead.find().sort({ createdAt: -1 }).limit(5),
    ]);

    const counts = {
      totalProjects,
      publishedProjects,
      draftProjects: Math.max(0, totalProjects - publishedProjects),
      totalBlogs,
      publishedBlogs,
      draftBlogs: Math.max(0, totalBlogs - publishedBlogs),
      totalLeads,
      newLeads,
    };

    return NextResponse.json({
      success: true,
      data: {
        counts,
        stats: counts,
        recentLeads,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error fetching dashboard stats' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';
import { Project } from '@/models/Project';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-dynamic';

// GET /api/admin/projects - list all projects (draft + published)
export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const publishStatus = searchParams.get('publishStatus');

    const query: any = {};
    if (status) query.status = status;
    if (publishStatus) query.publishStatus = publishStatus;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error fetching admin projects' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects - create new project
export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const body = await req.json();

    if (!body.name || !body.location || !body.startingPrice) {
      return NextResponse.json(
        { success: false, message: 'Name, location, and starting price are required' },
        { status: 400 }
      );
    }

    let baseSlug = body.slug ? slugify(body.slug) : slugify(body.name);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await Project.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    body.slug = uniqueSlug;
    const project = await Project.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully',
        data: project,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error creating project' },
      { status: 500 }
    );
  }
}

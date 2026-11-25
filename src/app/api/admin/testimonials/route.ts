import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';
import { Testimonial } from '@/models/Testimonial';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error fetching testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const body = await req.json();
    const testimonial = await Testimonial.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Testimonial created successfully',
        data: testimonial,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error creating testimonial' },
      { status: 500 }
    );
  }
}

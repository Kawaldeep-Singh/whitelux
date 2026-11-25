import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Testimonial } from '@/models/Testimonial';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ featured: true })
      .sort({ order: 1, createdAt: -1 });

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

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Lead } from '@/models/Lead';
import { sendLeadAlertEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Honeypot check for spam prevention
    if (body.botField || body.website_url_check) {
      return NextResponse.json({
        success: true,
        message: 'Enquiry received successfully.',
      });
    }

    const { name, phone, email, interestedIn, budget, timeline, message, projectId, projectSlug, projectName, source } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, message: 'Name, phone, and email are required.' },
        { status: 400 }
      );
    }

    const lead = await Lead.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      interestedIn: interestedIn?.trim(),
      budget: budget?.trim(),
      timeline: timeline?.trim(),
      message: message?.trim(),
      projectId: projectId || undefined,
      projectSlug: projectSlug?.trim(),
      projectName: projectName?.trim(),
      source: source || 'Website',
      status: 'New',
    });

    // Fire email notification non-blockingly
    sendLeadAlertEmail(lead).catch((err) =>
      console.error('[Leads API] Email dispatch error:', err)
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out! A White Luxe private advisor will connect with you shortly.',
        data: { id: lead._id },
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error submitting lead' },
      { status: 500 }
    );
  }
}

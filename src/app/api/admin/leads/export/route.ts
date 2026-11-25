import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';
import { Lead } from '@/models/Lead';
import { leadsToCSV } from '@/lib/csv';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const leads = await Lead.find().sort({ createdAt: -1 });
    const csvContent = leadsToCSV(leads);

    const filename = `whiteluxe-leads-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error exporting leads' },
      { status: 500 }
    );
  }
}

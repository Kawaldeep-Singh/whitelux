import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      return unauthorizedResponse();
    }

    const adminData = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: 'Admin',
    };

    return NextResponse.json({
      success: true,
      admin: adminData,
      data: adminData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Authentication check error' },
      { status: 500 }
    );
  }
}

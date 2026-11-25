import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDB } from './db';
import { Admin, IAdmin } from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'whiteluxe_luxury_secret_jwt_key_2026_secured';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
  id: string;
  email: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(req?: NextRequest): Promise<IAdmin | null> {
  await connectDB();
  let token: string | undefined;

  // 1. Try reading from cookie store
  try {
    const cookieStore = cookies();
    token = cookieStore.get('admin_token')?.value;
  } catch {
    // cookies() might not be available in some contexts
  }

  // 2. Try request header or cookie
  if (!token && req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      token = req.cookies.get('admin_token')?.value;
    }
  }

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) return null;

  try {
    const admin = await Admin.findById(decoded.id);
    return admin;
  } catch {
    return null;
  }
}

export function unauthorizedResponse(message = 'Unauthorized access'): NextResponse {
  return NextResponse.json({ success: false, message }, { status: 401 });
}

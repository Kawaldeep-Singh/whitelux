import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const formData = await req.formData();
    const files: File[] = [];

    // Collect all files from "images" or "file" or any keys
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (value && typeof value === 'object' && 'arrayBuffer' in value) {
        files.push(value as File);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No files uploaded' },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];
    const hasCloudinary = Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (hasCloudinary) {
        // Upload to Cloudinary
        const uploadRes: any = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: process.env.CLOUDINARY_FOLDER || 'whitelux',
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });
        uploadedUrls.push(uploadRes.secure_url);
      } else {
        // Save locally to public/uploads
        const ext = path.extname(file.name) || '.jpg';
        const cleanName = path
          .basename(file.name, ext)
          .replace(/[^a-zA-Z0-9_-]/g, '_')
          .substring(0, 30);
        const fileName = `${Date.now()}-${cleanName}${ext}`;
        const filePath = path.join(uploadsDir, fileName);

        await writeFile(filePath, buffer);
        uploadedUrls.push(`/uploads/${fileName}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Files uploaded successfully',
      urls: uploadedUrls,
      url: uploadedUrls[0] || '',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error uploading files' },
      { status: 500 }
    );
  }
}

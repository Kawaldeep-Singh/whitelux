import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, unauthorizedResponse } from '@/lib/auth';
import { Settings } from '@/models/Settings';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
    return cloudinary;
  }
  return null;
}

// GET /api/admin/video - Fetch current featured video settings
export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({
      success: true,
      data: settings.featuredVideo || {
        title: 'An Insider’s Perspective on Luxury Real Estate',
        subtitle: 'Curated perspectives, corridor intelligence, and high-value Gurgaon assets.',
        videoUrl: '',
        publicId: '',
        posterUrl: '',
        isActive: true,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error fetching featured video' },
      { status: 500 }
    );
  }
}

// POST or PUT /api/admin/video - Create or update featured video details
export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const body = await req.json();

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    const currentVideo = settings.featuredVideo;

    settings.featuredVideo = {
      title: body.title !== undefined ? body.title : (currentVideo?.title || ''),
      subtitle: body.subtitle !== undefined ? body.subtitle : (currentVideo?.subtitle || ''),
      videoUrl: body.videoUrl !== undefined ? body.videoUrl : (currentVideo?.videoUrl || ''),
      publicId: body.publicId !== undefined ? body.publicId : (currentVideo?.publicId || ''),
      posterUrl: body.posterUrl !== undefined ? body.posterUrl : (currentVideo?.posterUrl || ''),
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      duration: body.duration !== undefined ? Number(body.duration) : (currentVideo?.duration || 0),
      sizeBytes: body.sizeBytes !== undefined ? Number(body.sizeBytes) : (currentVideo?.sizeBytes || 0),
    };

    await settings.save();

    return NextResponse.json({
      success: true,
      message: 'Featured video updated successfully',
      data: settings.featuredVideo,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error saving featured video' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}

// DELETE /api/admin/video - Delete video from Cloudinary and reset database record
export async function DELETE(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) return unauthorizedResponse();

    const settings = await Settings.findOne();
    if (!settings) {
      return NextResponse.json({ success: true, message: 'No video to delete' });
    }

    const publicId = settings.featuredVideo?.publicId;

    // Delete from Cloudinary if publicId exists
    if (publicId) {
      const cld = getCloudinary();
      if (cld) {
        try {
          await cld.uploader.destroy(publicId, { resource_type: 'video' });
        } catch (cldErr: any) {
          console.warn('[Cloudinary] Warning deleting video:', cldErr.message);
        }
      }
    }

    // Reset featuredVideo in settings
    settings.featuredVideo = {
      title: 'An Insider’s Perspective on Luxury Real Estate',
      subtitle: 'Curated perspectives, corridor intelligence, and high-value Gurgaon assets.',
      videoUrl: '',
      publicId: '',
      posterUrl: '',
      isActive: false,
      duration: 0,
      sizeBytes: 0,
    };

    await settings.save();

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully from Cloudinary and database',
      data: settings.featuredVideo,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Error deleting featured video' },
      { status: 500 }
    );
  }
}

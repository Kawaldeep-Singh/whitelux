'use client';

import React, { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { FeaturedVideo } from '@/types';
import {
  Video,
  Upload,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  Film,
  Sparkles,
  Volume2,
} from 'lucide-react';

const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB Cloudinary limit

export default function AdminVideoPage() {
  const [videoData, setVideoData] = useState<FeaturedVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form states for title/subtitle/active
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isPortraitPreview, setIsPortraitPreview] = useState(true);

  // Upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedMB, setUploadedMB] = useState('0');
  const [totalMB, setTotalMB] = useState('0');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetFeaturedVideo();
      if (res && res.success && res.data) {
        setVideoData(res.data);
        setTitle(res.data.title || 'An Insider’s Perspective on Luxury Real Estate');
        setSubtitle(
          res.data.subtitle ||
            'Curated perspectives, corridor intelligence, and high-value Gurgaon assets.'
        );
        setIsActive(res.data.isActive !== undefined ? res.data.isActive : true);
      }
    } catch (err: any) {
      console.error('Error loading featured video', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setSuccessMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setErrorMsg(
        `Selected file is ${sizeMB} MB. Maximum allowed video size on Cloudinary is 100 MB. Please compress or select a file under 100 MB.`
      );
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setSelectedFile(file);
    setTotalMB((file.size / (1024 * 1024)).toFixed(1));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMsg('Please select a video file first.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    setUploading(true);
    setProgress(0);

    try {
      // 1. Get signed Cloudinary credentials from backend
      const signRes = await api.adminGetCloudinarySignature();
      if (!signRes || !signRes.success) {
        throw new Error(signRes?.message || 'Failed to get Cloudinary upload signature.');
      }

      const { signature, timestamp, folder, cloudName, apiKey } = signRes;

      // 2. Prepare FormData for direct Cloudinary upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder);

      // 3. Upload with XMLHttpRequest for real-time progress
      await new Promise<any>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
            setUploadedMB((event.loaded / (1024 * 1024)).toFixed(1));
            setTotalMB((event.total / (1024 * 1024)).toFixed(1));
          }
        };

        xhr.onload = async () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const resData = JSON.parse(xhr.responseText);
              resolve(resData);
            } catch (err) {
              reject(new Error('Invalid Cloudinary response format'));
            }
          } else {
            try {
              const errData = JSON.parse(xhr.responseText);
              reject(new Error(errData?.error?.message || `Upload failed with HTTP ${xhr.status}`));
            } catch {
              reject(new Error(`Upload failed with HTTP ${xhr.status}`));
            }
          }
        };

        xhr.onerror = () => reject(new Error('Network error during video upload.'));
        xhr.send(formData);
      }).then(async (cldResult) => {
        // 4. Save video URL and metadata to MongoDB
        const updatePayload = {
          title: title || 'An Insider’s Perspective on Luxury Real Estate',
          subtitle:
            subtitle ||
            'Curated perspectives, corridor intelligence, and high-value Gurgaon assets.',
          videoUrl: cldResult.secure_url || cldResult.url,
          publicId: cldResult.public_id,
          duration: cldResult.duration || 0,
          sizeBytes: cldResult.bytes || selectedFile.size,
          isActive: true,
        };

        const dbRes = await api.adminUpdateFeaturedVideo(updatePayload);
        if (!dbRes || !dbRes.success) {
          throw new Error(dbRes?.message || 'Video uploaded to Cloudinary, but failed to save in database.');
        }

        setSuccessMsg('Video uploaded to Cloudinary and published successfully!');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchVideo();
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during video upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSaving(true);

    try {
      const res = await api.adminUpdateFeaturedVideo({
        title,
        subtitle,
        isActive,
      });
      if (res && res.success) {
        setSuccessMsg('Video details updated successfully!');
        fetchVideo();
      } else {
        throw new Error(res?.message || 'Failed to update details');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update video details');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVideo = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this video? It will be permanently removed from Cloudinary and hidden from the homepage.'
      )
    ) {
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    setDeleting(true);

    try {
      const res = await api.adminDeleteFeaturedVideo();
      if (res && res.success) {
        setSuccessMsg('Video deleted from Cloudinary and database successfully!');
        fetchVideo();
      } else {
        throw new Error(res?.message || 'Failed to delete video.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error deleting video');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const hasVideo = Boolean(videoData?.videoUrl);

  return (
    <div className="space-y-8 font-sans max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl tracking-wide text-[#FAF7F0]">
              Brand Video Showcase
            </h1>
            <span className="text-[10px] bg-[#C9A24B]/20 text-[#E3C06F] border border-[#C9A24B]/30 px-2 py-0.5 rounded font-mono uppercase">
              Cloudinary Powered
            </span>
          </div>
          <p className="text-xs text-[#7E7B73] mt-1">
            Upload and manage the cinematic luxury film displayed on the homepage. Cloudinary Free Plan supports up to 100 MB videos with full sound.
          </p>
        </div>

        {hasVideo && (
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 border ${
                videoData?.isActive
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-700'
              }`}
            >
              {videoData?.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
              {videoData?.isActive ? 'Visible on Homepage' : 'Hidden on Homepage'}
            </span>
          </div>
        )}
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-200 text-xs flex items-center gap-3">
          <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-200 text-xs flex items-center gap-3">
          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Video Preview & Status (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 border-b border-[#222] pb-3">
              <h2 className="text-sm font-semibold text-[#FAF7F0] flex items-center gap-2 uppercase tracking-wider">
                <Film size={16} className="text-[#C9A24B]" />
                <span>Live Video Preview</span>
              </h2>
              {hasVideo && (
                <button
                  type="button"
                  onClick={handleDeleteVideo}
                  disabled={deleting}
                  className="text-xs text-rose-400 hover:text-rose-200 flex items-center gap-1 hover:bg-rose-950/40 px-2.5 py-1 rounded transition-colors disabled:opacity-50"
                  title="Delete from Cloudinary"
                >
                  <Trash2 size={13} />
                  <span>{deleting ? 'Deleting...' : 'Delete Video'}</span>
                </button>
              )}
            </div>

            {hasVideo ? (
              <div className="space-y-4">
                <div className={`relative mx-auto bg-black rounded-lg overflow-hidden border border-[#333] shadow-inner transition-all duration-300 ${
                  isPortraitPreview ? 'max-w-[280px] aspect-[9/16]' : 'w-full aspect-video'
                }`}>
                  <video
                    key={videoData?.videoUrl}
                    src={videoData?.videoUrl}
                    controls
                    playsInline
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      if (v.videoWidth && v.videoHeight) {
                        setIsPortraitPreview(v.videoHeight > v.videoWidth);
                      }
                    }}
                    className="w-full h-full object-contain bg-black"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] text-[#C9A24B] flex items-center gap-1 border border-[#C9A24B]/30 pointer-events-none">
                    <Volume2 size={12} />
                    <span>Sound Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-[#1A1A1A] rounded-lg border border-[#262626]">
                  <div>
                    <span className="text-[#7E7B73] text-[10px] uppercase font-mono block">Cloudinary Public ID</span>
                    <p className="text-[#FAF7F0] font-mono text-[11px] truncate mt-0.5">
                      {videoData?.publicId || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#7E7B73] text-[10px] uppercase font-mono block">Media URL</span>
                    <a
                      href={videoData?.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#C9A24B] hover:underline flex items-center gap-1 text-[11px] truncate mt-0.5"
                    >
                      <span className="truncate">Open Cloudinary CDN</span>
                      <ExternalLink size={10} className="flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-[#181818] rounded-lg border border-dashed border-[#333] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/20 flex items-center justify-center text-[#C9A24B] mb-3">
                  <Video size={24} />
                </div>
                <h3 className="font-serif text-sm text-[#FAF7F0] tracking-wide">
                  No Video Uploaded Yet
                </h3>
                <p className="text-xs text-[#7E7B73] max-w-xs mt-1">
                  Upload a video up to 150 MB using the upload form on the right. It will immediately show on the homepage.
                </p>
              </div>
            )}
          </div>

          {/* Edit Details Form (If video exists) */}
          {hasVideo && (
            <form onSubmit={handleUpdateDetails} className="bg-[#141414] border border-[#262626] rounded-xl p-5 shadow-lg space-y-4">
              <h2 className="text-sm font-semibold text-[#FAF7F0] flex items-center gap-2 uppercase tracking-wider border-b border-[#222] pb-3">
                <Sparkles size={16} className="text-[#C9A24B]" />
                <span>Homepage Display Settings</span>
              </h2>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase tracking-wider mb-1.5">
                  Section Headline / Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. An Insider’s Perspective on Luxury Real Estate"
                  className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#C9A24B] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F0] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9C6C0] uppercase tracking-wider mb-1.5">
                  Section Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Curated perspectives, corridor intelligence, and high-value Gurgaon assets."
                  className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#C9A24B] rounded-lg p-3 text-xs text-[#FAF7F0] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg border border-[#282828]">
                <div>
                  <span className="text-xs font-medium text-[#FAF7F0] block">Show on Homepage</span>
                  <span className="text-[11px] text-[#7E7B73]">Toggle to show or hide the video section without deleting the file.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    isActive ? 'bg-[#C9A24B]' : 'bg-[#333]'
                  }`}
                >
                  <div
                    className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      isActive ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md disabled:opacity-50"
                >
                  <Save size={14} />
                  <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Upload New Video (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-5 shadow-lg space-y-4">
            <h2 className="text-sm font-semibold text-[#FAF7F0] flex items-center gap-2 uppercase tracking-wider border-b border-[#222] pb-3">
              <Upload size={16} className="text-[#C9A24B]" />
              <span>{hasVideo ? 'Replace Video' : 'Upload Video to Cloudinary'}</span>
            </h2>

            {/* Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#333] hover:border-[#C9A24B]/60 bg-[#171717] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              <div className="w-12 h-12 rounded-full bg-[#1F1F1F] group-hover:bg-[#C9A24B]/20 group-hover:text-[#C9A24B] flex items-center justify-center text-[#7E7B73] mb-3 transition-colors">
                <Upload size={22} />
              </div>
              <p className="text-xs font-medium text-[#FAF7F0]">
                {selectedFile ? selectedFile.name : 'Click to browse or drop video file here'}
              </p>
              <p className="text-[11px] text-[#7E7B73] mt-1">
                MP4, WebM, MOV supported (Up to 100 MB max)
              </p>
            </div>

            {/* Selected File Details */}
            {selectedFile && (
              <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#282828] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7E7B73]">File Name:</span>
                  <span className="text-[#FAF7F0] font-medium truncate max-w-[180px]">
                    {selectedFile.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7E7B73]">File Size:</span>
                  <span className="text-[#E3C06F] font-semibold">{totalMB} MB</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7E7B73]">Status:</span>
                  <span className="text-emerald-400 font-medium">Ready to upload</span>
                </div>
              </div>
            )}

            {/* Upload Progress Bar */}
            {uploading && (
              <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#FAF7F0] font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-ping" />
                    Uploading to Cloudinary...
                  </span>
                  <span className="text-[#C9A24B] font-mono font-bold">{progress}%</span>
                </div>

                <div className="w-full bg-[#222] rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#C9A24B] to-[#F1D78A] h-2.5 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#7E7B73]">
                  <span>
                    {uploadedMB} MB of {totalMB} MB transferred
                  </span>
                  <span>Direct Cloudinary Upload</span>
                </div>
              </div>
            )}

            {/* Upload Action Button */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full py-3 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] font-semibold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin" />
                  <span>Uploading ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Upload size={14} />
                  <span>{hasVideo ? 'Upload & Replace Video' : 'Upload Video (Max 100 MB)'}</span>
                </>
              )}
            </button>

            <div className="p-3 bg-[#161616] border border-[#222] rounded-lg text-[11px] text-[#666] leading-relaxed">
              <p className="font-semibold text-[#888] mb-0.5">Cloudinary Direct Streaming:</p>
              Videos are uploaded directly from your browser to Cloudinary CDN, bypassing Next.js server limits. Real-time progress is tracked accurately.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

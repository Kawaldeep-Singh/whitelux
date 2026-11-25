'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Project, ProjectUnit, FloorPlan } from '@/types';
import {
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  ArrowLeft,
  Save,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

const COMMON_AMENITIES = [
  'Swimming Pool',
  'Club House',
  'Fully Equipped Gym',
  '24/7 Security & CCTV',
  'Kids Play Area',
  'Jogging Track',
  'Visitor Parking',
  'Library',
  'Community Centre',
  'Intercom Facility',
  'Piped Gas',
  'High Speed Elevators',
  'Power Backup',
  'Landscaped Gardens',
  'Tennis / Badminton Court',
  'Conference Room',
  'Cafeteria / Lounge',
  'Spa & Wellness',
];

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Form states
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [city, setCity] = useState(initialData?.city || 'Gurgaon');
  const [location, setLocation] = useState(initialData?.location || '');
  const [developer, setDeveloper] = useState(initialData?.developer || '');
  const [corridor, setCorridor] = useState(initialData?.corridor || '');
  const [type, setType] = useState(initialData?.type || 'Luxury Apartment');
  const [status, setStatus] = useState<'upcoming' | 'construction' | 'ready'>(
    initialData?.status || 'construction'
  );
  const [publishStatus, setPublishStatus] = useState<'draft' | 'published'>(
    initialData?.publishStatus || 'published'
  );
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [isPick, setIsPick] = useState(initialData?.isPick || false);
  const [pickRank, setPickRank] = useState(initialData?.pickRank || 99);
  const [pickBadge, setPickBadge] = useState(initialData?.pickBadge || '');
  const [pickNote, setPickNote] = useState(initialData?.pickNote || '');

  // Pricing & scale
  const [startingPrice, setStartingPrice] = useState(initialData?.startingPrice || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [paymentPlan, setPaymentPlan] = useState(initialData?.paymentPlan || '');
  const [totalLand, setTotalLand] = useState(initialData?.totalLand || '');
  const [totalTowers, setTotalTowers] = useState(initialData?.totalTowers || '');
  const [totalUnits, setTotalUnits] = useState(initialData?.totalUnits || '');

  // About
  const [aboutHeading, setAboutHeading] = useState(initialData?.aboutHeading || '');
  const [aboutDescription, setAboutDescription] = useState(initialData?.aboutDescription || '');

  // Media
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || '');
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [brochurePdf, setBrochurePdf] = useState(initialData?.brochurePdf || '');

  // Arrays
  const [units, setUnits] = useState<ProjectUnit[]>(
    initialData?.units?.length ? initialData.units : [{ unitType: '4 BHK', unitSize: 'Size on call', unitPrice: 'Price on call' }]
  );
  const [amenities, setAmenities] = useState<string[]>(initialData?.amenities || []);
  const [customAmenity, setCustomAmenity] = useState('');
  const [locationPoints, setLocationPoints] = useState<string[]>(
    initialData?.locationPoints?.length ? initialData.locationPoints : ['']
  );
  const [mapLink, setMapLink] = useState(initialData?.mapLink || '');

  // Plans
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>(
    initialData?.floorPlans?.length ? initialData.floorPlans : []
  );
  const [masterPlanTitle, setMasterPlanTitle] = useState(initialData?.masterPlan?.title || '');
  const [masterPlanImage, setMasterPlanImage] = useState(initialData?.masterPlan?.image || '');
  const [masterPlanName, setMasterPlanName] = useState(initialData?.masterPlanName || '');

  // Compliance & SEO
  const [reraNumber, setReraNumber] = useState(initialData?.reraNumber || '');
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'gallery' | 'floorPlan' | 'masterPlan') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      const res = await api.uploadFiles(formData);
      if (res && res.urls && res.urls.length > 0) {
        if (target === 'hero') {
          setHeroImage(res.urls[0]);
        } else if (target === 'gallery') {
          setGallery((prev) => [...prev, ...res.urls]);
        } else if (target === 'masterPlan') {
          setMasterPlanImage(res.urls[0]);
        }
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message || 'Error uploading file'}`);
    } finally {
      setUploading(false);
    }
  };

  // Units helpers
  const addUnit = () => {
    setUnits([...units, { unitType: '', unitSize: '', unitPrice: '' }]);
  };
  const updateUnit = (index: number, field: keyof ProjectUnit, value: string) => {
    const updated = [...units];
    updated[index][field] = value;
    setUnits(updated);
  };
  const removeUnit = (index: number) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  // Location Points helpers
  const addLocationPoint = () => setLocationPoints([...locationPoints, '']);
  const updateLocationPoint = (idx: number, val: string) => {
    const updated = [...locationPoints];
    updated[idx] = val;
    setLocationPoints(updated);
  };
  const removeLocationPoint = (idx: number) => {
    setLocationPoints(locationPoints.filter((_, i) => i !== idx));
  };

  // Floor plans helpers
  const addFloorPlan = () => {
    setFloorPlans([...floorPlans, { label: '4 BHK Floor Plan', image: '' }]);
  };
  const updateFloorPlan = (idx: number, field: keyof FloorPlan, val: string) => {
    const updated = [...floorPlans];
    updated[idx][field] = val;
    setFloorPlans(updated);
  };
  const removeFloorPlan = (idx: number) => {
    setFloorPlans(floorPlans.filter((_, i) => i !== idx));
  };

  // Amenities helpers
  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };
  const addCustomAmenity = () => {
    if (customAmenity.trim() && !amenities.includes(customAmenity.trim())) {
      setAmenities([...amenities, customAmenity.trim()]);
      setCustomAmenity('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload: Partial<Project> = {
        name,
        slug,
        city,
        location,
        developer,
        corridor,
        type,
        status,
        publishStatus,
        featured,
        isPick,
        pickRank: Number(pickRank) || 99,
        pickBadge,
        pickNote,
        startingPrice,
        price,
        paymentPlan,
        totalLand,
        totalTowers,
        totalUnits,
        aboutHeading,
        aboutDescription,
        heroImage,
        gallery,
        brochurePdf,
        units: units.filter((u) => u.unitType.trim() !== ''),
        amenities,
        locationPoints: locationPoints.filter((p) => p.trim() !== ''),
        mapLink,
        floorPlans: floorPlans.filter((fp) => fp.image.trim() !== ''),
        masterPlan: {
          title: masterPlanTitle,
          image: masterPlanImage,
        },
        masterPlanName,
        reraNumber,
        seoTitle: seoTitle || `${name} ${location} | White Luxe Real Estate`,
        seoDescription:
          seoDescription ||
          `Explore ${name} located at ${location}. Luxury residences starting from ${startingPrice}.`,
      };

      if (isEdit && initialData?._id) {
        await api.adminUpdateProject(initialData._id, payload);
      } else {
        await api.adminCreateProject(payload);
      }

      router.push('/admin/projects');
    } catch (err: any) {
      setError(err.message || 'Failed to save project. Please check the fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#1A1A1A] rounded transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-serif text-2xl text-[#FAF7F0]">
              {isEdit ? `Edit Property: ${initialData?.name}` : 'Curate New Property'}
            </h1>
            <p className="text-xs text-[#7E7B73]">
              Dynamic template format — sections with empty data will hide automatically on public view.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2 text-xs font-medium text-[#C9C6C0] bg-[#1A1A1A] hover:bg-[#252525] rounded border border-[#333] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save size={16} />
            )}
            <span>{isEdit ? 'Save Changes' : 'Publish Property'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Basic Information */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-5">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          1. Basic Details & Routing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. TARC Ishva"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#C9C6C0] uppercase">
                URL Slug *
              </label>
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className="text-[10px] text-[#C9A24B] hover:underline"
              >
                {autoSlug ? 'Switch to Manual' : 'Auto-sync from Name'}
              </button>
            </div>
            <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#7E7B73]">
              <span>/properties/</span>
              <input
                type="text"
                required
                value={slug}
                readOnly={autoSlug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="tarc-ishva"
                className="w-full bg-transparent text-[#FAF7F0] focus:outline-none ml-1"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Gurgaon"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Location / Sector *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Sector 63A, Gurugram"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Property Type *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            >
              <option value="Luxury Apartment">Luxury Apartment</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Luxury Villa">Luxury Villa</option>
              <option value="Builder Floor">Builder Floor</option>
              <option value="Commercial">Commercial</option>
              <option value="Retail">Retail</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Developer / Institution
            </label>
            <input
              type="text"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              placeholder="e.g. Godrej Properties / DLF"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Growth Corridor
            </label>
            <input
              type="text"
              value={corridor}
              onChange={(e) => setCorridor(e.target.value)}
              placeholder="e.g. Golf Course Road / Dwarka Expressway"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Stage / Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            >
              <option value="upcoming">Upcoming Launch</option>
              <option value="construction">Under Construction</option>
              <option value="ready">Ready to Move</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Visibility
            </label>
            <select
              value={publishStatus}
              onChange={(e) => setPublishStatus(e.target.value as any)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            >
              <option value="published">Published (Live)</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-[#C9A24B] rounded cursor-pointer"
            />
            <label htmlFor="featuredCheck" className="text-xs text-[#FAF7F0] cursor-pointer">
              Feature on Homepage Showcase
            </label>
          </div>

          {/* Rohit's Advisory Pick (Spotlight) */}
          <div className="sm:col-span-3 pt-4 border-t border-[#222] mt-2 space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPickCheck"
                checked={isPick}
                onChange={(e) => setIsPick(e.target.checked)}
                className="w-4 h-4 accent-[#C9A24B] rounded cursor-pointer"
              />
              <label htmlFor="isPickCheck" className="text-xs text-[#FAF7F0] font-medium cursor-pointer">
                Include in &quot;Rohit&apos;s Picks&quot; (Homepage Spotlight - Max 3)
              </label>
            </div>

            {isPick && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-7 bg-[#1A1A1A]/50 p-4 rounded border border-[#C8A24A]/20">
                <div>
                  <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                    Pick Rank (1, 2, or 3)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={pickRank}
                    onChange={(e) => setPickRank(Number(e.target.value) || 1)}
                    className="w-full bg-[#141414] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                    Pick Badge Text (e.g. &quot;Top Pick&quot;)
                  </label>
                  <input
                    type="text"
                    value={pickBadge}
                    onChange={(e) => setPickBadge(e.target.value)}
                    placeholder="Top Pick (filled gold) or leave empty"
                    className="w-full bg-[#141414] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
                    Why I&apos;d buy it (Personal advisory note quote)
                  </label>
                  <textarea
                    rows={2}
                    value={pickNote}
                    onChange={(e) => setPickNote(e.target.value)}
                    placeholder="My focused pick for the highest appreciation potential in the corridor..."
                    className="w-full bg-[#141414] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
                  />
                  <p className="text-[11px] text-[#888] mt-1">If left empty, the quote line hides cleanly on the card.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Pricing & Scale Metrics (Free Text) */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-5">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          2. Pricing & Scale Specifications (Free text format)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Starting Price *
            </label>
            <input
              type="text"
              required
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              placeholder="₹ 9.7 Cr* or Price on Request"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Alternative / Indicative Price
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 6.33 Cr"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Payment Plan
            </label>
            <input
              type="text"
              value={paymentPlan}
              onChange={(e) => setPaymentPlan(e.target.value)}
              placeholder="Flexible / 30:70 / Construction Linked"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Total Land Parcel
            </label>
            <input
              type="text"
              value={totalLand}
              onChange={(e) => setTotalLand(e.target.value)}
              placeholder="e.g. 10.5 Acres"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Total Towers
            </label>
            <input
              type="text"
              value={totalTowers}
              onChange={(e) => setTotalTowers(e.target.value)}
              placeholder="e.g. 1 Tower or 4 Towers"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Total Units
            </label>
            <input
              type="text"
              value={totalUnits}
              onChange={(e) => setTotalUnits(e.target.value)}
              placeholder="e.g. 150 Residences"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
            />
          </div>
        </div>
      </div>

      {/* 3. About Project */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          3. Editorial Narrative & Overview
        </h2>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            About Heading
          </label>
          <input
            type="text"
            value={aboutHeading}
            onChange={(e) => setAboutHeading(e.target.value)}
            placeholder="e.g. Four-side Open Residences"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            About Description
          </label>
          <textarea
            rows={4}
            value={aboutDescription}
            onChange={(e) => setAboutDescription(e.target.value)}
            placeholder="Detailed editorial copy explaining the architecture, living experience, and heritage of the development..."
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
          />
        </div>
      </div>

      {/* 4. Units & Pricing Breakdown */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div>
            <h2 className="font-serif text-lg text-[#FAF7F0]">4. Unit Configurations ("How Much")</h2>
            <p className="text-xs text-[#7E7B73]">Add available typologies, square footages, and pricing.</p>
          </div>
          <button
            type="button"
            onClick={addUnit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1B1B] hover:bg-[#252525] text-xs text-[#C9A24B] border border-[#333] rounded transition-colors"
          >
            <Plus size={14} /> Add Row
          </button>
        </div>

        <div className="space-y-3">
          {units.map((unit, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Typology (e.g. 4 BHK)"
                value={unit.unitType}
                onChange={(e) => updateUnit(idx, 'unitType', e.target.value)}
                className="flex-1 bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              />
              <input
                type="text"
                placeholder="Size (e.g. 3,500 sq.ft. or Size on call)"
                value={unit.unitSize}
                onChange={(e) => updateUnit(idx, 'unitSize', e.target.value)}
                className="flex-1 bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              />
              <input
                type="text"
                placeholder="Price (e.g. ₹ 9.7 Cr* or Price on call)"
                value={unit.unitPrice}
                onChange={(e) => updateUnit(idx, 'unitPrice', e.target.value)}
                className="flex-1 bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              />
              <button
                type="button"
                onClick={() => removeUnit(idx)}
                className="p-2 text-[#7E7B73] hover:text-rose-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Media & Imagery */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-6">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          5. High-Resolution Visual Assets
        </h2>

        {/* Hero Image */}
        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Hero Header Image
          </label>
          <div className="flex gap-4 items-start">
            <div className="w-40 h-24 bg-[#1E1E1E] border border-[#333] rounded overflow-hidden flex-shrink-0">
              {heroImage ? (
                <img src={heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#555]">
                  <ImageIcon size={24} />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="Direct image URL or upload below"
                className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              />
              <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#201F1F] hover:bg-[#282828] text-xs text-[#FAF7F0] rounded cursor-pointer border border-[#333]">
                <Upload size={14} className="text-[#C9A24B]" />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'hero')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-[#C9C6C0] uppercase">
              Curated Gallery ({gallery.length} Images)
            </label>
            <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1B1B] hover:bg-[#262626] text-xs text-[#C9A24B] border border-[#333] rounded cursor-pointer">
              <Upload size={12} />
              <span>Upload Gallery Photos</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'gallery')}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-video rounded overflow-hidden border border-[#333] group">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                  className="absolute top-1 right-1 bg-black/80 text-rose-400 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Brochure Link */}
        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Brochure PDF Download Link
          </label>
          <input
            type="text"
            value={brochurePdf}
            onChange={(e) => setBrochurePdf(e.target.value)}
            placeholder="https://.../brochure.pdf"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0] focus:outline-none focus:border-[#C9A24B]"
          />
        </div>
      </div>

      {/* 6. Amenities */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          6. Lifestyle Amenities
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {COMMON_AMENITIES.map((item) => {
            const isSelected = amenities.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleAmenity(item)}
                className={`flex items-center gap-2 p-2.5 rounded text-left text-xs transition-colors border ${
                  isSelected
                    ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-[#FAF7F0]'
                    : 'bg-[#181818] border-[#2A2A2A] text-[#9A8F7E] hover:text-[#FAF7F0]'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0B0B0B]' : 'border-[#444]'
                  }`}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </div>
                <span className="truncate">{item}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 pt-2">
          <input
            type="text"
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustomAmenity();
              }
            }}
            placeholder="Add custom amenity..."
            className="flex-1 bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
          />
          <button
            type="button"
            onClick={addCustomAmenity}
            className="px-4 py-2 bg-[#222] hover:bg-[#2A2A2A] text-xs text-[#FAF7F0] rounded transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* 7. Location Advantages & Maps */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div>
            <h2 className="font-serif text-lg text-[#FAF7F0]">7. Location Advantages & Connectivity</h2>
            <p className="text-xs text-[#7E7B73]">Travel times, proximity to schools, hospitals, and transit hubs.</p>
          </div>
          <button
            type="button"
            onClick={addLocationPoint}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#1C1B1B] hover:bg-[#252525] text-xs text-[#C9A24B] border border-[#333] rounded transition-colors"
          >
            <Plus size={14} /> Add Point
          </button>
        </div>

        <div className="space-y-2.5">
          {locationPoints.map((point, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs text-[#7E7B73] w-5 text-right">{idx + 1}.</span>
              <input
                type="text"
                placeholder="e.g. 1 Km From Golf Course Road or 15 Min From Artemis Hospital"
                value={point}
                onChange={(e) => updateLocationPoint(idx, e.target.value)}
                className="flex-1 bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-[#FAF7F0]"
              />
              <button
                type="button"
                onClick={() => removeLocationPoint(idx)}
                className="p-1.5 text-[#7E7B73] hover:text-rose-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Google Map Embed URL
          </label>
          <input
            type="text"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
          />
        </div>
      </div>

      {/* 8. Floor Plans & Master Plan */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-6">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          8. Architectural Layouts & Master Plan
        </h2>

        {/* Floor Plans List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-medium text-[#C9C6C0] uppercase">
              Floor Plans
            </label>
            <button
              type="button"
              onClick={addFloorPlan}
              className="flex items-center gap-1 px-3 py-1 bg-[#1C1B1B] hover:bg-[#252525] text-xs text-[#C9A24B] border border-[#333] rounded"
            >
              <Plus size={14} /> Add Floor Plan
            </button>
          </div>

          <div className="space-y-3">
            {floorPlans.map((fp, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-3 p-3 bg-[#1A1A1A] rounded border border-[#2A2A2A]">
                <input
                  type="text"
                  placeholder="Plan Label (e.g. 4 BHK Deluxe Layout)"
                  value={fp.label}
                  onChange={(e) => updateFloorPlan(idx, 'label', e.target.value)}
                  className="sm:w-1/3 bg-[#141414] border border-[#333] rounded px-3 py-1.5 text-xs text-[#FAF7F0]"
                />
                <input
                  type="text"
                  placeholder="Plan Image URL"
                  value={fp.image}
                  onChange={(e) => updateFloorPlan(idx, 'image', e.target.value)}
                  className="flex-1 bg-[#141414] border border-[#333] rounded px-3 py-1.5 text-xs text-[#FAF7F0]"
                />
                <button
                  type="button"
                  onClick={() => removeFloorPlan(idx)}
                  className="p-1.5 text-rose-400 self-end sm:self-auto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Master Plan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Master Plan Title / Name
            </label>
            <input
              type="text"
              value={masterPlanTitle}
              onChange={(e) => setMasterPlanTitle(e.target.value)}
              placeholder="e.g. Master Plan of Puri The Aravallis"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
              Master Plan Image URL
            </label>
            <input
              type="text"
              value={masterPlanImage}
              onChange={(e) => setMasterPlanImage(e.target.value)}
              placeholder="https://.../master-plan.jpg"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
            />
          </div>
        </div>
      </div>

      {/* 9. RERA Compliance & Dynamic SEO */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-6 space-y-4">
        <h2 className="font-serif text-lg text-[#FAF7F0] border-b border-[#222] pb-3">
          9. Legal Disclosures & Search Optimization (SEO)
        </h2>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            RERA Registration Number
          </label>
          <input
            type="text"
            value={reraNumber}
            onChange={(e) => setReraNumber(e.target.value)}
            placeholder="e.g. RC/REP/HARERA/GGM/2024/XX"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Custom Meta SEO Title
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="TARC Ishva Sector 63A Gurugram | Luxury 4 BHK Apartments | White Luxe"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#C9C6C0] uppercase mb-1.5">
            Custom Meta SEO Description
          </label>
          <textarea
            rows={2}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Explore TARC Ishva, luxury 4 BHK apartments in Sector 63A, Gurugram, starting ₹ 9.7 Cr*..."
            className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3.5 py-2 text-xs text-[#FAF7F0]"
          />
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[#222]">
        <Link
          href="/admin/projects"
          className="px-5 py-2.5 text-xs text-[#C9C6C0] bg-[#1A1A1A] hover:bg-[#252525] rounded border border-[#333]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A24B] hover:bg-[#E8C872] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save size={16} />
          )}
          <span>{isEdit ? 'Save Changes' : 'Publish Property'}</span>
        </button>
      </div>
    </form>
  );
}

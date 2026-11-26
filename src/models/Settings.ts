import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

export interface ICredibilityItem {
  label: string;
  value: string;
  logo?: string;
}

export interface ICorridorSector {
  sector: string;
  label: string;
}

export interface ICorridorSettings {
  heading: string;
  body?: string;
  reportSlug?: string;
  highlightedSectors: ICorridorSector[];
}

export interface IReelItem {
  title: string;
  url: string;
  thumbnail?: string;
}

export interface IFeaturedVideo {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  publicId?: string;
  posterUrl?: string;
  isActive: boolean;
  duration?: number;
  sizeBytes?: number;
}

export interface ISettings extends Document {
  brandName: string;
  brandTagline: string;
  tagline: string;
  shortDescription: string;
  aboutLine: string;
  address: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  whatsappCtaText: string;
  workingHours: string;
  experienceYears: string;
  happyClients?: string;
  projectsCurated?: string;
  transactionVolume?: string;
  hreraNumber: string;
  reraNumber: string;
  founderName: string;
  founderTitle: string;
  founderPortrait?: string;
  founderNoteQuote?: string;
  founderNoteBody?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  credibility: ICredibilityItem[];
  corridor: ICorridorSettings;
  reels: IReelItem[];
  socialLinks: ISocialLinks;
  featuredVideo?: IFeaturedVideo;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    brandName: { type: String, default: 'White Luxe Real Estate' },
    brandTagline: { type: String, default: 'Advisory. Not Agency.' },
    tagline: { type: String, default: 'Advisory. Not Agency.' },
    shortDescription: {
      type: String,
      default: 'Ethical and strategic property advisors in Gurgaon.',
    },
    aboutLine: {
      type: String,
      default:
        'White Luxe Real Estate is a founder-led property consultancy in Gurgaon offering strategic, research-led advisory across luxury residential, commercial assets and leased income.',
    },
    address: { type: String, default: 'R-7/109 M3M Urbana, Sector 67, Gurgaon 122102' },
    phone: { type: String, default: '+91 98152 02102' },
    email: { type: String, default: 'rohitrajmaingi@whiteluxerealestate.com' },
    whatsappNumber: { type: String, default: '919815202102' },
    whatsappCtaText: {
      type: String,
      default: 'Hello Rohit, I would like to schedule a private advisory consultation regarding Gurgaon luxury properties.',
    },
    workingHours: { type: String, default: 'Mon-Sat, 10:00 AM - 7:00 PM' },
    experienceYears: { type: String, default: '30+' },
    happyClients: { type: String, default: '' },
    projectsCurated: { type: String, default: '' },
    transactionVolume: { type: String, default: '' },
    hreraNumber: { type: String, default: 'RC/HARERA/GGM/3367/2962/2025/244' },
    reraNumber: { type: String, default: 'RC/HARERA/GGM/3367/2962/2025/244' },
    founderName: { type: String, default: 'Rohit Raj Maingi' },
    founderTitle: { type: String, default: 'Founder & Advisory Director' },
    founderPortrait: { type: String, default: '' },
    founderNoteQuote: {
      type: String,
      default:
        'I spent 18 years helping families grow their wealth in private banking. Property is usually the largest decision on that balance sheet, and it deserves the same discipline.',
    },
    founderNoteBody: { type: String, default: '' },
    instagramHandle: { type: String, default: '@rohitmaing77' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/rohitmaing77' },
    linkedinUrl: { type: String, default: '' },
    credibility: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        logo: { type: String, default: '' },
      },
    ],
    corridor: {
      heading: { type: String, default: 'Golf Course Extension Road, Sectors 58 to 68.' },
      body: {
        type: String,
        default:
          'Gurgaon’s primary growth corridor connecting Golf Course Road and Southern Peripheral Road, defined by top-tier gated master plans, institutional commercial developments, and superior infrastructure.',
      },
      reportSlug: { type: String, default: 'gurgaons-aspirational-buyer' },
      highlightedSectors: [
        {
          sector: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
    },
    reels: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        thumbnail: { type: String, default: '' },
      },
    ],
    socialLinks: {
      instagram: { type: String, default: 'https://www.instagram.com/rohitmaing77' },
      facebook: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    featuredVideo: {
      title: { type: String, default: 'An Insider’s Perspective on Luxury Real Estate' },
      subtitle: { type: String, default: 'Curated perspectives, corridor intelligence, and high-value Gurgaon assets.' },
      videoUrl: { type: String, default: '' },
      publicId: { type: String, default: '' },
      posterUrl: { type: String, default: '' },
      isActive: { type: Boolean, default: true },
      duration: { type: Number, default: 0 },
      sizeBytes: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const Settings =
  (mongoose.models.Settings as mongoose.Model<ISettings>) || mongoose.model<ISettings>('Settings', SettingsSchema);

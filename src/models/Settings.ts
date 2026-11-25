import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

export interface ISettings extends Document {
  brandName: string;
  tagline: string;
  shortDescription: string;
  aboutLine: string;
  address: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  workingHours: string;
  experienceYears: string;
  happyClients: string;
  projectsCurated: string;
  transactionVolume: string;
  reraNumber: string;
  socialLinks: ISocialLinks;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    brandName: { type: String, default: 'White Luxe Real Estate' },
    tagline: { type: String, default: 'Where Luxury Meets Trust' },
    shortDescription: {
      type: String,
      default: 'Ethical and strategic property advisors in Gurgaon.',
    },
    aboutLine: {
      type: String,
      default:
        'White Luxe Real Estate is a property consultancy in Gurgaon offering ethical, research-led advice across residential, commercial and retail real estate.',
    },
    address: { type: String, default: 'Golf Course Road, Gurgaon, Haryana' },
    phone: { type: String, default: '+91 98765 43210' },
    email: { type: String, default: 'contact@whiteluxe.com' },
    whatsappNumber: { type: String, default: '919876543210' },
    workingHours: { type: String, default: 'Mon-Sat, 10:00 AM - 7:00 PM' },
    experienceYears: { type: String, default: '10' },
    happyClients: { type: String, default: '500' },
    projectsCurated: { type: String, default: '120' },
    transactionVolume: { type: String, default: '750' },
    reraNumber: { type: String, default: 'HRERA-PKL-GGM-XXXX-2026' },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com/whiteluxerealestate' },
      facebook: { type: String, default: 'https://facebook.com/whiteluxerealestate' },
      linkedin: { type: String, default: 'https://linkedin.com/company/whiteluxe' },
      youtube: { type: String, default: 'https://youtube.com/@whiteluxerealestate' },
    },
  },
  { timestamps: true }
);

export const Settings =
  (mongoose.models.Settings as mongoose.Model<ISettings>) || mongoose.model<ISettings>('Settings', SettingsSchema);

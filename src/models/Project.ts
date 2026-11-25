import mongoose, { Document, Schema } from 'mongoose';

export interface IProjectUnit {
  unitType: string; // e.g. "4 BHK"
  unitSize: string; // e.g. "Size on call" or "3,500 sq.ft."
  unitPrice: string; // e.g. "Price on call" or "₹ 9.7 Cr*"
}

export interface IFloorPlan {
  label: string;
  image: string;
}

export interface IMasterPlan {
  title?: string;
  image?: string;
}

export interface IProject extends Document {
  city: string;
  name: string;
  slug: string;
  type: string;
  location: string;
  startingPrice: string;
  price?: string;
  heroImage?: string;
  totalLand?: string;
  totalTowers?: string;
  totalUnits?: string;
  paymentPlan?: string;
  status: 'upcoming' | 'construction' | 'ready';
  masterPlanName?: string;
  aboutHeading?: string;
  aboutDescription?: string;
  units: IProjectUnit[];
  gallery: string[];
  amenities: string[];
  locationPoints: string[];
  mapLink?: string;
  floorPlans: IFloorPlan[];
  masterPlan?: IMasterPlan;
  brochurePdf?: string;
  reraNumber?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  isPick: boolean;
  pickRank?: number;
  pickBadge?: string;
  pickNote?: string;
  publishStatus: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    city: { type: String, required: true, trim: true, default: 'Gurgaon' },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    type: { type: String, required: true, trim: true }, // e.g. "Luxury Apartment"
    location: { type: String, required: true, trim: true }, // e.g. "Sector 63A, Gurugram"
    startingPrice: { type: String, required: true, trim: true }, // e.g. "₹ 9.7 Cr*"
    price: { type: String, trim: true },
    heroImage: { type: String, default: '' },
    totalLand: { type: String, trim: true },
    totalTowers: { type: String, trim: true },
    totalUnits: { type: String, trim: true },
    paymentPlan: { type: String, trim: true },
    status: {
      type: String,
      enum: ['upcoming', 'construction', 'ready'],
      default: 'construction',
      index: true,
    },
    masterPlanName: { type: String, trim: true },
    aboutHeading: { type: String, trim: true },
    aboutDescription: { type: String },
    units: [
      {
        unitType: { type: String, required: true },
        unitSize: { type: String, required: true },
        unitPrice: { type: String, required: true },
      },
    ],
    gallery: [{ type: String }],
    amenities: [{ type: String }],
    locationPoints: [{ type: String }],
    mapLink: { type: String },
    floorPlans: [
      {
        label: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    masterPlan: {
      title: { type: String },
      image: { type: String },
    },
    brochurePdf: { type: String },
    reraNumber: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    featured: { type: Boolean, default: false, index: true },
    isPick: { type: Boolean, default: false, index: true },
    pickRank: { type: Number, default: 99 },
    pickBadge: { type: String, trim: true, default: '' },
    pickNote: { type: String, trim: true, default: '' },
    publishStatus: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
  },
  { timestamps: true }
);

// Text index for search functionality
ProjectSchema.index({
  name: 'text',
  location: 'text',
  type: 'text',
  city: 'text',
  aboutDescription: 'text',
});

export const Project =
  (mongoose.models.Project as mongoose.Model<IProject>) || mongoose.model<IProject>('Project', ProjectSchema);

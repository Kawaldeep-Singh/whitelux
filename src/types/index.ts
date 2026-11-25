export interface ProjectUnit {
  unitType: string;
  unitSize: string;
  unitPrice: string;
}

export interface FloorPlan {
  label: string;
  image: string;
}

export interface MasterPlan {
  title?: string;
  image?: string;
}

export interface Project {
  _id: string;
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
  units: ProjectUnit[];
  gallery: string[];
  amenities: string[];
  locationPoints: string[];
  mapLink?: string;
  floorPlans: FloorPlan[];
  masterPlan?: MasterPlan;
  brochurePdf?: string;
  reraNumber?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  publishStatus: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  coverImage?: string;
  author: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  publishStatus: 'draft' | 'published';
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Follow-up'
  | 'Site Visit'
  | 'Closed Won'
  | 'Closed Lost';

export interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  interestedIn?: string;
  message?: string;
  projectId?: string;
  projectSlug?: string;
  projectName?: string;
  status: LeadStatus;
  notes?: string;
  followUpDate?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientLocation: string;
  quote: string;
  project?: string;
  rating: number;
  featured: boolean;
  order: number;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

export interface SiteSettings {
  _id?: string;
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
  socialLinks: SocialLinks;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  lastLogin?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  errors?: Array<{ field: string; message: string }>;
}

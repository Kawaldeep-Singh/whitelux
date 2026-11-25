import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'Market Trends' | 'Investment' | 'Buying Guide' | 'Luxury Living' | string;
  coverImage?: string;
  author: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  publishStatus: 'draft' | 'published';
  publishedAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    summary: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Market Trends',
      index: true,
    },
    coverImage: { type: String, default: '' },
    author: { type: String, default: 'White Luxe Advisory', trim: true },
    readTime: { type: String, default: '5 min read', trim: true },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
    publishStatus: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
    publishedAt: { type: Date, default: Date.now },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

BlogSchema.index({ title: 'text', summary: 'text', content: 'text' });

export const Blog =
  (mongoose.models.Blog as mongoose.Model<IBlog>) || mongoose.model<IBlog>('Blog', BlogSchema);

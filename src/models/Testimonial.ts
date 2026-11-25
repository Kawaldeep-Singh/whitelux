import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  clientLocation: string;
  quote: string;
  project?: string;
  rating: number;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    clientLocation: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    project: { type: String, trim: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    featured: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial =
  (mongoose.models.Testimonial as mongoose.Model<ITestimonial>) || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

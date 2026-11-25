import mongoose, { Document, Schema } from 'mongoose';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Follow-up'
  | 'Site Visit'
  | 'Closed Won'
  | 'Closed Lost';

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  interestedIn?: string;
  message?: string;
  projectId?: mongoose.Types.ObjectId;
  projectSlug?: string;
  projectName?: string;
  status: LeadStatus;
  notes?: string;
  followUpDate?: Date;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    interestedIn: { type: String, trim: true },
    message: { type: String, trim: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    projectSlug: { type: String, trim: true },
    projectName: { type: String, trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Follow-up', 'Site Visit', 'Closed Won', 'Closed Lost'],
      default: 'New',
      index: true,
    },
    notes: { type: String, default: '' },
    followUpDate: { type: Date },
    source: { type: String, default: 'Website' },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ status: 1, createdAt: -1 });

export const Lead =
  (mongoose.models.Lead as mongoose.Model<ILead>) || mongoose.model<ILead>('Lead', LeadSchema);

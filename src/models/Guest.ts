import mongoose, { Schema, Document } from "mongoose";

export interface IGuest extends Document {
  name: string;
  attending: boolean;
  members: number;
  slug?: string;
  category?: string;
  createdAt: Date;
}

const GuestSchema: Schema = new Schema({
  name: { type: String, required: true },
  attending: { type: Boolean, required: true },
  members: { type: Number, required: true, default: 1 },
  slug: { type: String, unique: true, sparse: true }, // For personalized URLs
  category: { type: String }, // e.g., Family, Friends, Co-workers
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Guest || mongoose.model<IGuest>("Guest", GuestSchema);

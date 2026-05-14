import mongoose, { Schema, Document } from "mongoose";

export interface IGuest extends Document {
  name: string;
  attending: boolean | null;
  members: number;
  slug?: string;
  category?: string;
  createdAt: Date;
}

const GuestSchema: Schema = new Schema({
  name: { type: String, required: true },
  attending: { type: Boolean, default: null },
  members: { type: Number, required: true, default: 1 },
  slug: { type: String, unique: true, sparse: true }, // For personalized URLs
  category: { type: String }, // e.g., Family, Friends, Co-workers
  createdAt: { type: Date, default: Date.now },
});

// Delete the cached model to force Mongoose to re-compile the schema on hot reload
delete mongoose.models.Guest;
export default mongoose.models.Guest || mongoose.model<IGuest>("Guest", GuestSchema);

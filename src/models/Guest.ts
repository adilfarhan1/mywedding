// models/Guest.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IGuest extends Document {
  name: string;
  attending: boolean | null;
  members: number;
  slug?: string;
  category?: string;
  familyCategory?: string;
  side?: "bride" | "groom";
  invited?: boolean;          // ← new: tracks whether invite was physically sent
  createdAt: Date;
}

const GuestSchema: Schema = new Schema({
  name:           { type: String, required: true },
  attending:      { type: Boolean, default: null },
  members:        { type: Number, required: true, default: 1 },
  slug:           { type: String, unique: true, sparse: true },
  category:       { type: String },
  familyCategory: { type: String },
  side:           { type: String, enum: ["bride", "groom"] },
  invited:        { type: Boolean, default: false },  
  createdAt:      { type: Date, default: Date.now },
});

delete mongoose.models.Guest;
export default mongoose.models.Guest || mongoose.model<IGuest>("Guest", GuestSchema);
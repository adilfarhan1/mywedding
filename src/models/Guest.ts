import mongoose, { Schema, Document } from "mongoose";

export interface IGuest extends Document {
  name: string;
  attending: boolean | null;
  members: number;
  slug?: string;
  category?: string;        // Group: Family | Friends | Co-workers | VIP
  familyCategory?: string;  // Custom family label e.g. "Al-Rashid Family"
  side?: "bride" | "groom"; // Which side of the wedding
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
  createdAt:      { type: Date, default: Date.now },
});

delete mongoose.models.Guest;
export default mongoose.models.Guest || mongoose.model<IGuest>("Guest", GuestSchema);
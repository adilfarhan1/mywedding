import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWish extends Document {
  name: string;
  message: string;
  createdAt: Date;
}

const WishSchema = new Schema<IWish>({
  name: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Wish: Model<IWish> =
  (mongoose.models.Wish as Model<IWish>) || mongoose.model<IWish>("Wish", WishSchema);

export default Wish;

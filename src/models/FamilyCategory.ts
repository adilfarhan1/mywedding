import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IFamilyCategory extends Document {
  _id: Types.ObjectId;
  name: string;
  side: "bride" | "groom";
  createdAt: Date;
  updatedAt: Date;
}

const FamilyCategorySchema = new Schema<IFamilyCategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    side: {
      type: String,
      enum: ["bride", "groom"],
      required: [true, "Side is required"],
    },
  },
  {
    timestamps: true,
  }
);

const FamilyCategory: Model<IFamilyCategory> =
  (mongoose.models.FamilyCategory as Model<IFamilyCategory>) ||
  mongoose.model<IFamilyCategory>(
    "FamilyCategory",
    FamilyCategorySchema
  );

export default FamilyCategory;
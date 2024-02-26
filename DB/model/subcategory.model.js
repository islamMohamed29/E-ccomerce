import { Schema, Types, model } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "sub-category name required"],
      trim: true,
      unique: [true, "sub-category name unique"],
      minlength: [2, "too short sub-category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export const subCategoryModel = model("Subcategory", subCategorySchema);

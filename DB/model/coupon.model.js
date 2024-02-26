import { Schema, model, Types } from "mongoose";
const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "coupon code is required"],
      trim: true,
      unique: [true, "coupon code must be unique"],
    },
    expires: {
      type: Date,
    },
    discount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const couponModel = model("Coupon", couponSchema);

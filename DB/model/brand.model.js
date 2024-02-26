import { Schema, Types, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "brand name required"],
      trim: true,
      unique: [true, "brand name unique"],
      minlength: [2, "too short brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

// hooks

brandSchema.post("init", async function (doc) {
  doc.image = process.env.HOSTNAME + process.env.BASEURL + "/" + doc.image;
  // this.image = process.env.HOSTNAME + process.env.BASEURL + "/" + this.image;
});

export const brandModel = model("Brand", brandSchema);

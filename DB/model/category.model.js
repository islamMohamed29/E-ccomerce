import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category name required"],
      trim: true,
      unique: [true, "category name unique"],
      minlength: [2, "too short category name"],
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

categorySchema.post("init", async function (doc) {
  doc.image = process.env.HOSTNAME + process.env.BASEURL + "/" + doc.image;
});

export const categoryModel = model("Category", categorySchema);

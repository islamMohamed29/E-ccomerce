import { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"],
      trim: true,
      unique: [true, "Product name unique"],
      minlength: [2, "too short Product name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description required"],
      trim: true,
      minlength: [10, "too short Product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity required"],
      default: 0,
    },
    colors: [String],
    price: {
      type: Number,
      required: [true, "Product price required"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "Product price after discount required"],
    },
    sold: {
      type: Number,
      required: [true, "Product sold required"],
      default: 0,
    },
    imageCover: String,
    images: [String],
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "Product Category required"],
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Product sub-category required"],
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
      required: [true, "Product brand required"],
    },
    averageRating: {
      type: Number,
      min: [1, "ratingAverage must be grater than 1"],
      max: [5, "ratingAverage must be less than 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  // justOne:true
});
productSchema.pre("findOne", function () {
  this.populate([
    {
      path: "reviews",
      select: "name",
      options: { limit: 20 }, // limit reviews -- top reviews
    },
  ]);
});

productSchema.post("init", async function (doc) {
  if (doc.imageCover && doc.images) {
    doc.imageCover =
      process.env.HOSTNAME + process.env.BASEURL + "/" + doc.imageCover;
    // this.image = process.env.HOSTNAME + process.env.BASEURL + "/" + this.image;
    let imgs = [];
    for (const file of doc.images) {
      imgs.push(process.env.HOSTNAME + process.env.BASEURL + "/" + file);
    }
    doc.images = imgs;
  }
});
export const productModel = model("Product", productSchema);

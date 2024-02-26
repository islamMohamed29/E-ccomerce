import { Schema, model, Types } from "mongoose";
const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "review name required"],
      trim: true,
      minlength: [1, "too short review name"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
    ratingAverage: {
      type: Number,
      min: [1, "ratingAverage must be grater than 1"],
      max: [5, "ratingAverage must be less than 5"],
    },
  },
  {
    timestamps: true,
  }
);
// /^find/ becuse run in find all and find one  get any startWith find

reviewSchema.pre(/^find/, function () {
  this.populate("user", "name");
});
export const reviewModel = model("Review", reviewSchema);

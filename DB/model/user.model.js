import { Schema, Types, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
      trim: true,
      minlength: [2, "too short user name"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      trim: true,
      unique: [true, "email name must be unique"],
    },
    phone: {
      type: String,
      unique: [true, "phone must be unique"],
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "password min-length must be 6 characters"],
    },
    passwordChangedAt: {
      type: Date,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    wishlist: [{ type: Types.ObjectId, ref: "Product" }],
    addresses: [
      {
        name: String,
        street: String,
        city: String,
        phone: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALTROUND)
  );
});
userSchema.pre("findOneAndUpdate", async function () {
  if (!this._update.password) return;
  this._update.password = await bcrypt.hash(
    this._update.password,
    Number(process.env.SALTROUND)
  );
});
export const userModel = model("User", userSchema);

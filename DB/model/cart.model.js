import { Schema, model, Types } from "mongoose";
const cartSchema = new Schema(
  {
    cartItems: [
      {
        product: {
          type: Types.ObjectId,
          ref: "Product",
        }, // ابقي اعمل دي عن طريق الـ aggregate
        // عشان هي كدة انها يتحط السعر تحت كدة دة غلط .. عشان اللي هيغير سعرالمنتج ممكن السعر بتاعه جوا الكارت يكون لسة زي ما هو قديم ف الحسبة الصح للسعر المفروض تكون من المنتج نفسه او افكر فيها ممكن تكون الاجريجيت مش انسب حل
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
  },
  {
    timestamps: true,
  }
);
export const cartModel = model("Cart", cartSchema);

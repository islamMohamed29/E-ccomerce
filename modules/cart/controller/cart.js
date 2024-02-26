import asyncWrapper from "../../../middleware/asyncWrapper.js";
import { cartModel } from "../../../DB/model/cart.model.js";
import { couponModel } from "../../../DB/model/coupon.model.js";
import { productModel } from "../../../DB/model/product.model.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";
import appError from "../../../utils/appError.js";

function calcTotalCartPrice(cart) {
  let total = 0;
  cart.cartItems.forEach((ele) => {
    total += ele.price * ele.quantity;
  });
  cart.totalPrice = total;
  if (cart.totalPriceAfterDiscount) {
    cart.totalPriceAfterDiscount = (
      cart.totalPrice -
      (cart.totalPrice * cart.discount) / 100
    ).toFixed(2);
  } else {
    cart.discount = 0;
  }
}
export const addToCart = asyncWrapper(async (req, res, next) => {
  let { price } = await productModel.findById(req.body.product).select("price"); // handle destruct here
  req.body.price = price;
  let cart = await cartModel.findOne({ user: req.currentUser._id });
  // we should be calc price from products price n.t from products in cart because price product updated >> update in cart too
  if (!cart) {
    let newCart = new cartModel({
      cartItems: [req.body],
      user: req.currentUser._id,
    });
    calcTotalCartPrice(newCart);
    await newCart.save();
    res.status(200).json({ status: httpStatusText.SUCCSES, cart: newCart });
  } else {
    let findProduct = cart.cartItems.find(
      (ele) => ele.product == req.body.product
    );
    if (findProduct) {
      findProduct.quantity += 1;
    } else {
      cart.cartItems.push(req.body);
    }
    calcTotalCartPrice(cart);
    await cart.save();
    res.status(200).json({ status: httpStatusText.SUCCSES, cart });
  }
});
export const removeFromCart = asyncWrapper(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate(
    {
      user: req.currentUser._id,
    },
    {
      $pull: { cartItems: { _id: req.body.itemId } },
    },
    { new: true }
  );
  calcTotalCartPrice(cart);
  await cart.save();
  if (!cart || cart.length == 0)
    return next(appError.create("item not found", 400, httpStatusText.FAIL));
  cart && res.status(200).json({ status: httpStatusText.SUCCESS, cart });
});

export const updateQuantity = asyncWrapper(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.currentUser._id });
  let findProduct = cart.cartItems.find(
    (ele) => ele.product == req.body.product
  );
  if (!findProduct)
    return next(appError.create("product not found", 404, httpStatusText.FAIL));
  findProduct.quantity = req.body.quantity;
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).json({ status: httpStatusText.SUCCSES, cart });
});

export const applyCoupon = asyncWrapper(async (req, res, next) => {
  let myCoupon = await couponModel.findOne({
    code: req.body.code,
    expires: { $gt: Date.now() },
  });
  if (!myCoupon) return next(appError.create("coupon not found or expired"));
  // let { code, discount } = myCoupon;
  let cart = await cartModel.findOne({ user: req.currentUser._id });
  cart.totalPriceAfterDiscount = (
    cart.totalPrice -
    (cart.totalPrice * myCoupon.discount) / 100
  ).toFixed(2);
  cart.discount = myCoupon.discount;
  await cart.save();
  res.status(200).json({ status: httpStatusText.SUCCESS, cart });
});

export const getUserCart = asyncWrapper(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.currentUser._id });

  if (!cart)
    return next(appError.create("cannot found cart", 400, httpStatusText.FAIL));
  cart &&
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      length: cart.cartItems.length,
      cart,
    });
});

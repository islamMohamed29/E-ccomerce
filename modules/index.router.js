import categoryRouter from "./category/category.router.js";
import subCategoryRouter from "./subcategory/subcategory.router.js";
import brandRouter from "./brand/brand.router.js";
import productRouter from "./product/product.router.js";
import userRouter from "./user/user.router.js";
import reviewRouter from "./review/review.router.js";
import wishlistRouter from "./wishlist/wishlist.router.js";
import addressRouter from "./address/address.router.js";
import couponRouter from "./coupon/coupon.router.js";
import cartRouter from "./cart/cart.router.js";
import connectDB from "../DB/connection.js";
import * as httpStatusText from "../utils/httpStatusText.js";
import express from "express";

export const appRouter = (app) => {
  app.use(express.json());
  // Base URL
  const baseUrl = process.env.BASEURL;
  // Setup API Routing
  app.use(`${baseUrl}/categories`, categoryRouter);
  app.use(`${baseUrl}/subcategories`, subCategoryRouter);
  app.use(`${baseUrl}/brands`, brandRouter);
  app.use(`${baseUrl}/products`, productRouter);
  app.use(`${baseUrl}/auth`, userRouter);
  app.use(`${baseUrl}/reviews`, reviewRouter);
  app.use(`${baseUrl}/wishlists`, wishlistRouter);
  app.use(`${baseUrl}/addresses`, addressRouter);
  app.use(`${baseUrl}/coupons`, couponRouter);
  app.use(`${baseUrl}/carts`, cartRouter);
  app.all("*", (req, res) => {
    res
      .status(404)
      .json({ message: `can't find this route: ${req.originalUrl} on server` });
  });
  // global error handling middleware

  app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
      status: error.statusText || httpStatusText.ERROR,
      message: error.message,
      code: error.statusCode || 500,
      data: null,
    });
  });
  // Connection DB
  connectDB();
};

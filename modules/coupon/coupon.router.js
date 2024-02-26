import { Router } from "express";
import * as userRoles from "../../utils/userRoles.js";
import * as couponController from "./controller/coupon.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
const router = Router();

router
  .route("/")
  .post(verifyToken, allowedTo(userRoles.ADMIN), couponController.addCoupon)
  .get(
    verifyToken,
    allowedTo(userRoles.USER, userRoles.ADMIN),
    couponController.getCoupons
  );

router
  .route("/:id")
  .get(
    verifyToken,
    allowedTo(userRoles.USER, userRoles.ADMIN),
    couponController.getCoupon
  )
  .put(verifyToken, allowedTo(userRoles.ADMIN), couponController.updateCoupon)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    couponController.deleteCoupon
  );

export default router;

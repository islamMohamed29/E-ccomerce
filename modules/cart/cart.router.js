import { Router } from "express";
import * as cartController from "./controller/cart.js";
import * as userRoles from "../../utils/userRoles.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";

const router = Router();
router.use(verifyToken, allowedTo(userRoles.USER));
router
  .route("/")
  .post(cartController.addToCart)
  .delete(cartController.removeFromCart)
  .put(cartController.updateQuantity)
  .get(cartController.getUserCart);
router.post("/applyCoupon", cartController.applyCoupon);
export default router;

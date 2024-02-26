import { Router } from "express";
import * as wishlistController from "./controller/wishlist.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
import * as userRoles from "../../utils/userRoles.js";

const router = Router();
router.use(verifyToken, allowedTo(userRoles.USER));
router
  .route("/")
  .patch(wishlistController.updateWishlist) // patch because we are update one field
  .delete(wishlistController.removeWishlist)
  .get(wishlistController.getUserWishLists);

export default router;

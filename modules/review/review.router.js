import { Router } from "express";
const router = Router();
import * as reviewController from "./controller/review.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
import * as userRoles from "../../utils/userRoles.js";
router
  .route("/")
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    reviewController.addReview
  )
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    reviewController.getReviews
  );

router
  .route("/:id")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    reviewController.getReview
  )
  .put(verifyToken, allowedTo(userRoles.USER), reviewController.updateReview)
  .delete(
    verifyToken,
    allowedTo(userRoles.USER, userRoles.ADMIN),
    reviewController.deleteReview
  );

export default router;

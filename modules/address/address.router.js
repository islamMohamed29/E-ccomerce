import { Router } from "express";
import * as addressController from "./controller/address.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
import * as userRoles from "../../utils/userRoles.js";

const router = Router();
router.use(verifyToken, allowedTo(userRoles.USER));
router
  .route("/")
  .patch(addressController.addToAddress)
  .delete(addressController.removeFromAddress)
  .get(addressController.getUserAddresses);

export default router;

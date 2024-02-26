import { Router } from "express";
const router = Router();
import * as brandController from "./controller/brand.js";
import * as userRoles from "../../utils/userRoles.js";

import {
  HME,
  multerValidation,
  myMulterSingle,
} from "../../services/multer.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";

router
  .route("/")
  .post(
    myMulterSingle("brand", multerValidation.image, "image"),
    HME,
    verifyToken,
    allowedTo(userRoles.ADMIN),
    brandController.addBrand
  )
  .get(brandController.getBrands);

router
  .route("/:id")
  .get(brandController.getBrand)
  .put(
    myMulterSingle("brand", multerValidation.image, "image"),
    HME,
    verifyToken,
    allowedTo(userRoles.ADMIN),
    brandController.updateBrand
  )
  .delete(verifyToken, allowedTo(userRoles.ADMIN), brandController.deleteBrand);

export default router;

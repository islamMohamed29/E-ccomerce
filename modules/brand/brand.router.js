import { Router } from "express";
const router = Router();
import * as brandController from "./controller/brand.js";
import * as userRoles from "../../utils/userRoles.js";

import {
  HME,
  multerValidation,
  myMulterSingle,
} from "../../services/multerCloud.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";

router
  .route("/")
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    HME,
    myMulterSingle(multerValidation.image, "image"),
    brandController.addBrand
  )

  .get(brandController.getBrands);

router
  .route("/:id")
  .get(brandController.getBrand)
  .put(
    HME,
    myMulterSingle(multerValidation.image, "image"),

    verifyToken,
    allowedTo(userRoles.ADMIN),
    brandController.updateBrand
  )
  .delete(verifyToken, allowedTo(userRoles.ADMIN), brandController.deleteBrand);

export default router;

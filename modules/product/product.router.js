import { Router } from "express";
const router = Router();
import * as productController from "./controller/product.js";
import {
  myMulterMany,
  multerValidation,
  HME,
} from "../../services/multerCloud.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
import * as userRoles from "../../utils/userRoles.js";
let fields = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 8 },
];
router
  .route("/")
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    myMulterMany(multerValidation.image, fields),
    HME,
    productController.addProduct
  )
  .get(productController.getProducts);

router
  .route("/:id")
  .get(productController.getProduct)
  .put(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    productController.updateProduct
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    productController.deleteProduct
  );

export default router;

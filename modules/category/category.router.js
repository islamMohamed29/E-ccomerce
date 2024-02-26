import { Router } from "express";
const router = Router();
import * as categoryController from "./controller/category.js";
import * as subCategoryController from "../subcategory/controller/subcategory.js";
import * as userRoles from "../../utils/userRoles.js";
import {
  myMulterSingle,
  HME,
  multerValidation,
} from "../../services/multerCloud.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";

router
  .route("/:categoryId/subcategories")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    subCategoryController.getSubCategories
  );

router
  .route("/")
  .post(
    myMulterSingle(multerValidation.image, "image"),
    HME,
    verifyToken,
    allowedTo(userRoles.ADMIN),
    categoryController.addCategory
  )
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    categoryController.getCategories
  );

router
  .route("/:id")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    categoryController.getCategory
  )
  .put(
    myMulterSingle(multerValidation.image, "image"),
    HME,
    verifyToken,
    allowedTo(userRoles.ADMIN),
    categoryController.updateCategory
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    categoryController.deleteCategory
  );

export default router;

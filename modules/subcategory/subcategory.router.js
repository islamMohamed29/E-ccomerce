import { Router } from "express";
const router = Router({ mergeParams: true });
import * as subCategoryController from "./controller/subcategory.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
import * as userRoles from "../../utils/userRoles.js";
router
  .route("/")
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    subCategoryController.addSubCategory
  )
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    subCategoryController.getSubCategories
  );

router
  .route("/:id")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    subCategoryController.getSubCategory
  )
  .put(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    subCategoryController.updateSubCategory
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    subCategoryController.deleteSubCategory
  );

export default router;

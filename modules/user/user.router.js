import { Router } from "express";
import * as userController from "./controller/user.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./user.validation.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
import * as userRoles from "../../utils/userRoles.js";
import { auth } from "../../middleware/auth.js";

const router = Router();
router
  .route("/:id")
  .put(
    verifyToken,
    auth,
    allowedTo(userRoles.USER, userRoles.ADMIN),
    validation(validators.checkToken, validators.updateUser),
    userController.updateUser
  )
  .delete(verifyToken, allowedTo(userRoles.ADMIN), userController.deleteUser);
router
  .route("/")
  .get(verifyToken, allowedTo(userRoles.ADMIN), userController.getAllUsers);
router.post("/signup", validation(validators.signup), userController.signup);
router.post("/signin", validation(validators.signin), userController.signin);
router.patch(
  "/changePassword/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  validation(validators.changePassword),
  userController.changePassword
);
export default router;

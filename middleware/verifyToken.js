import jwt from "jsonwebtoken";
import { userModel } from "../DB/model/user.model.js";
import * as httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
import asyncWrapper from "./asyncWrapper.js";
export default asyncWrapper(async function verifyToken(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    const error = appError.create(
      "token is required",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }
  const token = authHeader.split(" ")[1];

  const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  let user = await userModel.findById(currentUser._id);
  if (!user)
    return next(appError.create("user not found", 401, httpStatusText.ERROR));
  let changedPassword = parseInt(user.passwordChangedAt?.getTime() / 1000);

  if (changedPassword > currentUser.iat)
    return next(appError.create("password has been changed", 401));
  req.currentUser = currentUser;
  next();
});

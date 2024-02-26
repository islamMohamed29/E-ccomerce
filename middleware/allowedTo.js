import appError from "../utils/appError.js";
import asyncWrapper from "./asyncWrapper.js";
import * as httpStatusText from "../utils/httpStatusText.js";
export default (...roles) => {
  return asyncWrapper(async (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        appError.create("this role is n.t authorized", 401, httpStatusText.FAIL)
      );
    }
    next();
  });
};

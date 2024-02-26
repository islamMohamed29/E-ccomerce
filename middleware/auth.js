import { userModel } from "../DB/model/user.model.js";
import appError from "../utils/appError.js";

export const auth = async (req, res, next) => {
  let { id } = req.params;
  let thisIsUser = await userModel.findById(id);
  if (thisIsUser._id.toString() !== req.currentUser._id.toString())
    return next(appError.create("can.t update this user"));
};

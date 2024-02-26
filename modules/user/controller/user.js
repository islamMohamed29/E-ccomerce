import asyncWrapper from "../../../middleware/asyncWrapper.js";
import { userModel } from "../../../DB/model/user.model.js";
import appError from "../../../utils/appError.js";
import bcrypt from "bcrypt";
import generateToken from "../../../utils/generateJWT.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";

export const signup = asyncWrapper(async (req, res, next) => {
  const isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) {
    const error = appError.create(
      "email already exists",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  let newUser = new userModel(req.body);
  await newUser.save();
  res.status(200).json(newUser);
});

export const updateUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  let user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  if (!user)
    return next(appError.create("user not found", 400, httpStatusText.FAIL));
  user && res.status(200).json(user);
});

export const changePassword = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordChangedAt = Date.now();
  let user = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !user && next(appError.create("user not found", 400, httpStatusText.FAIL));
  user && res.status(200).json(user);
});

export const getAllUsers = async (req, res) => {
  const all_users = await userModel.find({});
  !all_users &&
    next(new appError.create("users not found", 404, httpStatusText.ERROR));
  all_users && res.status(200).json(all_users);
};

export const signin = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(
      appError.create("in-valid email or password", 400, httpStatusText.FAIL)
    );
  const token = await generateToken({
    name: user.name,
    email: user.email,
    _id: user._id,
    role: user.role,
    phone: user.phone,
    profileImage: user.profileImage,
    isActive: user.isActive,
  });

  res.json({ status: httpStatusText.SUCCESS, token });
});

export const deleteUser = asyncWrapper(async (req, res) => {
  let { id } = req.params;
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(user);
});

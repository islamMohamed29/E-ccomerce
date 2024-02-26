import asyncWrapper from "../../../middleware/asyncWrapper.js";
import appError from "../../../utils/appError.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";

import { userModel } from "../../../DB/model/user.model.js";

export const addToAddress = asyncWrapper(async (req, res, next) => {
  const { addresses } = await userModel.findByIdAndUpdate(
    req.currentUser._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  if (!addresses)
    return next(
      appError.create("can't add this address", 400, httpStatusText.FAIL)
    );
  addresses &&
    res.status(200).json({ status: httpStatusText.SUCCESS, addresses });
});

export const removeFromAddress = asyncWrapper(async (req, res, next) => {
  const { addresses } = await userModel.findByIdAndUpdate(
    req.currentUser._id,
    {
      $pull: {
        addresses: { _id: req.body.address },
      },
    },
    { new: true }
  );
  if (!addresses)
    return next(
      appError.create("can't add this address", 400, httpStatusText.FAIL)
    );
  addresses &&
    res.status(200).json({ status: httpStatusText.SUCCESS, addresses });
});

export const getUserAddresses = asyncWrapper(async (req, res, next) => {
  let { _id } = req.currentUser;
  let { addresses } = await userModel.findById(_id);
  if (!addresses)
    return next(
      appError.create("cannot found any address", 400, httpStatusText.FAIL)
    );
  addresses &&
    res.status(200).json({ status: httpStatusText.SUCCESS, addresses });
});

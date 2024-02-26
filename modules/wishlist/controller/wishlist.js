import asyncWrapper from "../../../middleware/asyncWrapper.js";
import appError from "../../../utils/appError.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";
import { userModel } from "../../../DB/model/user.model.js";

export const updateWishlist = asyncWrapper(async (req, res, next) => {
  let { _id } = req.currentUser;
  const { wishlist } = await userModel.findByIdAndUpdate(
    _id,
    {
      $addToSet: {
        wishlist: req.body.product, // product comming in body
      },
    },
    { new: true }
  );
  if (!wishlist)
    return next(
      appError.create("wishlist not found", 404, httpStatusText.FAIL)
    );
  wishlist &&
    res.status(200).json({ status: httpStatusText.SUCCESS, wishlist });
});

export const removeWishlist = asyncWrapper(async (req, res, next) => {
  let { _id } = req.currentUser;
  const { wishlist } = await userModel.findByIdAndUpdate(
    _id,
    {
      $pull: {
        wishlist: req.body.product, // product comming in body
      },
    },
    { new: true }
  );
  if (!wishlist)
    return next(
      appError.create("wishlist not found", 404, httpStatusText.FAIL)
    );
  wishlist &&
    res.status(200).json({ status: httpStatusText.SUCCESS, wishlist });
});

export const getUserWishLists = asyncWrapper(async (req, res, next) => {
  let { _id } = req.currentUser;

  let { wishlist } = await userModel.findById(_id);

  if (!wishlist)
    return next(
      appError.create("cannot found wishlists", 400, httpStatusText.FAIL)
    );
  wishlist &&
    res.status(200).json({ status: httpStatusText.SUCCESS, wishlist });
});

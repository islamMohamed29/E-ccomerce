import {
  deleteOne,
  getAll,
  getOne,
} from "../../../handlers/handler.factory.js";
import { couponModel } from "../../../DB/model/coupon.model.js";
import asyncWrapper from "../../../middleware/asyncWrapper.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";
export const addCoupon = asyncWrapper(async (req, res, next) => {
  let coupon = new couponModel(req.body);
  await coupon.save();
  res.status(200).json({ status: httpStatusText.SUCCESS, coupon });
});

export const getCoupon = getOne(couponModel);
export const getCoupons = getAll(couponModel);

export const updateCoupon = asyncWrapper(async (req, res, next) => {
  let { id } = req.params;
  const document = await couponModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!document)
    return next(
      appError.create("document not found", 404, httpStatusText.FAIL)
    );
  document &&
    res.status(200).json({ status: httpStatusText.SUCCESS, document });
});

export const deleteCoupon = deleteOne(couponModel);

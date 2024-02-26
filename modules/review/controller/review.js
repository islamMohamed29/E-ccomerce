import asyncWrapper from "../../../middleware/asyncWrapper.js";
import { getAll, getOne } from "../../../handlers/handler.factory.js";
import { reviewModel } from "../../../DB/model/review.model.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";
import appError from "../../../utils/appError.js";
export const addReview = asyncWrapper(async (req, res, next) => {
  const isReviwed = await reviewModel.findOne({
    user: req.currentUser._id,
    product: req.body.product,
  });
  if (isReviwed)
    return next(
      appError.create(
        "you are created a review before",
        400,
        httpStatusText.FAIL
      )
    );
  let document = new reviewModel(req.body);
  await document.save();
  res.status(200).json({ status: httpStatusText.SUCCESS, document });
});

export const getReviews = getAll(reviewModel);
export const getReview = getOne(reviewModel);

export const updateReview = asyncWrapper(async (req, res, next) => {
  let { id } = req.params;
  let isReview = await reviewModel.findById(id);
  if (isReview.user._id.toString() !== req.currentUser._id.toString())
    return next(
      appError.create(
        "you can't reviewd in this review because you are n.t created it"
      )
    );
  const document = await reviewModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!document)
    return next(
      appError.create("document not found", 404, httpStatusText.FAIL)
    );
  document &&
    res.status(200).json({ status: httpStatusText.SUCCESS, document });
});

export const deleteReview = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  let isReview = await reviewModel.findById(id);

  if (req.currentUser.role == "admin") {
    const document = await reviewModel.findByIdAndDelete(id);
    if (!document)
      return next(
        appError.create("document not found", 404, httpStatusText.FAIL)
      );
    res.status(200).json({ status: httpStatusText.SUCCESS, document });
  } else {
    if (!isReview)
      return next(
        appError.create("document not found", 404, httpStatusText.FAIL)
      );
    if (isReview.user._id.toString() !== req.currentUser._id.toString())
      return next(
        appError.create(
          "you can't deleted this review because you are n.t created it"
        )
      );
    const document = await reviewModel.findByIdAndDelete(id);
    if (!document)
      return next(
        appError.create("document not found", 404, httpStatusText.FAIL)
      );
    res.status(200).json({ status: httpStatusText.SUCCESS, document });
  }
});

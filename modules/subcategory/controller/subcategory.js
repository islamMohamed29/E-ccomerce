import asyncWrapper from "../../../middleware/asyncWrapper.js";
import { subCategoryModel } from "../../../DB/model/subcategory.model.js";
import { categoryModel } from "../../../DB/model/category.model.js";
import * as httpStatusText from "../../../utils/httpStatusText.js";
import appError from "../../../utils/appError.js";
import slugify from "slugify";
import {
  deleteOne,
  getOne,
  updateOne,
} from "../../../handlers/handler.factory.js";
export const addSubCategory = asyncWrapper(async (req, res, next) => {
  const { category } = req.body;
  req.body.slug = slugify(req.body.name);
  const isCategory = await categoryModel.findById(category);
  if (!isCategory)
    return next(
      appError.create("category not found", 404, httpStatusText.FAIL)
    );
  const document = new subCategoryModel(req.body);
  await document.save();
  res.status(200).json({ status: httpStatusText.SUCCESS, document });
});

export const getSubCategories = asyncWrapper(async (req, res) => {
  let filter = {};
  // let categoryId = req.originalUrl.split("/")[4]; //before merga params parent & chiled
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }
  const documents = await subCategoryModel
    .find(filter)
    .populate("category", "name -_id");
  if (!documents)
    return next(
      appError.create("documents not found", 404, httpStatusText.FAIL)
    );

  res.status(200).json({ status: httpStatusText.SUCCESS, documents });
});

export const updateSubCategory = updateOne(subCategoryModel);
export const getSubCategory = getOne(subCategoryModel);
export const deleteSubCategory = deleteOne(subCategoryModel);

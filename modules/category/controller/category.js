import { categoryModel } from "../../../DB/model/category.model.js";
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../../../handlers/handler.factory.js";
export const addCategory = addOne(categoryModel);
export const updateCategory = updateOne(categoryModel);
export const deleteCategory = deleteOne(categoryModel);
export const getCategory = getOne(categoryModel);
export const getCategories = getAll(categoryModel);

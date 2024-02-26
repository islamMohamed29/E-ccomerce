import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  addOne,
} from "../../../handlers/handler.factory.js";

import { brandModel } from "../../../DB/model/brand.model.js";

export const addBrand = addOne(brandModel);
export const updateBrand = updateOne(brandModel);
export const deleteBrand = deleteOne(brandModel);
export const getBrand = getOne(brandModel);
export const getBrands = getAll(brandModel);

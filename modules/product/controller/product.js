// import slugify from 'slugify'
import asyncWrapper from "../../../middleware/asyncWrapper.js";
import { productModel } from "../../../DB/model/product.model.js";
import ApiFeatures from "../../../utils/apiFeatures.js";
import slugify from "slugify";

export const addProduct = asyncWrapper(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  if (req.files?.imageCover) {
    req.body.imageCover =
      req.files.imageCover[0].destination +
      "/" +
      req.files.imageCover[0].filename;
  }
  let imgs = [];
  if (req.files?.images) {
    for (const file of req.files.images) {
      imgs.push(file.destination + "/" + file.filename);
    }
    req.body.images = imgs;
  }
  const product = new productModel(req.body);
  await product.save();
  res.status(200).json(product);
});

export const getProducts = asyncWrapper(async (req, res) => {
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .filter()
    .sort()
    .search()
    .fields();
  const products = await apiFeatures.mongooseQuery;
  !products && res.status(404).json({ message: "products not found" });
  products && res.status(200).json(products);
});

export const getProduct = asyncWrapper(async (req, res) => {
  let { id } = req.params;
  const product = await productModel.findById(id);
  !product && res.status(404).json({ message: "product not found" });
  product && res.status(200).json(product);
});

export const updateProduct = asyncWrapper(async (req, res) => {
  let { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  const product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !product && res.status(404).json({ message: "product not found" });
  product && res.status(200).json(product);
});

export const deleteProduct = asyncWrapper(async (req, res) => {
  let { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  !product && res.status(404).json({ message: "product not found" });
  product && res.status(200).json(product);
});

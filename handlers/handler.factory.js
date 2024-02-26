import asyncWrapper from "../middleware/asyncWrapper.js";
import * as httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
import slugify from "slugify";
export function addOne(Model) {
  return asyncWrapper(async (req, res) => {
    req.body.slug = slugify(req.body.name);
    req.body.image = req.file?.destination + "/" + req.file.filename;
    const document = new Model(req.body);
    await document.save();
    res.status(200).json({ status: httpStatusText.SUCCESS, document });
  });
}

export function getAll(Model) {
  return asyncWrapper(async (req, res) => {
    const documents = await Model.find();
    if (!documents)
      return next(
        appError.create("documents not found", 404, httpStatusText.FAIL)
      );
    documents &&
      res.status(200).json({ status: httpStatusText.SUCCESS, documents });
  });
}
export function getOne(Model) {
  return asyncWrapper(async (req, res, next) => {
    let { id } = req.params;
    const document = await Model.findById(id);

    if (!document)
      return next(
        appError.create("document not found", 400, httpStatusText.FAIL)
      );
    res.status(200).json({ status: httpStatusText.SUCCESS, document });
  });
}
export function deleteOne(Model) {
  return asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document)
      return next(
        appError.create("document not found", 404, httpStatusText.FAIL)
      );
    res.status(200).json({ status: httpStatusText.SUCCESS, document });
  });
}
export function updateOne(Model) {
  return asyncWrapper(async (req, res, next) => {
    let { id } = req.params;
    req.body.name ? (req.body.slug = slugify(req.body.name)) : "";
    req.body.image = req.file?.destination + "/" + req.file.filename;
    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!document)
      return next(
        appError.create("document not found", 404, httpStatusText.FAIL)
      );
    document &&
      res.status(200).json({ status: httpStatusText.SUCCESS, document });
  });
}

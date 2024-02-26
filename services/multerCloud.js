import multer from "multer";

export const multerValidation = {
  image: ["image/png", "image/jpeg"],
  pdf: ["application/pdf"],
};

export const HME = (error, req, res, next) => {
  if (error) {
    res.status(400).json({ message: "Multer Error", error });
  } else {
    next();
  }
};

let options = (customValidation) => {
  if (!customValidation) {
    customValidation = multerValidation.image;
  }
  const storage = multer.diskStorage({});

  const fileFilter = function (req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(AppError.create("In-valid Format", 400), false);
    }
  };
  const upload = multer({ dest: "upload", fileFilter, storage });
  return upload;
};

export function myMulterSingle(customValidation, fieldName) {
  return options(customValidation).single(fieldName);
}

export function myMulterMany(customValidation, arrayFields) {
  return options(customValidation).fields(arrayFields);
}

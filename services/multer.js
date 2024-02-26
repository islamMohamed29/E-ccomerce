import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
let options = (customPath, customValidation) => {
  if (!customPath) {
    customPath = "global";
  }
  if (!customValidation) {
    customValidation = multerValidation.image;
  }
  const fullPath = path.join(__dirname, `../upload/${customPath}`);
  if (!fs.existsSync(fullPath)) {
    fs.mkdir(fullPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `upload/${customPath}`);
    },
    filename: function (req, file, cb) {
      cb(null, nanoid() + "_" + file.originalname);
    },
  });

  const fileFilter = function (req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(AppError.create("file must be an image", 400), false);
    }
  };
  const upload = multer({ dest: "upload", fileFilter, storage });
  return upload;
};

export function myMulterSingle(customPath, customValidation, fieldName) {
  return options(customPath, customValidation).single(fieldName);
}

export function myMulterMany(customPath, customValidation, arrayFields) {
  return options(customPath, customValidation).fields(arrayFields);
}

import joi from "joi";
export const checkToken = {
  headers: joi
    .object()
    .required()
    .keys({
      authorization: joi.string().required(),
    })
    .options({ allowUnknown: true }),
};

export const signup = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-z]).{8,}$/)
        )
        .required(),
      cPassword: joi.string().valid(joi.ref("password")).required(),
      phone: joi.string().min(10).max(30).required(),
    }),
};

export const signin = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-z]).{8,}$/)
        )
        .required(),
    }),
};

export const changePassword = {
  params: joi
    .object()
    .required()
    .keys({
      id: joi.string().min(24).max(24).required(),
    }),
  body: joi
    .object()
    .required()
    .keys({
      password: joi
        .string()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-z]).{8,}$/)
        )
        .required(),
    }),
};

export const updateUser = {
  params: joi
    .object()
    .required()
    .keys({
      id: joi.string().min(24).max(24).required(),
    }),
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-z]).{8,}$/)
        )
        .required(),
      phone: joi.string().min(10).max(30).required(),
    }),
};

const methods = ["body", "params", "query", "headers"];
export const validation = (schema) => {
  return (req, res, next) => {
    const validationArr = [];
    for (const key of methods) {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });

        if (validationResult?.error) {
          validationArr.push(validationResult?.error.details);
        }
      }
    }
    if (validationArr.length) {
      res.status(400).json({ message: "validation error", validationArr });
    } else {
      next();
    }
  };
};

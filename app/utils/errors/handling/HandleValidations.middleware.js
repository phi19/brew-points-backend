const { validationResult } = require("express-validator");
const { HTTP422Error } = require("../custom");

module.exports =
  (customMessage = "You sent invalid attributes") =>
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw new HTTP422Error(customMessage, errors.array());

    next();
  };

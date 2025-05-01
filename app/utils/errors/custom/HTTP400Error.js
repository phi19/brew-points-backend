const BaseError = require("../BaseError");
const HTTPStatusCodes = require("../../HTTPStatusCodes");

class HTTP400Error extends BaseError {
  constructor(message = "bad request", details, stack) {
    super(
      "BAD REQUEST",
      HTTPStatusCodes.BAD_REQUEST,
      true,
      message,
      details,
      stack
    );
  }
}

module.exports = HTTP400Error;

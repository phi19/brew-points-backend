const BaseError = require("../BaseError");
const HTTPStatusCodes = require("../../HTTPStatusCodes");

class HTTP422Error extends BaseError {
  constructor(message = "you sent an invalid entity", details) {
    super(
      "UNPROCESSABLE ENTITY",
      HTTPStatusCodes.UNPROCESSABLE_ENTITY,
      true,
      message,
      details
    );
  }
}

module.exports = HTTP422Error;

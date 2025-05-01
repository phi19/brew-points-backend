const BaseError = require("../BaseError");
const HTTPStatusCodes = require("../../HTTPStatusCodes");

class HTTP403Error extends BaseError {
  constructor(message = "forbidden", details) {
    super("FORBIDDEN", HTTPStatusCodes.FORBIDDEN, true, message, details);
  }
}

module.exports = HTTP403Error;

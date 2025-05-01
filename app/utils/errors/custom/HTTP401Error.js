const BaseError = require("../BaseError");
const HTTPStatusCodes = require("../../HTTPStatusCodes");

class HTTP401Error extends BaseError {
  constructor(message = "unauthorized") {
    super("UNAUTHORIZED", HTTPStatusCodes.UNAUTHORIZED, true, message);
  }
}

module.exports = HTTP401Error;

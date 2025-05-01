const BaseError = require("../BaseError");
const HTTPStatusCodes = require("../../HTTPStatusCodes");

class HTTP404Error extends BaseError {
  constructor(message = "record not found", details) {
    super("NOT FOUND", HTTPStatusCodes.NOT_FOUND, true, message, details);
  }
}

module.exports = HTTP404Error;

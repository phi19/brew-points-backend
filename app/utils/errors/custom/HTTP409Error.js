const BaseError = require("../BaseError");
const HTTPStatusCodes = require("../../HTTPStatusCodes");

class HTTP409Error extends BaseError {
  constructor(
    message = "it is creating a conflict with a record that already exists",
    details
  ) {
    super("CONFLICT", HTTPStatusCodes.CONFLICT, true, message, details);
  }
}

module.exports = HTTP409Error;

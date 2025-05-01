const BaseError = require("../BaseError");
const HTTPStatusCodes = require("../../HTTPStatusCodes");

class ProgrammerError extends BaseError {
  constructor(
    message = "There was an internal error. Try again later!",
    stack
  ) {
    super(
      "PROGRAMMER",
      HTTPStatusCodes.INTERNAL_SERVER,
      false,
      message,
      undefined,
      stack
    );
  }
}

module.exports = ProgrammerError;

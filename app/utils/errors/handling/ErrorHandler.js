const BaseError = require("../BaseError");

class ErrorHandler {
  async handleError(err, res) {
    res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      details: err.details,
      stack: err.stackTrace,
    });
  }

  isTrustedError(error) {
    return error instanceof BaseError && error.isOperational;
  }
}
module.exports = new ErrorHandler();

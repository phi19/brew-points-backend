class BaseError extends Error {
  constructor(name, statusCode, isOperational, message, details) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;

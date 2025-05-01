const { ProgrammerError, HTTP400Error } = require("../app/utils/errors/custom");
const errorHandler = require("../app/utils/errors/handling/ErrorHandler");
const stackTraceParser = require("stacktrace-parser");

module.exports = (env) => async (err, req, res, next) => {
  err = getError(env, err);
  await errorHandler.handleError(err, res);
};

const getError = (env, err) => {
  if (env === "production") {
    return new ProgrammerError();
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return new HTTP400Error("Body malformed", null, err.stack.split("\n"));
  }

  if (!errorHandler.isTrustedError(err)) {
    const errorStack = formatErrorStack(err.stack);
    return new ProgrammerError(err.message, errorStack);
  }

  return err;
};

const formatErrorStack = (stack) => {
  const errorStack = stackTraceParser.parse(stack);
  return errorStack
    .filter((method) => !method.file.includes("node_modules"))
    .map(({ file, ...rest }) => ({
      ...rest,
      file: "app\\" + file.split("\\app\\")[1],
    }));
};

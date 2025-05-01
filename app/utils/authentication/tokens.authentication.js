// const CSRFTokenService = require("../../modules/csrfToken/csrfToken.service");
const HTTPStatusCodes = require("../HTTPStatusCodes");
const { analyticsTypes } = require("../analytics/analyticsTypes");

const IRRELEVANT_EXPIRES = [1, 0, 0];
// expires: [days, hours, minutes]
const CSRF_TOKEN_TYPES = {
  REGISTER: {
    value: "register",
    expires: IRRELEVANT_EXPIRES,
  },
  SET_PASSWORD: {
    value: "set_password",
    expires: [0, 0, 10],
  },
  VERIFY_CODE: {
    value: "verify_code",
    expires: [0, 0, 10],
  },
  EMAIL_FORGOT_PASSWORD: {
    value: "email_forgot_password",
    expires: IRRELEVANT_EXPIRES,
  },
  FORGOT_PASSWORD_RESET: {
    value: "forgot_password_reset",
    expires: [0, 0, 10],
  },
  LOGIN: {
    value: "login",
    expires: IRRELEVANT_EXPIRES,
  },
  EMAIL_PASSWORD_RESET: {
    value: "email_password_reset",
    expires: IRRELEVANT_EXPIRES,
  },
  PASSWORD_RESET: {
    value: "password_reset",
    expires: [0, 0, 10],
  },
};

// expires: [days, hours, minutes]
const ONE_TIME_TOKEN_TYPES = {
  VERIFICATION: {
    value: "verification",
    expires: [3, 0, 0],
    event: analyticsTypes.REGISTER,
  },
  RESET_PASSWORD: {
    expires: [0, 0, 30],
  },
  FORGOT_PASSWORD: {
    value: "forgot_password",
    expires: [0, 0, 30],
    limits: {
      perHour: 4,
    },
  },
};

const getCRSFTokenTypeFromString = (type) => {
  const foundType = Object.entries(CSRF_TOKEN_TYPES).find(
    ([key, value]) => value.value === type
  );

  if (!foundType) return null;

  return foundType[1];
};

// verify the CSRF token sent
const useCSRFTokenAuthentication = (
  tokenType = CSRF_TOKEN_TYPES.REGISTER,
  func
) => {
  return async (req, res, next) => {
    const csrfToken = req.headers["x-csrf-token"];

    if (!csrfToken) {
      return res.status(HTTPStatusCodes.UNAUTHORIZED).json("Unauthorized");
    }

    const fetchedToken = null;
    //const fetchedToken = await CSRFToken.findOne({ token: csrfToken });

    if (!fetchedToken || fetchedToken.tokenType !== tokenType.value) {
      return res.status(HTTPStatusCodes.UNAUTHORIZED).json("Unauthorized");
    }

    if (new Date(fetchedToken.expires) < new Date()) {
      return res.status(HTTPStatusCodes.UNAUTHORIZED).json("Unauthorized");
    }

    try {
      await func(req, res);
      //await CSRFToken.deleteOne({ token: csrfToken });
    } catch (err) {
      next(err);
    }
  };
};

const useTryCatch = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  useCSRFTokenAuthentication,
  getCRSFTokenTypeFromString,
  CSRF_TOKEN_TYPES,
  ONE_TIME_TOKEN_TYPES,
  useTryCatch,
};

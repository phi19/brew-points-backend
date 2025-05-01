const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} = require("../../../config/constants");

const generateJWTTokens = (email) => {
  const accessToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ email }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

const passwordAuthentication = () => {
  return passport.authenticate("local", { session: false });
};

module.exports = { generateJWTTokens, passwordAuthentication };

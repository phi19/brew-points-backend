const crypto = require("crypto");
const {
  chunkArray,
  replaceDigitsWithSum,
} = require("../helpers/arrays.helper");

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const encryptPassword = (password) => {
  const salt = generateToken();
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
};

const validatePassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashVerify;
};

const tokenToCode = (token) => {
  return chunkArray(token, 6)
    .map(replaceDigitsWithSum)
    .reduce((prev, curr) => prev + curr, "");
};

module.exports = {
  validatePassword,
  encryptPassword,
  generateToken,
  tokenToCode,
};

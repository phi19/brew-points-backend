const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;

const HTTPS = process.env.HTTPS;
const KEY_PATH = process.env.KEY_PATH;
const CERT_PATH = process.env.CERT_PATH;

const PERMISSIVE_CORS = process.env.PERMISSIVE_CORS;
const FRONTEND_URL = process.env.FRONTEND_URL;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;

module.exports = {
  DATABASE_URL,
  PORT,
  HTTPS,
  KEY_PATH,
  CERT_PATH,
  PERMISSIVE_CORS,
  FRONTEND_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
};

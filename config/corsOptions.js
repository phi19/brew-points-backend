const { PERMISSIVE_CORS, FRONTEND_URL } = require("./constants");

exports.corsOptions = {
  origin: PERMISSIVE_CORS ? "*" : FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
};

exports.corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PATCH,POST,PUT,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};

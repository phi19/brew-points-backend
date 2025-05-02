const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { corsOptions, corsMiddleware } = require("./corsOptions");
const errorHandlingMiddleware = require("./errorHandling.middleware");
const routes = require("../app/routes");
const passport = require("passport");
const { KEY_PATH, CERT_PATH, HTTPS } = require("./constants");
const {
  passportLocalStrategy,
  passportJwtStrategy,
  passportJwtRefreshStrategy,
} = require("./passport-config");

module.exports = (app) => {
  app.use(corsMiddleware);
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(passport.initialize());
  passport.use(passportLocalStrategy);
  passport.use("jwt-access", passportJwtStrategy);
  passport.use("jwt-refresh", passportJwtRefreshStrategy);
  app.use("/api", routes);
  app.use("*", (req, res) => {
   res.send("Welcome to the BrewPoints API")
  });
  app.use(errorHandlingMiddleware());

  if (HTTPS) {
    const fs = require("fs");

    // Set up the HTTPS server
    const options = {
      key: fs.readFileSync(KEY_PATH),
      cert: fs.readFileSync(CERT_PATH),
    };
    return require("https").createServer(options, app);
  }

  return require("http").createServer(app);
};

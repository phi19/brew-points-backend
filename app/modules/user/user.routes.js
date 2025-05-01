const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const {
  passwordAuthentication,
} = require("../../utils/authentication/middlewares.authentication");
const {
  jwtRefreshAuthentication,
} = require("../../utils/authentication/roles.authentication");

router.post("/v1/login", passwordAuthentication(), UserController.login);

router.post("/v1/register", UserController.register);

router.post(
  "/v1/refresh-token",
  jwtRefreshAuthentication(),
  UserController.refreshToken
);

module.exports = router;

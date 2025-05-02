const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const {
  passwordAuthentication,
} = require("../../utils/authentication/middlewares.authentication");
const {
  jwtRefreshAuthentication,
} = require("../../utils/authentication/roles.authentication");

router.post("/login", passwordAuthentication(), UserController.login);

router.post("/register", UserController.register);

router.post(
  "/refresh-token",
  jwtRefreshAuthentication(),
  UserController.refreshToken
);

module.exports = router;

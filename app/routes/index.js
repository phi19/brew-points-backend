const express = require("express");
const router = express.Router();
const UsersRoutes = require("../modules/user/user.routes");

router.use(UsersRoutes);

module.exports = router;

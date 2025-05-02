const express = require("express");
const router = express.Router();
const UsersRoutes = require("../modules/user/user.routes");
const ShopsRoutes = require("../modules/shop/shop.routes");

router.use("/v1/user", UsersRoutes);
router.use("/v1/shop", ShopsRoutes);

module.exports = router;

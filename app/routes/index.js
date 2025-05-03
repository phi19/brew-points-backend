const express = require("express");
const router = express.Router();
const UsersRoutes = require("../modules/user/user.routes");
const ShopsRoutes = require("../modules/shop/shop.routes");
const OrdersRoutes = require("../modules/order/order.routes");

router.use("/v1/user", UsersRoutes);
router.use("/v1/shop", ShopsRoutes);
router.use("/v1/order", OrdersRoutes)

module.exports = router;

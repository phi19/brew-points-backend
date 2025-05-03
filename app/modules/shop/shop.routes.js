const express = require("express");
const router = express.Router();
const ShopController = require("./shop.controller");

router.post("/findAll", ShopController.getAllShops);

router.post("/create", ShopController.createShop);

router.post("/findById", ShopController.getShopProducts);

module.exports = router;

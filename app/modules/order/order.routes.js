const express = require("express");
const router = express.Router();
const OrderController = require("./order.controller");

router.post('/create', OrderController.createOrder);

router.post('/update/:orderId', OrderController.updateOrder);

router.post('/getStatus/:orderId', OrderController.getOrderStatus);

router.post("/deliver/:orderId", OrderController.deliverOrder);

module.exports = router;


const HTTPStatusCodes = require("../../utils/HTTPStatusCodes");
const OrderService = require("./order.service");
const OrderValidator = require("./order.validator");

exports.createOrder = async (req, res, next) => {
  try {
    // Validate the order request
    OrderValidator.validateCreateOrder(req.body);

    // Call the service to create the order
    const order = await OrderService.createOrder(req.body);

    res.status(HTTPStatusCodes.CREATED).json({
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    // Validate update order request
    OrderValidator.validateUpdateOrder(req.body);

    const updatedOrder = await OrderService.addProductsToOrder(
      req.params.orderId,
      req.body.products
    );

    res.status(HTTPStatusCodes.OK).json({
      updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrderStatus = async (req, res, next) => {
  try {
    const orderStatus = await OrderService.getOrderStatus(req.params.orderId);

    res.status(HTTPStatusCodes.OK).json({
      orderStatus,
    });
  } catch (err) {
    next(err);
  }
};

exports.deliverOrder = async (req, res, next) => {
  try {
    const completedOrder = await OrderService.deliverOrder(req.params.orderId);

    res.status(HTTPStatusCodes.OK).json({
      completedOrder,
    });
  } catch (err) {
    next(err);
  }
};

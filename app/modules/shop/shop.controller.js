const HTTPStatusCodes = require("../../utils/HTTPStatusCodes");
const ShopService = require("./shop.service");

exports.getAllShops = async (req, res, next) => {
  try {
    const shops = await ShopService.getAllShops();

    res.status(HTTPStatusCodes.OK).json({
      shops,
    });
  } catch (err) {
    next(err);
  }
};

exports.getShopProducts = async (req, res, next) => {
  try {
    const shop = await ShopService.getShopProducts(req.user.loginUser);

    res.status(HTTPStatusCodes.OK).json({
      shop,
    });
  } catch (err) {
    next(err);
  }
};

exports.createShop = async (req, res, next) => {
  try {
    const shop = await ShopService.createShop(req.body.user, req.body.shop);

    res.status(HTTPStatusCodes.OK).json({
      shop,
    });
  } catch (err) {
    next(err);
  }
};

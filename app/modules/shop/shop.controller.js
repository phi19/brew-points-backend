const HTTPStatusCodes = require("../../utils/HTTPStatusCodes");
const ShopService = require("./shop.service");
const ShopValidator = require("./shop.validator");

exports.getAllShops = async (req, res, next) => {
  try {
    const dummyShops = [
      {
        id: "shop_1",
        name: "The Cozy Corner Café",
        category: "Café", // Example category
        description: "Specialty Coffee & Pastries",
        rating: 4.8,
        // Example Unsplash URLs (replace topic/query as needed)
        image: "https://source.unsplash.com/random/400x300/?coffee,cafe",
      },
      {
        id: "shop_2",
        name: "Espresso Hub",
        category: "Coffee Shop",
        description: "Quick Bites & Strong Brews",
        rating: 4.5,
        image: "https://source.unsplash.com/random/400x300/?espresso,shop",
      },
      {
        id: "shop_3",
        name: "Artisan Roast",
        category: "Roastery & Café",
        description: "Freshly Roasted Beans",
        rating: 4.9,
        image: "https://source.unsplash.com/random/400x300/?coffee,beans",
      },
      {
        id: "shop_4",
        name: "Latte Art Bistro",
        category: "Café & Bistro",
        description: "Lunch & Perfect Lattes",
        rating: 4.7,
        image: "https://source.unsplash.com/random/400x300/?latte,art",
      },
      {
        id: "shop_5",
        name: "The Daily Grind",
        category: "Coffee Shop",
        description: "Your everyday escape",
        rating: 4.6,
        image: "https://source.unsplash.com/random/400x300/?coffee,morning",
      },
      {
        id: "shop_6",
        name: "Bean Around Town",
        category: "Café",
        description: "Community coffee spot",
        rating: 4.4,
        image: "https://source.unsplash.com/random/400x300/?coffee,community",
      },
      // Add more shops as needed
    ];

    console.log(`Received request for /api/v1/shops/findAll`);
    console.log(`  -> Returning ${dummyShops.length} dummy shops.`);
    // Simulate potential network delay (optional)
    // setTimeout(() => {
    res.status(HTTPStatusCodes.OK).json(dummyShops);
    // }, 500);

    return;

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
    ShopValidator.createShopValidator(req.body.shop);

    const shop = await ShopService.createShop(req.body.user, req.body.shop);

    res.status(HTTPStatusCodes.OK).json({
      shop,
    });
  } catch (err) {
    next(err);
  }
};

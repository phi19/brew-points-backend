const HTTPStatusCodes = require("../../utils/HTTPStatusCodes");
const ShopService = require("./shop.service");
const ShopValidator = require("./shop.validator");

const dummyShops = [
  {
    id: "shop_1",
    name: "Santa Cruz",
    category: "Café Restaurante",
    description: "Historic charm & great coffee",
    rating: 4.8,
    reviewCount: 230,
    image: "https://picsum.photos/seed/santacruz/800/600", // Picsum URL
    distance: "1.4 km",
    waitTime: "10 mins wait",
    offers: ["pastry", "coffee-bean", "milk"],
    products: [
      {
        id: "prod_1a",
        name: "Espresso",
        description: "Tasty and Energetic",
        price: "3,58€",
        image: "https://picsum.photos/seed/sc_espresso/400/400",
      },
      {
        id: "prod_1b",
        name: "Caffe Mocha",
        description: "Deep Foam",
        price: "4,69€",
        image: "https://picsum.photos/seed/sc_mocha/400/400",
      },
      {
        id: "prod_1c",
        name: "Croissant",
        description: "Flaky and Buttery",
        price: "2,50€",
        image: "https://picsum.photos/seed/sc_croissant/400/400",
      },
      {
        id: "prod_1d",
        name: "Cappuccino",
        description: "Classic Italian",
        price: "4,10€",
        image: "https://picsum.photos/seed/sc_cappuccino/400/400",
      },
    ],
  },
  // Shop 2: Nau Café (NEW)
  {
    id: "shop_2",
    name: "Nau Café",
    category: "Modern Café",
    description: "Specialty brews and light bites",
    rating: 4.6,
    reviewCount: 185,
    image: "https://picsum.photos/seed/naucafe/800/600", // Picsum URL
    distance: "0.5 km",
    waitTime: "5 mins wait",
    offers: ["coffee-bean", "vegan", "pastry"],
    products: [
      {
        id: "prod_2a",
        name: "Flat White",
        description: "Velvety Microfoam",
        price: "4,00€",
        image: "https://picsum.photos/seed/nau_flatwhite/400/400",
      },
      {
        id: "prod_2b",
        name: "Iced Latte",
        description: "Cool & Refreshing",
        price: "4,50€",
        image: "https://picsum.photos/seed/nau_icedlatte/400/400",
      },
      {
        id: "prod_2c",
        name: "Avocado Toast",
        description: "Healthy & Tasty",
        price: "6,50€",
        image: "https://picsum.photos/seed/nau_avotoast/400/400",
      },
    ],
  },
  // Shop 3: Espresso Hub (updated image URL)
  {
    id: "shop_3", // Changed ID to avoid conflict if needed
    name: "Espresso Hub",
    category: "Coffee Shop",
    description: "Quick Bites & Strong Brews",
    rating: 4.5,
    reviewCount: 155,
    image: "https://picsum.photos/seed/espressohub/800/600", // Picsum URL
    distance: "0.8 km",
    waitTime: "5 mins wait",
    offers: ["coffee-bean", "sandwich"],
    products: [
      {
        id: "prod_3a",
        name: "Double Espresso",
        description: "Intense Flavor",
        price: "3,00€",
        image: "https://picsum.photos/seed/eh_despresso/400/400",
      },
      {
        id: "prod_3b",
        name: "Americano",
        description: "Smooth & Strong",
        price: "3,50€",
        image: "https://picsum.photos/seed/eh_americano/400/400",
      },
      {
        id: "prod_3c",
        name: "Breakfast Bagel",
        description: "With cream cheese",
        price: "4,00€",
        image: "https://picsum.photos/seed/eh_bagel/400/400",
      },
    ],
  },
  // Shop 4: Artisan Roast (updated image URL)
  {
    id: "shop_4", // Changed ID
    name: "Artisan Roast",
    category: "Roastery & Café",
    description: "Freshly Roasted Beans",
    rating: 4.9,
    reviewCount: 310,
    image: "https://picsum.photos/seed/artisanroast/800/600", // Picsum URL
    distance: "2.1 km",
    waitTime: "15 mins wait",
    offers: ["coffee-bean", "pastry", "filter"],
    products: [
      {
        id: "prod_4a",
        name: "Pour Over",
        description: "Single Origin",
        price: "5,00€",
        image: "https://picsum.photos/seed/ar_pourover/400/400",
      },
      {
        id: "prod_4b",
        name: "Cortado",
        description: "Perfect Balance",
        price: "3,80€",
        image: "https://picsum.photos/seed/ar_cortado/400/400",
      },
      {
        id: "prod_4c",
        name: "Cinnamon Roll",
        description: "Warm & Sweet",
        price: "3,50€",
        image: "https://picsum.photos/seed/ar_cinroll/400/400",
      },
    ],
  },
];

exports.getAllShops = async (req, res, next) => {
  try {
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
    const { id } = req.body; // Get ID from request body
    console.log(`Received request for /api/v1/shop/findById with ID: ${id}`);

    // Find the shop in our dummy data
    const shop = dummyShops.find((s) => s.id === id);

    if (shop) {
      console.log(`  -> Found shop: ${shop.name}`);
      // Return the full shop object including products, etc.
      res.status(200).json(shop);
    } else {
      console.log(`  -> Shop with ID ${id} not found.`);
      res.status(404).json({ message: `Shop with ID ${id} not found` });
    }

    /*
    const shop = await ShopService.getShopProducts(req.user.loginUser);

    res.status(HTTPStatusCodes.OK).json({
      shop,
    });
    */
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

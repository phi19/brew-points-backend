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
    image:
      "https://cafesantacruz.com/wp-content/uploads/2023/02/livro_santacruz_encontrodememorias2017_Page_095_Image_0001-1-676x1024.jpg", // Picsum URL
    distance: "1.4 km",
    latitude: 40.209,
    longitude: -8.429,
    waitTime: "10 mins wait",
    offers: ["pastry", "coffee-bean", "milk"],
    products: [
      {
        id: "prod_1a",
        name: "Espresso",
        description: "Tasty and Energetic",
        price: "3,58€",
        image:
          "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "prod_1b",
        name: "Caffe Mocha",
        description: "Deep Foam",
        price: "4,69€",
        image:
          "https://images.unsplash.com/photo-1596078841242-12f73dc697c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9jaGF8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: "prod_1c",
        name: "Croissant",
        description: "Flaky and Buttery",
        price: "2,50€",
        image:
          "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNyb2lzc2FudHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: "prod_1d",
        name: "Cappuccino",
        description: "Classic Italian",
        price: "4,10€",
        image:
          "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    reviewCount: 175,
    image:
      "https://images.squarespace-cdn.com/content/v1/5b1ef690b98a78ce8752fa51/1711390951448-KHCV6QVG4PUKTH74SIY3/Design%2Bsem%2Bnome.jpg?format=1500w", // Picsum URL
    distance: "0.5 km",
    latitude: 40.2115, // Example Coimbra coordinates
    longitude: -8.431,
    waitTime: "5 mins wait",
    offers: ["coffee-bean", "vegan", "pastry"],
    products: [
      {
        id: "prod_2a",
        name: "Flat White",
        description: "Velvety Microfoam",
        price: "4,00€",
        image:
          "https://thisiscanberra.com/wp-content/uploads/sites/5/2015/03/IMG_9698.png",
      },
      {
        id: "prod_2b",
        name: "Iced Latte",
        description: "Cool & Refreshing",
        price: "4,50€",
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/61/db/6e/tambem-fazemos-bebidas.jpg?w=1100&h=-1&s=1",
      },
      {
        id: "prod_2c",
        name: "Avocado Toast",
        description: "Healthy & Tasty",
        price: "6,50€",
        image:
          "https://images.happycow.net/venues/1024/39/26/hcmp392684_2593607.jpeg",
      },
    ],
  },
  // Shop 3: Espresso Hub (updated image URL)
  {
    id: "shop_3", // Changed ID to avoid conflict if needed
    name: "Pastelaria do Parque",
    category: "Roastery & Café",
    description: "Quick Bites & Strong Brews",
    rating: 4.5,
    reviewCount: 125,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D105544225695975&f=1&nofb=1&ipt=c36fc117203bbe5f2f40938b07185ab94bbd7f2cfde9f90280e89dc0aa4e0b6b", // Picsum URL
    distance: "0.8 km",
    latitude: 40.2055, // Example Coimbra coordinates
    longitude: -8.4255,
    waitTime: "5 mins wait",
    offers: ["coffee-bean", "sandwich"],
    products: [
      {
        id: "prod_3a",
        name: "Half Milk Toast",
        description: "Intense Flavor",
        price: "3,00€",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetlisbon.com%2Fwp-content%2Fuploads%2F2018%2F11%2Fgalao-portugal-getLISBON-1024x683.jpg&f=1&nofb=1&ipt=ff9aa1d7deba9d7953ebdba2e5bf156eaaebd7769678b99488736de5df64c59c",
      },
      {
        id: "prod_3b",
        name: "Americano",
        description: "Smooth & Strong",
        price: "3,50€",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.MiiZqOen8-EgFmRfto5JZQHaGN%26pid%3DApi&f=1&ipt=ced4c839686123d75d4bd537c974201adbe82f281956d975d65813c1aa739c06",
      },
      {
        id: "prod_3c",
        name: "Breakfast Bagel",
        description: "With cream cheese",
        price: "4,00€",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fonedishkitchen.com%2Fwp-content%2Fuploads%2F2022%2F08%2Fbreakfast-bagel-one-dish-kitchen-1-1175x1536.jpg&f=1&nofb=1&ipt=65dbbe496061abcb197d69ff120b1cc90cd0f8bdbf3b0fafb975e96d9904c163",
      },
    ],
  },
  // Shop 4: Artisan Roast (updated image URL)
  {
    id: "shop_4", // Changed ID
    name: "Pastelaria Violeta",
    category: "Roastery & Café",
    description: "Freshly Roasted Beans",
    rating: 4.9,
    reviewCount: 410,
    image:
      "https://www.scratch-magazine.pt/wp-content/uploads/2020/12/pastelara.jpg", // Picsum URL
    distance: "2.1 km",
    latitude: 40.215, // Example Coimbra coordinates
    longitude: -8.419,
    waitTime: "15 mins wait",
    offers: ["coffee-bean", "pastry", "filter"],
    products: [
      {
        id: "prod_4a",
        name: "Custard Tart",
        description: "Single Origin",
        price: "1,20€",
        image:
          "https://recipesblob.oetker.ca/assets/d05e1f667ca34c4a89666664806e793f/750x910/pastel-de-nata-11.webp",
      },
      {
        id: "prod_4b",
        name: "Croissant",
        description: "Perfect Balance",
        price: "2,80€",
        image:
          "https://images.tcdn.com.br/img/img_prod/795791/croissant_artesanal_desfrute_do_sabor_frances_autentico_com_o_caminho_da_fazenda_347_1_d5980fbd4efb6408726616175b2e7731.jpg",
      },
      {
        id: "prod_4c",
        name: "Cinnamon Roll",
        description: "Warm & Sweet",
        price: "3,50€",
        image:
          "https://tastecooking.com/wp-content/uploads/2016/01/cinnamon.jpg",
      },
      {
        id: "prod_4d",
        name: "Cappuccino",
        description: "Creamy & Tasty",
        price: "1,50€",
        image:
          "https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg",
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

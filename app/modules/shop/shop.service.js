const prisma = require("../../../prisma/prismaClient");

exports.getAllShops = async () => {
  const shops = await prisma.shop.findMany({});

  return shops;
};
exports.getShopProducts = async (shopId) => {
  const products = await prisma.shop.findUnique({
    where: { id: shopId },
    include: { products: true },
  });

  return products;
};

exports.createShop = async (user, shopProps) => {
  const shop = await prisma.shop.create({
    data: {
      userId: user.id,
      name: shopProps.name,
      bio: shopProps.bio,
      location: {
        create: {
          latitude: shopProps.location.latitude,
          longitude: shopProps.location.longitude,
        },
      },
    },
  });

  return shop;
};

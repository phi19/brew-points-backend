const { OrderStatus } = require("@prisma/client");
const prisma = require("../../../prisma/prismaClient");

exports.createOrder = async (userId, products, pickupTime) => {
  const order = await prisma.order.create({
    data: {
      userId,
      status: OrderStatus.PREPARING,
      pickupTime: new Date(pickupTime),
      totalPrice: products.reduce((sum, p) => sum + p.price * p.quantity, 0),
      OrderItem: {
        create: products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
        })),
      },
    },
  });

  return order;
};

exports.addProductsToOrder = async (orderId, products) => {
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      OrderItem: {
        create: products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
        })),
      },
      totalPrice: {
        increment: products.reduce((sum, p) => sum + p.price * p.quantity, 0),
      },
    },
  });
  return updatedOrder;
};

exports.getOrderStatus = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });
  return order;
};

exports.deliverOrder = async (orderId) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: OrderStatus.DELIVERING },
  });
  return order;
};

const { HTTP400Error } = require("../../utils/errors/custom");

exports.validateCreateOrder = ({ userId, products, pickupTime }) => {
  if (!userId || !products || !pickupTime) {
    throw new HTTP400Error("Todos os campos devem ser preenchidos", {
      type: !userId ? "userId" : !products ? "products" : "pickupTime",
    });
  }

  if (!Array.isArray(products) || products.length === 0) {
    throw new HTTP400Error("Produtos deve ser um array não vazio", {
      type: "products",
    });
  }

  products.forEach((product, index) => {
    if (!product.id || !product.quantity || product.quantity <= 0) {
      throw new HTTP400Error(`Produto inválido no índice ${index}`, {
        type: "products",
      });
    }
  });

  if (isNaN(Date.parse(pickupTime))) {
    throw new HTTP400Error("Horário de retirada inválido", {
      type: "pickupTime",
    });
  }
};

exports.validateUpdateOrder = ({ products }) => {
  if (!products || !Array.isArray(products) || products.length === 0) {
    throw new HTTP400Error("Produtos deve ser um array não vazio", {
      type: "products",
    });
  }

  products.forEach((product, index) => {
    if (!product.id || !product.quantity || product.quantity <= 0) {
      throw new HTTP400Error(`Produto inválido no índice ${index}`, {
        type: "products",
      });
    }
  });
};

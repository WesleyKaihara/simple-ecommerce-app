const prisma = require("./prisma");

const findAllProducts = () => {
  return prisma.product.findMany();
}

const createProduct = (product) => {
  return prisma.product.create({
    data: product
  });
}

const addToCart = ({productId,amount},userId) => {
  return prisma.cartProduct.create({
    data: {
      productId,
      amount,
      userId
    }
  });
}

const listCartProducts = (userId) => {
  return prisma.cartProduct.findMany({
    where: { userId }
  });
}

module.exports = {
  findAllProducts,
  createProduct,
  addToCart,
  listCartProducts
}
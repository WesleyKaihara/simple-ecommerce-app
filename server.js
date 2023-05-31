const express  = require("express");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");

const server = express();


server.use(express.json());
server.use(productRouter);
server.use(userRouter);
server.use(cartRouter);

module.exports = server;

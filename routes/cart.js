const express = require("express");
const { addToCart, listCartProducts } = require("../database/product");
const auth = require('../middleware/auth');
const z = require("zod");

const router = express.Router();

const cartItemSchema = z.object({
  productId: z.number().min(1),
  amount: z.number().min(1)
});

router.get("/cart", auth, async(req,res) => {
  const products = await listCartProducts(req.userId);
  res.json({products});
});

router.post("/buy", auth, async(req,res) => {
  try {
    const cartItem = cartItemSchema.parse(req.body);

    const newCartItem = await addToCart(cartItem,req.userId)
    return res.json({ item: newCartItem})
  } catch (err) {
    if(err instanceof z.ZodError) {
      res.status(422).json({
        message: err.errors
      })
    }
    console.log(err)
  }

  res.status(500).json({
    message: "Server error"
  });
});

router.put("/product/:id", (req,res) => {
  const id = Number(req.params.id);
  res.json("asdasdas")
});

router.delete("/cart/:id", (req,res) => {
  const id = Number(req.params.id);
  res.json("asdasdas")
});

module.exports = router;
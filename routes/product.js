const express = require("express");
const z = require("zod");
const { findAllProducts, createProduct } = require("../database/product");
const auth = require('../middleware/auth');

const router = express.Router();

const productSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  amount: z.number().int(),
});


router.get("/products", auth, async(req,res) => {
  const products = await findAllProducts();
  res.json({products});
});

router.post("/product", async(req,res) => {
  try {
    const product = productSchema.parse(req.body);

    const newProduct = await createProduct(product);
    return res.json({ product: newProduct})
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

router.delete("/products/:id", (req,res) => {
  const id = Number(req.params.id);
  res.json("asdasdas")
});

module.exports = router;
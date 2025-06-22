const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// POST a new product
router.post("/", async (req, res) => {
  console.log("Incoming data:", req.body); // ✅ Add this
  const { title, description, price, category, image } = req.body;
  if (!title || !price) {
    return res.status(400).json({ error: "Title and Price are required." });
  }
  const product = await Product.create({
    title,
    description,
    price,
    category,
    image: image || "/placeholder.svg",
  });
  res.status(201).json(product);
});

// PUT - Update product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
});

//Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

// DELETE product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: "Product deleted" });
});

module.exports = router;

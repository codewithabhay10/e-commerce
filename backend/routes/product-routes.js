const express = require("express");
const router = express.Router();
const multer = require("multer")
const { v2: cloudinary } = require("cloudinary")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
require("dotenv").config() // make sure .env loads

const Product = require("../models/product-model");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posters",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
})

const upload = multer({ storage })


// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// POST a new product (with image URL from frontend)
router.post("/", async (req, res) => {
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


// Upload image only
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    res.json({ url: req.file.path });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Image upload failed." });
  }
});



module.exports = router;

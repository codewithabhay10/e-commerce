const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

// Default route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Admin route (for creating products)
router.get("/admin", isLoggedIn, (req, res) => {
  res.json({ message: "Welcome to the admin panel! You can create products here." });
});

// Get all products (shop)
router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ user: req.user, products });
  } catch (err) {
    res.status(500).json({ error: "Failed to load products" });
  }
});

// Get profile
router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to load profile" });
  }
});

// Add to cart
router.post("/cart/add/:id", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const product = await productModel.findById(req.params.id);

    if (!user || !product) return res.status(404).json({ error: "User or product not found" });

    const cartItem = user.cart.find(item => item.product.equals(product._id));
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ product: product._id, quantity: 1 });
    }

    await user.save();
    res.json({ message: "Product added to cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

// Get cart
router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("cart.product");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ cart: user.cart || [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to load cart" });
  }
});

// Increment quantity
router.post("/cart/increment/:id", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const productId = req.params.id;

    const cartItem = user.cart.find(item => item.product.equals(productId));
    if (cartItem) {
      cartItem.quantity += 1;
      await user.save();
    }

    res.json({ message: "Item quantity incremented" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong while incrementing" });
  }
});

// Decrement quantity
router.post("/cart/decrement/:id", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const productId = req.params.id;

    const cartItem = user.cart.find(item => item.product.equals(productId));
    if (cartItem) {
      cartItem.quantity -= 1;
      if (cartItem.quantity <= 0) {
        user.cart = user.cart.filter(item => !item.product.equals(productId));
      }
      await user.save();
    }

    res.json({ message: "Item quantity decremented" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong while decrementing" });
  }
});

// Remove item from cart
router.post("/cart/remove/:id", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const productId = req.params.id;

    user.cart = user.cart.filter(item => !item.product.equals(productId));
    await user.save();

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong while removing item" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: "Failed to log out" });
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
// This is the main index file for the backend routes
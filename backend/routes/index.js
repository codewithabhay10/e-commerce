const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

// Default route
router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", {
    title: "Home",
    error: error.length > 0 ? error[0] : null,
    loggedin: false,
  });
});

router.get("/admin", isLoggedIn, (req, res) => {
  let success = req.flash("success", "Welcome to the admin panel! You can create products here.");
  res.render("createproducts", { success });
});

router.get("/shop", isLoggedIn, (req, res) => {
  productModel.find()
    .then(products => {
      let success = req.flash("success");
      res.render("shop", { user: req.user, products, title: "Shop", success });
    })
    .catch(err => { 
      req.flash("error", "Failed to load products");
      res.redirect("/");
    });
});

// Profile route
router.get("/profile", isLoggedIn, (req, res) => {
  userModel.findById(req.user._id)
    .then(user => {
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/");
      }
      res.render("profile", {
        title: "Profile",
        user
      });
    })
    .catch(err => {
      req.flash("error", "Failed to load profile");
      res.redirect("/");
    });
});

// Add to cart route
router.get("/cart/add/:id", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ _id: req.user._id });
  let product = await productModel.findOne({ _id: req.params.id });

  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/shop");
  }

  if (!product) {
    req.flash("error", "Product not found");
    return res.redirect("/shop");
  }

  // Check if product is already in cart
  let cartItem = user.cart.find(item => item.product.equals(product._id));
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    user.cart.push({ product: product._id, quantity: 1 });
  }

  await user.save();
  req.flash("success", "Product added to cart");
  res.redirect("/shop");
});

// GET cart route
router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("cart.product");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/shop");
    }

    res.render("cart", {
      title: "Cart",
      cart: user.cart || [],
      user,
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    req.flash("error", "Failed to load cart");
    res.redirect("/shop");
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

    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while incrementing");
    res.redirect("/cart");
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
      // Remove if quantity goes to 0
      if (cartItem.quantity <= 0) {
        user.cart = user.cart.filter(item => !item.product.equals(productId));
      }
      await user.save();
    }

    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while decrementing");
    res.redirect("/cart");
  }
});

// Remove item completely
router.post("/cart/remove/:id", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const productId = req.params.id;

    user.cart = user.cart.filter(item => !item.product.equals(productId));
    await user.save();

    req.flash("success", "Item removed from cart");
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while removing item");
    res.redirect("/cart");
  }
});



// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "Failed to log out");
      return res.redirect("/");
    }
    req.flash("success", "Logged out successfully");
    res.redirect("/");
  });
});

// Exporting the router
module.exports = router;

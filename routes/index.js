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
  });
});

router.get("/shop", isLoggedIn, (req, res) => {
  productModel.find()
    .then(products => {
      res.render("shop", {
        title: "Shop",
        products
      });
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

// Logout route
router.get("/logout", (req, res) => {
    res.clearCookie("token", { path: "/" });
    req.flash("success", "You have been logged out successfully");
    res.redirect("/");
});

// Exporting the router
module.exports = router;

const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout } = require("../controllers/authController");

// This is a user routes file that handles user-related endpoints

// Importing user model (assuming it exists)
router.get("/", (req, res) => {
  res.send("User Routes");
});

// Placeholder for user registration endpoint
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;

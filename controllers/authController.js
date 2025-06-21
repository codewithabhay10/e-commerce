const express = require("express");
const userModel = require("../models/user-model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  let { fullname, email, password } = req.body;
  // Validate request body
  if (!fullname || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  // Check if user already exists
  let existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User already registered with this email" });
  }
  // Hash the password

  bcrypt.genSalt(10, async (err, salt) => {
    if (err) {
      return res.status(500).json({ error: "Error generating salt" });
    }
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      let user = await userModel.create({ fullname, email, password: hash });
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/");
    });
  });
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user exists
  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Compare passwords
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ error: "Error comparing passwords" });
    }
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    let token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  });
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("token");
    req.flash("success", "Logged out successfully");
    res.redirect("/");
  });
};


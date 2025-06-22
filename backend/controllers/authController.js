const express = require("express");
const userModel = require("../models/user-model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User already registered with this email" });
  }

  bcrypt.genSalt(10, async (err, salt) => {
    if (err) return res.status(500).json({ error: "Error generating salt" });

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).json({ error: "Error hashing password" });

      const user = await userModel.create({ fullname, email, password: hash });
      const token = generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set true if using https
        sameSite: "lax",
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          email: user.email,
          fullname: user.fullname,
        },
        token,
      });
    });
  });
};


module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return res.status(500).json({ error: "Error comparing passwords" });

    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
      token,
    });
  });
};


module.exports.logout = (req, res) => {
    res.clearCookie("token");
    req.flash("success", "Logged out successfully");
    res.redirect("/");
};


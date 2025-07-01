const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log("📥 Received signup data:", req.body);
    const { firstName, lastName, userName, email, password, details } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      details,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Server error. Try again." });
  }
});

// ✅ Login Route with corrected variable name
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password." });
    }

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        details: user.details
      }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error. Try again." });
  }
});

module.exports = router;

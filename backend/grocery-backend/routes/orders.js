const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Get all orders for a specific user
router.get("/user/:userEmail", async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.userEmail });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;

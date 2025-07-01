const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");



const User = require("./models/User");
const Order = require("./models/Order"); // 👈 NEW Order model

const signupRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(cors());
app.use(express.json());

// 🛒 Cart routes (still in-memory unless you expand it to MongoDB)
let cart = [];

app.post("/api/cart", (req, res) => {
  const { name } = req.body;
  cart.push(name);
  res.json({ message: "Item added to server cart" });
});

app.delete("/api/cart", (req, res) => {
  const { name } = req.body;
  cart = cart.filter(item => item !== name);
  res.json({ message: "Item removed" });
});

app.get("/api/cart", (req, res) => {
  res.json(cart);
});

// 📦 Order routes (MongoDB-powered)
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order saved", id: order._id });
  } catch (err) {
    console.error("❌ Failed to create order:", err);
    res.status(500).json({ error: "Order save failed" });
  }
});

app.get("/api/orders/:email", async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email });
    res.json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});
app.use(express.static(path.join(__dirname, "public")));

// 🔁 API Routes
app.use("/api", signupRoutes);
app.use("/api", productRoutes);


// ✅ Add this right here — Dynamic EJS route
app.get("/order-details/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.render("order-details", { order });
    } else {
      res.status(404).send("Order not found");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// 🌐 Static frontend


// 🩺 Health check
app.get("/", (req, res) => {
  res.send("👋 Welcome to the G-Mart backend!");
});
app.get("/", (req, res) => {
  res.redirect("/products.html");
});
app.get('/order.html', (req, res) => {
  res.sendFile(__dirname + '/public/order.html');
});



// 🧠 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed", err));

// 🚀 Launch server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: { type:String, required: true },
  product: String,
  price: Number,
  quantity: Number,
  address: String,
  phone: String,
  payment: String,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    products: Array,
    paidStatus: Boolean,
    transactionId: String,
    email: String,
    deliveryStatus: String,
  },
  { timestamps: true },
);

exports.module = new mongoose.model("Order", orderSchema);

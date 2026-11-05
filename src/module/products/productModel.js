const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    old_price: Number,
    brand: String,
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    imageThree: String,
    category: {
      type: String,
      required: true,
      trim: true,
    },
    ratings: Number,
    sales: {
      type: Number,
      default: 0,
    },
    availableQuantity: {
      type: Number,
      required: true,
    },
    size: [
      {
        type: String,
        required: true,
        enum: ["S", "M", "L", "XL", "XXL", "XXXL"],
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = new mongoose.model("Products", productSchema);

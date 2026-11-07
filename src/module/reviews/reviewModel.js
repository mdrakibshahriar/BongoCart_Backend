const mongoose = require("mongoose");
const Product = require("../products/productModel");

const reviewSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: String,
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { timestamps: true },
);

reviewSchema.statics.calculateAvgRating = async (product) => {
  try {
    const stats = await this.aggregate([
      {
        $match: { product: new mongoose.Types.ObjectId(product._id) },
      },
      {
        $group: {
          _id: "$product",
          nRating: { $sum: 1 },
          avgRating: { $avg: "rating" },
        },
      },
    ]);
    console.log("PRoduct id: ", product._id);
    console.log("Stats : ", stats);
    if (stats.length > 0) {
      await Product.findByIdAndUpdate(product._id, {
        averageRating: stats[0].avgRating,
        ratingsQuantity: stats[0].nRating,
      });
    } else {
      await Product.findByIdAndUpdate(product._id, {
        averageRating: 0,
        ratingsQuantity: 0,
      });
    }
  } catch (error) {
    console.error("Error calculating avg rating", error.message);
  }
};

module.exports = new mongoose.model("Review", reviewSchema);

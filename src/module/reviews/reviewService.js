const mongoose = require("mongoose");
const Review = require("./reviewModel");
const ApiError = require("../../error/handleApiError");

const newReview = async (reviewData) => {
  try {
    const review = new Review(reviewData);
    await review.save();
    await Review.calculateAvgRating(reviewData.product);
    return review;
  } catch (error) {
    throw new Error("Failed to add review: " + error.message);
  }
};

const getReviewByProduct = async (product) => {
  try {
    const review = await Review.find({
      product: new mongoose.Types.ObjectId(product._id),
    });
    return review;
  } catch (error) {
    throw new Error("Failed to get review: " + error.message);
  }
};

const getReviewsByUserId = async (userId, userEmail) => {
  try {
    const review = await Review.find({ userId, userEmail }).populate(
      "product",
      "productName",
    );
    return review;
  } catch (error) {
    throw new Error("Failed to get review: " + error.message);
  }
};

const getAllReview = async () => {
  try {
    const review = await Review.find();
    return review;
  } catch (error) {
    throw new Error("Failed to get review: " + error.message);
  }
};

const deleteReviewByUserId = async (userId, userEmail, revId) => {
  try {
    const review = await Review.findOne({ userId, userEmail, _id: revId });
    if (!review) throw new Error("Review not found");
    await Review.deleteOne({ _id: new mongoose.Types.ObjectId(revId) });
    return review;
  } catch (error) {
    throw new Error("Failed to delete review: " + error.message);
  }
};

const getReviewByUserIdAndReviewId = async (userId, userEmail, revId) => {
  try {
    const review = await Review.findOne({ userId, userEmail, _id: revId });
    if (!review) throw new Error("Review not found");
    return review;
  } catch (error) {
    throw new Error("Failed to get review: " + error.message);
  }
};

const updateReview = async (userId, userEmail, revId, rating, reviewText) => {
  try {
    const review = await Review.findOne({ userId, userEmail, _id: revId });
    if (!review) throw new ApiError(404, "Review not found");
    if (review.rating !== "" && review.reviewText !== "") {
      review.rating = rating;
      review.reviewText = reviewText;
    } else {
      review.rating = rating;
    }
    await review.save();
  } catch (error) {
    throw new Error("Failed to update review: " + error.message);
  }
};
module.exports = {
  newReview,
  getReviewByProduct,
  getReviewsByUserId,
  getAllReview,
  deleteReviewByUserId,
  getReviewByUserIdAndReviewId,
  updateReview,
};

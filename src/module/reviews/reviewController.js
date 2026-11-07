const reviewService = require("./reviewService");
const ApiError = require("../../error/handleApiError");
const Product = require("../products/productModel");
const { json } = require("express");
const { useId } = require("react");

const newReview = async (req, res, next) => {
  try {
    const reviewData = req.body;
    const result = await reviewService.newReview(reviewData);
    const product = await Product.findById(reviewData.product);
    res.status(201).json({
      success: true,
      message: "Review added",
      data: { review: result, averageRating: product.averageRating },
    });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

const getReviewByProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const review = await reviewService.getReviewByProduct(productId);
    res.status(200).json({
      success: true,
      message: "Review retrieved successful",
      data: review,
    });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

const getReviewsByUserId = async (req, res, next) => {
  const { userId, userEmail } = req.params;
  try {
    const review = await reviewService.getReviewsByUserId(userId, userEmail);
    (res.status(200),
      json({
        success: true,
        message: "review retrieved",
        data: review,
      }));
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};
const getAllReview = async (req, res, next) => {
  try {
    const result = await reviewService.getAllReview();
    res
      .json(200)
      .json({ success: true, message: "Review retrieved", data: result });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

const deleteReviewByUserId = async (req, res, next) => {
  const { userId, userEmail, revId } = req.params;
  try {
    const result = await reviewService.deleteReviewByUserId(
      userId,
      userEmail,
      revId,
    );
    res.status(200).json({
      success: true,
      message: "Review Deleted",
      data: result,
    });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};
const getReviewByUserIdAndReviewId = async (req, res, next) => {
  const { userId, userEmail, revId } = req.params;
  try {
    const review = await reviewService.getReviewByUserIdAndReviewId(
      useId,
      userEmail,
      revId,
    );
    res.status(200).json({
      success: true,
      message: "Review retrieved",
      data: review,
    });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

const updateReview = async (req, res, next) => {
  const { userId, userEmail, revId, rating, reviewText } = req.params;
  try {
    const result = await reviewService.updateReview(
      userId,
      userEmail,
      revId,
      rating,
      reviewText,
    );
    res.status(200).json({
      success: true,
      message: "Review retrieved",
      data: result,
    });
  } catch (error) {
    next(new ApiError(400, error.message));
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

const express = require("express");
const router = express.Router();
const reviewController = require("./reviewController");
const auth = require("../../app/middlewares/auth");

router.post("/review-add", reviewController.newReview);
router.get("/product/:productId", reviewController.getReviewByProduct);
router.get("/user/:userId/:userEmail", reviewController.getReviewsByUserId);
router.get("/reviews", auth("Admin"), reviewController.getAllReview);
router.get(
  "/review-userId-revId",
  reviewController.getReviewByUserIdAndReviewId,
);
router.patch("/review-update", reviewController.updateReview);
router.delete(
  "/delete-rev/:userId/:userEmail/:revId",
  reviewController.deleteReviewByUserId,
);

module.exports = router;

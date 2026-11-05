const express = require("express");

const auth = require("../../app/middlewares/auth");
const productController = require("./productController");

const router = express.Router();

router.post("/product-add", auth("Admin"), productController.addProduct);
router.post("/product-add-all", auth("Admin"), productController.addAllProduct);
router.get("/", productController.getAllProduct);
router.patch("/product-update", auth("Admin"), productController.productUpdate);
router.get("/top-selling", productController.getTopSold);
router.get("/search", productController.search);
router.get("/product-related", productController.getRelatedProduct);
router.get("/:productId", productController.getProductById);
router.delete(
  "/:productId",
  auth("Admin"),
  productController.deleteProductById,
);

module.exports = router;

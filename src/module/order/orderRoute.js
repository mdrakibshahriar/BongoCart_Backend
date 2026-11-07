const express = require("express");
const auth = require("../../app/middlewares/auth");
const orderController = require("./orderController");

const router = express.Router();

router.post("/add-order", auth("User"), orderController.addOrder);
router.get("/get-order-list", auth("User"), orderController.getOrderList);
router.get("/get-order-details", auth("User"), orderController.getOrderDetails);
router.patch(
  "/get-order-list",
  auth("Admin"),
  orderController.updateDeliveryStatus,
);
router.get("/admin/monthly-order", auth("Admin"), orderController.monthlyOrder);
router.get(
  "/admin/monthly-added-product",
  auth("Admin"),
  orderController.monthlyAddedProduct,
);
router.get(
  "/admin/get-order-list",
  auth("Admin"),
  orderController.adminGetOrders,
);
router.post(
  "/payment-success/:tranId",
  auth("User"),
  orderController.successPayment,
);

exports.module = router;

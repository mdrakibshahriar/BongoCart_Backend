const express = require("express");
const userRoutes = require("../module/user/userRoute");
const productRoutes = require("../module/products/productRoute");
const brandRoutes = require("../module/brand/brandRoute");
const categoryRoutes = require("../module/category/categoryRoute");
const orderRoutes = require("../module/order/orderRoute");
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/brand",
    route: brandRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/order",
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
module.exports = router;

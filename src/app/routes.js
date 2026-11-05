const express = require("express");
const userRoutes = require("../module/user/userRoute");
const productRoutes = require("../module/products/productRoute");
const brandRoutes = require("../module/brand/brandRoute");
const categoryRotes = require("../module/category/categoryRoute");
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
    path: "/brand",
    route: categoryRotes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
module.exports = router;

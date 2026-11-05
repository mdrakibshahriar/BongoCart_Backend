const express = require("express");
const auth = require("../../app/middlewares/auth");
const brandController = require("./brandController");

const router = express.Router();

router.post("/brand-add", auth("Admin"), brandController.addBrand);
router.get("/", brandController.getBrand);
router.delete("/:id", auth("Admin", brandController.deleteBrand));

module.exports = router;

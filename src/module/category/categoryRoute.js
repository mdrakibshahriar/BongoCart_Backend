const express = require("express");
const auth = require("../../app/middlewares/auth");
const categoryController = require("./categoryController");

const router = express.Router();

router.post("/category-add", auth("Admin"), categoryController.addCategory);
router.get("/", categoryController.getCategory);
router.delete("/:id", auth("Admin"), categoryController.deleteCategory);

module.exports = router;

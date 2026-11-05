const express = require("express");
const usersController = require("./userController");
const auth = require("../../app/middlewares/auth");

const router = express.Router();

router.post("/user-create", usersController.signUpUser);
router.post("/user-login", usersController.loginUser);
router.get("/user-get/:email", auth("User"), usersController.getUser);
router.get("/admin/user-all", auth("Admin"), usersController.getAllUser);
router.get("/admin/:email", auth("Admin"), usersController.getAdmin);
router.patch("/user-update", auth("User"), usersController.userUpdate);
router.patch(
  "user-update-address",
  auth("User"),
  usersController.userUpdateAddress,
);

module.exports = router;
